import React from "react";
import { fetchProperty } from "../actions/index";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';
class HomeCard1 extends React.Component {
  componentDidMount() {
    this.props.fetchProperty();
  }

  cardRender() {
    return this.props.properties.slice(0, 3).map((property) => {
      return (
        <div className="column" key={property.currentPropertyId}>
          <div className="ui fluid card" style={{ height: "400px" }}>
            <div className="image">
              
              {/* <img
                src={`https://ipfs.io/ipfs/${property.ipfsHash}`}
                alt=""
              /> */}
            </div>
            <div className="content">
              <div className="header">
                {property.residentialAddress.slice(0, 20)}..
              </div>
              <div className="meta">
                <a style={{ fontWeight: "bold", color: "black" }}>
                  {(
                    (`${property.availableAmount}` /
                      `${property.listingAmount}`) *
                    100
                  ).toFixed(2)}
                  %
                </a>
              </div>
              <div className="description">{property.residentialAddress}</div>
            </div>
            <div className="extra content">
              <span className="right floated">
                <b>{property.durationsDays}</b>:Days To Go
              </span>
              <span>
                <i className="ethereum icon green"></i>
                You can Invest with <b>{property.minimumAmount}</b> WEI
              </span>
              <div className="ui two buttons">
                <Link
                  className="ui basic green button"
                  to={`/properties/investing/${property.currentPropertyId}`}
                >
                  <i className="ethereum icon"></i>
                  Invest
                </Link>
                <Link
                  className="ui basic red button"
                  to={`/properties/invest-details/${property.currentPropertyId}`}
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    if (this.props.properties) {
      return (
        <div>
          <h1 className="home-card1-header">Hurry up to get your property </h1>
          <div className="ui three column grid">{this.cardRender()}</div>
        </div>
      );
    } else {
      return <div>Loading..</div>;
    }
  }
}

const mapStateToProps = (state) => {
  return { properties: state.property.listing };
};

export default connect(mapStateToProps, { fetchProperty })(HomeCard1);
