// import {
//   FETCH_POSTS_ERROR,
//   FETCH_POSTS_START,
//   FETCH_POSTS_SUCCESS,
//   FETCH_POSTS_TOTAL_PAGES,
//   FETCH_POST_ERROR,
//   FETCH_POST_START,
//   FETCH_POST_SUCCESS,
//   GET_POST_START,
//   GET_POST_SUCCESS,
// } from "../actionTypes";

// const initialState = {
//   posts: null,
//   post: null,
//   totalPages: null,
//   postEnd: false,
//   loaded: false,
//   error: null,
// };

// export default function postReducer(state = initialState, action) {
//   switch (action.type) {
//     case FETCH_POSTS_START:
//       return {
//         ...state,
//         loaded: false,
//       };
//     case FETCH_POST_START:
//       return {
//         ...state,
//         loaded: false,
//       };
//     case GET_POST_START:
//       return {
//         ...state,
//         loaded: false,
//       };
//     case FETCH_POSTS_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         posts: action.posts,
//       };
//     case FETCH_POSTS_ERROR:
//       return {
//         ...state,
//         loading: false,
//         error: action.error,
//       };
//     case FETCH_POST_ERROR:
//       return {
//         ...state,
//         loading: false,
//         error: action.error,
//       };
//     case FETCH_POSTS_TOTAL_PAGES:
//       return {
//         ...state,
//         totalPages: action.totalPages,
//       };

//     case GET_POST_SUCCESS:
//       return {
//         ...state,
//         post: action.post,
//         loaded: true,
//       };
//     case FETCH_POST_SUCCESS:
//       return {
//         ...state,
//         post: action.post,
//         loaded: true,
//       };
//     default:
//       return state;
//   }
// }

// // --------------------- // селекторы // --------------------- //
// export function getPost(state, slug) {
//   return state.post.posts.find((post) => {
//     return post.slug === slug;
//   });
// }
