const reducerTx = (arr) => {
  try {
    const lastEle = arr[arr.length - 1];
    if (arr.length === 1) {
      return lastEle;
    } else {
      if (arr[0].source === "univ3" && arr[arr.length - 1] === "univ3") {
        const lastEle = arr[arr.length - 1];
        if (arr.length === 1) {
          return lastEle;
        } else {
          arr[0].amount1 = lastEle.amount1;
          arr[0].token1 = lastEle.token1;
        }
      } else if (arr[0].source !== "univ3" && arr[arr.length - 1] !== "univ3") {
        if (arr[0].amount0Out !== "0") {
          if (lastEle.amount0ut !== "0") {
            arr[0].amount0Out = lastEle.amount0Out;
            arr[0].pair.token0 = lastEle.pair.token0;
          } else {
            arr[0].amount0Out = lastEle.amount1Out;
            arr[0].pair.token0 = lastEle.pair.token1;
          }
        } else {
          if (lastEle.amount0Out !== "0") {
            arr[0].amount1Out = lastEle.amount0Out;
            arr[0].pair.token1 = lastEle.pair.token0;
          } else {
            arr[0].amount1Out = lastEle.amount1Out;
            arr[0].pair.token1 = lastEle.pair.token1;
          }
        }
      } else if (
        arr[0].source === "univ3" &&
        arr[arr.length - 1].source !== "univ3"
      ) {
        if (lastEle.amount0Out !== "0") {
          arr[0].amount1 = lastEle.amount0Out;
          arr[0].token1 = lastEle.pair.token0;
        } else {
          arr[0].amount1 = lastEle.amount1Out;
          arr[0].token1 = lastEle.pair.token1;
        }
      }
      return arr[0]; //change
    }
  } catch (e) {
    return arr[0];
  }
};

function roundToTwo(num) {
  return Math.abs(Math.round(num + "e+2") + "e-2");
}

function dataWash(data) {
  data.totUSD = roundToTwo(data.amountUSD);
  if (data.amount0Out === "0") {
    data.noOut = roundToTwo(data.amount1Out);
    data.tokOut = data.pair.token1.symbol;
    data.tokOutAdd = data.pair.token1.id;
    data.noIn = roundToTwo(data.amount0In);
    data.tokIn = data.pair.token0.symbol;
    data.tokInAdd = data.pair.token0.id;
  } else {
    data.noOut = roundToTwo(data.amount0Out);
    data.tokOut = data.pair.token0.symbol;
    data.tokOutAdd = data.pair.token0.id;
    data.noIn = roundToTwo(data.amount1In);
    data.tokIn = data.pair.token1.symbol;
    data.tokInAdd = data.pair.token1.id;
  }
}

function dataWashv3(data) {
  data.totUSD = roundToTwo(data.amountUSD);
  data.noOut = roundToTwo(data.amount0);
  data.tokOut = data.token0.symbol;
  data.tokOutAdd = data.token0.id;
  data.noIn = roundToTwo(data.amount1);
  data.tokIn = data.token1.symbol;
  data.tokInAdd = data.token1.id;
}

export function cleanMultiHopsAndSort(arr, source) {
  try {
    const resultArr = [];
    let tempArr = [];
    let currentId;
    for (let i = 0; i < arr.length; i++) {
      let tempId = arr[i].transaction.id;
      if (arr[i].source !== "univ3") {
        dataWash(arr[i]);
      } else {
        dataWashv3(arr[i]);
      }
      if (
        arr[i].tokOut === arr[i].tokIn ||
        (arr[i].source !== "univ3" &&
          arr[i].amount0Out === "0" &&
          arr[i].amount1In === "0")
      ) {
        continue;
      }
      if (tempId !== currentId) {
        currentId = tempId;
        // reduce tempArr and push resulting obj into resultArr;
        if (tempArr.length > 0) resultArr.push(reducerTx(tempArr));
        if (i === arr.length - 1) resultArr.push(arr[i]);
        // const reducedValue = calling function on temp arr
        // resultArr.push(reduceValue)
        tempArr = [arr[i]];
      } else {
        tempArr.push(arr[i]);
      }
    }

    return resultArr.sort(function (x, y) {
      return y.transaction.timestamp - x.transaction.timestamp;
    });
  } catch (e) {
    console.log(e);
  }
}
