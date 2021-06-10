
const reducerTx = (arr) => {
  const lastEle = arr[arr.length-1]
  if (arr.length === 1) {
    return lastEle;
  } else {
    if(arr[0].amount0Out !== '0') {
      if(lastEle.amount0ut !== '0') {
        arr[0].amount0Out = lastEle.amount0Out;
        arr[0].pair.token0 = lastEle.pair.token0
      } else {
      arr[0].amount0Out = lastEle.amount1Out;
      arr[0].pair.token0 = lastEle.pair.token1
      }

    } else {
      if(lastEle.amount0Out !== '0') {
      arr[0].amount1Out = lastEle.amount0Out;
      arr[0].pair.token1 = lastEle.pair.token0
      } else {
        arr[0].amount1Out = lastEle.amount1Out;
        arr[0].pair.token1 = lastEle.pair.token1
      }
  }
  return arr[0] //change
}
}
export default function cleanMultiHops (arr) {
  console.log('arr to clean', arr)
const resultArr= [];
let tempArr = [];
let currentId;
  for (let i=0; i<arr.length; i++) {
    let tempId = arr[i].transaction.id;
    if (tempId !== currentId) {
      currentId = tempId;
      // reduce tempArr and push resulting obj into resultArr;
      if (tempArr.length > 0) resultArr.push(reducerTx(tempArr))
      if (i===arr.length-1) resultArr.push(arr[i])
      // const reducedValue = calling function on temp arr
      // resultArr.push(reduceValue)

      tempArr = [arr[i]];
    } else {
      tempArr.push(arr[i]);
    }
    }
console.log('results', resultArr)
return resultArr
}


