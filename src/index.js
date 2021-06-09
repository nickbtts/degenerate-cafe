
import './index.css';

import reportWebVitals from './reportWebVitals';
import React, {useState} from "react";
import ReactDOM from "react-dom";
import GridLayout from "./Containers/GridLayout"
import TradeBar from './Components/tradebar'

export default function MasterLayout (props) {
    const [layout, setLayout] = useState([])

  const onLayoutChange = (layout) => {
    setLayout(layout);
  }

  return (
    <div class="parent">
      <div class="nav-bar"></div>
      <div class="trade-bar">
        <TradeBar></TradeBar>
      </div>
      
      <div class="main-area">
      <div class="logo-top"></div>
      <GridLayout onLayoutChange={onLayoutChange} />
      </div>
      </div>
    );
}

const contentDiv = document.getElementById("root");
const gridProps = window.gridProps || {};
ReactDOM.render(React.createElement(MasterLayout, gridProps), contentDiv);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
