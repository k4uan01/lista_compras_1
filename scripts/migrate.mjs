import fs from 'node:fs'
import path from 'node:path'
import pg from 'pg'

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {}

  return Object.fromEntries(
    fs
      .readFileSync(filePath, 'utf8')
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'))
      .map((line) => {
        const index = line.indexOf('=')
        return [line.slice(0, index), line.slice(index + 1)]
      }),
  )
}

const env = {
  ...loadEnvFile(path.join(process.cwd(), '.env')),
  ...process.env,
}

const dbUrl = env.DATABASE_URL

if (!dbUrl) {
  console.error(
    'Defina DATABASE_URL no .env, por exemplo:\n' +
      'DATABASE_URL=postgresql://postgres.your-tenant-id:SUA_SENHA@10.0.0.17:5432/postgres',
  )
  process.exit(1)
}

const sql = fs.readFileSync(
  path.join(process.cwd(), 'supabase/migrations/001_shopping_items.sql'),
  'utf8',
)

const client = new pg.Client({
  connectionString: dbUrl,
  ssl: false,
})

try {
  await client.connect()
  await client.query(sql)
  console.log('Migration aplicada com sucesso.')
} catch (error) {
  console.error('Falha na migration:', error instanceof Error ? error.message : error)
  process.exit(1)
} finally {
  await client.end()
}
