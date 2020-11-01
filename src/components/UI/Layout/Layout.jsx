import React from "react";
import { classJoin } from "../../../constant/function";
import classes from "./Layout.module.css";

const Layout = (props) => (
  <div
    className={
      props.page ? classJoin([classes.layout, classes.page]) : classes.layout
    }
  >
    {props.children}
  </div>
);

export default Layout;
