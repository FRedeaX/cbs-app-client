import { gql, useQuery } from "@apollo/client";
import React, { memo } from "react";
import Book from "../../components/Book/Book";

const FETCH_BOOKS = gql`
  query FetchBooks {
    books {
      nodes {
        authors {
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
        genres {
          nodes {
            id
            name
            uri
          }
        }
        id
        publishers {
          nodes {
            id
            name
            uri
          }
        }
        title
        uri
        years {
          nodes {
            id
            name
            uri
          }
        }
      }
    }
  }
`;

const BookContainer = () => {
  const { data, loading, error } = useQuery(FETCH_BOOKS);

  if (loading) return null;
  if (error) return console.error(error);

  return <Book data={data.books.nodes} />;
};

export default memo(BookContainer);
