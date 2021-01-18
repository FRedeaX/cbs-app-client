import React from "react";
import { withRouter } from "react-router-dom";
import classes from "./App.module.css";
import Footer from "./components/Footer/Footer";
import ZoomImage from "./components/Zoom-image/Zoom-image";
import Header from "./containers/Header/Header";
import { Router } from "./containers/Router/Router";

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
        <Router />
      </main>
      <ZoomImage />
      <Footer />
    </>
  );
};

export default withRouter(App);
