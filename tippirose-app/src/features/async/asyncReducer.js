import { createReducer } from "../../app/util/reducerUtils";
import {
  ASYNC_ACTION_STARTS,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR
} from "./asyncConstants";

const initialState = {
  loading: false,
  elementName: null
};

const asyncActionStarted = (state, payload) => {
  return {
    ...state,
    loading: true,
    elementName: payload
  };
};

const asyncActionFinished = state => {
  return {
    ...state,
    loading: false,
    elementName: null
  };
};

const asyncActionError = state => {
  return {
    ...state,
    loading: false
  };
};

export default createReducer(initialState, {
  [ASYNC_ACTION_STARTS]: asyncActionStarted,
  [ASYNC_ACTION_FINISH]: asyncActionFinished,
  [ASYNC_ACTION_ERROR]: asyncActionError
});
