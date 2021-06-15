import React, { useState } from "react";
import "./liveboard.css";
import { useSubscription } from "@apollo/react-hooks";
import TradeItem from "./trade-item.jsx";
import { cleanMultiHopsAndSort } from "../utils/utils.js";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  TRADE_SUBSCRIPTION,
  TRADE_QUERY,
  UNIV3_SUBSCRIPTION,
} from "../Services/Uniswap.ApiService";
import { useApolloClient } from "@apollo/client";

export default function Liveboard(props) {
  const [swaps, setSwaps] = useState([]);
  const { sushiClient, uniClient, univ3Client } = useApolloClient();
  const { loadingUni, errorUni } = useSubscription(TRADE_SUBSCRIPTION, {
    onSubscriptionData: (newData) => {
      newData.subscriptionData.data.swaps.forEach(
        (data) => (data.source = "univ2")
      );
      setSwaps((prev) =>
        cleanMultiHopsAndSort([...newData.subscriptionData.data.swaps, ...prev])
      );
    },
    client: uniClient,
  });

  const { loading, error } = useSubscription(TRADE_SUBSCRIPTION, {
    onSubscriptionData: (newData) => {
      newData.subscriptionData.data.swaps.forEach(
        (data) => (data.source = "sushi")
      );
      setSwaps((prev) =>
        cleanMultiHopsAndSort([...newData.subscriptionData.data.swaps, ...prev])
      );
    },
    client: sushiClient,
  });

  const { loadingv3, errorv3 } = useSubscription(UNIV3_SUBSCRIPTION, {
    onSubscriptionData: (newData) => {
      newData.subscriptionData.data.swaps.forEach(
        (data) => (data.source = "univ3")
      );
      setSwaps((prev) =>
        cleanMultiHopsAndSort([...newData.subscriptionData.data.swaps, ...prev])
      );
    },
    client: univ3Client,
  });

  if (loading || loadingv3 || loadingUni) console.log("loading");
  if (error || errorv3 || errorUni) console.log("error");
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
