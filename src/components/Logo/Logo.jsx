import React from "react";
import { NavLink } from "react-router-dom";
import { classJoin } from "../../constant/function";
import classes from "./Logo.module.css";

const Logo = () => (
  <NavLink to="/" className={classes.logo} activeClassName="active-logo">
    <img
      width="80" height="80"
      className={classJoin([classes.img, "skip"])}
      src={`${window.location.origin}${process.env.PUBLIC_URL}/new-emblem-cbs-3-100x100.png`}
      alt="Эмблема ГКУ ЦБС"
      srcSet={`${window.location.origin}${process.env.PUBLIC_URL}/new-emblem-cbs-3-100x100.webp`}
    />
  </NavLink>
);

export default Logo;
