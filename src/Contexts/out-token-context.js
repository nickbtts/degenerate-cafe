import { createContext } from "react";

export default createContext({
  inToken: {
    value: "DAI",
    name: "DAI",
    address: "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359",
  },
  setInToken: () => {
    console.log("inside context file");
  },
});
