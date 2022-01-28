import { combineReducers } from "redux";
import filters from "./filterReducer";
import invoice from "./invoiceReducer";
import auth from "./authReducer";
import client from "./clientReducer";
import company from "./companyReducer";
import toastrMessage from "./ToastrMessageReducer";

export default combineReducers({
  filters,
  invoice,
  client,
  company,
  auth,
  toastrMessage
});