import React from "react";
import "./trade-item.css";

export default function TradeItem(props) {
  const { data } = props;

  function resolveSource() {
    if (data.source === "univ2") {
      return "/uniswap-v2-pink.png";
    } else if (data.source === "sushi") {
      return "/sushiswap.png";
    } else if (data.source === "univ3") {
      return "/uniswap-v3.png";
    }
    return;
  }
  return (
    <div className="par-tradeitem">
      <div className="icon">
        <a
          href={`http://etherscan.io/tx/${data.transaction.id}`}
          target="_blank"
          rel="noreferrer"
        >
          <img className="univ2" src={resolveSource()} alt="source" />
        </a>
      </div>
      <div className="noin titem">{data.noIn}</div>
      <div className="swapnames">
        {data.tokIn} / {data.tokOut}
      </div>
      <div className="noout titem">{data.noOut}</div>
      <div className="totUSD titem"> ${data.totUSD}</div>
    </div>
  );
}
