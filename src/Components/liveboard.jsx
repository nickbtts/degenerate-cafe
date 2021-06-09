import React, {useEffect, useState, useRef} from 'react'
import './liveboard.css'
import {uniQuery} from '../Services/Uniswap.ApiService'


export default function Liveboard (props) {
let [trades, setTrades] = useState([]);
const [delay, setDelay] = useState(7000);
const [isRunning, setIsRunning] = useState(true);

const useInterval = (callback, delay) => {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


  useInterval(async () => {
    const newTrade = await uniQuery;
    console.log(newTrade)
    
    setTrades(prev => [newTrade, ...prev])
    console.log(trades)
  }, isRunning ? delay : null);

    return (
      
      <div className="par-liveboard">
        {}
      </div>
    )
    // function Trending() {
    //   const { isLoading, isError, data, error } = useQuery('todos', fetchTodoList)
    
    //   if (isLoading) {
    //     return <span>Loading...</span>
    //   }
    
    //   if (isError) {
    //     return <span>Error: {error.message}</span>
    //   }
    }



