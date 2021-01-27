import { useQuery } from "@apollo/client";
import classnames from "classnames";
import React, { memo, useLayoutEffect } from "react";
import { scrollbarWidth } from "../../../helpers";
import { delay } from "../../../helpers/delay";
import { GET_OVERLAY, overlayVar } from "../../../store/variables/overlay";
import classes from "./Overlay.module.css";

const Overlay = ({ isTouch = false }) => {
  const {
    data: {
      overlay: { isOpen, zIndex },
    },
  } = useQuery(GET_OVERLAY);

  useLayoutEffect(() => {
    if (isOpen) addStyle();
    else delay(150).then(() => removeStyle());
  }, [isOpen]);

  const addStyle = () => {
    document.body.style.overflow = "hidden";
    if (scrollbarWidth !== 0)
      document.body.style.marginRight = `${scrollbarWidth}px`;
  };
  const removeStyle = () => {
    document.body.style.overflow = "";
    document.body.style.marginRight = "";
  };

  // console.log("O_Render");
  return (
    <div
      className={classnames(classes.overlay, {
        [classes["overlay--active"]]: isOpen,
        [classes["touch--none"]]: isTouch,
      })}
      style={{
        zIndex: zIndex,
      }}
      onClick={() => overlayVar({ isOpen: false })}
    />
  );
};

export default memo(Overlay);
