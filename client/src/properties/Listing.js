import React from "react";
import property from "../property";
import web3 from "../getWeb3";
import ipfs from "../ipfs";
import history from "../history";

class Listing extends React.Component {
  state = {
    userId: "",
    longitude: "",
    latitude: "",
    propertySize: "",
    listingAmount: "",
    // description: "",
    residentialAddress: "",
    durationsDays: "",
    minimumAmount: "",
    ipfsHash: "",
    web3: null,
    buffer: null,
    account: null,
    buttonClass: "",
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ buttonClass: "loading disabled" });
    try {
      const account = await web3.eth.getAccounts();
      ipfs.files.add(this.state.buffer, (error, result) => {
        if (error) {
          console.error(error);
          this.setState({ buttonClass: "" });
          return;
        }
        this.setState({ ipfsHash: result[0].hash });
        property.methods
          .listNewProperty(
            this.state.userId,
            this.state.longitude,
            this.state.latitude,
            this.state.propertySize,
            this.state.residentialAddress,
            this.state.durationsDays,
            this.state.minimumAmount,
            this.state.ipfsHash
          )
          .send({
            from: account[0],
            value: this.state.listingAmount,
          });
        console.log(this.state);
        history.push("/");
      });
    } catch (err) {
      console.log(err.message, "kllkjlk");

      this.setState({ buttonClass: "" });
    }
  };

  fileUpload = (event) => {
    try {
      event.preventDefault();
      const file = event.target.files[0];
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        this.setState({ buffer: Buffer(reader.result) });
        console.log("buffer", this.state.buffer);
      };
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    return (
      <form className="ui form" onSubmit={this.handleSubmit}>
        {/* <div class="ui active centered inline loader"></div> */}
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
          <label>Longitute</label>
          <input
            type="number"
            value={this.state.longitude}
            onChange={(event) => {
              this.setState({ longitude: event.target.value });
            }}
          />
        </div>
        <div className="field">
          <label>Latitude</label>
          <input
            type="number"
            value={this.state.latitude}
            onChange={(event) => {
              this.setState({ latitude: event.target.value });
            }}
          />
        </div>

        <div className="field">
          <label>property Size</label>
          <input
            type="text"
            value={this.state.propertySize}
            onChange={(event) => {
              this.setState({ propertySize: event.target.value });
            }}
          />
        </div>

        <div className="field">
          <label>Listing Amount</label>
          <input
            type="number"
            value={this.state.listingAmount}
            onChange={(event) => {
              this.setState({ listingAmount: event.target.value });
            }}
          />
        </div>

        <div className="field">
          <label>Residential Address</label>
          <input
            type="text"
            value={this.state.residentialAddress}
            onChange={(event) => {
              this.setState({ residentialAddress: event.target.value });
            }}
          />
        </div>
        <div className="field">
          <label>Durations Days</label>
          <input
            type="number"
            value={this.state.durationsDays}
            onChange={(event) => {
              this.setState({ durationsDays: event.target.value });
            }}
          />
        </div>
        <div className="field">
          <label>MinimumAmount</label>
          <input
            type="number"
            value={this.state.minimumAmount}
            onChange={(event) => {
              this.setState({ minimumAmount: event.target.value });
            }}
          />
        </div>
        <div className="field">
          <div className="ui middle aligned center aligned grid container">
            <div className="ui fluid segment">
              <input
                type="file"
                onChange={this.fileUpload}
                className="inputfile"
                id="embedpollfileinput"
              />

              <label
                htmlFor="embedpollfileinput"
                className="ui huge red right floated button"
              >
                <i className="ui upload icon"></i>
                Upload image
              </label>
            </div>
          </div>
        </div>

        <button
          className={`ui primary  button ${this.state.buttonClass}`}
          type="submit"
          value="Submit"
          style={{ marginBottom: "120px" }}
        >
          Submit
        </button>
      </form>
    );
  }
}

export default Listing;
