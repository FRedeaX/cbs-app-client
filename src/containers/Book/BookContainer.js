import { gql, useQuery } from "@apollo/client";
import React, { memo } from "react";
import Book from "../../components/Book/Book";
import Loader from "../../components/UI/Loader/Loader";

const FETCH_BOOKS = gql`
  query FetchBooks {
    books {
      nodes {
        bookAuthors(where: { orderby: TERM_ORDER }) {
          nodes {
            id
            name
            uri
          }
        }
        bookGenres {
          nodes {
            id
            name
            uri
          }
        }
        bookPublishers {
          nodes {
            id
            name
            uri
          }
        }
        bookYears {
          nodes {
            id
            name
            uri
          }
        }
        featuredImage {
          node {
            sourceUrl(size: THUMBNAIL)
            mediaDetails {
              height
              width
            }
          }
        }
        id
        title
        uri
      }
    }
  }
`;

const BookContainer = () => {
  const { data, loading, error } = useQuery(FETCH_BOOKS);

  if (loading) return <Loader isFullscreen={true} />;
  if (error) return console.error(error);

  return <Book data={data.books.nodes} />;
};

export default memo(BookContainer);
