import classNamesBind from "classnames/bind";
import React, { memo } from "react";
import classes from "./Layout.module.css";

const Layout = ({
  page = true,
  padingDisabled = false,
  padingTop = true,
  children,
  cls,
}) => {
  const cx = classNamesBind.bind(classes);
  return (
    <div
      className={cx(
        {
          layout: true,
          page: page,
          "page--p-none": padingDisabled,
          top: padingTop,
        },
        cls
      )}
    >
      {children}
    </div>
  );
};

export default memo(Layout);
