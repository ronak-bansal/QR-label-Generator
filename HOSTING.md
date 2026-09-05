# 🚀 Hosting QR Code Generator Locally on Target Windows PC

There are **two ways** to host this application:

---

## 🌟 Method 1: Zero-NPM / Standalone Mode (Recommended if NPM is Restricted)
No `npm install`, no `pm2`, and no internet connection needed on the target PC. [server.js](file:///d:/COMSYN/QR%20generator/server.js) uses pure built-in Node.js libraries.

### 📦 Files to copy to Target PC (Total Size < 1 MB):
```text
C:\QR-App\
├── dist\             (from QR-Code-Generator/dist)
├── server.js
├── start.bat
├── start_silent.vbs
└── stop.bat
```

### ⚡ Running the App:
- **Manual Launch**: Double-click `start.bat`.
- **Silent Background Launch**: Double-click `start_silent.vbs` (runs hidden with no window).
- **Auto-start on Windows Boot**: Press `Win + R`, type `shell:startup`, and place a shortcut to `start_silent.vbs` in that folder.
- **Stop Server**: Double-click `stop.bat`.

---

## 🛠️ Method 2: Using PM2 & Global Packages (Optional)

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
