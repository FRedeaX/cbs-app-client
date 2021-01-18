import React from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import Library from "./../../components/Page/Library/Library";
import PosterPage from "./../../components/poster/PosterPage/PosterPage";
import RedirectToHome from "./../../components/RedirectToHome";
import Category from "./../Category/Category";
import HomePage from "./../HomePage/HomePage";
import ModalRoot from "./../ModalRoot/ModalRoot";
import Page from "./../Page/Page";

const locationInitial = {
  hash: "",
  pathname: "/",
  search: "",
  state: null,
};

export const Router = () => {
  const location = useLocation();
  const pathnameSplit = location.pathname.split("/");
  let background;

  // без этой проверки location.pathname.split("/")[2] !== "category"
  // невозможно пройти по пути "/post/category/:slug"
  // если переход к этой ссылке произошел из вне или по нажатию на рубрику в посте
  if (location.state) background = location.state.background;
  else if (
    !location.state &&
    pathnameSplit[2] !== "category" &&
    pathnameSplit[1] === "post"
    // overlay.isOpen
  )
    background = locationInitial;

  return (
    <>
      <Switch location={background || location}>
        {/* <Route path="/book" exact component={RedirectToHome} /> */}
        <Route exact path="/post" component={RedirectToHome} />
        <Route exact path="/post/category" component={RedirectToHome} />
        <Route exact path="/o-nas" component={RedirectToHome} />
        <Route
          exact
          path="/svedeniya-ob-organizaczii/"
          component={RedirectToHome}
        />
        <Route
          exact
          path="/svedeniya-ob-organizaczii/dokumentatsiya/"
          component={RedirectToHome}
        />

        <Route exact path="/" component={HomePage} />
        <Route path="/post/category/:slug" component={Category} />
        <Route path="/post/:slug" component={ModalRoot} />
        {/* <Route path="/book/:slug" component={BookPageRoot} /> */}
        <Route path="/poster" component={PosterPage} />
        <Route path="/biblioteki" component={Library} />
        <Route path="/:slug" component={Page} />
        <Redirect to="/" />
      </Switch>
      {background && <Route path="/post/:slug" component={ModalRoot} />}
    </>
  );
};
