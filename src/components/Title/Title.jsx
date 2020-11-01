import React, { Fragment } from "react";
import classes from "./Title.module.css";

export const SUBTITLE = "SUBTITLE";

const Title = (props) => {
  const { type, HtmlTeg, children, cls } = props;
  const style = [cls, classes.subtitle];
  return (
    <Fragment>
      {type === SUBTITLE ? (
        <HtmlTeg className={style.join(" ")}>{children}</HtmlTeg>
      ) : (
        <HtmlTeg className={classes.title}>{children}</HtmlTeg>
      )}
    </Fragment>
  );
};
export default Title;
