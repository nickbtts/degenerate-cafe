import React, { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import "./gasprice.css";

export default function GasPrice(props) {
  const [socketUrl, setSocketUrl] = useState(
    "wss://www.gasnow.org/ws/gasprice"
  );
  const { lastMessage, readyState } = useWebSocket(socketUrl);
  let gasdata, gasdataFa, gasdataSt, gasdataSL;
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  console.log("readyState", connectionStatus);

  function generateDivs() {
    console.log(JSON.parse(lastMessage.data).data);
    return (
      <>
        <div className="gas-title">Gas Prices</div>
        <div>
          Fast: {Math.round(JSON.parse(lastMessage.data).data.fast / 10e8)}
        </div>
        <div>
          Standard:{" "}
          {Math.round(JSON.parse(lastMessage.data).data.standard / 10e8)}
        </div>
        <div>
          Slow: {Math.round(JSON.parse(lastMessage.data).data.slow / 10e8)}
        </div>
      </>
    );
  }

  return (
    <div class="par-gas">{!lastMessage ? <p>loading</p> : generateDivs()} </div>
  );
}
