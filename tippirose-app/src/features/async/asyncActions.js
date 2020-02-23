import {
  ASYNC_ACTION_STARTS,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR
} from "./asyncConstants";

export const asyncActionStart = () => {
  return {
    type: ASYNC_ACTION_STARTS
  };
};

export const asyncActionFinish = () => {
  return {
    type: ASYNC_ACTION_FINISH
  };
};

export const asyncActionError = () => {
  return {
    type: ASYNC_ACTION_ERROR
  };
};
