import * as actions from "./action-types";

export function setLoadingTrue() {
  return {
    type: actions.SET_LOADING_TRUE
  };
}

export function setLoadingFalse() {
  return {
    type: actions.SET_LOADING_FALSE
  }
}

export function setError(payload) {
  return {
    type: actions.SET_ERROR,
    payload: payload
  }
}

export function clearError() {
  return {
    type: actions.CLEAR_ERROR
  }
}