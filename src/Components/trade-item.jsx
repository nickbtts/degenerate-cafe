import React, {useEffect, useState, useRef} from 'react'
import './trade-item.css'



export default function TradeItem (props) {
    const {data} = props;
    console.log(data)
    
    return (
      
      <div className="par-tradeitem">
        <p>{data.amount0Out === '0' ? data.pair.token1.name : data.pair.token0.name} for {data.amount0Out=== '0' ? data.pair.token0.name : data.pair.token1.name}</p>
      </div>
    )

    }



