import Property from "./contracts/Property.json";
import web3 from "./getWeb3";

const instance = new web3.eth.Contract(
  Property.abi,
  "0xa8777d6D640422157eA42c7a7cF92DeE67b6f0f8"
);

export default instance;
