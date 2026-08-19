# 🚀 Hosting QR Code Generator Locally on an Always-On Windows Machine

This guide walks you through setting up **PM2** and **`serve`** to keep the app running 24/7 on your local network (LAN) and automatically restart whenever the target Windows PC boots up or restarts.

---

## 🛠️ Step 1: Install Node.js & Dependencies on the Server PC

1. **Download & Install Node.js** (LTS Version) on the target Windows machine:
   👉 [https://nodejs.org/](https://nodejs.org/)

2. **Open Command Prompt (as Administrator)** or PowerShell, and install `serve`, `pm2`, and `pm2-windows-startup` globally:
   ```cmd
   npm install -g serve pm2 pm2-windows-startup
   ```

---

## 📦 Step 2: Copy Project & Build Production Files

1. Copy/Clone this repository onto the target Windows system (e.g. `C:\Apps\QR-generator`).
2. Open a terminal inside the project directory and run:
   ```cmd
   npm install
   cd QR-Code-Generator && npm install && cd ..
   npm run build
   ```

---

## ⚡ Step 3: Start the App using PM2

Start the application in background mode using the included `ecosystem.config.cjs`:

```cmd
pm2 start ecosystem.config.cjs
```

You can verify that it is running by checking PM2 status:
```cmd
pm2 status
```

---

## 🔄 Step 4: Configure Auto-Start on Windows Boot

To make sure the application stays active **24/7** and starts automatically when Windows turns on or reboots:

1. Run the PM2 Windows Startup installer:
   ```cmd
   pm2-startup install
   ```
2. Save the current active PM2 process list:
   ```cmd
   pm2 save
   ```

Now PM2 will automatically spin up `qr-label-generator` on Windows boot in the background without needing a user to log in manually!

---

## 🌐 Step 5: Allow Port 3000 in Windows Firewall

To allow other devices (PCs, phones, tablets) on your local network to access the web app:

### Quick PowerShell Method (Run as Administrator):
```powershell
New-NetFirewallRule -DisplayName "QR Generator App (Port 3000)" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow
```

### Manual GUI Method:
1. Open **Windows Defender Firewall** -> **Advanced Settings**.
2. Click **Inbound Rules** -> **New Rule**.
3. Choose **Port** -> **TCP** -> Specific local port: `3000`.
4. Select **Allow the connection**.
5. Give it a name like `QR Generator (Port 3000)` and click **Finish**.

---

## 📲 Step 6: Accessing the App from Any Device

### Find your Server PC's IP Address:
1. On the target PC, open Command Prompt and run:
   ```cmd
   ipconfig
   ```
2. Look for **IPv4 Address** (e.g., `192.168.1.50`).

### Open the App in any Browser:
From any device connected to the same Wi-Fi / LAN, visit:
```text
http://192.168.1.50:3000
```
*(Replace `192.168.1.50` with your target server's IPv4 address)*

---

## 🛠️ Useful PM2 Commands

- **Check App Status**: `pm2 status`
- **View Live Logs**: `pm2 logs qr-label-generator`
- **Restart App**: `pm2 restart qr-label-generator`
- **Stop App**: `pm2 stop qr-label-generator`
