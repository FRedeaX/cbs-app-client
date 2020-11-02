import React from "react";
import { classJoin } from "../../../../../constant/function";
import classesInfo from "../Contact-info.module.css";
import classes from "./Email.module.css";

export const Email = (props) => {
  const { email } = props;

  return (
    <div className={classesInfo.info}>
      {/* {console.log("Email")} */}
      <h4 className={classJoin([classesInfo.title, classes.title])}>E-mail</h4>
      <a href={`mailto:${email}`} className={classes.link}>
        {email}
      </a>
    </div>
  );
};
