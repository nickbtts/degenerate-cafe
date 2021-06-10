import React, {useEffect, useState, useRef} from 'react'
import './liveboard.css'
import {uniQuery} from '../Services/Uniswap.ApiService'
import gql from 'graphql-tag';
import { useQuery, useMutation, useSubscription, useSubscriptionData } from "@apollo/react-hooks"
import TradeItem from './trade-item'
import cleanMultiHops from '../utils/utils'
import {CSSTransition, TransitionGroup} from 'react-transition-group'


const TRADE_QUERY = gql`
query{
  swaps(first:20, where: {amountUSD_gt: "5000"}, orderBy: timestamp, orderDirection: desc) {
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

const TRADE_SUBSCRIPTION = gql`
subscription {
  swaps(where: {amountUSD_gt: "50000"}, orderBy: timestamp, orderDirection: desc) {
    	sender,
    	transaction {
    	  id
        timestamp
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
  const [inputValue, setInputValue] = React.useState("")
  const [inProp, setInProp] = useState(false);


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

  const {loading, error, data} = useSubscription(TRADE_SUBSCRIPTION, {onSubscriptionData: (newData) => {
  setSwaps(prev => cleanMultiHops([...newData.subscriptionData.data.swaps, ...prev]))
  }
});

  if (loading) console.log('loading');;
  if (error) console.log('error');
      return (
        <div className="par-liveboard"> 
          {loading ? <p>loading</p> :
        <TransitionGroup className ="par-liveboard">
        {swaps.map((data) => {
          return ( <CSSTransition
            key={data.transaction.id}
            timeout={600}
            classNames="item"
          >
        <TradeItem data={data}></TradeItem>
        </CSSTransition>
        )
          })}
        </TransitionGroup>}
      </div>

    )

    }



