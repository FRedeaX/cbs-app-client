// import {
//   FETCH_HEADER_ERROR,
//   FETCH_HEADER_START,
//   FETCH_HEADER_SUCCESS,
// } from "../actionTypes";

// const initialState = {
//   menus: null,
//   loading: true,
//   loaded: false,
//   error: null,
// };

// export default function headerReducers(state = initialState, action) {
//   switch (action.type) {
//     case FETCH_HEADER_START:
//       return {
//         ...state,
//         loading: true,
//         loaded: false,
//       };
//     case FETCH_HEADER_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         loaded: true,
//         menus: action.menus,
//       };
//     case FETCH_HEADER_ERROR:
//       return {
//         ...state,
//         loading: false,
//         loaded: true,
//         error: action.error,
//       };
//     default:
//       return state;
//   }
// }
