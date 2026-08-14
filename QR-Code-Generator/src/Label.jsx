import QRCode from "react-qr-code";

const Label = ({ item, lot, qty, qrValue, orientation = "landscape" }) => {
  const isPortrait = orientation === "portrait";

  return (
    <div
      className={`label-card bg-white !text-black flex transition-all duration-300 p-6 md:p-10 ${
        isPortrait
          ? "flex-col justify-between items-center w-full max-w-[650px] min-h-[850px] aspect-[1/1.414]"
          : "flex-row justify-between items-center w-full max-w-[1050px] min-h-[520px] aspect-[1.414/1]"
      }`}
      style={{ color: "#000000", backgroundColor: "#ffffff", fontFamily: "'Times New Roman', Times, serif" }}
    >
      {/* Text Section */}
      <div
        className={`label-text-section flex flex-col min-w-0 !text-black ${
          isPortrait ? "w-full flex-1 justify-around pb-6" : "h-full flex-1 justify-between pr-8"
        }`}
        style={{ color: "#000000", fontFamily: "'Times New Roman', Times, serif" }}
      >
        <div className={isPortrait ? "space-y-6" : "space-y-8"}>
          <h2
            className={`label-text-item  !text-black leading-tight whitespace-nowrap ${
              isPortrait
                ? "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            }`}
            style={{ color: "#000000", fontFamily: "'Times New Roman', Times, serif" }}>
            <span className="!text-black " style={{ color: "#000000", fontFamily: "'Times New Roman', Times, serif" }}>Item #: </span>
            <span className="!text-black " style={{ color: "#000000", fontFamily: "'Times New Roman', Times, serif" }}>{item || "---"}</span>
          </h2>

          <h2
            className={`label-text-item  !text-black leading-tight whitespace-nowrap  ${
              isPortrait
                ? "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            }`}
            style={{ color: "#000000", fontFamily: "'Times New Roman', Times, serif" }}>
            <span className="!text-black " style={{ color: "#000000", fontFamily: "'Times New Roman', Times, serif" }}>Lot #: </span>
            <span className="!text-black " style={{ color: "#000000", fontFamily: "'Times New Roman', Times, serif" }}>{lot || "---"}</span>
          </h2>
            <br/>
            <br/>
            <br/>
            <br/>


        <h2
          className={`label-text-item  !text-black leading-tight whitespace-nowrap ${
            isPortrait
              ? "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
              : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          }`}
          style={{ color: "#000000", fontFamily: "'Times New Roman', Times, serif" }}>
          <span className="!text-black " style={{ color: "#000000", fontFamily: "'Times New Roman', Times, serif" }}>Qty: </span>
          <span className="!text-black " style={{ color: "#000000", fontFamily: "'Times New Roman', Times, serif" }}>{qty || "---"}</span>
        </h2>
        </div>
      </div>

      {/* QR Code Section */}
      <div
        className={`label-qr-section flex items-center justify-center shrink-0 ${
          isPortrait ? "w-full pt-4" : ""
        }`}
      >
        <div className="label-qr-box p-4 bg-white flex items-center justify-center">
          {qrValue ? (
            <QRCode
              value={qrValue}
              size={isPortrait ? 280 : 300}
              bgColor="#FFFFFF"
              fgColor="#000000"
              level="L"
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}/>
          ) : (
            <div
              className="w-[280px] h-[280px] flex items-center justify-center !text-gray-400 text-xl font-bold"
              style={{ color: "#9ca3af", fontFamily: "'Times New Roman', Times, serif" }}>
              QR Preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Label;




