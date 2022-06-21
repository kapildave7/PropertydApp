import React from "react";
import { connect } from "react-redux";
import { fetchProfile } from "../actions";

import Profile from "./Profile";
import { createProfile } from "../actions";

class FetchProfile extends React.Component {
  state = {
    account: "",
    userAddress: "",
    page: false,
  };
  componentDidMount = async () => {

    this.props.fetchProfile();
  };

  onFormSubmit = (formValues) => {
    this.props.createProfile(formValues);
  };

  render() {
    if (this.props.property) {
      return (
        <div>
          <Profile
            onSubmit={this.onFormSubmit}
            userData={this.props.property}
          />
        </div>
      );
    }
    return <div>loading...</div>;
  }
}

const mapStateToProps = (state) => {
  return { property: state.property.profileData };
};

export default connect(mapStateToProps, { createProfile, fetchProfile })(
  FetchProfile
);
