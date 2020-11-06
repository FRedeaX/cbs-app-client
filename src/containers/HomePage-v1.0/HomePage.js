import { gql, useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useRef } from "react";
import SEO from "../../components/Seo/Seo";
import Layout from "../../components/UI/Layout/Layout";
import Post from "./../../components/Post-a/Post";
import Loader from "./../../components/UI/Loader/Loader";

const GET_ARTICLES = gql`
  query GetArticles($cursor: String) {
    posts(after: $cursor, first: 10) {
      nodes {
        id
        title
        excerpt
        uri
        featuredImage {
          sourceUrl(size: THUMBNAIL)
        }
        terms {
          ... on Category {
            id
            name
            uri
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
// books {
//   nodes {
//     id
//     title
//     uri
//     featuredImage {
//       sourceUrl(size: THUMBNAIL)
//     }
//     terms {
//       ... on Category {
//         id
//         name
//         uri
//       }
//     }
//   }
//   pageInfo {
//     hasNextPage
//     endCursor
//   }
// }

const HomePage = () => {
  // useEffect(() => {
  //   if (props.posts === null) {
  //     props.fetchPosts("posts", 1);
  //   }
  // }, []);

  const { data, loading, error, fetchMore } = useQuery(GET_ARTICLES);

  let isLoaded = useRef(true);
  const fetchMoreArticles = useCallback(
    () =>
      fetchMore({
        query: GET_ARTICLES,
        variables: {
          cursor: data.posts.pageInfo.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const previousNodes = previousResult.posts.nodes;
          const newNodes = fetchMoreResult.posts.nodes;
          const newPageInfo = fetchMoreResult.posts.pageInfo;

          const newResult = { ...previousResult };
          newResult.posts = {
            nodes: [...previousNodes, ...newNodes],
            pageInfo: newPageInfo,
          };
          return newResult;
        },
      }),
    [data, fetchMore]
  );

  useEffect(() => {
    //console.log("data update");
    isLoaded.current = true;
  }, [data]);

  const handleOnScrollHome = useCallback(
    (event) => {
      event.stopPropagation();
      if (!data) return;
      const scrolledToBottom =
        Math.ceil(window.scrollY + window.innerHeight * 2) >=
        document.body.scrollHeight;
      if (
        scrolledToBottom &&
        isLoaded.current &&
        data.posts.pageInfo.hasNextPage
      ) {
        isLoaded.current = false;
        fetchMoreArticles();
        //console.log("load");
      }
    },
    [data, fetchMoreArticles]
  );

  useEffect(() => {
    //console.log("1");
    window.addEventListener("scroll", handleOnScrollHome);
    return () => window.removeEventListener("scroll", handleOnScrollHome);
  }, [handleOnScrollHome, data, fetchMore]);

  useEffect(() => {
    if (!loading) document.body.style.minHeight = "";
  }, [loading]);

  if (loading) return <Loader />;
  if (error) return console.error(error);

  return (
    <>
      <SEO />
      <Layout>
        <Post data={data.posts.nodes} />
      </Layout>
    </>
  );
};

// function mapStateToProps(state) {
//   return {
//     posts: state.post.posts,
//     totalPages: state.post.totalPages,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     fetchPosts: (type, page) => dispatch(fetchPosts(type, page)),
//   };
// }

export default HomePage;
