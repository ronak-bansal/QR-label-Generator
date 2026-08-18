// src/companyConfig.js

export const ENABLE_IP_RESTRICTION = true;

// Helper to hash IP using browser's built-in Web Crypto API
export async function hashIP(ipString) {
  const msgBuffer = new TextEncoder().encode(ipString.trim());
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// SHA-256 Hash of "182.78.14.162" (Your actual IP is NOT in plain text!)
export const ALLOWED_IP_HASHES = [
  "b295d9841adffea2d9f1c79e67d264f33190862024b8991b5d137ca254c25fdf"
];
