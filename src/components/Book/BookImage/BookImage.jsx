import classNames from "classnames/bind";
import React, { memo, useCallback, useState } from "react";
import classes from "./Book-image.module.css";


const BookImage = ({ cls, width, height, src, alt }) => {
  const cx = classNames.bind(classes);
  const [isLoaded, setLoaded] = useState(false);

  const hendleLoad = useCallback(() => {
    setLoaded(true);
  },[setLoaded])
  
  return <img
    onLoad={ hendleLoad }
    loading="lazy"
    className={cx({img:true, loaded: isLoaded}, cls)}
    width={ width && width }
    height={ height && height }
    src={ src && src }
    alt={ alt && alt }
  />
}

// function areEqual(prevProps, nextProps) {
//   console.log('prevProps', prevProps.src);
//   console.log('nextProps', nextProps.src);
//   if (prevProps.data.id === nextProps.data.id) {
//     return true;
//   }
//   /*
//   возвращает true, если nextProps рендерит
//   тот же результат что и prevProps,
//   иначе возвращает false
//   */
// }

export default memo(BookImage);