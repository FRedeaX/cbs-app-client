import { gql, useQuery } from "@apollo/client";
import React, { memo } from "react";
import PosterItem, { posterItem } from "../PosterItem/PosterItem";

const FETCH_POSTER = gql`
  query FetchPoster {
    posters(where: { dateQuery: { year: 2020, month: 11 } }, first: 100) {
      nodes {
        ...posterItem
      }
    }
  }
  ${posterItem.fragments}
`;

const PosterContainer = () => {
  const { data, loading, error } = useQuery(FETCH_POSTER);

  if (error) console.log(error);
  if (loading) return null;

  return data.posters.nodes.map((poster) => (
    <PosterItem key={poster.id} data={poster} />
  ));
};

export default memo(PosterContainer);
