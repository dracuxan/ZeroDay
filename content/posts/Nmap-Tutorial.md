---
author: Nisarg
date: "2025-02-20"
title: Nmap Basic Tutorial
summary: Learn About Multiple Nmap Scans and Scripting
ShowToc: true
---

## What is Nmap?
Nmap (Network Mapper) is an open-source tool used for network discovery and security auditing. It allows users to scan networks and discover hosts, services, and open ports, providing valuable insights for penetration testing and network administration.

**A simple Nmap execution to discover live hosts using a ping sweep:**

```bash
nmap -sn 172.16.10.0/24
```

Output:

```
Nmap scan report for 172.16.10.1
Host is up (0.00093s latency).
Nmap scan report for 172.16.10.10
Host is up (0.00020s latency).
Nmap scan report for 172.16.10.11
Host is up (0.00076s latency).
```

To filter only live IPs, use:

```bash
nmap -sn 172.16.10.0/24 | grep "Nmap scan" | awk -F'report for ' '{print $2}'
```

---

## **Different Types of Scans in Nmap**

Nmap supports various scan types, each serving a different purpose. These scans help in discovering live hosts, open ports, running services, OS details, and even security vulnerabilities.

---

### **1. TCP SYN Scan (Stealth Scan)**

**Command:**

```bash
nmap -sS scanme.nmap.org
```
**Description:**

- Sends SYN packets to check for open ports without establishing a full TCP connection.
- Often considered "stealthy" since it doesn’t complete the handshake, reducing detection chances.

**Additional Options:**

- `-Pn`: Skips host discovery, assumes all hosts are up.
- `-T4`: Increases speed for faster scanning.

---

### **2. TCP Connect Scan**

**Command:**
```bash
nmap -sT scanme.nmap.org
```
**Description:**

- Establishes a full three-way TCP handshake to determine open ports.
- Less stealthy but useful when SYN scan isn’t an option (e.g., when running Nmap without root privileges).

**Additional Options:**

- `-p-`: Scans all 65535 ports.
- `-v`: Enables verbose mode for more details.

---

### **3. UDP Scan**

**Command:**

```bash
nmap -sU scanme.nmap.org
```

**Description:**

- Scans for open UDP ports, useful for detecting services like DNS (port 53) and SNMP (port 161).
- Slower than TCP scanning due to the nature of UDP communication.

**Additional Options:**

- `--top-ports 20`: Scans the 20 most common UDP ports.
- `--min-rate 1000`: Increases scan speed by sending packets at a higher rate.

---

### **4. Aggressive Scan**

**Command:**

```bash
nmap -A scanme.nmap.org
```
**Description:**

- Performs multiple functions, including OS detection, version detection, script scanning, and traceroute.
- Provides comprehensive information about the target.

**Additional Options:**

- `-oN output.txt`: Saves results to a file.
- `--script=vuln`: Runs vulnerability detection scripts.

---

### **5. Scanning a Specific Port Range**

**Command:**

```bash
nmap -p 80,443,22 scanme.nmap.org
```
**Description:**

- Limits the scan to specific ports instead of all available ones, reducing scan time.
- Useful when looking for specific services like SSH (22), HTTP (80), and HTTPS (443).

**Additional Options:**

- `-p-`: Scans all 65535 ports.
- `-p 1-1000`: Scans the first 1000 ports.

---

### **6. Service and Version Detection**

**Command:**

```bash
nmap -sV scanme.nmap.org
```
**Description:**

- Identifies running services and their versions on the target machine.
- Useful for determining software vulnerabilities.

**Additional Options:**

- `--version-intensity 5`: Increases the depth of version detection.
- `--allports`: Checks services on all ports, even if they seem closed.

---

### **7. OS Detection Scan**

**Command:**

```bash
nmap -O scanme.nmap.org
```
**Description:**

- Identifies the operating system of the target based on TCP/IP stack characteristics.
- Requires at least one open and one closed port to work effectively.

**Additional Options:**

- `--osscan-limit`: Restricts OS detection to more accurate results.
- `--max-os-tries 3`: Limits the number of tries for OS detection.

---

### **8. Firewall Evasion Scan**

**Command:**

```bash
nmap -f scanme.nmap.org
```

**Description:**
- Uses tiny fragmented IP packets to bypass basic firewalls.
- Useful for testing firewall configurations and IDS/IPS evasion.

**Additional Options:**

- `--mtu 16`: Adjusts maximum transmission unit (MTU) for packet fragmentation.
- `-D RND:10`: Uses decoys to obfuscate the source of the scan.

---

### **9. Null, Xmas, and FIN Scans (Firewall Bypass Techniques)**
- These scans work by sending abnormal TCP packets to detect firewalls and closed ports.
- **Null Scan (-sN):** Sends packets with no flags set.
- **Xmas Scan (-sX):** Sends packets with FIN, PSH, and URG flags set.
- **FIN Scan (-sF):** Sends packets with only the FIN flag set.

