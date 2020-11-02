import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classJoin, throttler } from "../../constant/function";
import { setZoomImage } from "../../store/action/UI";
import classes from "./Zoom-image.module.css";
let zoom;

const ZoomImage = () => {
  const { isZoom } = useSelector((state) => state.UI.zoomImage);

  const dispatch = useDispatch();
  const setIsZoom = useCallback(
    (isOpen) => {
      dispatch(setZoomImage(isOpen));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!zoom) zoom = document.querySelector(`.${classes.zoom}`);

    const hendleScroll = () => {
      //image close
      if (zoom.children[0]) {
        setIsZoom(false);
      }
    };

    const hendleZoomImage = (event) => {
      const target = event.target;
      if (target.parentNode && target.parentNode.querySelector(".skip")) return;

      //image close
      if (zoom.children[0]) {
        event.preventDefault();
        return setIsZoom(false);
      }

      let img = null;

      const promoSelector = target.parentNode && target.parentNode.querySelector(".Promo__zoom");
      if (promoSelector && target.nodeName === "A") {
        img = document.createElement("img");
        img.srcset =
          "https://cbsbaikonur.ru/wp-content/uploads/2020/10/20201013@768.jpg 769w, https://cbsbaikonur.ru/wp-content/uploads/2020/10/20201013@1600.jpg 1600w";
        // img.sizes = "(max-width: 768px) 768px, 1600px";
        img.src =
          "https://cbsbaikonur.ru/wp-content/uploads/2020/10/20201013@1600.jpg";
        img.alt =
          "«Королева Книга» – торжественное награждение лучших читателей.";
      }

      if (target.nodeName === "IMG" || img) {
        event.preventDefault();
        const image = img ? img : target.cloneNode(false);

        // const clientWidth = document.documentElement.clientWidth / 2;
        // const clientHeight = document.documentElement.clientHeight / 2;
        // const imageX = image.x + image.naturalWidth / 2;
        // const imageY = image.y + image.naturalHeight / 2;
        // const centerX = clientWidth - imageX;
        // const centerY = clientHeight - imageY;
        // image.parentNode.style.zIndex = "2";
        // image.style.objectFit = "contain";
        // image.style.transform = `translate(${centerX}px, ${centerY}px) scale(4.5)`;
        zoom.appendChild(image);
        zoom.style.top = `${window.pageYOffset}px`;
        zoom.style.height = "100vh";
        //zoom.style.right = `${scrollbarWidth}px`; //pointer-events: none
        setIsZoom(true);
      }
    };

    const hendleCloseEsc = (event) => {
      if (event.keyCode === 27) setIsZoom(false);
    };

    window.addEventListener("scroll", () => throttler(hendleScroll), false);
    document.addEventListener("click", hendleZoomImage, false);
    window.addEventListener("keydown", hendleCloseEsc, false);
    return () => {
      window.removeEventListener("scroll", hendleScroll, false);
      document.removeEventListener("click", hendleZoomImage, false);
      window.removeEventListener("keydown", hendleCloseEsc, false);
    };
  }, [setIsZoom]);

  useEffect(() => {
    if (!isZoom && zoom.children[0]) {
      closeZoomImage();
    }
  }, [isZoom]);

  const closeZoomImage = () => {
    const timeout = setTimeout(() => {
      if (zoom.children[0]) zoom.children[0].remove();
      zoom.style.top = "";
      zoom.style.height = "";
      window.clearTimeout(timeout);
    }, 150);
  };

  return (
    <div
      className={
        isZoom
          ? classJoin([classes.zoom, classes["zoom--active"]])
          : classes.zoom
      }
    />
  );
};

export default ZoomImage;
