import classNames from "classnames/bind";
import React from "react";
import classes from "./Loader.module.css";

const Loader = ({ cls, isFullscreen, isBackground1 = false  }) => {
  let cx = classNames.bind(classes);
  const clsLoader = cx({
    body: true,
    fixed: isFullscreen,
    background: isFullscreen,
    "background-1": isBackground1
  });
  return (
    <div className={clsLoader}>
      <div className={classNames(classes.container, cls)}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loader;