**Command:**

```bash
nmap -sN scanme.nmap.org
```


```bash
nmap -sX scanme.nmap.org
```


```bash
nmap -sF scanme.nmap.org
```

**Usage:**

- Can be used to bypass certain firewalls and IDS/IPS solutions.
- Often used for stealthy scanning.

**Additional Options:**

- `-Pn`: Disables ping to avoid detection.
- `-T2`: Lowers speed for stealth.

---

### **10. Script Scanning (Using Nmap Scripting Engine - NSE)**

**Command:**

```bash
nmap --script=http-title scanme.nmap.org
```
**Description:**

- Uses Nmap scripts to detect vulnerabilities, brute-force login attempts, and extract information.
- Can automate security testing.

**Additional Options:**

- `--script=vuln`: Runs vulnerability detection scripts.
- `--script=default`: Runs default script scans.

---

### **11. Idle Scan (Zombie Scan - Ultimate Stealth)**

**Command:**


```bash
nmap -sI zombiehost scanme.nmap.org

```

**Description:**
- Uses a "zombie" host to scan the target, making the scan appear as if it originates from the zombie.
- Provides maximum stealth as it doesn't send packets directly from the attacker's machine.

---

### **12. Timing Templates (Speed Control)**

- Nmap supports different timing templates to control scan speed:
  - `-T0` (Paranoid) → Slowest, avoids detection.
  - `-T1` (Sneaky) → Very slow, used for IDS evasion.
  - `-T2` (Polite) → Slower than normal, reduces network congestion.
  - `-T3` (Normal) → Default scan speed.
  - `-T4` (Aggressive) → Faster, but more likely to be detected.
  - `-T5` (Insane) → Fastest, can overload networks.

**Example Command:**

```bash
nmap -sS -T4 scanme.nmap.org
```

---

## Writing Scripts Using Nmap

**Categorizing Open Ports**
This script reads a list of target IPs, scans them with Nmap, and categorizes open ports into separate files.

```bash
#!/bin/bash
HOSTS_FILE="172-16-10-hosts.txt"
RESULT=$(nmap -iL ${HOSTS_FILE} --open | grep "Nmap scan report\|tcp open")

# Read the Nmap output line by line.
while read -r line; do
  if echo "${line}" | grep -q "report for"; then
    ip=$(echo "${line}" | awk -F'for ' '{print $2}')
  else
    port=$(echo "${line}" | grep open | awk -F'/' '{print $1}')
    file="port-${port}.txt"
    echo "${ip}" >> "${file}"
  fi
done <<< "${RESULT}"
```

**Under the hood -**

- Assigns the output of the Nmap command to RESULT, filtering for lines containing "Nmap scan report" or "tcp open".

- Reads RESULT line by line to identify open ports.

- Extracts the IP address from lines containing "report for".

- Extracts the open port number from other lines.

- Creates a file named port-NUMBER.txt and appends the corresponding IP address to it.

---

**Monitoring a Port and Running Service Discovery**
This script continuously checks if a port is open and runs a service discovery scan once the port becomes available.

```bash
#!/bin/bash
LOG_FILE="watchdog.log"
IP_ADDRESS="${1}"
WATCHED_PORT="${2}"

service_discovery(){
  local host
  local port
  host="${1}"
  port="${2}"
  nmap -sV -p "${port}" "${host}" >> "${LOG_FILE}"
}

while true; do
  port_scan=$(docker run --network=host -it --rm --name rustscan rustscan/rustscan:2.1.1 -a "${IP_ADDRESS}" -g -p "${WATCHED_PORT}")

  if [[ -n "${port_scan}" ]]; then
    echo "${IP_ADDRESS} has started responding on port ${WATCHED_PORT}!"
    echo "Performing a service discovery..."

    if service_discovery "${IP_ADDRESS}" "${WATCHED_PORT}"; then
      echo "Wrote port scan data to ${LOG_FILE}"
      break
    fi
  else
    echo "Port is not yet open, sleeping for 5 seconds..."
    sleep 5
  fi
done
```

**Under the hood -**

- Starts an infinite loop to continuously scan a specified IP address and port using RustScan.

- Uses the -g option for grep-friendly output and -p for specifying the port.

- If the port is open, runs the service_discovery function to perform an Nmap service version scan and logs the result in watchdog.log.

- If the port is closed, the script waits for five seconds before retrying.

- Repeats the process until the port is found open.



---

**Conclusion**
Nmap is a powerful tool for reconnaissance, penetration testing, and security auditing. By mastering different scanning techniques and leveraging scripting, users can efficiently analyze and secure networks.
