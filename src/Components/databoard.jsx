import React, { useEffect, useState } from "react";
import "./databoard.css";
import { useQuery } from "react-query";
const axios = require("axios").default;

export default function Databoard() {
  const [DisplayData, setDisplayData] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://api.coingecko.com/api/v3/search/trending",
    })
      .then(function (response) {
        return response.data.coins;
      })
      .then((res) => {
        return Promise.all(
          res.map((coin) => {
            return axios({
              method: "get",
              url: `https://api.coingecko.com/api/v3/coins/${coin["item"]["id"]}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`,
            });
          })
        );
      })
      .then(function (response) {
        return response.map((coin) => {
          return (
            <div className="coin-item" key={coin.data["id"]}>
              {coin.data["name"]}
            </div>
          );
        });
      })
      .then(function (disArr) {
        setDisplayData((prev) => disArr);
      });
  }, []);

  return (
    <div className="datab-parent">
      <div className="title">
        <span>Trending On Coingecko</span>
      </div>
      <div className="par">{DisplayData}</div>;
    </div>
  );
}
