import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import Category from "../Category/Category";
import { classJoin, createMarkup } from "./../../../constant/function";
import classes from "./Card.module.css";

const Card = ({ data, horizontal, cls }) => {
  const style = [classes.item, cls];
  let location = useLocation();
  return (
    <article
      className={
        horizontal
          ? classJoin([classes.item, classes["item--horizontal"]])
          : style.join(" ")
      }
    >
      {data.featuredImage && (
        <div
          className={
            horizontal
              ? classJoin([classes.image, classes["image--horizontal"]])
              : classes.image
          }
        >
          <img
            // src={data.featuredImage.sourceUrl}
            src={data.featuredImage.node.sourceUrl}
            className={
              horizontal
                ? classJoin([classes.img, classes["img--horizontal"]])
                : classes.img
            }
            alt=""
          />
        </div>
      )}
      {/* <div className={classes.overlay} /> */}
      <div className={classes.info}>
        <div className={classes.text}>
          <h3 className={classes.title}>
            <Link
              to={{
                pathname: data.uri,
                state: {
                  background: location,
                  scrollToTop: false,
                  // postData: data,
                },
              }}
              className={classes.link}
              dangerouslySetInnerHTML={createMarkup(data.title)}
            />
          </h3>
          <div
            className={classes.subtitle}
            dangerouslySetInnerHTML={createMarkup(data.excerpt)}
          />
        </div>
        <div className={classes.footer}>
          <Category data={data.categories} />
        </div>
      </div>
    </article>
  );
};

export default memo(Card);
