import {
  FETCH_PROFILE,
  CREATE_LISTING,
  FETCH_LISTING,
  INVEST_PROPERTY,
  FETCH_PROPERTY,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_PROFILE:
      return { ...state, profileData: action.payload };
    case FETCH_LISTING:
      return { ...state, listing: action.payload };
    // case CREATE_STREAM:
    //   return { ...state, [action.payload.id]: action.payload };
    // case EDIT_STREAM:
    //   return { ...state, [action.payload.id]: action.payload };
    // case DELETE_STREAM:
    //   return _.omit(state, action.payload);
    default:
      return state;
  }
};
