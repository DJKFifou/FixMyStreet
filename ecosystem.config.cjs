module.exports = {
  apps: [
    {
      name: "FixMyStreet",
      script: "bash",
      args: "-c 'set -a && source /var/www/FixMyStreet/.env && set +a && node_modules/.bin/next start'",
      interpreter: "none",
      cwd: "/var/www/FixMyStreet",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 3006,
      },
    },
  ],
};
