import { gql, useQuery } from "@apollo/client";

const FETCH_BOOKS = gql`
  query FetchBooks {
    books {
      nodes {
        id
        title
        uri
        authors {
          nodes {
            id
            name
            uri
          }
        }
        genres {
          nodes {
            id
            name
            uri
          }
        }
        years {
          nodes {
            id
            name
            uri
          }
        }
        publishers {
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

  console.log(data);
  return null;
};

export default BookContainer;
