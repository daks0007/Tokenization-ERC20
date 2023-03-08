import React, { Component } from "react";
import DaksToken from "./contracts/DaksToken.json";
import myTokenSale from "./contracts/myTokenSale.json";
import kycContract from "./contracts/kycContract.json";

import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = {
    loaded: false,
    KycAddress: "0x123...",
    tokeSaleAddress: null,
    userTokens: 0,
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();

      this.TokenInstance = new this.web3.eth.Contract(
        DaksToken.abi,
        DaksToken.networks[this.networkId] &&
          DaksToken.networks[this.networkId].address
      );
      this.TokenSaleInstance = new this.web3.eth.Contract(
        myTokenSale.abi,
        myTokenSale.networks[this.networkId] &&
          myTokenSale.networks[this.networkId].address
      );
      this.kycInstance = new this.web3.eth.Contract(
        kycContract.abi,
        kycContract.networks[this.networkId] &&
          kycContract.networks[this.networkId].address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.listenToTokenTransfer();
      this.setState(
        {
          loaded: true,
          tokeSaleAddress: myTokenSale.networks[this.networkId].address,
        },
        this.UpdateUserTokens
      );
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  UpdateUserTokens = async () => {
    let userTokens = await this.TokenInstance.methods
      .balanceOf(this.accounts[0])
      .call();
    this.setState({ userTokens: userTokens });
  };
  listenToTokenTransfer = () => {
    this.TokenInstance.events
      .Transfer({ to: this.accounts[0] })
      .on("data", this.UpdateUserTokens);
  };

  handleBuyToken = async () => {
    await this.TokenSaleInstance.methods.buyTokens(this.accounts[0]).send({
      from: this.accounts[0],
      value: this.web3.utils.toWei("1", "Wei"),
    });
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  handlekycWhiteListing = async () => {
    await this.kycInstance.methods
      .setKycCompleted(this.state.KycAddress)
      .send({ from: this.accounts[0] });
    alert(`Kyc for ${this.state.KycAddress} is Completed`);
  };

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>DaksToken Token Sale</h1>
        <p>Get your Tokens Today</p>
        <h2>KYC whitelisting</h2>
        Address to allow:
        <input
          type="text"
          name="KycAddress"
          value={this.state.kycAddress}
          onChange={this.handleInputChange}
        />
        <button type="button" onClick={this.handlekycWhiteListing}>
          Add to whitelist
        </button>
        <h2>Buy Tokens</h2>
        <p>
          If you want to buy tokens send Wei to this address:{" "}
          {this.state.tokeSaleAddress}
          <p>You currently have: {this.state.userTokens} DaksTokens</p>
          <button type="button" onClick={this.handleBuyToken}>
            Buy more tokens
          </button>
        </p>
      </div>
    );
  }
}

export default App;
