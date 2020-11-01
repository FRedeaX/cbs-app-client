import PropTypes from "prop-types";
import React from "react";
import { Helmet } from "react-helmet";

function SEO({ description, lang, meta, title, image }) {
  const metaDescription = description;
  //Новости, анонсы, мероприятия, книжные новинки библиотек города Байконур
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title ? title : "Библиотеки города Байконур"}
      titleTemplate={
        !title
          ? "Библиотеки города Байконур"
          : `%s | Библиотеки города Байконур`
      }
      meta={[
        {
          name: `description`,
          content: metaDescription
            ? metaDescription
            : "Новости, анонсы, мероприятия, книжные новинки библиотек города Байконур",
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: image,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        // {
        //   name: `twitter:card`,
        //   content: `summary`,
        // },
        // {
        //   name: `twitter:creator`,
        //   content: "",
        // },
        // {
        //   name: `twitter:title`,
        //   content: title,
        // },
        // {
        //   name: `twitter:description`,
        //   content: metaDescription,
        // },
      ].concat(meta)}
    />
  );
}

SEO.defaultProps = {
  lang: `ru`,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
};

export default SEO;
