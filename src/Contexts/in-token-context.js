import { createContext } from "react";

export default createContext({
  inToken: {
    value: "ETH",
    name: "ETH",
    address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  },
  setInToken: () => {
    console.log("inside context file");
  },
});
