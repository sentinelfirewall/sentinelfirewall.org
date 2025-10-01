---
title: "Searching for Spammers"
authors: [stefanpejcic]
slug: searching-for-spammers-on-cpanel-whm
date: "2025-10-01"
description: "HOw to detect incoming or outgoing SPAM on cPanel/WHM servers."
---

As a server administrator, dealing with spam is a constant challenge. There are two main types of spam you’ll encounter:

1. **Inbound spam** (to your users)  
2. **Outbound spam** (from compromised scripts or accounts)  

Each requires very different approaches to detect, remove, and resolve effectively.

---

## Inbound Spam

Inbound spam is a plague of the modern internet. Beyond inconveniencing users, it can cause **serious performance and resource issues** on the server, affecting both system stability and clean mail delivery.

The most effective strategy is to block spam **before it enters the server** — at the **MTA (Mail Transfer Agent)** level, such as **Exim** (the SMTP server commonly used with cPanel).

### Dictionary Attacks

The most common inbound spam technique is the **dictionary attack**, where spammers try random addresses on your domain hoping one exists:

```

[bob@yourdomain.com](mailto:bob@yourdomain.com)
[fred@yourdomain.com](mailto:fred@yourdomain.com)
[harry@yourdomain.com](mailto:harry@yourdomain.com)

````

Because most email addresses are not publicly listed, spammers take this brute-force approach.

**Prevention tip:**  
Disable the **Default Address (catchall)** in cPanel and set it to `:fail:`. Then, create only the specific forwarders or aliases you actually use.

- `:fail:` rejects email at the SMTP **RCPT stage**, stopping dictionary attacks early.  
- Avoid `:blackhole:` — it consumes server resources unnecessarily.  

### Useful WHM Settings

In WHM, enable:

- **Exim Configuration Editor → Verify the existence of email senders**  
- **Exim Configuration Editor → Use callouts to verify the existence of email senders**

These checks ensure the sender’s server can actually accept replies, helping block non-compliant spammers.

### Using RBLs and ACLs

You can add ACLs in Exim to block bad IPs using RBL (Realtime Blackhole List) checks:

```bash
deny message = Message rejected - $sender_fullhost is in an RBL, see $dnslist_text
    !hosts = +relay_hosts
    !authenticated = *
    dnslists = bl.spamcop.net : sbl-xbl.spamhaus.org
````

You can also check compliance in **HELO/EHLO commands**:

```bash
deny message = HELO/EHLO set to my IP address
    condition = ${if match {$sender_helo_name}{11.22.33.44} {yes}{no}}

deny message = EHLO/HELO does not contain a dotted address
    condition = ${if match{$sender_helo_name}{\\.}{no}{yes}}
```

### Spam Filtering Tools

Even after SMTP checks, some spam may pass through. At this point, you can implement filtering tools:

* **SpamAssassin** (built into cPanel)
* **MailScanner** (more thorough, but requires 3rd party installation and is unsupported by cPanel)

---

## Outbound Spam

Outbound spam is a bigger problem — it can damage your server’s **IP reputation**. It usually comes from:

1. **Compromised scripts** in a client’s account
2. **Clients themselves**, either intentionally or via infected machines

### Tracking Spam with Exim Logs

Start with the **Exim mainlog**:

* Linux: `/var/log/exim_mainlog`
* FreeBSD: `/var/log/exim/mainlog`

Enable extended logging for better tracking:

WHM → Exim Configuration Manager → Advanced Editor → `log_selector`
Add:

```
+arguments +subject +received_recipients
```

This logs execution paths and email subjects, making it easier to trace spam.

### Finding Spam by Message ID

From a spam email header, extract the **Exim message ID** from the `Received:` line:

```
Received: from forums by barfoo.com with local (Exim 4.43)
    id 1FZ8zt-0005lz-E7
    for fred@foobar.com; Thu, 27 Apr 2006 12:05:41 -0400
```

Message ID: `1FZ8zt-0005lz-E7`

Search logs with:

```bash
grep 1FZ8zt-0005lz-E7 /var/log/exim_mainlog
```

#### Example: Compromised Script

```
2006-04-27 17:43:41 1FZ8zt-0005lz-E7 <= bob@barfoo.com U=nobody P=local S=4001 T="Buy Me!"
2006-04-27 17:43:50 cwd=/home/ClientX/public_html/phpBB/ 5 args: /usr/sbin/exim -Mc 1FZ8zt-0005lz-E7
```

* Sent by user `nobody` (typical for Apache/PHP scripts).
* Path shows it originated from `/home/ClientX/public_html/phpBB/`.

#### Example: Client Sending Spam

```
2006-04-27 17:54:51 1FZ9lT-000707-O2 <= bob@barfoo.com H=someisp.com ([192.168.254.2]) [11.22.33.44] P=esmtpa A=fixed_plain:bob@barfoo.com S=715 id=ABCDEFG T="Buy Me!"
```

* `A=fixed_plain:bob@barfoo.com` → The client authenticated with SMTP AUTH.
* This means the spam originated from the client’s PC (possibly malware).

### Further Investigation

Sometimes, tracking spam requires checking **Apache logs** in:

```
/usr/local/apache/domlogs/*
```

This can help identify compromised web apps or scripts being abused.

---


The best defense is proactive security — keep software updated, monitor logs, and know what’s running on your server.
