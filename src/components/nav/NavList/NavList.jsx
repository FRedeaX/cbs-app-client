import classNamesBind from "classnames/bind";
import React from "react";
import classes from "./Nav-list.module.css";

export const NavList = ({ children, direction = "row" }) => {
  const cx = classNamesBind.bind(classes);

  return (
    <ul
      className={cx({
        body: true,
        ["row"]: direction === "row",
        ["column"]: direction === "column",
      })}
    >
      {children}
    </ul>
  );
};
