import React, { memo } from "react";
import { Link } from "react-router-dom";
import classes from "./BookItem.module.css";


const BookItem = ({node: {title, featuredImage, authors, uri}}) => {

  return <article className={ classes.book }>
    <Link className={ classes.link } to={ uri } aria-label={ `${authors.nodes[0].name} – ${title}`}/>
    <img
      className={classes.image}
      width={ featuredImage.node.mediaDetails.width }
      height={ featuredImage.node.mediaDetails.height }
      src={ featuredImage.node.sourceUrl }
      alt={ `${authors.nodes[0].name} – ${title}` }
    />
    <div className={classes.info}>
      <Link className={classes.authors} to={authors.nodes[0].uri}>{authors.nodes[0].name}</Link>
      <h3 className={classes.title}>{ title }</h3>
    </div>
  </article>
}

export default memo(BookItem);