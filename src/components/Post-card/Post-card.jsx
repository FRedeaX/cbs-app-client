import React from "react";
import { Link, useLocation } from "react-router-dom";
import { classJoin, createMarkup } from "../../constant/function";
import Title from "../Title/Title";
import Category from "./Category/Category";
import classes from "./Post-card.module.css";

const Post = ({ data, title }) => {
  let location = useLocation();

  function RenderPost() {
    return data.map((post) => (
      <article key={post.id} className={classes.item}>
        <Link
          to={{
            pathname: post.uri,
            state: { background: location, scrollToTop: false },
          }}
          className={classes.link}
        >
          {post.featuredImage && (
            <img
              src={post.featuredImage.sourceUrl}
              className={classes.img}
              alt=""
            />
          )}
          <div className={classes.overlay} />
          <div className={classes.text}>
            <h3
              className={classes.title}
              dangerouslySetInnerHTML={createMarkup(post.title)}
            />
            <div
              className={classes.subtitle}
              dangerouslySetInnerHTML={createMarkup(post.excerpt)}
            />
          </div>
        </Link>
        <footer className={classes.footer}>
          <Category terms={post.terms} />
        </footer>
      </article>
    ));
  }

  return (
    <section className={classes.post}>
      <header className={classes.header}>
        <Title HtmlTeg="h2">{title ? title : "Мероприятия"}</Title>
      </header>
      <div
        className={
          data.length === 1
            ? classJoin([classes.container, classes["container--one"]])
            : classes.container
        }
      >
        <RenderPost />
      </div>
    </section>
  );
};

export default Post;
