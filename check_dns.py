import paramiko, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

HOST = "85.198.87.228"
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(HOST, username="root", password="Deonis97917040@!", timeout=15)

def run(ssh, cmd):
    _, out, _ = ssh.exec_command(cmd, timeout=15)
    return out.read().decode("utf-8", errors="replace").strip()

print("DNS для kodkontenta.ru:")
print(run(ssh, "dig +short kodkontenta.ru A @8.8.8.8 2>/dev/null || nslookup kodkontenta.ru 8.8.8.8 2>/dev/null | grep Address"))
print("\nDNS для www.kodkontenta.ru:")
print(run(ssh, "dig +short www.kodkontenta.ru A @8.8.8.8 2>/dev/null"))
print("\nIP этого VPS:", HOST)
print("\nDNS resolver VPS:")
print(run(ssh, "cat /etc/resolv.conf"))

# Регистрируем webhook через прямой IP
print("\nПробую webhook через прямой IP VPS...")
result = run(ssh, 'curl -s --resolve "kodkontenta.ru:443:85.198.87.228" -X POST "https://api.telegram.org/bot8127682121:AAFeuE6gXgjqKXZlJntlKNTVJwkyKqgJFsg/setWebhook" -d "url=https://kodkontenta.ru/api/telegram-webhook?secret=kodkontenta2026&allowed_updates=[channel_post]"')
print(result)

ssh.close()
