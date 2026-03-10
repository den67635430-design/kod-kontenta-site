import paramiko, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

HOST = "85.198.87.228"
DOMAIN = "kodkontenta.ru"

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(HOST, username="root", password="Deonis97917040@!", timeout=15)

def run(ssh, cmd, timeout=120):
    print(f"  $ {cmd[:80]}")
    _, out, err = ssh.exec_command(cmd, timeout=timeout)
    o = out.read().decode("utf-8", errors="replace").strip()
    e = err.read().decode("utf-8", errors="replace").strip()
    if o: print(f"    {o[-400:]}")
    if e and "notice" not in e and "warn" not in e: print(f"    ERR: {e[-200:]}")
    return o

# SSL только для kodkontenta.ru (без www пока нет DNS)
print("Получаю SSL для kodkontenta.ru...")
result = run(ssh,
    f"certbot --nginx -d {DOMAIN} --non-interactive --agree-tos "
    f"--email admin@{DOMAIN} --redirect --expand 2>&1",
    timeout=120)
print(f"SSL: {result[-300:]}")

# Проверяем HTTPS
print("\nПроверяем HTTPS:")
run(ssh, f"curl -sk -o /dev/null -w '%{{http_code}}' https://{DOMAIN}/")

# Nginx reload
run(ssh, "systemctl reload nginx")

# Итоговый статус
print("\nСтатус PM2:")
run(ssh, "pm2 status | grep kod-kontenta")

ssh.close()
print(f"\nСайт: https://{DOMAIN}")
