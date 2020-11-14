import { gql, useQuery } from "@apollo/client";
import React, { Fragment, useCallback, useEffect, useRef } from "react";
import NotFound from "../../components/NotFound/NotFound";
import Post from "../../components/post/Post/Post";
import SEO from "../../components/Seo/Seo";
import Layout from "../../components/UI/Layout/Layout";
import Loader from "../../components/UI/Loader/Loader";

const GET_ARTICLES_BY_CATEGORY = gql`
  query GetArticlesByCategory($slug: String!, $cursor: String) {
    categories(where: { slug: [$slug] }) {
      nodes {
        posts(first: 20, after: $cursor) {
          nodes {
            categories {
              nodes {
                id
                name
                uri
              }
            }
            date
            excerpt
            featuredImage {
              node {
                sourceUrl(size: THUMBNAIL)
              }
            }
            id
            isSticky
            tags {
              nodes {
                id
                name
                description
              }
            }
            title
            uri
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
        name
        description
      }
    }
  }
`;

const Category = (props) => {
  const { slug } = props.match.params;
  const { data, loading, error, fetchMore } = useQuery(
    GET_ARTICLES_BY_CATEGORY,
    {
      variables: { slug },
    }
  );

  let isLoaded = useRef(true);
  const fetchMoreArticles = useCallback(
    () =>
      fetchMore({
        query: GET_ARTICLES_BY_CATEGORY,
        variables: {
          slug,
          cursor: data.categories.nodes[0].posts.pageInfo.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const previousNodes = previousResult.categories.nodes[0].posts.nodes;
          const newNodes = fetchMoreResult.categories.nodes[0].posts.nodes;
          const newPageInfo =
            fetchMoreResult.categories.nodes[0].posts.pageInfo;
          const newResult = { ...previousResult, ...fetchMoreResult };
          newResult.categories.nodes[0].posts = {
            nodes: [...previousNodes, ...newNodes],
            pageInfo: newPageInfo,
          };
          return newResult;
        },
      }),
    [data, fetchMore, slug]
  );

  useEffect(() => {
    //console.log("data update");
    isLoaded.current = true;
  }, [data]);

  const handleOnScrollCategory = useCallback((event) => {
    event.stopPropagation();
    if (!data) return;
    const scrolledToBottom =
      Math.ceil(window.scrollY + window.innerHeight * 3) >=
      document.body.scrollHeight;
    if (
      scrolledToBottom &&
      isLoaded.current &&
      data.categories.nodes[0].posts.pageInfo.hasNextPage
    ) {
      isLoaded.current = false;
      fetchMoreArticles(isLoaded.current);
    }
  }, [data, fetchMoreArticles]);

  useEffect(() => {
    window.addEventListener("scroll", handleOnScrollCategory);
    return () => window.removeEventListener("scroll", handleOnScrollCategory);
  }, [handleOnScrollCategory, data, fetchMore, slug]);

  useEffect(() => {
    if (!loading) document.body.style.minHeight = "";
  }, [loading]);

  if (loading) return <Loader />;
  if (error) return console.error(error);
  if (data.categories.nodes.length === 0) return <NotFound />;

  return (
    <Fragment>
      <SEO
        title={
          data.categories.nodes[0].description
            ? data.categories.nodes[0].description
            : "default"
        }
      />
      <Layout page={true}>
        {/* <Layout> */}
        <Post
          data={data.categories.nodes[0].posts.nodes}
          title={
            data.categories.nodes[0].description
              ? data.categories.nodes[0].description
              : data.categories.nodes[0].name
          }
          groupCards={false}
        />
        {/* <button onClick={hendleFetchMore}>Load</button> */}
        {/* </Layout> */}
      </Layout>
    </Fragment>
  );
};

export default Category;
