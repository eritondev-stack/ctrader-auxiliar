import React, { useState, useEffect } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import QRCode from "react-qr-code";
import Sidebar from "components/sidebar";


var socketGlobal: Socket = socketIOClient(process.env.ENDPOINT as string, {
  transports: ["websocket"],
});

function App() {
  const [qr, setQr] = useState("");

  useEffect(() => {
    socketGlobal.on("QR", (data) => {
      setQr(data);
    });
  }, []);

  return (
    <>
      <Sidebar>
        <div className="p-12">
          <QRCode value={qr} />
          <button
            className="my-4"
            onClick={() => {
              socketGlobal.emit("ww", "");
              setQr("");
            }}
          >
            Acessar whatsapp
          </button>
        </div>
        <div className="flex flex-row ml-5">

          <div></div>
        </div>
      </Sidebar>
    </>
  );
}

export default App;
