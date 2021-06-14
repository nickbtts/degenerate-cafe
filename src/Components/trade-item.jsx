import React, { useContext, useEffect } from "react";
import "./trade-item.css";
import InTokenContext from "../Contexts/in-token-context";
import OutTokenContext from "../Contexts/out-token-context";

export default function TradeItem(props) {
  const { data } = props;
  const { inToken, setInToken } = useContext(InTokenContext);
  const { outToken, setOutToken } = useContext(OutTokenContext);

  function handleClick(e) {
    setInToken({
      value: data.tokIn,
      name: data.tokIn,
    });
    setOutToken({
      value: data.tokOut,
      name: data.tokOut,
    });
  }

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
      <div onClick={handleClick} className="swapnames">
        {data.tokIn} / {data.tokOut}
      </div>
      <div className="noout titem">{data.noOut}</div>
      <div className="totUSD titem"> ${data.totUSD}</div>
    </div>
  );
}
