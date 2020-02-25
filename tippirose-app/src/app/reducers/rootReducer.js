import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
//import { reducer as ToastrReducer } from "react-redux-toastr";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import { reducer as ToastrReducer } from "react-redux-toastr";

import modalReducer from "../../features/Modals/modalReducer"
import productReducer from "../../pages/Admin/Product/productReducer"
import asyncReducer from "../../features/async/asyncReducer"
import vipReducer from "../../pages/TippiVipAcount/vipReducer"

const appReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  form: FormReducer,
  modals: modalReducer,
  toastr: ToastrReducer,
  product: productReducer,
  async: asyncReducer,
  vip: vipReducer

});
const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer;
