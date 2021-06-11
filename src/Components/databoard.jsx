import React, { useEffect, useState } from "react";
import "./databoard.css";
import { useQuery } from "react-query";
const axios = require("axios").default;

export default function Databoard() {
  const [GeckoData, setGeckoData] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "https://api.coingecko.com/api/v3/search/trending",
      //responseType: 'stream'
    }).then(function (response) {
      setGeckoData(response.data.coins);
      console.log();
    });
  }, []);

  function generateDivs() {
    let displayArr = [];
    GeckoData.forEach((coin) =>
      displayArr.push(
        <div className="coin-item" key={coin["item"]["coin_id"]}>
          {coin["item"]["name"]}
        </div>
      )
    );
    return displayArr;
  }

  return <div className="par">{generateDivs()}</div>;
  // function Trending() {
  //   const { isLoading, isError, data, error } = useQuery('todos', fetchTodoList)

  //   if (isLoading) {
  //     return <span>Loading...</span>
  //   }

  //   if (isError) {
  //     return <span>Error: {error.message}</span>
  //   }
}
