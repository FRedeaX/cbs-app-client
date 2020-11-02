import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// let isPost = false;
let __scrollToTop__ = true;
export const setScrollToTop = (bool) => {
  __scrollToTop__ = bool;
};

export const ScrollToTop = () => {
  const location = useLocation();

  //console.log("useHistory", useHistory());
  //console.log("useLocation", useLocation());
  //console.log("useParams", useParams());
  //console.log("useRouteMatch", useRouteMatch());
  useEffect(() => {
    const scrollToTop = location.state && location.state.scrollToTop;
    //console.log("useLocation", location);

    // if (scrollToTop === false) {
    //   return;
    // }

    if (scrollToTop === false || __scrollToTop__ === false) {
      setScrollToTop(true);
      return;
    }

    window.scrollTo(0, 0);
    // const pathnameSplit = pathname.split("/");
    // // if (!(pathnameSplit[1] === "post" && pathnameSplit.length === 3) && !isPost)
    // if (
    //   !(pathnameSplit[1] === "post" && pathnameSplit[2] !== "category") &&
    //   !isPost
    // )
    //   window.scrollTo(0, 0);

    // isPost = false;

    // //открыто модальное окно с постом
    // // if (pathnameSplit[1] === "post" && pathnameSplit.length === 3) {
    // if (pathnameSplit[1] === "post" && pathnameSplit[2] !== "category") {
    //   isPost = true;
    // console.log("11");
    // }
  }, [location]);

  return null;
};
