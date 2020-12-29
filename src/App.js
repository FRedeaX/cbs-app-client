import React from "react";
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  withRouter,
} from "react-router-dom";
import classes from "./App.module.css";
import Footer from "./components/Footer/Footer";
import Library from "./components/Page/Library/Library";
import PosterPage from "./components/poster/PosterPage/PosterPage";
import RedirectToHome from "./components/RedirectToHome";
import ZoomImage from "./components/Zoom-image/Zoom-image";
import BookPageRoot from "./containers/book/BookPageRoot/BookPageRoot";
import Category from "./containers/Category/Category";
import Header from "./containers/Header/Header";
import HomePage from "./containers/HomePage/HomePage";
import ModalRoot from "./containers/ModalRoot/ModalRoot";
import Page from "./containers/Page/Page";

// export const windowWidthVar = makeVar(window.innerWidth);
const App = () => {
  // const overlay = useSelector((state) => state.UI.overlay);

  //   useEffect(() => {
  //     // console.log("1");
  //     // setTimeout(() => {
  //     // console.log("2");
  //     // windowWidthVar(window.innerWidth);
  //     // }, 2000);

  // }, []);
  // window.addEventListener("resize", () => {
  //   console.log("3");
  //   windowWidthVar(window.innerWidth);
  // });

  return (
    <>
      <Header />
      <main className={classes.main}>
        <ModalSwitch />
      </main>
      <ZoomImage />
      <Footer />
    </>
  );
};

const locationInitial = {
  hash: "",
  pathname: "/",
  search: "",
  state: undefined,
};

function ModalSwitch() {
  const location = useLocation();
  const pathnameSplit = location.pathname.split("/");
  let background;

  // //console.log(
  //   !location.state,
  //   pathnameSplit[2] !== "category",
  //   pathnameSplit[1] === "post",
  //   overlay.isOpen //undefined
  // );

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

  // useEffect(() => {
  //   const hendleScroll = () => {
  //     console.log("main");
  //   };
  //   window.addEventListener("scroll", hendleScroll);
  //   return () => window.removeEventListener("scroll", hendleScroll);
  // }, []);

  return (
    <>
      <Switch location={background || location}>
        <Route path="/" exact component={HomePage} />
        <Route path="/post" exact component={RedirectToHome} />
        <Route path="/post/category" exact component={RedirectToHome} />
        <Route path="/post/category/:slug" component={Category} />
        <Route path="/post/:slug" component={ModalRoot} />

        <Route path="/book" exact component={RedirectToHome} />
        <Route path="/book/:slug" component={BookPageRoot} />

        <Route path="/poster" component={PosterPage} />

        <Route path="/biblioteki" component={Library} />
        <Route path="/:slug" component={Page} />
        <Redirect to="/" />
      </Switch>
      {background && <Route path="/post/:slug" component={ModalRoot} />}
    </>
  );
}

export default withRouter(App);
