import React, { Fragment, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classJoin, scrollbarWidth } from "../../../helpers";
import { toggleOverlay } from "../../../store/action/UI";
import classes from "./Overlay.module.css";

const Overlay = (props) => {
  const { open, type, noTouch, onClick } = props;

  const overlay = useSelector((state) => state.UI.overlay);

  const dispatch = useDispatch();
  const toggle = useCallback(
    (open, type) => {
      dispatch(toggleOverlay(open, type));
    },
    [dispatch]
  );

  useEffect(() => {
    toggle(open, type);
  }, [toggle, open, type]);

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
    <Fragment>
      <div
        className={
          noTouch && open
            ? classJoin([
                classes.overlay,
                classes["overlay--active"],
                classes["touch--none"],
              ])
            : open
            ? classJoin([classes.overlay, classes["overlay--active"]])
            : classJoin([classes.overlay, classes["touch--none"]])
        }
        style={{
          marginRight: scrollbarWidth,
        }}
        onClick={onClick}
      />
    </Fragment>
  );
};

export default Overlay;
