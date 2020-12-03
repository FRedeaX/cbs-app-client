import { gql, useApolloClient, useLazyQuery } from "@apollo/client";
import React, { memo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { mainShortDataByBook, otherDataByBook } from "../root";
import BookPage from "./../../../components/Book/BookPage/BookPage";

const FETCH_BOOK = gql`
  query FetchBook($uri: ID!) {
    book(id: $uri, idType: URI) {
      ...mainShortDataByBook
      ...otherDataByBook
    }
  }
  ${mainShortDataByBook.fragments}
  ${otherDataByBook.fragments}
`;

const FETCH_MISSING_BOOK = gql`
  query FetchMissingBook($uri: ID!) {
    book(id: $uri, idType: URI) {
      ...otherDataByBook
    }
  }
  ${otherDataByBook.fragments}
`;

const BookPageRoot = () => {
  const { pathname, state } = useLocation();
  const client = useApolloClient();
  const [book, setBook] = useState(null);
  const [fetchBook, { data, loading, error }] = useLazyQuery(
    book ? FETCH_MISSING_BOOK : FETCH_BOOK
  );

  useEffect(() => {
    if (state && !book) {
      const b = client.readFragment({
        id: `Book:${state.b_id}`,
        fragment: { ...mainShortDataByBook.fragments },
      });
      setBook(b);
    }

    fetchBook({
      variables: {
        uri: `post${pathname}`,
      },
    });
  }, [state, book, client, fetchBook, pathname]);

  useEffect(() => {
    if (!loading) document.body.style.minHeight = "";
  }, [loading]);

  if (!book && !data) return null;
  if (error) console.error(error);
  const dataBook = data ? { ...book, ...data.book } : { ...book };

  // console.log("book", book);
  // console.log("data", data);
  return <BookPage data={dataBook} />;
  // return data ? (
  //   <BookPage data={{ ...book, ...data.book }} />
  // ) : (
  //   <BookPage data={{ ...book }} />
  // );
};

// function areEqual(prevProps, nextProps) {
//   if (prevProps.book.id === nextProps.book.id) {
//     return true;
//   }
//   /*
//   возвращает true, если nextProps рендерит
//   тот же результат что и prevProps,
//   иначе возвращает false
//   */
// }

export default memo(BookPageRoot);
