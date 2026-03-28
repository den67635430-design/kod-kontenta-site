import paramiko, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect("85.198.87.228", username="root", password="Deonis97917040@!", timeout=15)

sftp = ssh.open_sftp()
with sftp.open("/var/www/kod-kontenta/site/public/googleba17522224b7ad16.html", "w") as f:
    f.write("google-site-verification: googleba17522224b7ad16.html")
sftp.close()
print("Файл создан")

def run(cmd):
    _, out, _ = ssh.exec_command(cmd, timeout=30)
    return out.read().decode("utf-8", errors="replace").strip()

status = run("curl -sk -o /dev/null -w '%{http_code}' https://kodkontenta.ru/googleba17522224b7ad16.html")
print(f"Статус: {status}")
ssh.close()
