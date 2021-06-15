import React, { useState, useEffect, useContext } from "react";
import { ParaSwap } from "paraswap";
import "./tradebar.css";
import GasPrice from "./gasprice";
import Connection from "./connection";
import SelectSearch from "react-select-search";
import InTokenContext from "../Contexts/in-token-context";
import OutTokenContext from "../Contexts/out-token-context";

export default function TradeBar(props) {
  const { inToken, setInToken } = useContext(InTokenContext);
  const { outToken, setOutToken } = useContext(OutTokenContext);
  const [amountIn, setAmountIn] = useState(1);
  const [amountOut, setAmountOut] = useState();
  const paraSwap = new ParaSwap();
  const srcToken = inToken.address; // WETH
  const destToken = outToken.address; // DAI
  const srcAmount = (amountIn * 1e18).toString(); //The source amount multiplied by its decimals: 10 **
  const priceRoute = paraSwap.getRate(srcToken, destToken, srcAmount);
  priceRoute.then((data) => setAmountOut(data.destAmount));

  function handleOutChange(e, moreData) {
    setOutToken({ value: moreData.name, name: e, address: moreData.address });
  }

  function handleInChange(e, moreData) {
    setInToken({ value: moreData.name, name: e, address: moreData.address });
  }
  function handleSubmit(event) {
    event.preventDefault();
    alert(`Submitting Name ${amountIn}`);
  }

  return (
    <div className="parent-tradebar">
      <div className="connection-box">
        <Connection></Connection>
      </div>
      <div className="menu">
        <div className="input-number">
          <form onSubmit={(event) => handleSubmit(event)}>
            <input
              className="number-in"
              value={amountIn}
              placeholder="0"
              type="number"
              onChange={(e) => setAmountIn(e.target.value)}
            ></input>
          </form>
        </div>
        <div className="input-token">
          <SelectSearch
            options={[]}
            value={inToken}
            onChange={(value, moreData) => handleInChange(value, moreData)}
            getOptions={(query) => {
              return new Promise((resolve, reject) => {
                paraSwap
                  .getTokens()
                  .then((data) => {
                    resolve(
                      data
                        .map(({ address, symbol }) => ({
                          value: symbol,
                          name: symbol,
                          address: address,
                        }))
                        .filter((ele) =>
                          ele.name.toLowerCase().includes(query.toLowerCase())
                        )
                    );
                  })
                  .catch(reject);
              });
            }}
            search
            placeholder="ERC"
          />
        </div>
        <div className="for-txt menu-text">for</div>
        <div className="output-token">
          <SelectSearch
            options={[]}
            value={outToken}
            onChange={(value, moreData) => handleOutChange(value, moreData)}
            getOptions={(query) => {
              return new Promise((resolve, reject) => {
                try {
                  paraSwap
                    .getTokens()
                    .then((data) => {
                      resolve(
                        data
                          .map(({ address, symbol }) => ({
                            value: symbol,
                            name: symbol,
                            address: address,
                          }))
                          .filter((ele) =>
                            ele.name.toLowerCase().includes(query.toLowerCase())
                          )
                      );
                    })
                    .catch(reject);
                } catch (e) {
                  console.log("error");
                }
              });
            }}
            search
            placeholder="ERC"
          />
        </div>
        <div className="output-number">{amountOut / 1e18}</div>
        <div className="swp-txt menu-text">Swap</div>
      </div>
      <div className="gp-tradebar">
        <GasPrice></GasPrice>
      </div>
    </div>
  );
}
