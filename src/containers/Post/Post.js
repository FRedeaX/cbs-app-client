import { gql, useQuery } from "@apollo/client";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import Button from "../../components/UI/Button-v2/Button";
import Loader from "../../components/UI/Loader/Loader";
import Post from "./../../components/post/Post/Post";
import classes from "./Post.module.css";

const FETCH_ARTICLES = gql`
  query FetchArticles($cursor: String, $first: Int) {
    posts(after: $cursor, first: $first) {
      nodes {
        categories {
          nodes {
            id
            name
            uri
          }
        }
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
            count
            description
            id
            name
            slug
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
  }
`;

// const FETCH_PAGINATIONS = gql`
//   query FetchPaginations($cursor: String) {
//     posts(after: $cursor, first: 100) {
//       edges {
//         cursor
//       }
//     }
//   }
// `;
const PostContainer = () => {
  const { data, loading, error, fetchMore } = useQuery(FETCH_ARTICLES, {
    variables: {
      first: 15,
    },
  });

  // const { data: dataPagination } = useQuery(FETCH_PAGINATIONS);

  const [isMoreLoad, setIsMoreLoad] = useState(false);

  let isLoaded = useRef(true);
  const fetchMoreArticles = useCallback(
    () =>
      fetchMore({
        query: FETCH_ARTICLES,
        variables: {
          cursor: data.posts.pageInfo.endCursor,
          first: 20,
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
    isLoaded.current = true;
  }, [data]);

  const handleOnScrollHome = useCallback(
    (event) => {
      event.stopPropagation();
      if (!data) return;
      if (!isMoreLoad) return;

      const scrolledToBottom =
        Math.ceil(window.scrollY + window.innerHeight * 3) >=
        document.body.scrollHeight;

      if (
        scrolledToBottom &&
        isLoaded.current &&
        data.posts.pageInfo.hasNextPage
      ) {
        isLoaded.current = false;
        fetchMoreArticles();
      }
    },
    [data, fetchMoreArticles, isMoreLoad]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleOnScrollHome);
    return () => window.removeEventListener("scroll", handleOnScrollHome);
  }, [handleOnScrollHome]);

  useEffect(() => {
    if (!loading) document.body.style.minHeight = "";
  }, [loading]);

  if (loading) return <Loader isFullscreen={true} isBackground1={true} />;
  if (error) return console.error(error);

  const hendleMoreLoad = () => {
    setIsMoreLoad(true); //data и так перерендерит компонент [проверить с обычной переменной]
    if (!loading) fetchMoreArticles();
  };

  return (
    <>
      {/* {console.log("render PostRoot")} */}
      {/* <Layout page={true}> */}
      <Post data={data.posts.nodes} />
      {
        <Button
          cls={classes["more-load"]}
          isVisible={!isMoreLoad}
          isDisabled={isMoreLoad}
          onClick={hendleMoreLoad}
        >
          Все записи
        </Button>
      }
      {/* </Layout> */}
    </>
  );
};

export default memo(PostContainer);
