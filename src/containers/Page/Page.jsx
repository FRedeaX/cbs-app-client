import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NotFound from "../../components/NotFound/NotFound";
import SEO from "../../components/Seo/Seo";
import Layout from "../../components/UI/Layout/Layout";
import Loader from "../../components/UI/Loader/Loader";
import PageDefault from "./../../components/Page/Page/Page";

const FETCH_PAGE = gql`
  query FetchPage($pathname: ID!) {
    page(id: $pathname, idType: URI) {
      id
      title
      excerpt
      content
      template {
        ... on DefaultTemplate {
          templateName
        }
        ... on Template {
          templateName
        }
      }
    }
  }
`;

const Page = () => {
  const { pathname } = useLocation();
  const { data, loading, error } = useQuery(FETCH_PAGE, {
    variables: { pathname },
  });

  // useEffect(() => {
  //   props.getPageBySlug("pages", props.location.pathname);
  // }, [props.location.pathname]);

  useEffect(() => {
    if (!loading) document.body.style.minHeight = "";
  }, [loading]);

  if (loading) return <Loader isFullscreen={true} />;
  if (error) return <NotFound />;
  // if (!data.page) return <NotFound />;

  return (
    <>
      <SEO title={data.page.title} description={data.page.excerpt} />
      <Layout page={true}>
        {data.page.template.templateName === "Default" && (
          <PageDefault page={data.page} />
        )}
      </Layout>
    </>
  );
};

// function mapStateToProps(state) {
//   return {
//     page: state.page.page,
//     loaded: state.page.loaded,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     getPageBySlug: (type, url) => dispatch(getPageBySlug(type, url)),
//   };
// }

export default Page;
