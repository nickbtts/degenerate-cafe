import React from 'react';
import _ from "lodash";
import './App.css';
import Databoard from '../Components/databoard'

import RGL, {WidthProvider} from 'react-grid-layout';

const ReactGridLayout = WidthProvider(RGL);

export default function GridLayout (props) {

  

  const generateDOM = () => {
    const mapBoards= [<div id='board-one'key={0}><Databoard ></Databoard></div>,<div key={1}></div>,<div key={2}></div>,<div key={3} id='big-board'></div>,<div key={4}></div>,<div key={5}></div>];
    console.log(mapBoards)
    return mapBoards;
  };

  const generateLayout = () => {
    //const p = this.props
  return [
  {"w":12,"h":6.5,"x":0,"y":0,"i":"0"},
  {"w":12,"h":6.5,"x":0,"y":5,"i":"1"},
  {"w":12,"h":6.5,"x":0,"y":10,"i":"2"},
  {"w":20,"h":13,"x":12,"y":0,"i":"3"},
  {"w":10,"h":6.5,"x":12,"y":10,"i":"4"},
  {"w":10,"h":6.5,"x":22,"y":10,"i":"5"}]
//   }

  //   return _.map(new Array(p.items), function(item, i) {
  //     const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
  //     return {
  //       x: (i * 2) % 12,
  //       y: Math.floor(i / 6) * y,
  //       w: 2,
  //       h: y,
  //       i: i.toString()
  //     };
  //   });
  // }
  }

  const onLayoutChange = (layout) => {
    props.onLayoutChange(layout);
  }

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
    onLayoutChange: function() {},
    cols: 32,
    margin: [1, 1],
  };
