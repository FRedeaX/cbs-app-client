import React, { memo } from "react";
import classes from "./Button.module.css";

const Button = ({ cls, type, onClick, direction, isDirection, isVisible }) => {
  const style = [cls, classes[`arrow--${direction}`], classes.contols];
  if (isVisible) style.push(classes.visible);

  return (
    <>
      {/* {console.log(`render Button-arrow: ${direction}`)} */}
      <button
        className={style.join(" ")}
        type={type ? type : "button"}
        onClick={isDirection ? () => onClick(direction) : onClick}
      />
    </>
  );
};
// function areEqual(prevProps, nextProps) {
  // if (prevProps.isVisible === nextProps.isVisible) return true;
  /*
  возвращает true, если nextProps рендерит
  тот же результат что и prevProps,
  иначе возвращает false
  */
// }
export default memo(Button);
