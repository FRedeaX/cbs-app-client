import classNames from "classnames";
import React from "react";
import { createMarkup } from "../../helpers";
// import { fetchHeader } from "../../store/action/header";
import "./Content.css";

const Content = ({ children, cls }) => {
  // const cx = classNamesBind.bind(classes);
 
  return (
    <div
      // ref={contentRef}
      className={classNames('content-body', cls)}
      dangerouslySetInnerHTML={createMarkup(children)}
    />
  );
};

export default Content;
