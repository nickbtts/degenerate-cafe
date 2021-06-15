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
      console.log("TVLDATA", data);
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

          // <div className="tvl-item" key={protocol.address}>
          //   <span className="tvl-title">{protocol.name}</span>
          //   <span className="tvl-title">${Math.round(protocol.tvl)}</span>
          //   <span className="tvl-title">%{protocol.change_1d}</span>
          //   <span className="tvl-link">
          //     <a href={protocol.url} target="_blank" rel="noreferrer">
          //       Link
          //     </a>
          //   </span>
          // </div>
        ))
      );
    });
  }, []);

  return (
    <div className="tvl-parent">
      <div className="title">
        <span>Fresh Uniswap Listings</span>
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
