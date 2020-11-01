import React, { Fragment } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import Library from "./components/Page/Library/Library";
import RedirectToHome from "./components/RedirectToHome";
import Category from "./containers/Category/Category";
import Header from "./containers/Header/Header";
import HomePage from "./containers/HomePage/HomePage";
import ModalRoot from "./containers/ModalRoot/ModalRoot";
import Page from "./containers/Page/Page";

// import NotFound from "./containers/NotFound/NotFound";
// import Single from "./templates/Single/Single";

const App = () => {
  return (
    <Fragment>
      <Header />
      <Route path="/post/:slug" exact component={ModalRoot} />
      <Switch>
        <Route path="/biblioteki" exact component={Library} />
        <Route path="/post/category/:slug" component={Category} />
        <Route path="/o-nas/:slug" exact component={Page} />
        <Route path="/:slug" exact component={Page} />
        <Route path="/" component={HomePage} />
        <Redirect to="/" />
      </Switch>
      <Route path="/post" exact component={RedirectToHome} />
      <Route path="/o-nas" exact component={RedirectToHome} />
    </Fragment>
  );
};

export default withRouter(App);
