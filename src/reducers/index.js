import { combineReducers } from "redux";
import rootReducer from "../redux/index.reducer";

const rootBaseReducer = combineReducers({ rootReducer });

const appReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return rootBaseReducer(state, action);
};

export default appReducer;
