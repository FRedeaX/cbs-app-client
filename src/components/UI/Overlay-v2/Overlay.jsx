import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classJoin, scrollbarWidth } from "../../../helpers";
import { toggleOverlay } from "../../../store/action/UI";
import classes from "./Overlay.module.css";

const Overlay = ({ isOpen, type, noTouch, onClick }) => {
  const overlay = useSelector((state) => state.UI.overlay);

  const dispatch = useDispatch();
  const toggle = useCallback(
    (open, type) => {
      dispatch(toggleOverlay(open, type));
    },
    [dispatch]
  );

  useEffect(() => {
    toggle(isOpen, type);
  }, [toggle, isOpen, type]);

  useEffect(() => {
    if (overlay.isOpen) addStyle();
    else removeStyle();
  }, [overlay.isOpen]);

  const addStyle = () => {
    document.body.style.overflow = "hidden";
    if (scrollbarWidth !== 0)
      document.body.style.marginRight = `${scrollbarWidth}px`;
  };
  const removeStyle = () => {
    document.body.style.overflow = "";
    document.body.style.marginRight = "";
  };

  return (
    <div
      className={
        noTouch && isOpen
          ? classJoin([
              classes.overlay,
              classes["overlay--active"],
              classes["touch--none"],
            ])
          : isOpen
          ? classJoin([classes.overlay, classes["overlay--active"]])
          : classJoin([classes.overlay, classes["touch--none"]])
      }
      style={{
        marginRight: scrollbarWidth,
      }}
      onClick={onClick}
    />
  );
};

export default Overlay;
