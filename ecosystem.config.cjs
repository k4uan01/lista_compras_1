/** @type {import('pm2').StartOptions} */
module.exports = {
  apps: [
    {
      name: 'frontend',
      cwd: __dirname,
      script: 'node_modules/vite/bin/vite.js',
      args: 'preview --host 0.0.0.0 --port 5173',
      interpreter: 'node',
      autorestart: true,
      max_restarts: 10,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
