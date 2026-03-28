import paramiko, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

HOST = "85.198.87.228"
FILENAME = "yandex_8d0c58ff5707542f.html"
CONTENT = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body>Verification: 8d0c58ff5707542f</body></html>'

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(HOST, username="root", password="Deonis97917040@!", timeout=15)

sftp = ssh.open_sftp()
with sftp.open(f"/var/www/kod-kontenta/site/public/{FILENAME}", "w") as f:
    f.write(CONTENT)
sftp.close()
print(f"Файл создан: /public/{FILENAME}")

def run(cmd):
    _, out, err = ssh.exec_command(cmd, timeout=30)
    return out.read().decode("utf-8", errors="replace").strip()

status = run(f"curl -sk -o /dev/null -w '%{{http_code}}' https://kodkontenta.ru/{FILENAME}")
print(f"Проверка доступности: {status}")
ssh.close()
