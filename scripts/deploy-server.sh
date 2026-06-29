#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ ! -f .env ]]; then
  echo "Crie o arquivo .env com VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY antes do deploy."
  exit 1
fi

echo ">> Instalando dependências..."
npm ci

echo ">> Gerando build de produção..."
npm run build

echo ">> Reiniciando PM2..."
pm2 delete frontend 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save

echo ">> Frontend no ar:"
pm2 status frontend
