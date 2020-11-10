import React, { memo } from "react";
import { Link } from "react-router-dom";
import classes from "./Book-item.module.css";


const BookItem = ({ node: { title, featuredImage, bookAuthors, uri } }) => {

  return <article className={ classes.book }>
    <Link className={ classes.link } to={ uri } aria-label={ `${bookAuthors.nodes[0] && bookAuthors.nodes[0].name} – ${title}`}/>
    <img
      className={classes.image}
      width={ featuredImage.node.mediaDetails.width }
      height={ featuredImage.node.mediaDetails.height }
      src={ featuredImage.node.sourceUrl }
      alt={ `${bookAuthors.nodes[0] && bookAuthors.nodes[0].name} – ${title}` }
    />
    <div className={classes.info}>
      {bookAuthors.nodes[0] && <Link className={classes.authors} to={bookAuthors.nodes[0].uri}>{bookAuthors.nodes[0].name}</Link>}
      <h3 className={classes.title}>{ title }</h3>
    </div>
  </article>
}

export default memo(BookItem);