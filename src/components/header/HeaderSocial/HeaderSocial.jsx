import classNames from "classnames";
import React, { memo } from "react";
import Social from "../../Social-v2/Social";
import classes from "./Header-social.module.css";

const HeaderSocial = ({ isMobile }) => {
  return (
    <div
      className={classNames({
        [classes["wrapper_desktop"]]: !isMobile,
        [classes["wrapper_mobile"]]: isMobile,
      })}
    >
      <Social
        type={"vk"}
        url={"https://vk.com/cbsbaikonur"}
        clsSVG={classNames([classes.svg, classes["svg--vk"]])}
      />
      <Social
        type={"ok"}
        url={"https://ok.ru/vbibliotek"}
        clsSVG={classNames([classes.svg, classes["svg--ok"]])}
      />
      <Social
        type={"youtube"}
        url={"https://www.youtube.com/channel/UC0o0y_ci_obgPga8Wnlq0aA/"}
        clsSVG={classNames([classes.svg, classes["svg--youtube"]])}
      />
    </div>
  );
};

export default memo(HeaderSocial);