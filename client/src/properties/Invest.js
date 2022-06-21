import React from "react";
import { Link } from "react-router-dom";
import { fetchProperty } from "../actions";
import { connect } from "react-redux";

class Invest extends React.Component {
  state;
  async componentDidMount() {
    this.props.fetchProperty();
  }

  renderItems() {
    if (this.props.propertyList) {
      return this.props.propertyList.map((res) => {
        return (
          <div className="two column grid" key={res.currentPropertyId}>
            <div className="column">
              <div className="ui cards">
                <div className="card">
                  <div className="content">
                    <div className="header">
                      Address:{res.residentialAddress}
                    </div>

                    <div className="meta">
                      Listing Amt:{res.listingAmount} Wei
                    </div>
                    <div className="meta">
                      Availble Amt: {res.availableAmount}
                    </div>
                    <div className="meta">Long:{res.longitude}</div>
                    <div className="meta">Lati:{res.latitude}</div>
                    <div className="description">
                      Description:{res.description}
                    </div>
                    <div className="ui two buttons">
                      <Link
                        className="ui basic green button"
                        to={`/properties/investing/${res.currentPropertyId}`}
                      >
                        <i className="ethereum icon"></i>
                        Invest
                      </Link>
                      <Link
                        className="ui basic red button"
                        to={`/properties/invest-details/${res.currentPropertyId}`}
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return <div>Loading...</div>;
    }
  }

  render() {
    if (this.props.propertyList) {
      return <div className="ui three column grid">{this.renderItems()}</div>;
    } else {
      return <div>Loading..</div>;
    }
  }
}

const mapStateToProps = (state) => {
  console.log(state.property.listing);
  return { propertyList: state.property.listing };
};

export default connect(mapStateToProps, { fetchProperty })(Invest);
