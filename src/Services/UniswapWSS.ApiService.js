// import { WebSocketLink } from '@apollo/client/link/ws'
// import { split, HttpLink } from '@apollo/client';
// import { getMainDefinition } from '@apollo/client/utilities';

// const APIURL = "wss://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2";
// const tokensSub = `
// subscription {
//   swaps(first: 20, where: {amountUSD_gt: "50000"}, orderBy: timestamp, orderDirection: desc) {
//     	sender,
//     	transaction {
//     	  id
//     	},
//     	pair {
//     	  id
//         token0 {
//           id,
//           symbol,
//           name
//         }
//         token1 {
//           id,
//           symbol,
//           name
//         }
//     	},
//       amount0In,
//       amount1In,
//       amount0Out,
//       amount1Out,
//     	amountUSD,

// `

// const wsLink = new WebSocketLink({
//   uri: APIURL,
//   options: {
//     reconnect: true
//   }
// });

// const httpLink = new HttpLink({
//   uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'
// });

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   httpLink,
// );

// const client = new ApolloClient({
//   link: splitLink,
//   cache: new InMemoryCache()
// });

// export function uniQuery () {
//   const { data: { trade }, loading } = useSubscription(
//     tokensSub,
//     { variables: { postID } }
//   );
//   console.log(trade)
//   return 'success';
// }

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from "@apollo/react-hooks"
import { InMemoryCache } from 'apollo-cache-inmemory';

import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';


// The http link is a terminating link that fetches GraphQL results from a GraphQL 
// endpoint over an http connection
const httpLink = new HttpLink({
    uri: 'http://localhost:4000/'
});

// Allow you to send/receive subscriptions over a web socket
const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/',
    options: {
        reconnect: true
    }
});

// Acts as "middleware" for directing our operations over http or via web sockets
const terminatingLink = split(
    ({ query: { definitions } }) =>
        definitions.some(node => {
            const { kind, operation } = node;
            return kind === 'OperationDefinition' && operation === 'subscription';
        }),
    wsLink,
    httpLink
);
// Create a new client to make requests with, use the appropriate link returned 
// by termintating link (either ws or http)
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: terminatingLink
});

const {
  subscribeToMore, // subscribe to new to dos
  data, // To do data
  loading, // true or false if the data is currently loading
  error // null or error object if failed to fetch
} = useQuery(TODO_QUERY)