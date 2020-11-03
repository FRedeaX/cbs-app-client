import classNamesBind from "classnames/bind";
import React, { useEffect, useRef, useState } from "react";
import { isBrowser } from 'react-device-detect';
import Button from "./../UI/Button-arrow/Button";
import classes from "./Carousel.module.css";

const Carousel = ({ children, length }) => {

  const scrollRef = useRef();
  let alreadyScrolled = 0;

  const [isLeft, setLeft] = useState(false);
  const [isRight, setRight] = useState(false);
  const [isCenter, setCenter] = useState(false);

  useEffect(() => {
    if (!scrollRef.current) return;
    const scrolled = scrollRef.current;
    const wrapperWidth = scrolled.offsetWidth;
    const articleWidth = scrolled.childNodes[0].childNodes[0].offsetWidth;
    const margin = 20;
    const itemsWidth = (articleWidth + margin) * length;

    if (wrapperWidth > itemsWidth) setCenter(true);
    if (wrapperWidth < itemsWidth) setRight(true);
  }, [length, setLeft, setRight]);

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
            ["scrolled--center"]: isCenter,
          })}
        >
          <div className={classes.items}>{children}</div>
        </div>
      </div>
      {(isLeft || isRight) && (
        <>
          <div
            className={cx({
              ["shadow-left"]: true,
              ["shadow-left--active"]: isLeft
            })}
          />
          <div
            className={cx({
              ["shadow-right"]: true,
              ["shadow-right--active"]: isRight
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

export default Carousel;
