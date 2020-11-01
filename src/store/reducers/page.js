import {
  FETCH_PAGES_UPDATE,
  FETCH_PAGE_ERROR,
  FETCH_PAGE_START,
  FETCH_PAGE_SUCCESS,
  GET_PAGE_START,
  GET_PAGE_SUCCESS,
} from "../actionTypes";

const initialState = {
  pages: null,
  page: null,
  loaded: false,
  error: null,
};

export default function pageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PAGE_START:
      return {
        ...state,
        page: null,
        loaded: false,
      };
    case GET_PAGE_SUCCESS:
      return {
        ...state,
        page: action.page,
        loaded: true,
      };

    case FETCH_PAGE_START:
      return {
        ...state,
        loaded: false,
      };
    case FETCH_PAGE_SUCCESS:
      return {
        ...state,
        loaded: true,
        page: action.page,
      };
    case FETCH_PAGE_ERROR:
      return {
        ...state,
        loaded: false,
        error: action.error,
      };

    case FETCH_PAGES_UPDATE:
      return {
        ...state,
        pages: action.pages,
      };
    default:
      return state;
  }
}
