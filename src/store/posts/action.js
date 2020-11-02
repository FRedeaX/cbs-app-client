import {
  FETCH_POST_ERROR,
  FETCH_POST_START,
  FETCH_POST_SUCCESS,
} from "../actionTypes";

export function fetchPosts() {
  return async (dispatch) => {
    dispatch(fetchPostStart());
    try {
      const respons = await fetch(
        "/wp-json/wp/v2/posts/?_embed=wp:term,wp:featuredmedia"
      );
      const data = await respons.json();
      const posts = data;
      dispatch(fetchPostSuccess(posts));
    } catch (e) {
      dispatch(fetchPostError(e));
    }
  };
}

// --------------------- // dispatchs // --------------------- //
export function fetchPostStart() {
  return {
    type: FETCH_POST_START,
  };
}

export function fetchPostSuccess(posts) {
  return {
    type: FETCH_POST_SUCCESS,
    posts,
  };
}

export function fetchPostError(e) {
  return {
    type: FETCH_POST_ERROR,
    e,
  };
}
