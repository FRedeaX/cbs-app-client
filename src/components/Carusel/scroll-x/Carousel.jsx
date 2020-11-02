import React from "react";
import classes from "./Carousel.module.css";

const Carousel = (props) => (
  <div className={classes.container}>
    <ul className={classes.scroll}>
      <li className={classes.item}>1</li>
      <li className={classes.item}>2</li>
      <li className={classes.item}>3</li>
      <li className={classes.item}>4</li>
      <li className={classes.item}>5</li>
      <li className={classes.item}>6</li>
    </ul>
  </div>
);

export default Carousel;
