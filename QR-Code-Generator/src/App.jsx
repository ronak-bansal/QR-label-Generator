import { useEffect, useState } from "react";
import QRGenerator from "./QRGenerator";
import { ALLOWED_IPS, ENABLE_IP_RESTRICTION } from "./companyConfig";

function App() {
  const [isAllowed, setIsAllowed] = useState(null);
  const [userIp, setUserIp] = useState("");

  useEffect(() => {
    // Local LAN (10.x.x.x, 192.168.x.x, localhost) is ALWAYS allowed
    const hostname = window.location.hostname;
    const isLocalNetwork =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.startsWith("192.168.") ||
      hostname.startsWith("10.") ||
      hostname.startsWith("172.");

    if (isLocalNetwork || !ENABLE_IP_RESTRICTION) {
      setIsAllowed(true);
      return;
    }

    // On GitHub Pages, fetch Public IP and match with ALLOWED_IPS
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        const clientIp = data.ip ? data.ip.trim() : "";
        setUserIp(clientIp);

        if (ALLOWED_IPS.includes(clientIp)) {
          setIsAllowed(true);
        } else {
          setIsAllowed(false);
        }
      })
      .catch(() => {
        setIsAllowed(false);
      });
  }, []);

  if (isAllowed === null) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 text-gray-700 font-sans">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto mb-3"></div>
          <p className="text-sm font-medium">Verifying Company Network Access...</p>
        </div>
      </div>
    );
  }

  if (!isAllowed) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white font-sans p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-8 text-center border border-gray-700">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m0 0v2m0-2h2m-2 0H10m8-7V7a6 6 0 00-12 0v4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-400 mb-2">Access Restricted</h2>
          <p className="text-gray-300 text-sm mb-6">
            This application is restricted to authorized <strong>Company Network</strong> access only.
          </p>
          {userIp && (
            <div className="bg-gray-900/60 p-3 rounded-lg border border-gray-700/50 text-xs text-gray-400 font-mono">
              Your Public IP: {userIp}
            </div>
          )}
        </div>
      </div>
    );
  }

  return <QRGenerator />;
}

export default App;
