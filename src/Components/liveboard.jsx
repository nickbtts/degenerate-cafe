import React, { useState } from "react";
import "./liveboard.css";
import gql from "graphql-tag";
import { useSubscription } from "@apollo/react-hooks";
import TradeItem from "./trade-item.jsx";
import cleanMultiHopsAndSort from "../utils/utils";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  TRADE_SUBSCRIPTION,
  TRADE_QUERY,
} from "../Services/Uniswap.ApiService";

export default function Liveboard() {
  const [swaps, setSwaps] = useState([]);

  // function processSwaps (data) {
  // console.log('data', data)
  // console.log('swaps', swaps)
  // let newData = swaps.concat(data)
  // console.log('newData', newData)
  // return cleanMultiHops(newData)
  // }

  // const { loading, error, initData } = useQuery(TRADE_QUERY, {onCompleted: (initDat) => {
  // console.log('QUERY');
  // setSwaps(cleanMultiHops(initDat.swaps))}})

  const { loading, error } = useSubscription(TRADE_SUBSCRIPTION, {
    onSubscriptionData: (newData) => {
      setSwaps((prev) =>
        cleanMultiHopsAndSort([...newData.subscriptionData.data.swaps, ...prev])
      );
    },
  });

  if (loading) console.log("loading");
  if (error) console.log("error");
  return (
    <div className="par-liveboard">
      {loading ? (
        <p>loading</p>
      ) : (
        <TransitionGroup className="par-liveboard">
          {swaps.map((data) => {
            return (
              <CSSTransition
                key={data.transaction.id}
                timeout={600}
                classNames="item"
              >
                <TradeItem data={data}></TradeItem>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      )}
    </div>
  );
}
