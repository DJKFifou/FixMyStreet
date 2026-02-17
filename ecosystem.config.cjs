module.exports = {
  apps: [
    {
      name: "FixMyStreet",
      script: "node_modules/.bin/next",
      args: "start",
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
