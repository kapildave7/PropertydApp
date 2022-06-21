import React from "react";
import { connect } from "react-redux";
import Modal from "../components/Modal";
import history from "../history";
import { fetchProperty } from "../actions";

class InvestDetails extends React.Component {
  componentDidMount() {
    this.props.fetchProperty();
    console.log(this.props.match);
  }
  render() {
    if (this.props.singleProperty) {
      const property = this.props.singleProperty.filter(
        (res) => res.currentPropertyId === this.props.match.params.id
      );
      console.log(property, "j");
      return (
        <Modal
          title="Details of Property"
          property={property}
          // content={this.renderContent()}
          onDismiss={() => history.push("/")}
        />
      );
    } else {
      return <div>Loding..</div>;
    }
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return { singleProperty: state.property.listing };
};

export default connect(mapStateToProps, { fetchProperty })(InvestDetails);
