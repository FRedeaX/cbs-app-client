import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import classes from "./Category.module.css";

const Category = ({ data, cls }) => {
  return data.nodes.map((term) => {
    if (term.name === "slider") return null;
    return (
      <Link
        className={classNames(classes.link, { [cls]: cls })}
        key={term.id}
        to={term.uri}
      >
        {term.name}
      </Link>
    );
  });
};

export default Category;
