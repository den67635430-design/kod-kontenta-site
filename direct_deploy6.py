import paramiko, time, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

HOST = "85.198.87.228"
FILES = [
    (r"C:\Users\UZER\kod-kontenta\site\components\HeroSection.tsx",
     "/var/www/kod-kontenta/site/components/HeroSection.tsx"),
    (r"C:\Users\UZER\kod-kontenta\site\components\ServicesSection.tsx",
     "/var/www/kod-kontenta/site/components/ServicesSection.tsx"),
    (r"C:\Users\UZER\kod-kontenta\site\components\ReviewsSection.tsx",
     "/var/www/kod-kontenta/site/components/ReviewsSection.tsx"),
    (r"C:\Users\UZER\kod-kontenta\site\components\PortfolioSection.tsx",
     "/var/www/kod-kontenta/site/components/PortfolioSection.tsx"),
]

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(HOST, username="root", password="Deonis97917040@!", timeout=15)
print("Подключился")

sftp = ssh.open_sftp()
for local, remote in FILES:
    sftp.put(local, remote)
    print(f"Загружен: {remote.split('/')[-1]}")
sftp.close()

def run(cmd, timeout=300):
    print(f"$ {cmd[:80]}")
    _, out, err = ssh.exec_command(cmd, timeout=timeout)
    o = out.read().decode("utf-8", errors="replace").strip()
    e = err.read().decode("utf-8", errors="replace").strip()
    if o: print(o[-500:])
    if e and "notice" not in e.lower() and "warn" not in e.lower():
        print(f"ERR: {e[-300:]}")
    return o

print("\nСборка...")
run("cd /var/www/kod-kontenta/site && npm run build 2>&1", timeout=300)
print("\nРестарт...")
run("pm2 restart kod-kontenta")
time.sleep(3)
status = run("curl -sk -o /dev/null -w '%{http_code}' https://kodkontenta.ru/")
print(f"\nСтатус: {status}")
ssh.close()
print("Готово! https://kodkontenta.ru")
