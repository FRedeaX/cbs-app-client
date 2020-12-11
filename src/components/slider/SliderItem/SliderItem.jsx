import React from "react";
import classes from "./Slider-item.module.css";

const SliderItem = ({ c }) => {
  return <div className={classes.wrapper} style={{ backgroundColor: c }}></div>;
};

export default SliderItem;
