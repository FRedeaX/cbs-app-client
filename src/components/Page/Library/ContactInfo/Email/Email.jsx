import React from "react";
import classesInfo from "../Contact-info.module.css";

export const Email = ({ email, cls }) => {

  return (
    <div className={classesInfo.info}>
      {/* {console.log("Email")} */}
      {/* <h4 className={classJoin([classesInfo.title, classes.title])}>E-mail</h4> */}
      <h4 className={classesInfo.title}>E-mail</h4>
      <a href={`mailto:${email}`} className={cls}>
        {email}
      </a>
    </div>
  );
};
