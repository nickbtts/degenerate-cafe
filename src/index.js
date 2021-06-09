
import './index.css';

import reportWebVitals from './reportWebVitals';
import React, {useState} from "react";
import ReactDOM from "react-dom";
import GridLayout from "./Containers/GridLayout"
import TradeBar from './Components/tradebar'
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from "@apollo/react-hooks"
import { InMemoryCache } from 'apollo-cache-inmemory';

import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';

const httpLink = new HttpLink({
  uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'
});

const wsLink = new WebSocketLink({
  uri: 'wss://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
  options: {
      reconnect: true
  }
});

const terminatingLink = split(
  ({ query: { definitions } }) =>
      definitions.some(node => {
          const { kind, operation } = node;
          return kind === 'OperationDefinition' && operation === 'subscription';
      }),
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: terminatingLink
});

export default function MasterLayout (props) {
    const [layout, setLayout] = useState([])

  const onLayoutChange = (layout) => {
    setLayout(layout);
  }

  return (
    <ApolloProvider client={client}>


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
