import React, { useState, useEffect } from "react";
import "./feargreed.css";
const request = require("request");
const cheerio = require("cheerio");

export default function FearGreed(props) {
  const [FGIndexFinal, setFGIndexFinal] = useState(0);
  const [FGRanking, setFGRanking] = useState("Loading");
  useEffect(() => {
    getIndex();
  }, []);
  var SEARCH_WORD = "now";
  var bodyText = "";
  var ranking = "";
  var FGIndex = "0";
  async function getIndex() {
    let FGIRoughStartIndex = 0; //index number for where the FGIndex information starts in the bodyText
    let FGRoughIndex = ""; //Gets the substring of the FGIndex information (the index number and ranking)
    //Accesses the website
    await request(
      "https://cors.bridged.cc/https://alternative.me/crypto/fear-and-greed-index/",
      function (error, response, body) {
        if (error) {
          console.log("Error: " + error);
        }
        console.log("Status code: " + response.statusCode);
        //Checks the Status code. (200 is HTTP Ok)
        if (response.statusCode !== 200) {
          //Parses the document body
          console.log("status code not 200");
          return;
        }
        //Gets the entire text from the website assigns to "bodyText"
        let $ = cheerio.load(body);
        bodyText = $("html > body").text().toLowerCase();
        //Extracts the FGI information from the website and trims it down to the Ranking and FGIndex number
        FGIRoughStartIndex = SearchForWord(bodyText, SEARCH_WORD);
        FGRoughIndex = bodyText.substr(FGIRoughStartIndex + 3, 20);
        ranking = FGRoughIndex.trim();
        FGIndex = bodyText.substr(FGIRoughStartIndex + 3, 45);
        FGIndex = FGIndex.trim();
        FGIndex = FGIndex.substr(
          ranking.length,
          FGIndex.length - ranking.length
        );
        FGIndex = FGIndex.trim();
        switch (ranking) {
          case "extreme greed":
            ranking = "Extreme Greed";
            break;
          case "greed":
            ranking = "Greed";
            break;
          case "extreme fear":
            ranking = "Extreme Fear";
            break;
          case "fear":
            ranking = "Fear";
            break;
          case "neutral":
            ranking = "Neutral";
            break;
        }
        setFGIndexFinal(FGIndex);
        setFGRanking(ranking);
      }
    );
  }

  function SearchForWord($, word) {
    return bodyText.indexOf(word.toLowerCase());
  }

  return (
    <div className="fear-greed">
      <div className="title">
        <span>Today's Cryptocurrency Fear And Greed Index</span>
      </div>
      <div className="fear-greed-title">How high are we...</div>
      <div className="fear-greed-number">{FGIndexFinal}</div>
      <div className="fear-greed-title">We're feeling...</div>
      <div className="fear-greed-number">{FGRanking}</div>
    </div>
  );
}
