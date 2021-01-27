import { useApolloClient } from "@apollo/client";
import classNamesBind from "classnames/bind";
import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { GET_ARTICLE } from "../../../containers/ModalRoot/ModalRoot";
import { classJoin, createMarkup } from "../../../helpers";
import Category from "../Category/Category";
import BookImage from "./../../book/BookImage/BookImage";
import classes from "./Card.module.css";

// const GET_ARTICLE_CONTENT = gql`
//   query GetArticleContent($id: ID!) {
//     post(id: $id, idType: ID) {
//       content
//     }
//   }
// `;

const Card = ({
  data: { id, isSticky, featuredImage, uri, title, excerpt, categories },
  horizontal,
  cls,
}) => {
  const client = useApolloClient();

  let cx = classNamesBind.bind(classes);
  // const style = [classes.item, cls];
  let location = useLocation();

  return (
    <article
      className={cx(
        {
          item: true,
          "item--horizontal": horizontal,
          sticky: isSticky,
        },
        cls
      )}
    >
      {featuredImage && (
        <div
          className={
            horizontal
              ? classJoin([classes.image, classes["image--horizontal"]])
              : classes.image
          }
        >
          <BookImage
            src={featuredImage.node.sourceUrl}
            cls={
              horizontal
                ? classJoin([classes.img, classes["img--horizontal"]])
                : classes.img
            }
          />
        </div>
      )}
      {/* <div className={classes.overlay} /> */}
      <div className={classes.info}>
        <div className={classes.text}>
          <h3 className={classes.title}>
            <Link
              to={{
                pathname: uri,
                state: {
                  background: location,
                  scrollToTop: false,
                  id,
                },
              }}
              onMouseOver={() =>
                client.query({
                  query: GET_ARTICLE,
                  variables: {
                    id,
                    type: "ID",
                    isPreview: false,
                  },
                  fetchPolicy: "cache-first",
                })
              }
              className={classes.link}
              dangerouslySetInnerHTML={createMarkup(title)}
            />
          </h3>
          <div
            className={classes.subtitle}
            dangerouslySetInnerHTML={createMarkup(excerpt)}
          />
        </div>
        <div className={classes.footer}>
          <Category data={categories} />
        </div>
      </div>
    </article>
  );
};

function areEqual(prevProps, nextProps) {
  // console.log('prevProps', prevProps.data.title);
  // console.log('nextProps', nextProps.data.title);
  if (prevProps.data.id === nextProps.data.id) {
    return true;
  }
  /*
  возвращает true, если nextProps рендерит
  тот же результат что и prevProps,
  иначе возвращает false
  */
}

export default memo(Card, areEqual);
