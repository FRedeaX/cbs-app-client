import { urlFetchArticle } from "../../constant/api";
import {
  FETCH_PAGES_UPDATE,
  FETCH_PAGE_ERROR,
  FETCH_PAGE_START,
  FETCH_PAGE_SUCCESS,
  GET_PAGE_START,
  GET_PAGE_SUCCESS,
} from "../actionTypes";

export function getPageBySlug(type, url) {
  return (dispatch, getState) => {
    dispatch(getPageStart());
    const slug = parseUrl(url);

    const state = getState().page.pages;

    if (state) {
      let res;
      res = state.find((page) => page[0].slug === slug);

      if (res) {
        dispatch(getPostSuccess(res));
      } else {
        // в стейте нет нужного поста.res[0]
        dispatch(fetchPageBySlug(type, slug));
      }
    } else {
      // переход по ссылке напрямую стейт пуст.
      dispatch(fetchPageBySlug(type, slug));
    }
  };
}

// --------------------- // function // --------------------- //
function fetchPageBySlug(type, slug) {
  return async (dispatch, getState) => {
    dispatch(fetchPageStart());
    let data = null;
    try {
      const respons = await fetch(urlFetchArticle(type, slug));
      data = await respons.json();
      if (!data[0]) throw new Error("404");

      dispatch(fetchPageSuccess(data));

      const state = getState().page.pages;
      const pages = [];
      if (state) pages.push(...state);
      pages.push(data);

      dispatch(fetchPagesUpdate(pages));
    } catch (error) {
      dispatch(fetchPageError(error));
    }
  };
}

function parseUrl(url) {
  const parseUrl = url.split("/");
  if (parseUrl.length === 1) {
    return parseUrl[0];
  } else {
    return parseUrl[parseUrl.length - 2];
  }
}

// --------------------- // dispatchs // --------------------- //
function getPageStart() {
  return {
    type: GET_PAGE_START,
  };
}
function getPostSuccess(page) {
  return {
    type: GET_PAGE_SUCCESS,
    page,
  };
}

export function fetchPageStart() {
  return {
    type: FETCH_PAGE_START,
  };
}

export function fetchPageSuccess(page) {
  return {
    type: FETCH_PAGE_SUCCESS,
    page,
  };
}

export function fetchPageError(error) {
  return {
    type: FETCH_PAGE_ERROR,
    error,
  };
}

export function fetchPagesUpdate(pages) {
  return {
    type: FETCH_PAGES_UPDATE,
    pages,
  };
}
