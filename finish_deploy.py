"""Продолжаем деплой с шага PM2 (npm build уже выполнился)"""
import paramiko
import time
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

HOST = "85.198.87.228"
USER = "root"
PASSWORD = "Deonis97917040@!"
APP_DIR = "/var/www/kod-kontenta"
DOMAIN = "kodkontenta.ru"
PORT = 3000
BOT_TOKEN = "8127682121:AAFeuE6gXgjqKXZlJntlKNTVJwkyKqgJFsg"
WEBHOOK_SECRET = "kodkontenta2026"
ANTHROPIC_KEY = "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"


def run(ssh, cmd, timeout=180):
    print(f"  $ {cmd[:90]}{'...' if len(cmd)>90 else ''}")
    stdin, stdout, stderr = ssh.exec_command(cmd, timeout=timeout)
    out = stdout.read().decode("utf-8", errors="replace").strip()
    err = stderr.read().decode("utf-8", errors="replace").strip()
    if out:
        print(f"    {out[-400:]}")
    if err and "warning" not in err.lower() and "npm warn" not in err.lower() and "npm notice" not in err.lower():
        print(f"    ERR: {err[-300:]}")
    return out


def main():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(HOST, username=USER, password=PASSWORD, timeout=15)
    print("Подключился к VPS\n")

    # Проверяем что build прошёл
    print("Проверяю результат сборки...")
    build_ok = run(ssh, f"test -d {APP_DIR}/site/.next && echo BUILD_OK || echo BUILD_FAIL")
    if "BUILD_FAIL" in build_ok:
        print("Build не завершён, запускаю снова...")
        run(ssh, f"cd {APP_DIR}/site && npm run build 2>&1", timeout=300)
    else:
        print("Build OK!")

    # PM2
    print("\n--- PM2 ---")
    pm2_list = run(ssh, "pm2 list 2>/dev/null | grep kod-kontenta || echo NOT_RUNNING")
    if "NOT_RUNNING" in pm2_list:
        run(ssh, f"cd {APP_DIR}/site && pm2 start npm --name kod-kontenta -- start -- -p {PORT}")
    else:
        run(ssh, "pm2 restart kod-kontenta")
    run(ssh, "pm2 save")

    # Nginx
    print("\n--- Nginx ---")
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
    run(ssh, f"""cat > /etc/nginx/sites-available/kod-kontenta << 'NGEOF'
{nginx_conf}
NGEOF""")
    run(ssh, "ln -sf /etc/nginx/sites-available/kod-kontenta /etc/nginx/sites-enabled/kod-kontenta")
    run(ssh, "rm -f /etc/nginx/sites-enabled/default 2>/dev/null; true")
    run(ssh, "nginx -t && systemctl reload nginx")

    # SSL
    print("\n--- SSL ---")
    run(ssh, "apt-get install -y certbot python3-certbot-nginx -q 2>/dev/null || true", timeout=120)
    ssl = run(ssh,
        f"certbot --nginx -d {DOMAIN} -d www.{DOMAIN} --non-interactive --agree-tos "
        f"--email denis@{DOMAIN} --redirect 2>&1",
        timeout=120)
    if "Congratulations" in ssl:
        print("SSL установлен!")
    else:
        print("SSL: нужно настроить DNS на VPS IP, потом запустить certbot вручную")

    # Telegram webhook
    print("\n--- Telegram Webhook ---")
    webhook_url = f"https://{DOMAIN}/api/telegram-webhook?secret={WEBHOOK_SECRET}"
    result = run(ssh, f'curl -s "https://api.telegram.org/bot{BOT_TOKEN}/setWebhook?url={webhook_url}&allowed_updates=%5B%22channel_post%22%5D"')
    print(f"Webhook: {result}")

    # Проверка
    print("\n--- Проверка ---")
    time.sleep(4)
    status = run(ssh, f"curl -s -o /dev/null -w '%{{http_code}}' http://localhost:{PORT}/")
    print(f"HTTP статус: {status}")
    pm2_status = run(ssh, "pm2 list | grep kod-kontenta")
    print(f"PM2: {pm2_status}")

    ssh.close()
    print(f"\nСайт запущен на VPS: http://{DOMAIN}")
    print(f"Webhook: {webhook_url}")


if __name__ == "__main__":
    main()
