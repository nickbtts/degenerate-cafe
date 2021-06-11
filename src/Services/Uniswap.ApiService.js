// import { ApolloClient, InMemoryCache } from "@apollo/client";
import gql from "graphql-tag";
const APIURL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2";
export const TRADE_QUERY = gql`
  query {
    swaps(
      first: 20
      where: { amountUSD_gt: "5000" }
      orderBy: timestamp
      orderDirection: desc
    ) {
      sender
      transaction {
        id
      }
      pair {
        id
        token0 {
          id
          symbol
          name
        }
        token1 {
          id
          symbol
          name
        }
      }
      amount0In
      amount1In
      amount0Out
      amount1Out
      amountUSD
    }
  }
`;

export const TRADE_SUBSCRIPTION = gql`
  subscription {
    swaps(
      where: { amountUSD_gt: "5000" }
      orderBy: timestamp
      orderDirection: desc
    ) {
      sender
      transaction {
        id
        timestamp
      }
      pair {
        id
        token0 {
          id
          symbol
          name
        }
        token1 {
          id
          symbol
          name
        }
      }
      amount0In
      amount1In
      amount0Out
      amount1Out
      amountUSD
    }
  }
`;

// const client = new ApolloClient({
//   uri: APIURL,
//   cache: new InMemoryCache(),
// });

// export const uniQuery = client
//   .query({
//     query: gql(tokensQuery),
//   })
//   .then((data) => {
//     return data.data.swaps[0];
//   })
//   .catch((err) => {
//     console.log("Error fetching data: ", err);
//   });
