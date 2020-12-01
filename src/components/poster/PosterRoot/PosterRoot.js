import { gql, useQuery } from "@apollo/client";
import React, { memo } from "react";
import PosterContainer from "../PosterContainer/PosterContainer";
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

const PosterRoot = () => {
  const { data, loading, error } = useQuery(FETCH_POSTER);

  if (error) console.log(error);
  if (loading) return null;

  const RenderPoster = (array) => {
    console.log(array);
    let r;
    for (let index = 0; index < array.length; index++) {
      const poster = array[index];
      r += <PosterItem key={poster.id} data={poster} />;
    }
    console.log(r);
    return r;
  };

  return (
    <PosterContainer>
      {/* {data.posters.nodes.map((poster) => (
        <PosterItem key={poster.id} data={poster} />
      ))} */}
      <RenderPoster array={data.posters.nodes} />
    </PosterContainer>
  );
};

export default memo(PosterRoot);
