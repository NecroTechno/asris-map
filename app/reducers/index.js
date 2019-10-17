import {combineReducers} from 'redux';
import baseReducer from './baseReducer'
import soilReducer from './soilReducer/soilReducer'
import storage from 'redux-persist/lib/storage';

/**
 * This file is for combining reducers from different components across the whole application.
 */
const appReducer = combineReducers({baseReducer, soilReducer});

const rootReducer = (state, action) => {
  if (action.type === 'HARD_RESET') {
    storage.removeItem('persist:root')
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;
