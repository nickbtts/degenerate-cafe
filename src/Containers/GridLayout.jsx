import React, { useState } from "react";
import "../index.css";
import Databoard from "../Components/databoard.jsx";
import LiveBoard from "../Components/liveboard.jsx";
import NewPools from "../Components/newpools";
import News from "../Components/news";

import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

export default function GridLayout(props) {
  const generateDOM = () => {
    const mapBoards = [
      <div id="board-one" key={0}>
        <Databoard></Databoard>
      </div>,
      <div key={1}>
        <NewPools></NewPools>
      </div>,
      <div key={2}>
        <News></News>
      </div>,

      <div key={3} id="big-board">
        <LiveBoard></LiveBoard>
      </div>,
      <div key={4}></div>,
      <div key={5}></div>,
    ];
    console.log(mapBoards);
    return mapBoards;
  };

  const generateLayout = () => {
    //const p = this.props
    return [
      { w: 12, h: 7, x: 0, y: 0, i: "0" },
      { w: 12, h: 7, x: 0, y: 5, i: "1" },
      { w: 12, h: 6, x: 0, y: 10, i: "2" },
      { w: 20, h: 14, x: 12, y: 0, i: "3" },
      { w: 10, h: 6, x: 12, y: 10, i: "4" },
      { w: 10, h: 6, x: 22, y: 10, i: "5" },
    ];
  };

  const onLayoutChange = (layout) => {
    props.onLayoutChange(layout);
  };

  const layout = generateLayout();

  return (
    <ReactGridLayout
      layout={layout}
      onLayoutChange={onLayoutChange}
      isBounded={true}
      {...props}
    >
      {generateDOM()}
    </ReactGridLayout>
  );
}

GridLayout.defaultProps = {
  className: "layout",
  items: 6,
  rowHeight: 32,
  onLayoutChange: function () {},
  cols: 32,
  margin: [1, 1],
};
