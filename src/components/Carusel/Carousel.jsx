import classNamesBind from "classnames/bind";
import React, { memo, useLayoutEffect, useRef, useState } from "react";
import { isBrowser } from 'react-device-detect';
import Button from "../UI/Button-arrow/Button";
import classes from "./Carousel.module.css";

const Carousel = ({ children, length }) => {

  const scrollRef = useRef();
  let alreadyScrolled = 0;

  const [isLeft, setLeft] = useState(false);
  const [isRight, setRight] = useState(false);
  const [isCenter, setCenter] = useState(false);

  useLayoutEffect(() => {
    if (!scrollRef.current) return;
    const scrolled = scrollRef.current;
    const wrapperWidth = scrolled.offsetWidth;
    const articleWidth = scrolled.children[0].children[0].offsetWidth;
    // const itemsWidth = scrolled.childNodes[0] && scrolled.childNodes[0].offsetWidth;
    const l = length ? length : children.length;
    
    //TODO: до выпуская раздела книг заменить 308 на вычисляемое значение 
    // решить проблему с вычислением значения при дозагрузке постов
    // console.log(wrapperWidth > (308 * l), scrolled.childNodes[0].offsetWidth);
    if (wrapperWidth > ((articleWidth + 20) * l) ) setCenter(true);// && l <= 3 похоже что она больше не нужна
    if (wrapperWidth < ((articleWidth + 20) * l) || l > 3) setRight(true);
  }, [children.length, length, setLeft, setRight]);

  const hendleScroll = (direction) => {
    if (!scrollRef.current) return;
    const scrolled = scrollRef.current;
    const article = scrolled.childNodes[0].childNodes[0];

    const scrolledOffsetW = scrolled.offsetWidth;
    const articleOffsetW = article.offsetWidth;
    const articleMargin = 20;
    const articleCountOfScreen = Math.floor(scrolledOffsetW / articleOffsetW);
    const scrollTo = (articleOffsetW + articleMargin) * articleCountOfScreen;

    if (direction === "left") alreadyScrolled -= scrollTo;
    else if (direction === "right") alreadyScrolled += scrollTo;

    scrolled.scroll({ left: alreadyScrolled, behavior: "smooth" });
  };

  const hendleScrollEvent = (event) => {
    event.stopPropagation();
    const scroll = event.target.scrollLeft;
    const scrolled = scrollRef.current;
    alreadyScrolled = scroll;
    
    if (alreadyScrolled <= 15) {
      setLeft(false);
    } else {
      setLeft(true);
    }
    
    const scrolledScrollW = scrolled.scrollWidth - scrolled.offsetWidth;
    if (alreadyScrolled >= scrolledScrollW) {
      setRight(false);
    } else {
      setRight(true);
    }
  };

  
  const cx = classNamesBind.bind(classes);
  return (
    <div className={classes.body}>
      <div className={classes.wrapper}>
        <div
          ref={scrollRef}
          onScroll={ hendleScrollEvent }
          className={ cx({
            scrolled: true,
            "scrolled--center": isCenter,
          })}
        >
          <div className={classes.items}>{children}</div>
        </div>
      </div>
      {(isLeft || isRight) && (
        <>
          <div
            className={cx({
              "shadow-left": true,
              "shadow-left--active": isLeft
            })}
          />
          <div
            className={cx({
              "shadow-right": true,
              "shadow-right--active": isRight
            })}
          />
          { isBrowser && (
            <>
              <Button
                cls={(classes["button--inActive"], classes["button-left"])}
                direction={"left"}
                isDirection={true}
                isVisible={isLeft}
                onClick={hendleScroll}
              />
              <Button
                cls={(classes["button--inActive"], classes["button-right"])}
                direction={"right"}
                isDirection={true}
                isVisible={isRight}
                onClick={hendleScroll}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default memo(Carousel);
