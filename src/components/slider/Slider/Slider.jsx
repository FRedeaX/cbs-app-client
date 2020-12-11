import React from "react";
import classes from "./Slider.module.css";

const Slider = ({ children }) => {
  return <div className={classes.wrapper}>{children}</div>;
};

export default Slider;
