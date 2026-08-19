module.exports = {
  apps: [
    {
      name: "qr-label-generator",
      script: "npx",
      args: "serve -s QR-Code-Generator/dist -l 3000 --host 0.0.0.0",
      cwd: "./",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
