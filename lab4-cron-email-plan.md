# Plan: Lab 4 Cron + Email Notification Addition

Add a "Automating Backups with Cron" section to Lab 4 (`src/content/docs/labs/image-registry-and-version-switching.mdx`).

Insert it between "Restoring from Backup" and "Clean Up". The existing Q7 (TA initials) becomes Q9.

---

## New section heading and intro

```mdx
### Automating Backups with Cron

Running a backup by hand is better than nothing, but it relies on someone remembering to do it. The standard Unix answer is `cron`, the system job scheduler built into every Linux distribution. Cron runs commands on a schedule you define; when a job produces output, `cron` mails it to the local system user automatically. In this section you will install a local mail delivery agent, write a backup script that sends its own notification, and schedule it to run nightly.
```

---

## Step 1: Install local mail delivery

```mdx
<Steps>

1. **Install postfix and mailutils**

   ```bash
   sudo DEBIAN_FRONTEND=noninteractive apt-get install -y postfix mailutils
   sudo postconf -e "myhostname = $(hostname)" "mydestination = localhost"
   sudo systemctl restart postfix
   ```

   `DEBIAN_FRONTEND=noninteractive` accepts postfix's default configuration without prompting. The `postconf` line pins the mail destination to localhost so postfix delivers only to local Unix mailboxes — no SMTP relay, no external server, no credentials required. Mail addressed to `ubuntu` lands in `/var/mail/ubuntu`.

2. **Test local delivery**

   ```bash
   echo "Mail system is working" | mail -s "Test" ubuntu
   mail
   ```

   Press **Enter** to read the first message, **q** to quit. You should see one message confirming delivery. If the mailbox is empty, wait 10 seconds and run `mail` again; postfix starts quickly but not instantly.

</Steps>
```

---

## Step 2: Write the backup script

```mdx
<Steps>

1. **Create the script**

   ```bash
   sudo vim /usr/local/bin/db-backup.sh
   ```

   ```bash
   #!/bin/bash
   set -euo pipefail

   BUCKET="cs312-<your-username>-backups"
   TIMESTAMP=$(date +%Y%m%d-%H%M%S)
   BACKUP_FILE="/tmp/backup-${TIMESTAMP}.sql"
   ERROR_LOG="/tmp/backup-${TIMESTAMP}.err"
   COMPOSE_DIR="/home/ubuntu/ecr-lab"

   cd "${COMPOSE_DIR}"

   if docker exec "$(docker compose ps -q db)" \
       mariadb-dump -u root \
       -p"$(grep MYSQL_ROOT_PASSWORD .env | cut -d= -f2)" \
       wordpress > "${BACKUP_FILE}" 2>"${ERROR_LOG}"; then

       SIZE=$(wc -c < "${BACKUP_FILE}")
       aws s3 cp "${BACKUP_FILE}" "s3://${BUCKET}/backups/backup-${TIMESTAMP}.sql"
       printf "Backup succeeded.\nTimestamp: %s\nSize: %s bytes\nLocation: s3://%s/backups/backup-%s.sql\n" \
           "${TIMESTAMP}" "${SIZE}" "${BUCKET}" "${TIMESTAMP}" \
           | mail -s "[CS312 Backup] SUCCESS ${TIMESTAMP}" ubuntu
   else
       mail -s "[CS312 Backup] FAILED ${TIMESTAMP}" ubuntu < "${ERROR_LOG}"
   fi

   rm -f "${BACKUP_FILE}" "${ERROR_LOG}"
   ```

   A few things worth noting:
   - `set -euo pipefail` makes the script exit immediately on any error (`-e`), treat unset variables as errors (`-u`), and propagate failures through pipes (`-o pipefail`). These three flags together prevent a half-completed backup from silently succeeding.
   - The timestamped filename gives each backup a unique S3 key so nothing is overwritten.
   - The `if docker exec ...` structure captures the exit code of `mariadb-dump`. On failure, the actual error text from stderr goes into the notification email rather than being silently discarded.
   - Temp files are removed whether the backup succeeded or failed.

2. **Make it executable and test**

   ```bash
   sudo chmod +x /usr/local/bin/db-backup.sh
   /usr/local/bin/db-backup.sh
   ```

   Then check your mail:

   ```bash
   mail
   ```

   You should see a success notification with the S3 path and file size. Verify the file also arrived in S3:

   ```bash
   aws s3 ls s3://cs312-<your-username>-backups/backups/
   ```

   You should see two entries: the original `backup.sql` from earlier and the new timestamped backup.

</Steps>
```

---

## Step 3: Schedule with cron

```mdx
<Steps>

1. **Add the cron job**

   ```bash
   crontab -e
   ```

   Add this line at the bottom of the file:

   ```
   0 2 * * * /usr/local/bin/db-backup.sh
   ```

   Save and exit. The cron expression has five fields: `minute hour day-of-month month day-of-week`. This entry means: at minute 0, hour 2, every day of the month, every month, every day of the week — in other words, 2:00 AM nightly.

2. **Verify the entry**

   ```bash
   crontab -l
   ```

   <Aside type="note">
   The cron daemon itself also mails any stdout or stderr a job produces to the local user. Because this script sends its own notification email and suppresses stdout, cron's automatic mail will be empty on a successful run. Empty output and no mail from cron is the Unix convention for "everything worked." You only hear from the job when something goes wrong.
   </Aside>

</Steps>
```

---

## New questions

Insert before the existing Q7 (TA initials). Renumber TA initials to Q9.

```mdx
7. Run `/usr/local/bin/db-backup.sh` manually. Paste the success email notification you received. What S3 path did the backup upload to, and what file size was reported? *(4 points)*
8. Show the output of `crontab -l`. What does the cron expression `0 2 * * *` mean, field by field? *(3 points)*
```

---

## Things to verify during testing

- [ ] `DEBIAN_FRONTEND=noninteractive` actually skips the postfix interactive prompt on a fresh Ubuntu 22.04 EC2 instance (it should, but worth confirming)
- [ ] The `mail` command is available after installing `mailutils` and delivers to `/var/mail/ubuntu`
- [ ] The `docker compose ps -q db` subshell works correctly when the working directory is set via `cd "${COMPOSE_DIR}"`
- [ ] AWS credentials are available to the script when run both manually and via cron (cron runs with a minimal environment; the `~/.aws/credentials` file should work since it's file-based, but confirm)
- [ ] The failure branch actually triggers and sends a useful error email (test by temporarily breaking the db password in the script)
- [ ] The S3 lifecycle rule from the earlier section still applies to the new timestamped backup filenames (it uses prefix `backups/` which matches)
- [ ] `wc -c` gives byte count correctly on the backup file
- [ ] The script handles the case where Docker Compose is not running (the `docker compose ps -q db` call will return empty, causing the `docker exec` to fail with a clear error message in the failure email)
