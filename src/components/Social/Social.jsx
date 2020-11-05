import React from "react";
import classes from "./Social.module.css";

const Share = ({ type, url, cls, clsLink, clsSVG }) => {
  const style = [cls, clsLink, classes.link];
  const styleSVG = [clsSVG, classes.svg];

  return (
    <a
      className={style.join(" ")}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg className={styleSVG.join(" ")} viewBox="0 0 28 28">
        <use href={`#${type}--inline`} />
      </svg>
    </a>
  );
};
export default Share;
