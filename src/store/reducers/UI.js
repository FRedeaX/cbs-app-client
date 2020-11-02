import {
  SET_CLOSE_OVERLAY,
  SET_OPEN_OVERLAY,
  SET_ZOOM_IMAGE,
} from "../actionTypes";

const initialState = {
  overlay: {
    isOpen: false,
    type: null,
  },
  // mapLoaded: false,
  zoomImage: { isZoom: false },
};

export default function headerReducers(state = initialState, action) {
  switch (action.type) {
    case SET_OPEN_OVERLAY:
      return {
        ...state,
        overlay: action.overlay,
      };
    case SET_CLOSE_OVERLAY:
      return {
        ...state,
        overlay: action.overlay,
      };
    // case SET_API_LOADED:
    //   return {
    //     ...state,
    //     mapLoaded: action.isLoad,
    //   };
    case SET_ZOOM_IMAGE:
      return {
        ...state,
        zoomImage: action.zoomImage,
      };
    default:
      return state;
  }
}
