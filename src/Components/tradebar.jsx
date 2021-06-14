import React, { useState, useEffect } from "react";
import { ParaSwap } from "paraswap";
import "./tradebar.css";
import GasPrice from "./gasprice";
import Connection from "./connection";
import SelectSearch from "react-select-search";

export default function TradeBar(props) {
  const [tokenList, setTokenList] = useState([]);
  const paraSwap = new ParaSwap();
  useEffect(async () => {
    const tok = await paraSwap.getTokens().then((data) => {
      setTokenList(data);
    });
  }, []);

  const srcToken = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"; // ETH
  const destToken = "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359"; // DAI
  const srcAmount = "1000000000000000000"; //The source amount multiplied by its decimals: 10 ** 18 here

  const priceRoute = paraSwap.getRate(srcToken, destToken, srcAmount);
  priceRoute.then((data) => console.log("priceroute", data));

  return (
    <div className="parent-tradebar">
      <div className="connection-box">
        <Connection></Connection>
      </div>
      <div className="menu">
        {/* <SelectSearch
          options={[]}
          getOptions={(query) => {
            return new Promise((resolve, reject) => {
              paraSwap
                .getTokens()
                .then((data) => {
                  resolve(
                    data.map(({ address, symbol }) => ({
                      value: address,
                      name: symbol,
                    }))
                  );
                })
                .catch(reject);
            });
          }}
          search
          placeholder="ERC"
        /> */}
        <div className="input-token"></div>
        <div className="for-txt menu-text">for</div>
        <div className="output-token"></div>
        <div className="swp-txt menu-text">Swap</div>
      </div>
      <div className="gp-tradebar">
        <GasPrice></GasPrice>
      </div>
    </div>
  );
}
