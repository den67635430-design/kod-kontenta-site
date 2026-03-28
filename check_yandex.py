import paramiko, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect("85.198.87.228", username="root", password="Deonis97917040@!", timeout=15)

def run(cmd):
    _, out, err = ssh.exec_command(cmd, timeout=30)
    return out.read().decode("utf-8", errors="replace").strip()

# Проверяем где лежит файл
print("Файл в public:")
print(run("ls /var/www/kod-kontenta/site/public/ | grep yandex"))

# Проверяем содержимое файла
print("\nСодержимое:")
print(run("cat /var/www/kod-kontenta/site/public/yandex_8d0c58ff5707542f.html"))

# Проверяем через curl напрямую
print("\nЧерез curl:")
print(run("curl -sk https://kodkontenta.ru/yandex_8d0c58ff5707542f.html"))

ssh.close()
