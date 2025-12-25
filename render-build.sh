#!/usr/bin/env bash
set -o errexit
set -o pipefail
set -o nounset

npm install
npm run build
npx prisma generate
# npx prisma migrate deploy # Keeping disabled for SQLite/Safe Mode. Enable if using Postgres.
