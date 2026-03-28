import paramiko, time, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

HOST = "85.198.87.228"
FILES = [
    (r"C:\Users\UZER\kod-kontenta\site\public\robots.txt",
     "/var/www/kod-kontenta/site/public/robots.txt"),
    (r"C:\Users\UZER\kod-kontenta\site\public\sitemap.xml",
     "/var/www/kod-kontenta/site/public/sitemap.xml"),
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

def run(cmd, timeout=120):
    print(f"$ {cmd[:80]}")
    _, out, err = ssh.exec_command(cmd, timeout=timeout)
    o = out.read().decode("utf-8", errors="replace").strip()
    e = err.read().decode("utf-8", errors="replace").strip()
    if o: print(o[-300:])
    return o

print("\nСборка...")
run("cd /var/www/kod-kontenta/site && npm run build 2>&1", timeout=300)
run("pm2 restart kod-kontenta")
time.sleep(3)

print("\nПингуем поисковики...")
# Google
g = run('curl -s -o /dev/null -w "%{http_code}" "https://www.google.com/ping?sitemap=https://kodkontenta.ru/sitemap.xml"')
print(f"Google: {g}")
# Яндекс
y = run('curl -s -o /dev/null -w "%{http_code}" "https://webmaster.yandex.ru/ping?sitemap=https://kodkontenta.ru/sitemap.xml"')
print(f"Yandex: {y}")

status = run("curl -sk -o /dev/null -w '%{http_code}' https://kodkontenta.ru/robots.txt")
print(f"\nrobots.txt статус: {status}")
status2 = run("curl -sk -o /dev/null -w '%{http_code}' https://kodkontenta.ru/sitemap.xml")
print(f"sitemap.xml статус: {status2}")

ssh.close()
print("\nГотово!")
