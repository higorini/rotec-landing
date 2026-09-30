#!/usr/bin/env bash
set -euo pipefail

SHA="${1:?usage: deploy.sh <commit-sha>}"
APP_NAME="${APP_NAME:-frontend}"
BASE_DIR="${BASE_DIR:-/var/www/rotec}"
REPO_URL="${REPO_URL:-git@github.com:higorini/rotec-landing.git}"
PORT="${PORT:-3000}"
HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:${PORT}/}"
KEEP_RELEASES="${KEEP_RELEASES:-3}"

RELEASES_DIR="$BASE_DIR/releases"
CURRENT_LINK="$BASE_DIR/current"
REPO_CACHE="$BASE_DIR/repo.git"
TARGET="$RELEASES_DIR/$(date +%Y%m%d%H%M%S)-${SHA:0:7}"

log() {
  echo "[deploy] $*"
}

switch_to() {
  ln -sfn "$1" "$CURRENT_LINK.tmp"
  mv -Tf "$CURRENT_LINK.tmp" "$CURRENT_LINK"
  pm2 delete "$APP_NAME" </dev/null >/dev/null 2>&1 || true
  pm2 start npm --name "$APP_NAME" --cwd "$CURRENT_LINK" -- start -- -p "$PORT" </dev/null >/dev/null 2>&1
  pm2 save </dev/null >/dev/null 2>&1
}

healthy() {
  for _ in $(seq 1 30); do
    if [ "$(curl -s -o /dev/null -w '%{http_code}' "$HEALTH_URL")" = "200" ]; then
      return 0
    fi
    sleep 2
  done
  return 1
}

mkdir -p "$RELEASES_DIR"

if [ ! -d "$REPO_CACHE" ]; then
  log "cloning $REPO_URL"
  git clone --mirror --quiet "$REPO_URL" "$REPO_CACHE"
fi

log "fetching"
git -C "$REPO_CACHE" remote update --prune >/dev/null

PREVIOUS="$(readlink -f "$CURRENT_LINK" 2>/dev/null || true)"

log "preparing release $(basename "$TARGET")"
trap 'rm -rf "$TARGET"' ERR
mkdir -p "$TARGET"
git -C "$REPO_CACHE" archive "$SHA" | tar -x -C "$TARGET"

cd "$TARGET"
log "installing dependencies"
npm ci --no-audit --no-fund
log "building"
npm run build

log "switching to $(basename "$TARGET")"
trap - ERR
switch_to "$TARGET"

if ! healthy; then
  log "health check failed on $HEALTH_URL"
  if [ -n "$PREVIOUS" ] && [ -d "$PREVIOUS" ] && [ "$PREVIOUS" != "$TARGET" ]; then
    log "rolling back to $(basename "$PREVIOUS")"
    switch_to "$PREVIOUS"
    rm -rf "$TARGET"
    healthy && log "rollback ok" || log "rollback health check failed"
  fi
  exit 1
fi

log "cleaning old releases"
ls -1dt "$RELEASES_DIR"/*/ | tail -n +"$((KEEP_RELEASES + 1))" | while read -r dir; do
  if [ "$(readlink -f "$dir")" != "$(readlink -f "$CURRENT_LINK")" ]; then
    rm -rf "$dir"
  fi
done

log "done: $SHA"
