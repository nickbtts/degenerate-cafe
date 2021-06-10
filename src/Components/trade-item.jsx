import React, {useEffect, useState, useRef} from 'react'
import './trade-item.css'



export default function TradeItem (props) {
    const {data} = props;
    let noOut, tokOut, noIn, tokIn, totUSD
    function roundToTwo(num) {
      return +(Math.round(num + "e+2")  + "e-2");
  }

    function dataWash (data) {
      totUSD = roundToTwo(data.amountUSD);
      if (data.amount0Out === '0') {
        noOut = roundToTwo(data.amount1Out);
        tokOut = data.pair.token1.symbol;
        noIn = roundToTwo(data.amount0In);
        tokIn = data.pair.token0.symbol;
      } else {
        noOut = roundToTwo(data.amount0Out)
        tokOut = data.pair.token0.symbol;
        noIn = roundToTwo(data.amount1In);
        tokIn = data.pair.token1.symbol;
      }
      return (
            <>
             <div className="icon"><img className='univ2' src='/uniswap-v2-pink.png' /></div>
              <div className="noin titem">{noIn}</div>
              <div className="swapnames">{tokIn} / {tokOut}</div>
              <div className="noout titem">{noOut}</div>
              <div className="totUSD titem"> ${totUSD}</div>
            </>
        )
    }
    return (
    <div className = "par-tradeitem">
    {dataWash(data)}
    </div>
    )

    }
