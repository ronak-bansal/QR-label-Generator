import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconQrcode } from '@tabler/icons-react';

import Label from "./Label";
import { generateQRString } from "./qrHelper";

const QRGenerator = () => {
  const [item, setItem] = useState("");
  const [lot, setLot] = useState("");
  const [qty, setQty] = useState("");

  const [qrValue, setQrValue] = useState("");
  const [orientation, setOrientation] = useState("landscape"); // "landscape" | "portrait"

  const handleGenerate = () => {
    if (!item.trim() || !lot.trim() || !qty.trim()) {
      toast.warning("Please enter Item, Lot and Qty");
      return;
    }
    const qrString = generateQRString(item, lot, qty);
    setQrValue(qrString);
    toast.success("QR Generated Successfully");
  };

  const handlePrint = (printOrientation = orientation) => {
    if (!qrValue) {
      toast.warning("Please generate QR code before printing");
      return;
    }

    const labelElement = document.getElementById("printable-label");
    if (!labelElement) return;

    const printFrame = document.createElement("iframe");
    printFrame.style.position = "fixed";
    printFrame.style.right = "0";
    printFrame.style.bottom = "0";
    printFrame.style.width = "0";
    printFrame.style.height = "0";
    printFrame.style.border = "none";
    document.body.appendChild(printFrame);

    const frameDoc = printFrame.contentWindow.document;
    frameDoc.open();
    frameDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Label</title>
          <style>
            @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
            
            @page {
              size: A4 ${printOrientation};
              margin: 0;
            }
            
            * {
              box-sizing: border-box !important;
              font-family: 'Times New Roman', Times, serif !important;
            }

            html, body {
              width: 100% !important;
              height: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              background: #ffffff !important;
              overflow: hidden !important;
              font-family: 'Times New Roman', Times, serif !important;
            }
            
            body {
              display: flex !important;
              justify-content: center !important;
              align-items: center !important;
              padding: 8mm !important;
            }
            
            #label-print-wrapper {
              width: 100% !important;
              height: 100% !important;
              display: flex !important;
            }

            .label-card {
              width: 100% !important;
              height: 100% !important;
              max-width: 100% !important;
              max-height: 100% !important;
              border: none !important;
              padding: 3rem !important;
              font-family: 'Times New Roman', Times, serif !important;
            }

            ${
              printOrientation === "portrait"
                ? `
            .label-card {
              flex-direction: column !important;
              justify-content: space-between !important;
              align-items: center !important;
            }
            .label-text-section {
              width: 100% !important;
              flex: 1 1 0% !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: space-around !important;
              padding-bottom: 2rem !important;
            }
            .label-text-item, .label-text-item span {
              font-size: clamp(2rem, 5.5vw, 3.4rem) !important;
              line-height: 1.25 !important;
              
              color: #000000 !important;
              white-space: nowrap !important;
              font-family: 'Times New Roman', Times, serif !important;
            }
            .label-qr-section {
              flex-shrink: 0 !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              width: 100% !important;
            }
            .label-qr-box {
              width: 440px !important;
              height: 440px !important;
              padding: 1rem !important;
              border: none !important;
            }
            .label-qr-box svg {
              width: 100% !important;
              height: 100% !important;
            }
            `
                : `
            .label-card {
              flex-direction: row !important;
              justify-content: space-between !important;
              align-items: center !important;
            }
            .label-text-section {
              flex: 1 1 0% !important;
              min-width: 0 !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: space-between !important;
              height: 100% !important;
              padding-right: 2.5rem !important;
            }
            .label-text-item, .label-text-item span {
              font-size: 3.8rem !important;
              line-height: 1.25 !important;
              
              white-space: nowrap !important;
              font-family: 'Times New Roman', Times, serif !important;
            }
            .label-qr-section {
              flex-shrink: 0 !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
            }
            .label-qr-box {
              width: 400px !important;
              height: 400px !important;
              padding: 1rem !important;
              border: none !important;
            }
            .label-qr-box svg {
              width: 100% !important;
              height: 100% !important;
            }
            `
            }
          </style>
        </head>
        <body>
          <div id="label-print-wrapper">
            ${labelElement.innerHTML}
          </div>
          <script>
            window.onload = function() {
              window.focus();
              window.print();
              setTimeout(function() {
                if (window.frameElement) {
                  window.frameElement.remove();
                }}, 1000);};
          </script>
        </body>
      </html>
    `);
    frameDoc.close();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 transition-colors duration-200">
      <ToastContainer position="top-center" autoClose={1000} theme="light" />

      <div className="max-w-6xl mx-auto px-4">
        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            QR Generator 
          </h1>

          <div className="grid md:grid-cols-3 gap-5">
            <input type="text" placeholder="Item" value={item}
              onChange={(e) => setItem(e.target.value)}
              className="border rounded-lg p-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"/>

            <input type="text" placeholder="Lot" value={lot}
              onChange={(e) => setLot(e.target.value)}
              className="border rounded-lg p-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"/>

            <input type="text" placeholder="Qty" value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="border rounded-lg p-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={handleGenerate}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm">
              Generate QR
            </button>

            <button onClick={() => {
                setItem("");
                setLot("");
                setQty("");
                setQrValue("");
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm">
              Reset
            </button>

            <button
              onClick={() => handlePrint("landscape")}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm">
              Print Landscape (A4)
            </button>

            <button
              onClick={() => handlePrint("portrait")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm">
              Print Portrait (A4)
            </button>
          </div>
        </div>

        {/* Label Preview */}
        {qrValue && (
          <div className="mt-10 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Label Preview (A4 Format)
              </h2>

              {/* Orientation Mode Switcher */}
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                <button
                  onClick={() => setOrientation("landscape")}
                  className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                    orientation === "landscape"
                      ? "bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900"
                  }`} >
                  Landscape
                </button>
                <button
                  onClick={() => setOrientation("portrait")}
                  className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                    orientation === "portrait"
                      ? "bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900"
                  }`}
                >
                  Portrait
                </button>
              </div>
            </div>

            <div id="printable-label" className="flex justify-center overflow-x-auto py-4">
              <Label item={item} lot={lot} qty={qty}
                qrValue={qrValue}
                orientation={orientation}/>
            </div>
          </div>
        )}

        {/* Encoded Text */}
        {qrValue && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="font-semibold mb-3 text-gray-900 dark:text-white">
              Encoded QR String
            </h2>
            <textarea value={qrValue} readOnly rows={5}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none font-mono"/>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRGenerator;
