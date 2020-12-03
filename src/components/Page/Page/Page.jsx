import React from "react";
import Content from "../../Content/Content";
import classes from "./Page.module.css";

const Page = (props) => {
  const { title, content } = props.page;

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>{title}</h1>
      <div className={classes.content}>
        {/* <Share cls={classes.share} /> */ }
        <Content>{content}</Content>
      </div>
    </div>
  );
};

export default Page;
