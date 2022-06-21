import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form"; //rename reducer
import propertyReducer from "./propertyReducer";

export default combineReducers({
  form: formReducer, //redux form
  property: propertyReducer,
});
