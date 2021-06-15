import React, { useEffect, useState } from "react";
import "./newpools.css";

export default function NewPools(props) {
  const [state, setState] = useState({
    volume: {},
    liquidity: {},
    tx: {},
    launchedDays: {},
    pools: [],
  });

  useEffect(() => {
    loadPools();
  }, []);

  const trunc = (input, maxLength) => {
    if (input.length > maxLength) {
      return input.substring(0, maxLength) + "...";
    }
    return input;
  };

  async function loadPools() {
    let createdAt = Math.floor(Date.now() / 1000) - parseInt(7) * 3600 * 24; // $("#launched-days").
    const query = `
      {
        pairs(first: 100, where: {
          createdAtTimestamp_gte: ${createdAt},
          volumeUSD_gte: 100000,
          txCount_gte:100 ,
          reserveUSD_gte: 100000,
        }) {
          id
          token0 {
            id
            name
            symbol
            tradeVolumeUSD
          }
          token1 {
            id
            name
            symbol
            tradeVolumeUSD
          }
          volumeUSD
          txCount
          reserveUSD
          createdAtTimestamp
        }
      }`.replace(/(\r\n|\n|\r)/gm, "");

    let res = await fetch(
      "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: '{ "query": "' + query + '" }',
      }
    );

    let jsonRes = await res.json();
    let pairs = Array.from(jsonRes.data.pairs);
    let newPools = pairs
      .map((item) => {
        const container = {};

        var daysAgo = (
          (Math.floor(Date.now() / 1000) - parseInt(item.createdAtTimestamp)) /
          3600 /
          24
        ).toFixed(1);
        let primaryToken = [item.token0, item.token1].sort(function (a, b) {
          return parseInt(a.tradeVolumeUSD) - parseInt(b.tradeVolumeUSD);
        })[0];

        container.symbol = trunc(primaryToken.symbol, 10);
        container.liquidity = Math.round(
          parseInt(item.reserveUSD)
        ).toLocaleString();
        container.volume = Math.round(
          parseInt(item.volumeUSD)
        ).toLocaleString();
        container.vlRatio = (item.volumeUSD / item.reserveUSD).toFixed(1);
        container.txCount = Math.round(parseInt(item.txCount)).toLocaleString();
        container.launchedDays = daysAgo;
        container.tokenAddress = primaryToken.id;

        return container;
      })
      .sort(function (a, b) {
        return (
          parseInt(b.volume.replace(/\D/g, "")) -
          parseInt(a.volume.replace(/\D/g, ""))
        );
      });
    setState({ pools: newPools });
  }

  function generateDivs() {
    return state.pools.map((pool) => (
      <div className="pool-item" key={pool.tokenAddress}>
        <div className="pool1">{pool.symbol}</div>
        <div className="pool2">{pool.launchedDays}</div>
        <div className="pool3">{pool.liquidity}</div>
        <div className="pool4">{pool.txCount}</div>
        <div className="pool5">{pool.vlRatio}</div>
        <a
          className="pool6"
          href={`http://etherscan.io/address/${pool.tokenAddress}`}
          target="_blank"
          rel="noreferrer"
        >
          Tx
        </a>
      </div>
    ));
  }

  return (
    <div className="newpools-parent">
      <div className="title">
        <span>Fresh Uniswap Listings</span>
      </div>
      <div className="pool-item-header">
        <div className="pool1">Token</div>
        <div className="pool2">Days</div>
        <div className="pool3">Liquidity</div>
        <div className="pool4">Tx Count</div>
        <div className="pool5">Vol/Liq</div>
        <div className="pool6">Escan</div>
      </div>
      <div className="newpools-data">{generateDivs()}</div>
    </div>
  );
}
