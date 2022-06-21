import React from "react";
import ReactDOM from "react-dom";
import history from "../history";

const Modal = (props) => {
  console.log(props, "modal");
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="ui dimmer modals visible active">
      <div
        onClick={(e) => e.stopPropagation()}
        className="ui standard modal  visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">
          <div className="ui items">
            <div className="item">
              <div className="image">
                <img
                  src={`https://ipfs.io/ipfs/${props.property[0].ipfsHash}`}
                  alt=""
                />
              </div>
              <div className="content">
                <a className="header">
                  Address:{props.property[0].residentialAddress}
                </a>
                <div className="meta">
                  <span>{props.property[0].description}</span>
                </div>
                <div className="description">
                  <p>longitude: {props.property[0].longitude}</p>
                  <p>latitude: {props.property[0].latitude}</p>
                  <p>Listing Amt: {props.property[0].listingAmount}</p>
                  <p>Availble Amt: {props.property[0].availableAmount}</p>
                  <p>
                    Minium Contribution Amt: {props.property[0].minimumAmount}
                  </p>
                </div>
                <div className="extra">
                  Property Size: {props.property[0].propertySize}
                </div>
              </div>
            </div>
          </div>

          <button
            style={{ marginBottom: "20px" }}
            onClick={() => history.push("/")}
            className="ui button negative right floated"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
