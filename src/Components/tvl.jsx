import React, { useEffect, useState } from "react";
import "./tvl.css";
const axios = require("axios").default;

export default function TVL() {
  const [TVLData, setTVLData] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://api.llama.fi/protocols",
    }).then((data) => {
      setTVLData(
        data.data.map((protocol) => (
          <div className="tvl-item" key={protocol.id}>
            <div className="tvl1">{protocol.name}</div>
            <div className="tvl2"></div>
            <div className="tvl3">${Math.round(protocol.tvl)}</div>
            <div className="tvl4">
              %
              {!protocol.change_1d
                ? " --"
                : Math.abs(Math.round(protocol.change_1d + "e+2") + "e-2")}
            </div>
            <div className="tvl5"></div>
            <a
              className="pool6"
              href={protocol.url}
              target="_blank"
              rel="noreferrer"
            >
              Tx
            </a>
          </div>
        ))
      );
    });
  }, []);

  return (
    <div className="tvl-parent">
      <div className="title">
        <span>DeFi Protocol Total Value Locked</span>
      </div>
      <div className="tvl-item-header">
        <div className="tvl1">Procotol</div>
        <div className="tvl2"></div>
        <div className="tvl3">TVL</div>
        <div className="tvl4">Daily % Cx</div>
        <div className="tvl5"></div>
        <div className="tvl6">Escan</div>
      </div>
      <div className="tvl-data">{TVLData}</div>
    </div>
  );
}
