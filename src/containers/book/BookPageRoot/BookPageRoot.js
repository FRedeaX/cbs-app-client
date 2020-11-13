import { gql, useApolloClient, useQuery } from "@apollo/client";
import { memo, React, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import BookPage from "../../../components/book/BookPage/BookPage";
import { mainShortDataByBook, otherDataByBook } from "../root";

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
  const book = useRef(null);

  useEffect(() => {
    if (state && !book.current) {
      console.log("1", book.current);
      book.current = client.readFragment({
        id: `Book:${state.b_id}`,
        fragment: { ...mainShortDataByBook.fragments },
      });
    }
  }, [client, state]);

  const { data, error } = useQuery(
    book.current ? FETCH_MISSING_BOOK : FETCH_BOOK,
    {
      variables: {
        uri: `post${pathname}`,
      },
    }
  );

  if (!book.current && !data) return null;
  if (error) console.error(error);

  console.log("book", book.current);
  console.log("data", data);
  console.log("b_id", state);
  return <BookPage />;
};

// function areEqual(prevProps, nextProps) {
//   if (prevProps.book.current.id === nextProps.book.current.id) {
//     return true;
//   }
//   /*
//   возвращает true, если nextProps рендерит
//   тот же результат что и prevProps,
//   иначе возвращает false
//   */
// }

export default memo(BookPageRoot);
