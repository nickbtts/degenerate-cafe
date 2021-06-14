import React, { useEffect, useState } from "react";
import "./news.css";
const axios = require("axios").default;

export default function News() {
  const [NewsData, setNewsData] = useState([]);
  let count = 0;
  useEffect(() => {
    axios({
      method: "get",
      url: "https://data.messari.io/api/v1/news",
    }).then((data) => {
      setNewsData(
        data.data.data.map((news) => (
          <div className="news-item" key={news.id}>
            <span className="news-title">{news.title}</span>{" "}
            <span className="news-link">
              <a href={news.url} target="_blank" rel="noreferrer">
                Link
              </a>
            </span>
          </div>
        ))
      );
    });
  }, []);

  return (
    <div className="news-parent">
      <div className="title">
        <span>News (Sourced From Messari)</span>
      </div>
      <div className="news-par">{NewsData}</div>
    </div>
  );
}
