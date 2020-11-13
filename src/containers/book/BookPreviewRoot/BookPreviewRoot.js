import { gql, useQuery } from "@apollo/client";
import React, { memo } from "react";
import BookPreview from "../../../components/book/BookPreview/BookPreview";
import Loader from "../../../components/UI/Loader/Loader";
import { mainShortDataByBook } from "../root";

const FETCH_BOOKS = gql`
  query FetchBooks {
    books {
      nodes {
        ...mainShortDataByBook
        uri
      }
    }
  }
  ${mainShortDataByBook.fragments}
`;

const BookPreviewRoot = () => {
  const { data, loading, error } = useQuery(FETCH_BOOKS);

  if (loading) return <Loader isFullscreen={true} />;
  if (error) return console.error(error);

  return <BookPreview data={data.books.nodes} />;
};

export default memo(BookPreviewRoot);
