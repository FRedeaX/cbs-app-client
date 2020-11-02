import { combineReducers } from "redux";
// import postReducer from "./reducers/post";
import UIReducer from "./reducers/UI";

export default combineReducers({
  // header: headerReducer,
  // post: postReducer,
  // page: pageReducer,
  UI: UIReducer,
});
