import * as actions from "./action-types";

export function updateSoilData(payload) {
  return {
    type: actions.UPDATE_SOIL_DATA,
    payload: payload
  };
}

export function clearSoilData() {
  return {
    type: actions.CLEAR_SOIL_DATA
  }
}

export function updateMarkers(payload) {
  return {
    type: actions.UPDATE_MARKERS,
    payload: payload
  }
}