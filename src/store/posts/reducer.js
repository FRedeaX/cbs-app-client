import {
  FETCH_POST_ERROR,
  FETCH_POST_START,
  FETCH_POST_SUCCESS,
} from "../actionTypes";

const initialState = {
  posts: null,
  loading: true,
  error: null,
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POST_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.posts,
      };
    case FETCH_POST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

// --------------------- // селекторы // --------------------- //
export function getPost(state, slug) {
  console.log(slug);

  return state.post.posts.find((item) => item.slug === slug);
}
