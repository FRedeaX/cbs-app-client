import classNamesBind from "classnames/bind";
import React from "react";
import { createMarkup } from "../../constant/function";
// import { fetchHeader } from "../../store/action/header";
import classes from "./Content.module.css";

const Content = ({ children, cls }) => {
  const cx = classNamesBind.bind(classes);
 
  return (
    <div
      // ref={contentRef}
      className={cx(classes.body, cls)}
      dangerouslySetInnerHTML={createMarkup(children)}
    />
  );
};

export default Content;
