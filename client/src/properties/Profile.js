import React from "react";
import { Field, reduxForm } from "redux-form";
import web3 from "../getWeb3";

class Profile extends React.Component {
  state = {
    showpage: false,
    userId: "",
  };
  async componentDidMount() {
    const account = await web3.eth.getAccounts();
    const pageView = this.props.userData.filter(
      (res) => res.userAddress === account[0]
    );

    if (pageView.length) {
      this.setState({ userId: parseInt(pageView[0].userId) });
      this.setState({ showpage: true });
    }

    console.log(this.state.showpage);
  }
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""} `;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
        {/* <div className={meta.touched === true ? "ui error message" : ""}>
          {meta.touched === true ? meta.error : ""}
        </div> */}
      </div>
    );
  };

  onFormSubmit = (formValues) => {
    console.log(formValues);
    this.props.onSubmit(formValues);
  };
  render() {
    if (this.state.showpage === false) {
      return (
        <div>
          <h3>Create a Profile</h3>

          <form
            className="ui form error"
            onSubmit={this.props.handleSubmit(this.onFormSubmit)}
          >
            <Field
              name="userName"
              component={this.renderInput}
              label="Enter name"
            />
            <Field
              name="userMobile"
              component={this.renderInput}
              label="Enter Mobile"
            />
            <Field
              name="emailAddress"
              component={this.renderInput}
              label="Enter Email"
            />
            <Field
              name="userPanCrad"
              component={this.renderInput}
              label="Enter Pan Card Number"
            />
            <Field
              name="userAdharCrad"
              component={this.renderInput}
              label="Enter Adhar Card Number"
            />
            {/* <Field
          name="userAddress"
          component={this.renderInput}
          label="Enter Residential Address"
        /> */}

            <button
              style={{ marginBottom: "120px" }}
              className="ui button primary"
            >
              Submit
            </button>
          </form>
        </div>
      );
    }
    return (
      <div className="ui cards">
        <div className="card">
          <div className="content">
            <div className="header">
              User Address:
              {this.props.userData[this.state.userId - 1].userAddress}
            </div>
            <div className="meta">
              User Name:{this.props.userData[this.state.userId - 1].userName}
            </div>
            <div className="meta">
              User Email:
              {this.props.userData[this.state.userId - 1].emailAddress}
            </div>
            <div className="meta">
              User Adhar Card:
              {this.props.userData[this.state.userId - 1].userAdharCrad}
            </div>
            <div className="meta">
              User Mobile:
              {this.props.userData[this.state.userId - 1].userMobile}
            </div>
            <div className="meta">
              User PanCrad:
              {this.props.userData[this.state.userId - 1].userPanCrad}
            </div>
            <div className="description">
              {this.props.userData[this.state.userId - 1].userAddress}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const validate = (formValues) => {
  const error = {};
  if (!formValues.name) {
    error.name = "You must enter the name";
  }
  if (!formValues.description) {
    error.description = "You must enter the description";
  }
  return error;
};

export default reduxForm({
  form: "ProfileForm",
  validate: validate,
})(Profile);
