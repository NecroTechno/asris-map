const initialState = {
  // base
  loadingData: false,
  error: null
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_LOADING_TRUE':
      return {
          ...state,
          loadingData: true
        }
    case 'SET_LOADING_FALSE':
      return {
        ...state,
        loadingData: false
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      }
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
};
