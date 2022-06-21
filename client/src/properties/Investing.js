import React from "react";
import web3 from "../getWeb3";
import property from "../property";

class Investing extends React.Component {
  state = {
    userId: "",
    propertyId: "",
    value: "",
    errorMsg: "",
  };

  async componentDidMount() {
    this.setState({ propertyId: this.props.match.params.id });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const account = await web3.eth.getAccounts();
      await property.methods
        .investing(this.state.propertyId, this.state.userId)
        .send({
          from: account[0],
          value: this.state.value,
        });
      this.setState({ errorMsg: "" });
    } catch (err) {
      this.setState({ errorMsg: err.message });
    }
  };

  error() {
    if (this.state.errorMsg) {
      return (
        <div className="ui message">
          <div className="header">Error</div>
          <p>{this.state.errorMsg}</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="field">
            <label>User Id</label>
            <input
              type="number"
              value={this.state.userId}
              onChange={(event) => {
                this.setState({ userId: event.target.value });
              }}
            />
          </div>
          <div className="field">
            <label>Investing Amt Wei</label>
            <input
              type="number"
              value={this.state.value}
              onChange={(event) => {
                this.setState({ value: event.target.value });
              }}
            />
          </div>

          <input
            className="ui button"
            type="submit"
            value="Submit"
            // style={{ marginBottom: "120px" }}
          />
        </form>
        {this.error()}
      </div>
    );
  }
}

export default Investing;
