import { gql } from "@apollo/client";

export const mainShortDataByBook1 = {
  fragments: gql`
    fragment mainShortDataByBook on Book {
      bookAuthors(where: { orderby: TERM_ORDER }) {
        nodes {
          id
          name
          uri
        }
      }
      featuredImage {
        node {
          sourceUrl(size: THUMBNAIL)
          srcSet(size: MEDIUM)
          mediaDetails {
            height
            width
          }
        }
      }
      id
      title
    }
  `,
};

export const otherDataByBook1 = {
  fragments: gql`
    fragment otherDataByBook on Book {
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
      content
      excerpt
    }
  `,
};
