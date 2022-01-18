import { combineReducers } from "redux";
import invoice from "./invoiceReducer";
import auth from "./authReducer";
import client from "./clientReducer";
import toastrMessage from "./ToastrMessageReducer";

export default combineReducers({
  invoice,
  client,
  auth,
  toastrMessage
});