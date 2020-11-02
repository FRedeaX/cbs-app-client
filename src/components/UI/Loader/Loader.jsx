import classNames from "classnames/bind";
import React from "react";
import classes from "./Loader.module.css";

const Loader = ({ cls, isFullscreen }) => {
  let cx = classNames.bind(classes);
  const clsLoader = cx({
    body: true,
    fixed: isFullscreen,
    background: isFullscreen,
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
