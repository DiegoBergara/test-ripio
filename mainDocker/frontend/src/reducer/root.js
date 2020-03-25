import { combineReducers } from "redux";
import user from "./user";
import accounts from "./accounts";
import currency from "./currency";
import transaction from "./transaction";

export default combineReducers({
  //reducers here
  user,
  accounts,
  currency,
  transaction
});
