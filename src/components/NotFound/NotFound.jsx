import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import SEO from "../Seo/Seo";
import Layout from "../UI/Layout/Layout";

const NotFound = () => {
  return (
    <Fragment>
      <SEO title={"Страница не найдена"} />
      <Layout>
        <h5
          style={{
            paddingTop: 10,
          }}
        >
          Страница не найдена
        </h5>
        <NavLink to={"/"} className="Notfound">
          Вернутся на Главную
        </NavLink>
      </Layout>
    </Fragment>
  );
};

export default NotFound;
