import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { useDispatch } from "react-redux";
import Button from "../../components/UI/Button/Button";
import { classJoin, createMarkup } from "../../constant/function";
import { toggleOverlay } from "../../store/action/UI";
import Content from "../Content/Content";
import Category from "../Post/Category/Category";
import SEO from "../Seo/Seo";
import Share from "../Share/Share";
import Overlay from "../UI/Overlay/Overlay";
import NotFound from "./../../components/NotFound/NotFound";
import classes from "./Modal.module.css";
// let scroll, modal, titleOffsetHeight;

const Modal = ({
  title,
  excerpt,
  content,
  image,
  categories,
  onCloseHendler,
  notFound,
}) => {
  const [isScroll, setScroll] = useState(false);

  const dispatch = useDispatch();
  const toggle = useCallback(
    (open, type) => {
      dispatch(toggleOverlay(open, type));
    },
    [dispatch]
  );

  // const modalRef = useRef(null);
  const titleRef = useRef(null);
  // const scroll = useRef(null);
  const titleOffsetHeight = useRef(null);

  useEffect(() => {
    // modal = document.querySelector(`.${classes.modal}`);
    if (titleRef.current)
      titleOffsetHeight.current = titleRef.current.offsetHeight;
    // titleOffsetHeight = document.querySelector("[data-height]").offsetHeight;
    // modalRef.current.addEventListener("scroll", hendleScroll, false);
    return () => {
      // setOpen(false); не работает
      toggle(false, "modal");
      // modal.current.removeEventListener("scroll", hendleScroll, false);
      // scroll = null;
      // modal = null;
    };
  }, [toggle]);

  const hendleScroll = (event) => {
    event.stopPropagation();
    if (!titleOffsetHeight.current) return;

    const scroll = event.target.scrollTop;
    // scroll.current = modalRef.current.scrollTop;

    if (scroll > titleOffsetHeight.current) {
      setScroll(true);
    } else {
      setScroll(false);
    }
    // setIsZoom(false);
  };

  return (
    <Fragment>
      <SEO title={title} description={excerpt} image={image} />
      <div
        // ref={modalRef}
        className={ classes.modal }
        onScroll={hendleScroll}
        onClick={ onCloseHendler }
        data-close
      >
        <div className={classes.container}>
          <div className={classes.header}>
            <div
              className={
                isScroll
                  ? classJoin([
                      classes["header-body"],
                      classes["header-body--active"],
                    ])
                  : classes["header-body"]
              }
            >
              {categories && (
                <div className={classes.category}>
                  <Category data={categories} cls={classes["category-link"]} />
                </div>
              )}
              {title && (
                <h3
                  className={classJoin([
                    classes.title,
                    classes["title--medium"],
                  ])}
                  dangerouslySetInnerHTML={createMarkup(title)}
                />
              )}
            </div>
            <Button
              cls={classes.close}
              type="button"
              onClick={onCloseHendler}
            />
          </div>
          {title && (
            <h1
              className={
                isScroll
                  ? classJoin([
                      classes.title,
                      classes["title--padding-top"],
                      classes["title--hidden"],
                    ])
                  : classJoin([classes.title, classes["title--padding-top"]])
              }
              ref={titleRef}
              dangerouslySetInnerHTML={createMarkup(title)}
            />
          )}
          {content && (
            <div className={classes.wrapper}>
              <Share
                cls={classes.share}
                clsLink={classes.link}
                title={title}
                image={image}
              />
              {/* <div
                className={classes.content}
                dangerouslySetInnerHTML={createMarkup(content)}
              /> */}
              <Content cls={ classes.content }>{content}</Content>
            </div>
          )}
          {notFound && (
            <div className={classes.content}>
              <NotFound />
            </div>
            // <Redirect to="/" />
          )}
        </div>
        <Overlay open={true} type={"modal"} noTouch={true}/>
      </div>
    </Fragment>
  );
};

export default Modal;
