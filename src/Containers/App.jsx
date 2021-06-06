import React, {useState} from "react";
import ReactDOM from "react-dom";
import GridLayout from "./GridLayout"

export default function MasterLayout (props) {
    const [layout, setLayout] = useState([])

  const onLayoutChange = (layout) => {
    setLayout(layout);
  }

  return (
    <div class="parent">
      <div class="nav-bar"></div>
      <div class="trade-bar"></div>
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
