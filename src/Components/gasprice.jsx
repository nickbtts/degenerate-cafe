import React, { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

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

  console.log("gp data", lastMessage);
  console.log("readyState", connectionStatus);

  return (
    <div>
      {!lastMessage ? (
        <p>loading</p>
      ) : (
        <p>{JSON.parse(lastMessage.data).data.fast / 10e8}</p>
      )}{" "}
    </div>
  );
}
