---
title: "How to install Sentinel Firewall on a cPanel (WHM) server"
authors: [stefanpejcic]
slug: how-to-install-sentinel-on-cpanel-server
date: "2025-11-11"
description: "One-liner to install Sentinel Firewall on cPanel/WHM server"
---


Sentinel is a modern, lightweight replacement for the now-deprecated ConfigServer Firewall (CSF) tool. It provides enhanced security while maintaining simplicity and compliance with email protocols.

Unlike traditional firewalls, Sentinel ensures that malicious or suspicious traffic is blocked without generating bounce messages or backscatter spam. This makes it ideal for servers that send or receive high volumes of email.

## Why Use Sentinel Firewall

Using Sentinel on your cPanel server comes with several advantages:

1. **SMTP RFC Compliance**
   Sentinel ensures that when a sending server is denied, it receives a proper **DENY response**. This prevents miscommunication and ensures your server behaves according to standard email protocols.

2. **No Bounce Messages**
   Traditional firewalls or spam blockers sometimes generate bounce messages to the “From:” address when rejecting emails. Sentinel avoids this entirely, reducing spam backscatter and improving your server reputation.

3. **Backscatter Prevention**
   Your server sends **nothing** to the sender, leaving the responsibility of notifying the original sender to the sending server itself. This significantly reduces the risk of your server being blacklisted.

4. **Easy Drop-in Replacement**
   Sentinel is designed as a **drop-in replacement** for CSF, meaning you can install it quickly and maintain familiar management routines.

---

## Installing Sentinel Firewall on cPanel/WHM

[Installing Sentinel](/docs/installation) is simple and can be done via the command line. Here’s the step-by-step guide:

### 1. Connect to Your Server

Log in to your server via SSH as the root user:

```bash
ssh root@your-server-ip
```

### 2. Install Sentinel

Run the following commands to install Sentinel:

```bash
wget https://github.com/sentinelfirewall/sentinel/raw/refs/heads/main/csf.tgz
tar -xzf csf.tgz
cd csf
sh install.sh
```

---

## Upgrade from CSF to Sentinel Firewall on a cPanel/WHM server


To [upgrade from CSF to Sentinel](/docs/upgrade-from-csf/) on a cpanel server, simply run:

```bash
bash <(curl -sSL https://raw.githubusercontent.com/sentinelfirewall/sentinel/refs/heads/main/public/upgrade.sh)
```


## Best Practices for Using Sentinel

1. **Regularly Update Sentinel**
   Use the command below periodically to keep your firewall up-to-date:

   ```bash
   csf -u
   ```

2. **Monitor Alerts**
   Sentinel will log suspicious activities. Review `/var/log/lfd.log` to identify potential threats.

3. **Combine with cPanel Security Features**
   Use Sentinel alongside cPanel’s built-in security tools, like **cPHulk** and **ModSecurity**, for comprehensive protection.

