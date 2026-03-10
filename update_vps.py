"""Быстрое обновление сайта на VPS"""
import paramiko, sys, io, time
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

HOST = "85.198.87.228"

def run(ssh, cmd, timeout=180):
    print(f"  $ {cmd[:70]}")
    _, out, err = ssh.exec_command(cmd, timeout=timeout)
    o = out.read().decode("utf-8", errors="replace").strip()
    e = err.read().decode("utf-8", errors="replace").strip()
    if o: print(f"    {o[-300:]}")
    if e and "notice" not in e.lower() and "warn" not in e.lower():
        print(f"    ERR: {e[-200:]}")
    return o

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(HOST, username="root", password="Deonis97917040@!", timeout=15)
print("Подключился\n")

print("1. git pull...")
run(ssh, "cd /var/www/kod-kontenta && git pull origin main", timeout=60)

print("2. npm build...")
run(ssh, "cd /var/www/kod-kontenta/site && npm run build 2>&1", timeout=300)

print("3. pm2 restart...")
run(ssh, "pm2 restart kod-kontenta")

print("4. Проверка...")
time.sleep(3)
status = run(ssh, "curl -sk -o /dev/null -w '%{http_code}' https://kodkontenta.ru/")
print(f"HTTPS статус: {status}")

ssh.close()
print("\nГотово! Сайт обновлён: https://kodkontenta.ru")
