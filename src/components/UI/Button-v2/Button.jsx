// import classnames from "classnames";
import classNames from "classnames/bind";
import React from "react";
import Loader from "../Loader/Loader";
import classes from "./Button.module.css";

const Button = ({
  cls,
  view = "default",

  type,
  onClick,
  isVisible,
  isLoading = false,
  isDisabled = false,
  children,
}) => {
  // const style = [classes.button, cls];
  // if (isVisible === false) style.push(classes.inactiv);

  // const clsInactiv = classes.inactiv;

  let cx = classNames.bind(classes);

  const btnClass = cx(cls, {
    button: true,
    inactiv: !isVisible && isLoading,
  });

  // console.log(isLoading);

  return (
    <button
      className={btnClass}
      type={type ? type : "button"}
      onClick={onClick}
      disabled={isDisabled}
    >
      {isLoading && (
        <span className={classes.loading}>
          <Loader cls={classes.loader} />
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;
