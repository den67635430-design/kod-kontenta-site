"""Исправляем конфликт Nginx и SSL"""
import paramiko
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

HOST = "85.198.87.228"
USER = "root"
PASSWORD = "Deonis97917040@!"
DOMAIN = "kodkontenta.ru"
BOT_TOKEN = "8127682121:AAFeuE6gXgjqKXZlJntlKNTVJwkyKqgJFsg"
WEBHOOK_SECRET = "kodkontenta2026"


def run(ssh, cmd, timeout=60):
    print(f"  $ {cmd[:90]}")
    _, stdout, stderr = ssh.exec_command(cmd, timeout=timeout)
    out = stdout.read().decode("utf-8", errors="replace").strip()
    err = stderr.read().decode("utf-8", errors="replace").strip()
    if out: print(f"    {out[-500:]}")
    if err and "notice" not in err.lower() and "warn" not in err.lower():
        print(f"    ERR: {err[-300:]}")
    return out


ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(HOST, username=USER, password=PASSWORD, timeout=15)
print("Подключился\n")

# Смотрим все nginx конфиги
print("Все nginx конфиги:")
run(ssh, "ls /etc/nginx/sites-enabled/")

print("\nИщем конфликтующий конфиг:")
run(ssh, f"grep -rl '{DOMAIN}' /etc/nginx/sites-enabled/ 2>/dev/null")

# Удаляем все конфиги кроме нашего и оставляем только kod-kontenta
print("\nОчищаем лишние конфиги:")
run(ssh, "ls /etc/nginx/sites-enabled/ | grep -v kod-kontenta | xargs -I{} rm -f /etc/nginx/sites-enabled/{} || true")
run(ssh, "ls /etc/nginx/sites-enabled/")

# Проверяем и перезагружаем nginx
print("\nПерезагружаем Nginx:")
run(ssh, "nginx -t && systemctl reload nginx")

# SSL с --expand
print("\nSSL с --expand:")
ssl = run(ssh,
    f"certbot --nginx -d {DOMAIN} -d www.{DOMAIN} --non-interactive --agree-tos "
    f"--email admin@kodkontenta.ru --redirect --expand 2>&1",
    timeout=120)
if "Congratulations" in ssl or "Certificate not yet due" in ssl or "Successfully" in ssl:
    print("SSL OK!")
else:
    print(f"SSL результат: {ssl[-300:]}")

# Проверяем https
print("\nПроверяем сайт:")
run(ssh, f"curl -sk -o /dev/null -w '%{{http_code}}' https://{DOMAIN}/ || echo 'HTTPS не работает'")
run(ssh, f"curl -s -o /dev/null -w '%{{http_code}}' http://{DOMAIN}/ || echo 'HTTP не работает'")

# Telegram webhook через IP (обход DNS)
print("\nРегистрируем Telegram webhook...")
webhook_url = f"https://{DOMAIN}/api/telegram-webhook?secret={WEBHOOK_SECRET}"
result = run(ssh, f'curl -s -X POST "https://api.telegram.org/bot{BOT_TOKEN}/setWebhook" -d "url={webhook_url}&allowed_updates=[channel_post]"')
print(f"Webhook результат: {result}")

ssh.close()
print("\nГотово!")
