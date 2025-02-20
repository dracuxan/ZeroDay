---
author: Nisarg
date: "2024-11-30"
title: Nmap Basic Tutorial
---

**Basic - What is Nmap?** Nmap (Network Mapper) is an open-source tool used for network discovery and security auditing. It allows users to scan networks and discover hosts, services, and open ports, providing valuable insights for penetration testing and network administration.

**Example - Basic Execution** A simple Nmap execution to discover live hosts using a ping sweep:

```bash
$ nmap -sn 172.16.10.0/24
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
$ nmap -sn 172.16.10.0/24 | grep "Nmap scan" | awk -F'report for ' '{print $2}'
```

---

**Intermediate - Different Types of Scans** Nmap supports various scan types, each serving a different purpose:

1. **TCP SYN Scan (Stealth Scan)**

   ```bash
   $ nmap -sS 172.16.10.1
   ```

   - Sends SYN packets to check for open ports without establishing a full connection.

2. **TCP Connect Scan**

   ```bash
   $ nmap -sT 172.16.10.1
   ```

   - Establishes a full connection to determine open ports.

3. **UDP Scan**

   ```bash
   $ nmap -sU 172.16.10.1
   ```

   - Scans for open UDP ports, useful for detecting services like DNS and SNMP.

4. **Aggressive Scan**

   ```bash
   $ nmap -A 172.16.10.1
   ```

   - Performs OS detection, version detection, script scanning, and traceroute.

5. **Scanning a Specific Port Range**

   ```bash
   $ nmap -p 80,443,22 172.16.10.1
   ```

   - Scans for specific ports instead of all available ones.

6. **Service and Version Detection**

   ```bash
   $ nmap -sV 172.16.10.1
   ```

   - Identifies running services and their versions on the target.

---

**Final - Nmap Scripting Engine (NSE)** The Nmap Scripting Engine (NSE) allows automation of network tasks, including vulnerability detection and exploitation.

1. **Running Default Scripts**

   ```bash
   $ nmap -sC 172.16.10.1
   ```

   - Executes default scripts for additional information.

2. **Detecting Vulnerabilities**

   ```bash
   $ nmap --script=vuln 172.16.10.1
   ```

   - Runs vulnerability detection scripts.

3. **Checking for Open Ports and Services with Detailed Scripts**

   ```bash
   $ nmap -p 80 --script=http-* 172.16.10.1
   ```

   - Runs all HTTP-related scripts against port 80.

4. **Using NSE for Brute Force Attacks**

   ```bash
   $ nmap --script=ssh-brute -p 22 172.16.10.1
   ```

   - Attempts SSH brute-force login.

5. **Using Custom Scripts**

   ```bash
   $ nmap --script /path/to/custom-script.nse 172.16.10.1
   ```

   - Runs a user-defined script.

---

**Conclusion** Nmap is a powerful tool for reconnaissance, penetration testing, and security auditing. By mastering different scanning techniques and leveraging the Nmap Scripting Engine, users can efficiently analyze and secure networks.
