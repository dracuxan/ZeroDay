---
author: Nisarg
date: "2025-02-20"
title: Nmap Basic Tutorial
---
## What is Nmap?
Nmap (Network Mapper) is an open-source tool used for network discovery and security auditing. It allows users to scan networks and discover hosts, services, and open ports, providing valuable insights for penetration testing and network administration.

**A simple Nmap execution to discover live hosts using a ping sweep:**

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

### Different Types of Scans

Nmap supports various scan types, each serving a different purpose:

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
**Under the hood - **
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
**Under the hood - **

- Starts an infinite loop to continuously scan a specified IP address and port using RustScan.

- Uses the -g option for grep-friendly output and -p for specifying the port.

- If the port is open, runs the service_discovery function to perform an Nmap service version scan and logs the result in watchdog.log.

- If the port is closed, the script waits for five seconds before retrying.

- Repeats the process until the port is found open.



---

**Conclusion**
Nmap is a powerful tool for reconnaissance, penetration testing, and security auditing. By mastering different scanning techniques and leveraging scripting, users can efficiently analyze and secure networks.
