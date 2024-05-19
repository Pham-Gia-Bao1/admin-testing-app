import { combineReducers } from "redux";
import postReducer from "./posts/reducer";

const rootReducer = combineReducers({ post: postReducer });

export default rootReducer;
