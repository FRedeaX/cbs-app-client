import {
  SET_CLOSE_OVERLAY,
  SET_OPEN_OVERLAY,
  SET_ZOOM_IMAGE,
} from "../actionTypes";

export function toggleOverlay(isOpen, type) {
  return (dispatch, getState) => {
    const state = getState().UI.overlay;

    if (state.type === null || state.type === type) {
      const overlay = { isOpen, type: isOpen ? type : null };
      if (isOpen) dispatch(setOpenOverlay(overlay));
      else dispatch(setCloseOverlay(overlay));
    }
  };
}

// export function setApiLoad(isLoad) {
//   return (dispatch) => {
//     dispatch(setApiLoaded(isLoad));
//   };
// }

export function setZoomImage(isZoom) {
  return (dispatch) => {
    dispatch(toggleZoomImage(isZoom));
  };
}

// --------------------- // dispatchs // --------------------- //
function setOpenOverlay(overlay) {
  return {
    type: SET_OPEN_OVERLAY,
    overlay,
  };
}

function setCloseOverlay(overlay) {
  return {
    type: SET_CLOSE_OVERLAY,
    overlay,
  };
}

// function setApiLoaded(isLoad) {
//   return {
//     type: SET_API_LOADED,
//     isLoad,
//   };
// }

function toggleZoomImage(isZoom) {
  return {
    type: SET_ZOOM_IMAGE,
    zoomImage: { isZoom },
  };
}
