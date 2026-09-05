module.exports = {
  apps: [
    {
      name: "qr-label-generator",
      script: "server.js",
      cwd: "./",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};
