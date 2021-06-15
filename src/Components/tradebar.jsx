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
  console.log("intoken", inToken);
  const srcToken = inToken.address; // WETH
  const destToken = outToken.address; // DAI
  const srcAmount = (amountIn * 1e18).toString(); //The source amount multiplied by its decimals: 10 **
  //const destAmount = (amountOut * 1e18).toString();
  const priceRoute = paraSwap.getRate(srcToken, destToken, srcAmount);
  priceRoute.then((data) => setAmountOut(data.destAmount));

  // paraSwap.setWeb3Provider(web3Provider);

  // const allowance = paraSwap.getAllowance(userAddress, tokenAddress);

  // const txHash = paraSwap.approveToken(amount, userAddress, tokenAddress);

  // const senderAddress = "0xfceA770875E7e6f25E33CEa5188d12Ef234606b4";

  // const referrer = "deg_cafe";

  // const txParams = paraSwap.buildTx(
  //   srcToken,
  //   destToken,
  //   srcAmount,
  //   destAmount,
  //   priceRoute,
  //   senderAddress,
  //   referrer,
  //   receiver
  // );

  // web3.eth.sendTransaction(txParams, async (err, transactionHash) => {
  //   if (err) {
  //     return setState({ error: err.toString(), loading: false });
  //   }
  //   console.log("transactionHash", transactionHash);
  // });

  function handleOutChange(e, moreData) {
    console.log("mde", moreData);

    setOutToken({ value: moreData.name, name: e, address: moreData.address });
    // If the current value passes the validity test then apply that to state
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
