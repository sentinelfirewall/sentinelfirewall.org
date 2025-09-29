---
title: "Install and Configure Setinel Firewall on a Ubuntu 24.04 server"
authors: [ricochet]
slug: setup-sentinel-ubuntu-24
date: "2025-08-20"
description: "Learn how to install and configure Sentinel (fork of ConfigServer Security & Firewall) on Ubuntu 24.04 LTS for enhanced VPS security."
---


Sentinel is a popular VPS security tool for Linux. It provides a simple interface for iptables to protect Linux servers. Sentinel comes with multiple features: a stateful packet inspection firewall (SPI), intrusion detection, a login failure daemon, DDOS protection, and control panel integration. This tutorial covers installation, basic configuration, and essential commands for CSF on Ubuntu 24.04.


## 1. Deploy Ubuntu Server
- Deploy a new Ubuntu 24.04 VPS instance.
- Connect to the server via SSH as root.

## 2. Prepare for Sentinel

Ubuntu 24.04 comes with UFW firewall by default, which must be removed before installing Sentinel.

```bash
apt remove ufw
```

Install the dependenciesČ

```bash
apt install perl zip unzip libwww-perl liblwp-protocol-https-perl
```

Sendmail is required to send alerts to the administrator:

```bash
apt install sendmail-bin
```

## 3. Install Sentinel

1. Change to `/usr/src`
   ```bash
   cd /usr/src
   ```
2. Download latest Sentinel from github:
   ```bash
   wget https://github.com/sentinelfirewall/sentinel/raw/refs/heads/main/csf.tgz
   ```
3. Extract CSF:
   ```bash
   tar -xzf csf.tgz
   ```
4. Change to `/usr/src/csf`
   ```bash
   cd csf
   ```
5. Run the install script:
   ```bash
   sh install.sh
   ```
6. Verify the required iptables modules for CSF are available:
   ```bash
   perl /usr/local/csf/bin/csftest.pl
   ```
   Confirm that all tests report OK, and you see the following result.
   > RESULT: csf should function on this server
7. Verify CSF status after installation.
   ```bash
   csf -v
   ```
   You should see a result similar to:
   > csf: v14.02 (generic)
   > *WARNING* TESTING mode is enabled - do not forget to disable it in the configuration


## 4. Configure Firewall

1. CSF runs in *TESTING* mode by default. Edit `/etc/csf/csf.conf` to disable the *TESTING* mode:
  ```bash
  nano /etc/csf/csf.conf
  ```
  Locate the line `TESTING = "1"`, and change the value to "`0`".
  ```bash
  TESTING = "0"
  ```
2. Locate the line `RESTRICT_SYSLOG = "0"`, and change the value to "`3`". This means only members of the `RESTRICT_SYSLOG_GROUP` may access syslog/rsyslog files. [More information](/docs/usage/syslog-rsyslog-issues/)
  ```bash
  RESTRICT_SYSLOG = "3"
  ```
  Save the configuration file.
3. Stop and reload CSF with the -ra option.
  ```bash
  csf -ra
  ```

## 4. Common Commands & Configuration

### Start CSF
```bash
csf -s 
```

### Stop CSF
```bash
csf -f 
```

### Restart CSF
You must restart CSF each time the configuration file changes.

```bash
csf -ra 
```

### Allow IP traffic by port

Edit `/etc/csf/csf.conf`

```bash
nano /etc/csf/csf.conf
```
Locate the following lines and add the required ports:
```
# Allow incoming TCP ports
TCP_IN = 20,21,22,25,26,53,80,110,143,443,465,587,993,995,2077”

# Allow outgoing TCP ports
TCP_OUT = 20,21,22,25,26,37,43,53,80,110,113,443,465,873,2087”
```
Restart CSF for the changes to take effect.
```bash
csf -ra
```

### Allow or deny by IP address

Use the `-d` option to deny by IP, for example, 192.0.2.123.

```bash
csf -d 192.0.2.123
```

Use the `-a` option to allow by IP, for example, 192.0.2.123.

```bash
csf -a 192.0.2.123
```

Remove IP from the allow list.

```bash
csf -ar 192.0.2.123
```

Remove IP from the deny list.

```bash
csf -dr 192.0.2.123
```

### Deny file

Block IPs by adding a entry to `/etc/csf/csf.deny`:
```
192.0.2.123     # deny this IP
192.0.2.0/24    # deny this network 
```

### Allow file
Add trusted IPs to `/etc/csf/csf.allow`:
```
192.0.2.123     # trust this IP
```
### Check all listening ports with the `-p` option:

```bash
csf -p
```

### More Information
For more information about VPS security, see [the Documentation](/docs/usage/introduction/).
