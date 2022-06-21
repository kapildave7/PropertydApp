// import streams from "../apis/streams";
import history from "../history";
import { CREATE_PROFILE, FETCH_LISTING, FETCH_PROFILE } from "./types";
import property from "../property";
import web3 from "../getWeb3";

export const createProfile = (formValues) => async (dispatch) => {
  const accounts = await web3.eth.getAccounts();
  const response = await property.methods
    .profile(
      formValues.userName,
      formValues.userMobile,
      formValues.emailAddress,
      formValues.userPanCrad,
      formValues.userAdharCrad
    )
    .send({
      from: accounts[0],
    });
  dispatch({
    type: CREATE_PROFILE,
    payload: response.data,
  });
  history.push("/");
};

export const fetchProfile = () => async (dispatch) => {
  const userId = await property.methods.userId().call();
  const response = await Promise.all(
    Array(parseInt(userId))
      .fill()
      .map((element, index) => {
        return property.methods.profiles(index + 1).call();
      })
  );
  // const response = await property.methods.profiles(userId).call();

  dispatch({
    type: FETCH_PROFILE,
    payload: response,
  });
};

export const fetchProperty = () => async (dispatch) => {
  const propertyId = await property.methods.propertyId().call();

  const response = await Promise.all(
    Array(parseInt(propertyId))
      .fill()
      .map((element, index) => {
        return property.methods.listProperties(index + 1).call();
      })
  );

  dispatch({
    type: FETCH_LISTING,
    payload: response,
  });
};
