import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
const APIURL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2";
const tokensQuery = `
{
  swaps(first: 1, where: {amountUSD_gt: "50000"}, orderBy: timestamp, orderDirection: desc) {
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
    	timestamp
}
}

`

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache()
});


export const uniQuery = client.query({
  query: gql(tokensQuery)
  })
.then(data => {return data.data.swaps[0]})
.catch(err => { console.log("Error fetching data: ", err) })
