import React from "react";
import {
  Redirect,
  Route,
  // BrowserRouter as Router,
  Switch,
  useHistory,
  // Link,
  // useHistory,
  useLocation,
} from "react-router-dom";
import Library from "./components/Page/Library/Library";
import Category from "./containers/Category/Category";
import Header from "./containers/Header/Header";
import HomePage from "./containers/HomePage/HomePage";
import ModalRoot from "./containers/ModalRoot/ModalRoot";
import Page from "./containers/Page/Page";

export default function ModalGalleryExample() {
  return <ModalSwitch />;
}

const locationInitial = {
  hash: "",
  pathname: "/",
  search: "",
  state: undefined,
};

function ModalSwitch() {
  const location = useLocation();
  const history = useHistory();
  let background;

  // let background = location.state && location.state.background;

  if (location.state) background = location.state.background;
  else if (!location.state && history.length === 1)
    background = locationInitial;

  return (
    <div>
      <Header />
      <Switch location={background || location}>
        <Route path="/" exact component={HomePage} />
        <Route path="/post/category/:slug" component={Category} />
        <Route path="/post/:slug" component={ModalRoot} />

        <Route path="/biblioteki" exact component={Library} />
        <Route path="/:slug" component={Page} />
        <Redirect to="/" />
      </Switch>
      <Route path="/post" exact component={RedirectToHome} />
      <Route path="/o-nas" exact component={RedirectToHome} />

      {background && <Route path="/post/:slug" component={ModalRoot} />}
    </div>
  );
}
