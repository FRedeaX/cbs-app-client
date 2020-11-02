import React from "react";
import { Link } from "react-router-dom";
import classes from "./../../Post/Category/Category.module.css";

const Category = ({ terms }) =>
  terms.map((term) => (
    <Link className={classes.link} key={term.id} to={term.uri}>
      {term.name}
    </Link>
  ));

export default Category;
