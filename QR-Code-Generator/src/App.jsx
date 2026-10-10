import { useEffect, useState } from "react";
import QRGenerator from "./QRGenerator";
import { ALLOWED_IPS, ENABLE_IP_RESTRICTION, ACCESS_PIN } from "./companyConfig";

function App() {
  const [isAllowed, setIsAllowed] = useState(null);
  const [userIp, setUserIp] = useState("");
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  useEffect(() => {
    // 1. Check if user already unlocked access using PIN in this session
    const isPinSaved = sessionStorage.getItem("pin_authorized") === "true";
    if (isPinSaved) {
      setIsAllowed(true);
      return;
    }

    const hostname = window.location.hostname;
    const isLocalNetwork =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.startsWith("192.168.") ||
      hostname.startsWith("10.") ||
      hostname.startsWith("172.");

    // if (isLocalNetwork || !ENABLE_IP_RESTRICTION) {
    //   setIsAllowed(true);
    //   return;
    // }

    // 2. Fetch public IP if outside local network
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        const clientIp = data.ip ? data.ip.trim() : "";
        setUserIp(clientIp);

        if (ALLOWED_IPS.includes(clientIp)) {
          setIsAllowed(true);
        } else {
          // IP not in allowed list -> Require PIN authentication
          setIsAllowed(false);
        }
      })
      .catch(() => {
        // Fetch failed -> Fallback to requiring PIN authentication
        setIsAllowed(false);
      });
  }, []);

  // Handle PIN Submission
  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === ACCESS_PIN) {
      sessionStorage.setItem("pin_authorized", "true");
      setIsAllowed(true);
      setPinError("");
    } else {
      setPinError("Invalid 4-digit PIN. Please try again.");
      setPinInput("");
    }
  };

  // Loading Screen
  if (isAllowed === null) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 text-gray-700 font-sans">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto mb-3"></div>
          <p className="text-sm font-medium">Verifying Access...</p>
        </div>
      </div>
    );
  }

  // 4-Digit PIN Unlock Screen (When IP is outside/restricted)
  if (!isAllowed) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white font-sans p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-8 text-center border border-gray-700">
          <div className="w-16 h-16 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
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
          <h2 className="text-2xl font-bold text-white mb-2">Outside Access Security</h2>
          <p className="text-gray-300 text-sm mb-6">
            Enter the 4-digit PIN to gain access to the QR Generator.
          </p>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <input
              type="password"
              maxLength={4}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ""))}
              placeholder="••••"
              className="w-40 text-center text-2xl tracking-[1em] py-2 px-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 font-mono mx-auto block"
              autoFocus
            />

            {pinError && (
              <p className="text-red-400 text-xs font-medium">{pinError}</p>
            )}

            <button
              type="submit"
              disabled={pinInput.length !== 4}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
            >
              Unlock Access
            </button>
          </form>

          {userIp && (
            <div className="mt-6 bg-gray-900/60 p-2.5 rounded-lg border border-gray-700/50 text-xs text-gray-400 font-mono">
              Your IP: {userIp}
            </div>
          )}
        </div>
      </div>
    );
  }

  return <QRGenerator />;
}

export default App;
