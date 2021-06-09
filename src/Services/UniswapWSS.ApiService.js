import { WebSocketLink } from '@apollo/client/link/ws'
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';



const APIURL = "wss://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2";
const tokensSub = `
subscription {
  swaps(first: 20, where: {amountUSD_gt: "50000"}, orderBy: timestamp, orderDirection: desc) {
    	sender,
    	transaction {
    	  id
    	},
    	pair {
    	  id
        token0 {
          id,
          symbol,
          name
        }
        token1 {
          id,
          symbol,
          name
        }
    	},
      amount0In,
      amount1In,
      amount0Out,
      amount1Out,
    	amountUSD,

`

const wsLink = new WebSocketLink({
  uri: APIURL,
  options: {
    reconnect: true
  }
});

const httpLink = new HttpLink({
  uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

export function uniQuery () {
  const { data: { trade }, loading } = useSubscription(
    tokensSub,
    { variables: { postID } }
  );
  console.log(trade)
  return 'success';
}
