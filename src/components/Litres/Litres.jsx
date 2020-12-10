import React from "react";
import { Link, useLocation } from "react-router-dom";
import classes from "./Litres.module.css";

const Litres = () => {
  const location = useLocation();
  return (
    <Link
      to={{
        pathname: "/post/litres-biblioteka-v-baykonure/",
        state: {
          background: location,
          scrollToTop: false,
        },
      }}
      className={classes.link}
    >
      ЛитРес
      <br />
      Библиотека
    </Link>
  );
};

export default Litres;
