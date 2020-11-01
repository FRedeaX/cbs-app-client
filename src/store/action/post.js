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
// import { urlFetchArticle, urlFetchArticles } from "./../../constant/api";

// export function fetchPosts(type, page) {
//   return async (dispatch, getState) => {
//     dispatch(fetchPostsStart());
//     try {
//       const respons = await fetch(
//         // `/wp-json/wp/v2/posts/?page=${page}&_embed=wp:term,wp:featuredmedia`
//         urlFetchArticles(type, page, ["wp:term", "wp:featuredmedia"])
//       );
//       const data = deconstructJson(await respons.json());
//       const state = getState().post;

//       if (!state.totalPages) {
//         dispatch(fetchPostsEnd(respons.headers.get("X-WP-TotalPages")));
//       }

//       const post = [];
//       if (state.posts) post.push(...state.posts);

//       post.push(data);
//       dispatch(fetchPostsSuccess(post, page));
//     } catch (e) {
//       dispatch(fetchPostsError(`fetchPosts Error: ${e}`));
//     }
//   };
// }

// export function getPostBySlug(type, slug) {
//   return (dispatch, getState) => {
//     dispatch(getPostStart());

//     const state = getState().post.posts;
//     if (state) {
//       let res, pageIndex;
//       res = state.map((page, index) =>
//         page.find((post) => {
//           if (post.slug === slug) pageIndex = index;
//           return post.slug === slug;
//         })
//       );

//       if (res[pageIndex]) {
//         dispatch(getPostSuccess(res[pageIndex]));
//       } else {
//         // в стейте нет нужного поста.res[0]
//         dispatch(fetchPostBySlug(type, slug));
//       }
//     } else {
//       // переход по ссылке напрямую стейт пуст.
//       dispatch(fetchPostBySlug(type, slug));
//     }
//   };
// }

// // export function fetchPostsMedia(type, page) {
// //   return async (dispatch, getState) => {
// //     dispatch(fetchPostsStart());
// //     try {
// //       const respons = await fetch(
// //         urlFetchArticles(type, page, ["wp:term", "wp:featuredmedia"])
// //       );
// //       const data = deconstructJson(await respons.json());
// //       const state = getState().post;

// //       if (!state.totalPages) {
// //         dispatch(fetchPostsEnd(respons.headers.get("X-WP-TotalPages")));
// //       }

// //       const post = [];
// //       if (state.posts) post.push(...state.posts);

// //       post.push(data);
// //       dispatch(fetchPostsSuccess(post, page));
// //     } catch (e) {
// //       dispatch(fetchPostsError(`fetchPosts Error: ${e}`));
// //     }
// //   };
// // }

// // --------------------- // Category // --------------------- //
// // export function getPostByCategory(type, slug, id) {
// //   return (dispatch, getState) => {
// //     if (id) {
// //       //console.log(type, slug, id);
// //     } else {
// //       //console.log(type, slug);
// //     }
// //   };
// // }

// // function fetchPostsByCategory(type, page) {
// //   return async (dispatch, getState) => {
// //     dispatch(fetchPostsByCategoryStart());
// //     try {
// //       const respons = await fetch(
// //         urlFetchArticleByCategory(type, page, ["wp:term", "wp:featuredmedia"])
// //       );
// //       const data = deconstructJson(await respons.json());
// //       const state = getState().post;

// //       if (!state.totalPages) {
// //         dispatch(
// //           fetchPostsByCategoryEnd(respons.headers.get("X-WP-TotalPages"))
// //         );
// //       }

// //       const post = [];
// //       if (state.posts) post.push(...state.posts);

// //       post.push(data);
// //       dispatch(fetchPostsByCategorySuccess(post, page));
// //     } catch (e) {
// //       dispatch(fetchPostsByCategoryError(`fetchPosts Error: ${e}`));
// //     }
// //   };
// // }

// // --------------------- // function // --------------------- //
// function fetchPostBySlug(type, slug) {
//   return async (dispatch) => {
//     dispatch(fetchPostStart());
//     try {
//       const respons = await fetch(urlFetchArticle(type, slug, ["wp:term"]));
//       // const data = await respons.json();
//       const data = deconstructJson(await respons.json());
//       dispatch(fetchPostSuccess(data[0]));
//     } catch (e) {
//       dispatch(fetchPostError(e));
//     }
//   };
// }

// function deconstructJson(data) {
//   return data.map((post) =>
//     Object.keys(post).reduce((acc, key) => {
//       if (
//         key === "id" ||
//         key === "slug" ||
//         key === "title" ||
//         key === "content" ||
//         key === "excerpt" ||
//         key === "_embedded"
//       ) {
//         // if (key === "title" || key === "content" || key === "excerpt")
//         //   return { ...acc, [key]: post[key].rendered };
//         // else
//         return { ...acc, [key]: post[key] };
//       } else {
//         return acc;
//       }
//     }, {})
//   );
// }

// // --------------------- // dispatchs // --------------------- //
// function fetchPostsStart() {
//   return {
//     type: FETCH_POSTS_START,
//   };
// }

// function fetchPostsSuccess(posts, page) {
//   return {
//     type: FETCH_POSTS_SUCCESS,
//     posts,
//   };
// }

// function fetchPostsError(e) {
//   return {
//     type: FETCH_POSTS_ERROR,
//     e,
//   };
// }

// function fetchPostsEnd(totalPages) {
//   return {
//     type: FETCH_POSTS_TOTAL_PAGES,
//     totalPages,
//   };
// }

// function getPostStart() {
//   return {
//     type: GET_POST_START,
//   };
// }
// function getPostSuccess(post) {
//   return {
//     type: GET_POST_SUCCESS,
//     post,
//   };
// }

// function fetchPostStart() {
//   return {
//     type: FETCH_POST_START,
//   };
// }

// function fetchPostSuccess(post) {
//   return {
//     type: FETCH_POST_SUCCESS,
//     post,
//   };
// }

// function fetchPostError(e) {
//   return {
//     type: FETCH_POST_ERROR,
//     e,
//   };
// }
