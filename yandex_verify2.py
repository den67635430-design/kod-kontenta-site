import paramiko, time, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

HOST = "85.198.87.228"

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(HOST, username="root", password="Deonis97917040@!", timeout=15)

def run(cmd, timeout=300):
    print(f"$ {cmd[:80]}")
    _, out, err = ssh.exec_command(cmd, timeout=timeout)
    o = out.read().decode("utf-8", errors="replace").strip()
    if o: print(o[-300:])
    return o

print("Пересобираем...")
run("cd /var/www/kod-kontenta/site && npm run build 2>&1", timeout=300)
run("pm2 restart kod-kontenta")
time.sleep(3)

status = run("curl -sk -o /dev/null -w '%{http_code}' https://kodkontenta.ru/yandex_8d0c58ff5707542f.html")
print(f"\nСтатус файла: {status}")
ssh.close()
