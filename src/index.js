import "./index.css";

import reportWebVitals from "./reportWebVitals";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import GridLayout from "./Containers/GridLayout";
import TradeBar from "./Components/tradebar";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";

import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { HttpLink } from "apollo-link-http";

const uniHttpLink = new HttpLink({
  uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
});

const sushiHttpLink = new HttpLink({
  uri: "https://api.thegraph.com/subgraphs/name/sushiswap/exchange",
});

const uniWSLink = new WebSocketLink({
  uri: "wss://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
  options: {
    reconnect: true,
  },
});

const sushiWSLink = new WebSocketLink({
  uri: "wss://api.thegraph.com/subgraphs/name/sushiswap/exchange",
  options: {
    reconnect: true,
  },
});

const univ3WSLink = new WebSocketLink({
  uri: "wss://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-testing",
  options: {
    reconnect: true,
  },
});

const univ3HttpLink = new HttpLink({
  uri: "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-testing",
});

const terminatingUniLink = split(
  ({ query: { definitions } }) =>
    definitions.some((node) => {
      const { kind, operation } = node;
      return kind === "OperationDefinition" && operation === "subscription";
    }),
  uniWSLink,
  uniHttpLink
);

const terminatingUniv3Link = split(
  ({ query: { definitions } }) =>
    definitions.some((node) => {
      const { kind, operation } = node;
      return kind === "OperationDefinition" && operation === "subscription";
    }),
  univ3WSLink,
  univ3HttpLink
);
const terminatingSushiLink = split(
  ({ query: { definitions } }) =>
    definitions.some((node) => {
      const { kind, operation } = node;
      return kind === "OperationDefinition" && operation === "subscription";
    }),
  sushiWSLink,
  sushiHttpLink
);

const uniClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: terminatingUniLink,
});

const sushiClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: terminatingSushiLink,
});

const univ3Client = new ApolloClient({
  cache: new InMemoryCache(),
  link: terminatingUniv3Link,
});

export default function MasterLayout(props) {
  const [layout, setLayout] = useState([]);

  const onLayoutChange = (layout) => {
    setLayout(layout);
  };

  return (
    <ApolloProvider client={{ uniClient, sushiClient, univ3Client }}>
      <div class="parent">
        <div class="nav-bar"></div>
        <div class="trade-bar">
          <TradeBar></TradeBar>
        </div>

        <div class="main-area">
          <div class="logo-top"></div>
          <GridLayout onLayoutChange={onLayoutChange} />
        </div>
      </div>
    </ApolloProvider>
  );
}

const contentDiv = document.getElementById("root");
const gridProps = window.gridProps || {};
ReactDOM.render(React.createElement(MasterLayout, gridProps), contentDiv);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
