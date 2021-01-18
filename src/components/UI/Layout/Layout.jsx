import classNamesBind from "classnames/bind";
import React from "react";
import classes from "./Layout.module.css";

const Layout = ({ page = true, padingDisabled = false, children, cls }) => {
  const cx = classNamesBind.bind(classes);
  return (
    <div
      className={cx(
        { layout: true, page: page, "page--p-none": padingDisabled },
        cls
      )}
    >
      {children}
    </div>
  );
};

export default Layout;
