import React, { memo } from "react";
import classes from "./BookItem.module.css";


const BookItem = ({node: {title, featuredImage}}) => {

  return <article className={ classes.book }>
    <img src={featuredImage.node.sourceUrl} width={150} alt=""/>
    <span>{ title }</span>
  </article>
}

export default memo(BookItem);