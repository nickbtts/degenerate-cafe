import React, {useEffect, useState, useRef} from 'react'
import './liveboard.css'
import {uniQuery} from '../Services/Uniswap.ApiService'
import gql from 'graphql-tag';
import { useQuery, useMutation, useSubscription, } from "@apollo/react-hooks"
import TradeItem from './trade-item'

const TRADE_QUERY = gql`
query{
  swaps(first:1, where: {amountUSD_gt: "50000"}, orderBy: timestamp, orderDirection: desc) {
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
  }
}`;

// Subscribe to modified (created) To Dos 
const TRADE_SUBSCRIPTION = gql`
subscription {
  swaps(first: 10, where: {amountUSD_gt: "50000"}, orderBy: timestamp, orderDirection: desc) {
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
  }
}
`;

export default function Liveboard (props) {
  const [swaps, setSwaps] = React.useState([]);
  // Managing form input - the title of our To Do (controlled component)
  const [inputValue, setInputValue] = React.useState("")

  const {loading, error, data} = useSubscription(TRADE_SUBSCRIPTION);
  if (loading) console.log('loading');;
  if (error) console.log('error');

  // const {
  //   subscribeToMore, // subscribe to new trades
  //   data, // Trade data
  //   loading, // true or false if the data is currently loading
  //   error // null or error object if failed to fetch
  // } = useQuery(TRADE_QUERY)

  // const subscribeToNewTrades = () =>
  //   subscribeToMore({
  //     document: TRADE_SUBSCRIPTION, // the gql subscription operation
  //     // How we update our Trade data when subscription data comes through.
  //     updateQuery: (currentTrades, { subscriptionData }) => {
  //       //console.log('currenttrades', currentTrades)
  //       //console.log('subscriptiondata', subscriptionData)
  //       if (!subscriptionData.data) return currentTrades;
  //       const newTrade = subscriptionData.data.swaps;
  //       const updatedTrades = currentTrades.swaps.concat(newTrade)
  //       setSwaps(updatedTrades) // Update the state of trades with new to do
  //       //console.log('SWAPS STATE', swaps)
  //       console.log({swaps:updatedTrades})
  //       return {swaps:updatedTrades}
  //     }
  //   })
  //   subscribeToNewTrades()

      return (
      <div className="par-liveboard">
        {loading? <p>loading</p>:data.swaps.map((data) => (
        <TradeItem key={data.transaction.id} data={data}></TradeItem>
      ))}
      </div>
    )

    }



