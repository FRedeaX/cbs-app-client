import classNames from "classnames/bind";
import React, { memo } from "react";
import classes from "./Book-image.module.css";


const BookImage = ({ cls, width, height, src, alt }) => {

  const cx = classNames.bind(classes);
  return <img
    className={cx({img:true}, cls)}
    width={ width && width }
    height={ height && height }
    src={ src && src }
    alt={ alt && alt }
  />
}

export default memo(BookImage);