import React, { useEffect, useRef, useState } from "react";
import { isBrowser } from 'react-device-detect';
import { classJoin } from "../../../constant/function";
import Button from "./../../UI/Button-arrow/Button";
import classes from "./GroupCards.module.css";

const GroupCards = ({ children, title, description, length }) => {

  const scrollRef = useRef();
  let alreadyScrolled = 0;

  const [isLeft, setLeft] = useState(false);
  const [isRight, setRight] = useState(false);
  // const [alreadyScrolled, setAlreadyScrolled] = useState(0);

  useEffect(() => {
    if (length > 3) {
      setRight(true);
    }
  }, [length, setLeft, setRight]);

  // useEffect(() => {
  //   console.log('1');
  // },[alreadyScrolled])

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
    // console.log(alreadyScrolled);

    // scrolled.scroll(alreadyScrolled, 0);
    scrolled.scroll({ left: alreadyScrolled, behavior: "smooth" });
    // scrolled.scrollLeft = alreadyScrolled;
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

  return (
    <div className={ classes.container }>
      {/* {console.log("render GroupCards")} */}
      <div className={classes.head}>
        <h3 className={classes.title}>{title}</h3>
        <span className={classes.description}>{description}</span>
      </div>
      <div className={classes["scroll-body"]}>
        <div className={classes["wrapper-cards"]}>
          <div
            ref={scrollRef}
            onScroll={hendleScrollEvent}
            className={
              length < 4
                ? classJoin([classes.scrolled, classes["scrolled--center"]])
                : classes.scrolled
            }
          >
            <div className={classes.items}>{children}</div>
          </div>
        </div>
        {children.length > 3 && (
          <>
            <div
              className={
                isLeft
                  ? classJoin([
                      classes["shadow-left"],
                      classes["shadow-left--active"],
                    ])
                  : classes["shadow-left"]
              }
            />
            <div
              className={
                isRight
                  ? classJoin([
                      classes["shadow-right"],
                      classes["shadow-right--active"],
                    ])
                  : classes["shadow-right"]
              }
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
    </div>
  );
};

export default GroupCards;
