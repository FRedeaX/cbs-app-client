import classNamesBind from "classnames/bind";
import React, { memo, useLayoutEffect, useRef, useState } from "react";
import { isBrowser } from "react-device-detect";
import Button from "../UI/Button-arrow/Button";
import classes from "./Carousel.module.css";

const Carousel = ({
  children,
  length,
  articleWidth,
  articleMargin,
  isShadow = true,
  textLog,
}) => {
  const scrollRef = useRef();
  const alreadyScrolledRefVar = useRef(0);

  const [isLeft, setLeft] = useState(false);
  const [isRight, setRight] = useState(false);
  const [isCenter, setCenter] = useState(false);

  useLayoutEffect(() => {
    if (!scrollRef.current) return;
    const scrolled = scrollRef.current;
    const wrapperWidth = scrolled.offsetWidth;
    // const articleWidth = scrolled.children[0].children[0].offsetWidth;
    // const itemsWidth = scrolled.childNodes[0] && scrolled.childNodes[0].offsetWidth;
    const l = length ? length : children.length;

    //TODO: до выпуская раздела книг заменить 308 на вычисляемое значение
    // решить проблему с вычислением значения при дозагрузке постов
    // console.log(wrapperWidth > (308 * l), scrolled.childNodes[0].offsetWidth);
    if (wrapperWidth > (articleWidth + 20) * l) setCenter(true); // && l <= 3 похоже что она больше не нужна
    if (wrapperWidth < (articleWidth + 20) * l || l > 3) setRight(true);
  }, [children.length, length, articleWidth, setLeft, setRight]);

  const hendleClick = (direction) => {
    if (!scrollRef.current) return;
    console.log("1");
    const scrolled = scrollRef.current;
    // const article = scrolled.childNodes[0].childNodes[0];

    const scrolledOffsetW = scrolled.offsetWidth;
    // console.log(scrolledOffsetW);

    const articleCountOfScreen = Math.floor(scrolledOffsetW / articleWidth);
    // console.log(articleCountOfScreen);
    const scrollTo = (articleWidth + articleMargin * 2) * articleCountOfScreen;

    if (direction === "left") alreadyScrolledRefVar.current -= scrollTo;
    else if (direction === "right") alreadyScrolledRefVar.current += scrollTo;

    scrolled.scroll({
      left: alreadyScrolledRefVar.current,
      behavior: "smooth",
    });

    if (alreadyScrolledRefVar.current < 5) setLeft(false);
    else setLeft(true);

    const scrolledScrollW = scrolled.scrollWidth - scrolled.offsetWidth;
    if (alreadyScrolledRefVar.current >= scrolledScrollW) {
      setRight(false);
    } else {
      setRight(true);
    }
  };

  const hendleScroll = (event) => {
    event.stopPropagation();
    if (!scrollRef.current) return;

    const scrolled = scrollRef.current;
    alreadyScrolledRefVar.current = scrolled.scrollLeft;

    if (alreadyScrolledRefVar.current < 5) setLeft(false);
    else setLeft(true);

    const scrolledScrollW = scrolled.scrollWidth - scrolled.offsetWidth;
    // console.log(alreadyScrolled, scrolledScrollW);
    if (alreadyScrolledRefVar.current >= scrolledScrollW) {
      setRight(false);
    } else {
      setRight(true);
    }
  };

  // console.log('render Carousel: ', textLog, length);
  const cx = classNamesBind.bind(classes);
  return (
    <div className={classes.body}>
      <div className={classes.wrapper}>
        <div
          ref={scrollRef}
          onWheel={hendleScroll}
          className={cx({
            scrolled: true,
            "scrolled--center": isCenter,
          })}
        >
          <div className={classes.items}>{children}</div>
        </div>
      </div>
      {(isLeft || isRight) && isShadow && isBrowser && (
        <>
          <div
            className={cx({
              "shadow-left": true,
              "shadow-left--active": isLeft && isShadow,
            })}
          />
          <div
            className={cx({
              "shadow-right": true,
              "shadow-right--active": isRight && isShadow,
            })}
          />
          {isBrowser && (
            <>
              <Button
                cls={(classes["button--inActive"], classes["button-left"])}
                direction={"left"}
                isDirection={true}
                isVisible={isLeft}
                onClick={hendleClick}
              />
              <Button
                cls={(classes["button--inActive"], classes["button-right"])}
                direction={"right"}
                isDirection={true}
                isVisible={isRight}
                onClick={hendleClick}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

function areEqual(prevProps, nextProps) {
  return prevProps.children.length === nextProps.children.length;
}

export default memo(Carousel, areEqual);
