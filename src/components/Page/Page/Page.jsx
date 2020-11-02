import React from "react";
import { createMarkup } from "./../../../constant/function";
import classes from "./Page.module.css";

const Page = (props) => {
  const { title, content } = props.page;

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>{title}</h1>
      <div className={classes.content}>
        {/* <Share cls={classes.share} /> */}
        <div dangerouslySetInnerHTML={createMarkup(content)} />
      </div>
    </div>
  );
};

export default Page;
