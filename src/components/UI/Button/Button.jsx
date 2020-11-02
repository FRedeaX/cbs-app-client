import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  const cls = [props.cls, classes.close];

  return (
    <button
      className={cls.join(" ")}
      type={ props.type }
      onClick={props.onClick}
      data-close
    />
  );
};

export default Button;
