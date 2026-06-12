#!/usr/bin/env bash
set -e

# Resolve this script's directory and the repository root so the script can be
# invoked from anywhere in the filesystem and still find the node helpers and
# output files reliably.
# Works on macOS and Linux because the script runs under bash (shebang above).
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" >/dev/null 2>&1 && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." >/dev/null 2>&1 && pwd)"

# Output directories (absolute)
PDF_DIR="$REPO_ROOT/pdf"
TMP_DIR="$PDF_DIR/temp"

# Ensure output directories exist
mkdir -p "$TMP_DIR" "$PDF_DIR"

# Base URL for pages
BASE="https://cs312.alexulbrich.com"

# Lecture topics
lectures=(
  "introduction"
  "hardware-fundamentals"
  "virtualization-basics"
  "linux-server-planning-and-configuration"
  "networking-fundamentals"
  "containerization-with-docker"
  "cloud-computing"
  "infrastructure-as-code"
  "shell-scripting-and-automation-basics"
  "configuration-management"
  "ci-cd"
  "container-orchestration"
  "network-services-and-application-delivery"
  "monitoring-and-performance"
  "log-management-and-analysis"
  "incident-response-and-postmortems"
  "reliability-engineering"
  "on-premises-infrastructure"
  "system-security-and-hardening"
  "windows-server-administration"
)

# Activities
activities=(
  "introduction"
  "hardware-build-spec"
  "vm-setup"
  "arch-linux-install"
  "network-detective"
  "docker-image-exploration"
  "aws-console-tour"
  "terraform-configuration"
  "scripting"
  "ansible-configuration"
  "github-actions-workflow"
  "minikube"
  "network-services-exploration"
  "prometheus-and-grafana"
  "follow-the-logs"
  "incident-response-case-study"
  "sre-practice"
  "rack-build-spec"
  "security-audit"
  "windows-server-active-directory"
)

# Labs
labs=(
  "introduction"
  "the-bare-metal"
  "cloud-environment-setup"
  "manual-web-server-deployment"
  "containerizing-a-web-application"
  "image-registry-and-version-switching"
  "first-infrastructure-stack"
  "automated-configuration-and-deployment"
  "first-container-orchestration-deployment"
  "cluster-operations"
  "observability-workshop"
)

# Assignments
assignments=(
  "introduction"
  "minecraft-1-manual-server"
  "minecraft-2-containerized-server"
  "minecraft-3-infrastructure-automation"
  "minecraft-4-container-orchestration"
  "minecraft-5-observability"
)

# Practicalities
practicalities=(
  "aws-academy"
  "gen-ai"
  "terminal-and-shell"
  "text-editors"
  "windows-users"
  "yaml"
)

echo "Generating individual PDFs with Node.js..."

for topic in "${lectures[@]}"; do
  node "$SCRIPT_DIR/print-clean.js" "$BASE/lectures/$topic" "$TMP_DIR/lecture-notes-$topic.pdf"
  node "$SCRIPT_DIR/print.js" "$BASE/lectures/$topic" "$PDF_DIR/lecture-notes-$topic.pdf"
done

for topic in "${activities[@]}"; do
  node "$SCRIPT_DIR/print-clean.js" "$BASE/activities/$topic" "$TMP_DIR/activity-$topic.pdf"
  node "$SCRIPT_DIR/print.js" "$BASE/activities/$topic" "$PDF_DIR/activity-$topic.pdf"
done

for topic in "${labs[@]}"; do
  node "$SCRIPT_DIR/print-clean.js" "$BASE/labs/$topic" "$TMP_DIR/lab-$topic.pdf"
  node "$SCRIPT_DIR/print.js" "$BASE/labs/$topic" "$PDF_DIR/lab-$topic.pdf"
done

for topic in "${assignments[@]}"; do
  node "$SCRIPT_DIR/print-clean.js" "$BASE/assignments/$topic" "$TMP_DIR/assignment-$topic.pdf"
  node "$SCRIPT_DIR/print.js" "$BASE/assignments/$topic" "$PDF_DIR/assignment-$topic.pdf"
done

for topic in "${practicalities[@]}"; do
  node "$SCRIPT_DIR/print-clean.js" "$BASE/practicalities/$topic" "$TMP_DIR/practicalities-$topic.pdf"
  node "$SCRIPT_DIR/print.js" "$BASE/practicalities/$topic" "$PDF_DIR/practicalities-$topic.pdf"
done

echo "Combining PDFs with Node.js..."

# Helper to join array elements with a separator
join_by() { local IFS="$1"; shift; echo "$*"; }

LECTURES_CSV=$(join_by , "${lectures[@]}")
ACTIVITIES_CSV=$(join_by , "${activities[@]}")
LABS_CSV=$(join_by , "${labs[@]}")
ASSIGNMENTS_CSV=$(join_by , "${assignments[@]}")
PRACTICALITIES_CSV=$(join_by , "${practicalities[@]}")

node "$SCRIPT_DIR/combine.js" \
  --lectures="$LECTURES_CSV" \
  --activities="$ACTIVITIES_CSV" \
  --labs="$LABS_CSV" \
  --assignments="$ASSIGNMENTS_CSV" \
  --practicalities="$PRACTICALITIES_CSV"

echo "PDF generation complete!"
