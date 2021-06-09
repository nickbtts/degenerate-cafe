import React, {useState} from 'react'
import { ParaSwap } from 'paraswap';
import './tradebar.css'

export default function TradeBar(props) {



  return (
    <div className="parent-tradebar">
      <div className="connection"></div>
      <div className="menu">
        <div className="input-token"></div>
        <div className="for-txt menu-text">for</div>
        <div className="output-token"></div>
        <div className="swp-txt menu-text">Swap</div>
      </div>
    </div>
    
  )
}


