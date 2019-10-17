const initialState = {
  // base
  markers: [],
  soilName: null,
  distanceFromQueryLocation: null,
  soilType: null,
  site: null,
  nearestTown: null,
  region: null,
  state: null,
  latitude: null,
  longitude: null,
  locationAccuracy: null,
  dataSource: null,
  comments: null,
  xml: null
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_SOIL_DATA':
      return {
          ...state,
          soilName: action.payload.name,
          distanceFromQueryLocation: action.payload.distanceFromQueryLocation,
          soilType: action.payload.soilType,
          site: action.payload.site,
          nearestTown: action.payload.nearestTown,
          region: action.payload.region,
          state: action.payload.state,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
          dataSource: action.payload.dataSource,
          comments: action.payload.comments,
          xml: action.payload.xml
        }
    case 'CLEAR_SOIL_DATA':
      return {
        ...state,
        markers: [],
        soilName: null,
        distanceFromQueryLocation: null,
        soilType: null,
        site: null,
        nearestTown: null,
        region: null,
        state: null,
        latitude: null,
        longitude: null,
        locationAccuracy: null,
        dataSource: null,
        comments: null,
        xml: null
      }
    case 'UPDATE_MARKERS':
      return {
        ...state,
        markers: action.payload
      }
    default:
      return state
  }
};
