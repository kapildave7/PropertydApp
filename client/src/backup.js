import React, { Component } from "react";
import web3 from "./getWeb3";
import Property from "./property";

// import "./App.css";

class BackUp extends Component {
  componentDidMount = async () => {
    const response = await Property.methods.manager().call();
    console.log(response);

    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
  };

  render() {
    return <div className="App"></div>;
  }
}

export default BackUp;
