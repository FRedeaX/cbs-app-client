// import {
//   FETCH_HEADER_ERROR,
//   FETCH_HEADER_START,
//   FETCH_HEADER_SUCCESS,
// } from "../actionTypes";

// export function fetchHeader() {
//   return async (dispatch) => {
//     dispatch(fetchHeaderStart());
//     try {
//       const responsMain = await fetch(
//         // "/wp-json/menus/v1/menus/13/?fields=post_name,title,type,url&nested=1"
//         "/wp-json/menus/v1/menus/21/?fields=post_name,title,type,url&nested=1"
//       );
//       const dataMain = await responsMain.json();

//       const responsSecondary = await fetch(
//         // "/wp-json/menus/v1/menus/14/?fields=title,url&nested=1"
//         "/wp-json/menus/v1/menus/23/?fields=title,url&nested=1"
//       );
//       const dataSecondary = await responsSecondary.json();

//       function pathnameURL(menu) {
//         menu.map((item) => {
//           if (item.url) {
//             const url = new URL(item.url);
//             item.url = url.pathname;
//           }
//           if (item.children) {
//             item.children = pathnameURL(item.children);
//           }
//         });
//         return menu;
//       }

//       const dataPathnameURL = {
//         main: pathnameURL(dataMain),
//         secondary: pathnameURL(dataSecondary),
//       };
//       dispatch(fetchHeaderSuccess(dataPathnameURL));
//     } catch (e) {
//       dispatch(fetchHeaderError(e));
//     }
//   };
// }

// // --------------------- // dispatchs // --------------------- //
// export function fetchHeaderStart() {
//   return {
//     type: FETCH_HEADER_START,
//   };
// }

// export function fetchHeaderSuccess(menus) {
//   return {
//     type: FETCH_HEADER_SUCCESS,
//     menus,
//   };
// }

// export function fetchHeaderError(e) {
//   return {
//     type: FETCH_HEADER_ERROR,
//     e,
//   };
// }
