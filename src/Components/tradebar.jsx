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
  const [tokenList, setTokenList] = useState([]);
  const [amountIn, setAmountIn] = useState(1);
  const [amountOut, setAmountOut] = useState();
  const paraSwap = new ParaSwap();

  useEffect(async () => {
    const tok = await paraSwap.getTokens().then((data) => {
      setTokenList(data);
    });
  }, []);

  useEffect(() => {
    console.log("INTOKEN", inToken);
  }, [inToken]);

  console.log("IN TOKEN OUTSIDE EFFECT", inToken);
  const srcToken = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"; // ETH
  const destToken = "0x6b175474e89094c44da98b954eedeac495271d0f"; // DAI
  const srcAmount = "1000000000000000000"; //The source amount multiplied by its decimals: 10 ** 18 here
  const priceRoute = paraSwap.getRate(srcToken, destToken, srcAmount);
  priceRoute.then((data) => setAmountOut(parseInt(data.destAmount) / 1e18));

  function handleOutChange(e) {
    console.log("e", e);

    setInToken({ value: e, name: e });
    // If the current value passes the validity test then apply that to state
    console.log(e);
  }

  function handleInChange(e) {
    setInToken({ value: e, name: e });
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
            onChange={handleOutChange}
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
            onChange={handleInChange}
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
        <div className="output-number">{amountOut}</div>
        <div className="swp-txt menu-text">Swap</div>
      </div>
      <div className="gp-tradebar">
        <GasPrice></GasPrice>
      </div>
    </div>
  );
}
