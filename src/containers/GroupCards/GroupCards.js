import { gql, useLazyQuery } from "@apollo/client";
import React, { memo, useEffect, useState } from "react";
import Card from "../../components/Post/Card/Card";
import GroupCards from "../../components/Post/Group-cards/GroupCards";

const FETCH_TAG = gql`
  query FetchTag($tagID: String, $last: Int) {
    posts(where: { tag: $tagID }, last: $last) {
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

const GroupCardsContainer = ({ tags, postsByTag }) => {
  const [fetchTag, { data }] = useLazyQuery(FETCH_TAG);
  const [posts, setPosts] = useState(null);
  const missingPost = tags.count - postsByTag.length;

  useEffect(() => {
    if (missingPost && missingPost > 0) {
      fetchTag({
        variables: {
          tagID: tags.slug,
          last: missingPost,
        },
      });
    }
  }, [fetchTag, missingPost, tags.slug]);

  useEffect(() => {
    if (!data || (missingPost && missingPost < 0)) return;
    const postsArr = [...postsByTag, ...data.posts.nodes];
    setPosts(postsArr);
  }, [data, postsByTag, missingPost, tags.count]);

  const renderCards = (nodes) => (
    <GroupCards
      title={tags.name}
      description={tags.description}
      length={tags.count}
    >
      {nodes.map((postByTag) => (
        <Card key={postByTag.id} data={postByTag} />
      ))}
    </GroupCards>
  );

  return posts ? renderCards(posts) : renderCards(postsByTag);
};

export default memo(GroupCardsContainer);
