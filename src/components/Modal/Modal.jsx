import React, {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Button from "../../components/UI/Button/Button";
import { classJoin, createMarkup } from "../../helpers";
import { overlayVar } from "../../store/variables/overlay";
import Content from "../Content/Content";
import SEO from "../Seo/Seo";
import Share from "../Share/Share";
import Loader from "../UI/Loader/Loader";
import NotFound from "./../../components/NotFound/NotFound";
import Category from "./../post/Category/Category";
import classes from "./Modal.module.css";
// let scroll, modal, titleOffsetHeight;

const Modal = ({
  title,
  excerpt,
  content,
  loading = false,
  image,
  categories,
  onCloseHendler,
  notFound,
}) => {
  const [isScroll, setScroll] = useState(false);

  const titleRef = useRef(null);
  const titleOffsetHeight = useRef(null);
  useEffect(() => {
    if (titleRef.current)
      titleOffsetHeight.current = titleRef.current.offsetHeight;
  }, []);

  useLayoutEffect(() => {
    overlayVar({ isOpen: true });
  }, []);

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
        className={classes.modal}
        onScroll={hendleScroll}
        onClick={onCloseHendler}
        data-close
      >
        <div className={classes.container}>
          <div
            className={classes.header}
            // style={ { right: scrollbarWidth } }
          >
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
          {(content || loading) && (
            <div className={classes.wrapper}>
              <Share
                cls={classes.share}
                clsLink={classes.link}
                title={title}
                image={image}
              />
              {loading && <Loader />}
              <Content cls={classes.content}>{content}</Content>
            </div>
          )}
          {notFound && (
            <div className={classes.content}>
              <NotFound />
            </div>
            // <Redirect to="/" />
          )}
        </div>
        {/* <Overlay open={true} type={"modal"} noTouch={true} /> */}
      </div>
    </Fragment>
  );
};

export default Modal;
