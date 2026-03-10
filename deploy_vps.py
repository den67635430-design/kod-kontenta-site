"""
Деплой сайта Код контента на VPS (85.198.87.228)
- Клонирует/обновляет репо
- Устанавливает Node.js если нет
- npm install + npm run build
- PM2 запуск/перезапуск
- Nginx конфиг для kodkontenta.ru
- Регистрирует Telegram webhook
"""
import paramiko
import time

HOST = "85.198.87.228"
USER = "root"
PASSWORD = "Deonis97917040@!"
REPO = "https://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@github.com/den67635430-design/kod-kontenta-site.git"
APP_DIR = "/var/www/kod-kontenta"
DOMAIN = "kodkontenta.ru"
PORT = 3000
BOT_TOKEN = "8127682121:AAFeuE6gXgjqKXZlJntlKNTVJwkyKqgJFsg"
WEBHOOK_SECRET = "kodkontenta2026"
ANTHROPIC_KEY = "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"


def run(ssh, cmd, timeout=120):
    print(f"  $ {cmd[:80]}{'...' if len(cmd)>80 else ''}")
    stdin, stdout, stderr = ssh.exec_command(cmd, timeout=timeout)
    out = stdout.read().decode(errors="replace").strip()
    err = stderr.read().decode(errors="replace").strip()
    if out:
        print(f"    {out[-300:]}")
    if err and "warning" not in err.lower() and "npm warn" not in err.lower():
        print(f"    ERR: {err[-200:]}")
    return out


def main():
    print("=== Деплой kodkontenta.ru на VPS ===\n")

    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(HOST, username=USER, password=PASSWORD, timeout=15)
    print("Подключился к VPS\n")

    # 1. Node.js
    print("1. Проверяю Node.js...")
    node = run(ssh, "node --version 2>/dev/null || echo 'NOT FOUND'")
    if "NOT FOUND" in node or "v" not in node:
        print("   Устанавливаю Node.js 20...")
        run(ssh, "curl -fsSL https://deb.nodesource.com/setup_20.x | bash -", timeout=60)
        run(ssh, "apt-get install -y nodejs", timeout=120)
        run(ssh, "node --version")
    else:
        print(f"   Node.js уже есть: {node}")

    # 2. PM2
    print("\n2. Проверяю PM2...")
    pm2 = run(ssh, "pm2 --version 2>/dev/null || echo 'NOT FOUND'")
    if "NOT FOUND" in pm2:
        run(ssh, "npm install -g pm2")
    else:
        print(f"   PM2 уже есть: {pm2}")

    # 3. Клонируем/обновляем репо
    print(f"\n3. Обновляю репозиторий в {APP_DIR}...")
    exists = run(ssh, f"test -d {APP_DIR}/.git && echo YES || echo NO")
    if "YES" in exists:
        run(ssh, f"cd {APP_DIR} && git pull origin main", timeout=60)
    else:
        run(ssh, f"rm -rf {APP_DIR} && git clone {REPO} {APP_DIR}", timeout=120)

    # 4. .env.production
    print("\n4. Создаю .env.production...")
    env_content = f"""ANTHROPIC_API_KEY={ANTHROPIC_KEY}
TELEGRAM_BOT_TOKEN={BOT_TOKEN}
TELEGRAM_CHANNEL=@kontentcod
TELEGRAM_WEBHOOK_SECRET={WEBHOOK_SECRET}
NEXT_PUBLIC_SITE_URL=https://{DOMAIN}
NODE_ENV=production
"""
    # Записываем через heredoc
    run(ssh, f"cat > {APP_DIR}/site/.env.production << 'ENVEOF'\n{env_content}\nENVEOF")

    # 5. npm install + build
    print("\n5. npm install...")
    run(ssh, f"cd {APP_DIR}/site && npm install --production=false", timeout=300)
    print("   npm run build...")
    run(ssh, f"cd {APP_DIR}/site && npm run build", timeout=300)

    # 6. PM2
    print("\n6. Запускаю через PM2...")
    pm2_status = run(ssh, "pm2 list | grep kod-kontenta || echo 'NOT RUNNING'")
    if "NOT RUNNING" in pm2_status:
        run(ssh, f"cd {APP_DIR}/site && pm2 start npm --name kod-kontenta -- start -- -p {PORT}")
    else:
        run(ssh, "pm2 restart kod-kontenta")
    run(ssh, "pm2 save")
    run(ssh, "pm2 startup systemd -u root --hp /root | tail -1 | bash || true")

    # 7. Nginx
    print("\n7. Настраиваю Nginx...")
    nginx_conf = f"""server {{
    listen 80;
    server_name {DOMAIN} www.{DOMAIN};

    location / {{
        proxy_pass http://localhost:{PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }}
}}"""
    run(ssh, f"cat > /etc/nginx/sites-available/kod-kontenta << 'NGEOF'\n{nginx_conf}\nNGEOF")
    run(ssh, "ln -sf /etc/nginx/sites-available/kod-kontenta /etc/nginx/sites-enabled/")
    run(ssh, "nginx -t && systemctl reload nginx")

    # 8. SSL (certbot)
    print("\n8. SSL сертификат...")
    certbot = run(ssh, "certbot --version 2>/dev/null || echo 'NOT FOUND'")
    if "NOT FOUND" in certbot:
        run(ssh, "apt-get install -y certbot python3-certbot-nginx", timeout=120)
    ssl_result = run(ssh, f"certbot --nginx -d {DOMAIN} -d www.{DOMAIN} --non-interactive --agree-tos --email admin@{DOMAIN} --redirect 2>&1 || echo 'SSL_SKIP'", timeout=120)
    if "SSL_SKIP" in ssl_result or "error" in ssl_result.lower():
        print("   SSL пропущен (нужно настроить DNS сначала)")

    # 9. Telegram Webhook
    print("\n9. Регистрирую Telegram webhook...")
    webhook_url = f"https://{DOMAIN}/api/telegram-webhook?secret={WEBHOOK_SECRET}"
    result = run(ssh, f'curl -s "https://api.telegram.org/bot{BOT_TOKEN}/setWebhook?url={webhook_url}&allowed_updates=channel_post"')
    print(f"   Результат: {result}")

    # 10. Проверяем
    print("\n10. Проверяю сайт...")
    time.sleep(3)
    check = run(ssh, f"curl -s -o /dev/null -w '%{{http_code}}' http://localhost:{PORT}/")
    print(f"   HTTP статус: {check}")

    ssh.close()
    print("\n=== ДЕПЛОЙ ЗАВЕРШЁН ===")
    print(f"Сайт: https://{DOMAIN}")
    print(f"Webhook: {webhook_url}")


if __name__ == "__main__":
    main()
