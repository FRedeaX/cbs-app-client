import classnames from "classnames";
import React, { memo } from "react";
import classes from "./Today.module.css";

const Today = ({ className }) => {
  let tDay = 28;

  const day = new Date().getDate();

  if (tDay !== day) return null;
  return (
    <div className={classnames(className, classes.wrapper)}>
      <span className={classes.text}>
        28 января исполняется 180 лет со д.р. Василия Осиповича Ключевского
        (1841-1911) историка, профессора, академика
      </span>
    </div>
  );
};

export default memo(Today);
