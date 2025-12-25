#!/usr/bin/env bash
set -o errexit
set -o pipefail
set -o nounset

npm install
npm run build
npx prisma generate