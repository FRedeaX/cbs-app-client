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

const PosterRoot = ({ limitRender = false, clsItem }) => {
  const { data, loading, error } = useQuery(FETCH_POSTER);

  if (error) console.log(error);
  if (loading) return null;

  // const RenderPoster = () => {
  //   data.posters.nodes.reduce((acc, poster, index, array) => {
  //     console.log(acc);
  //     return (
  //       acc,
  //       (
  //         <div>
  //           <PosterItem key={poster.id} data={poster} />
  //           <PosterItem key={poster.id} data={array[index + 1]} />
  //         </div>
  //       )
  //     );
  //   });
  // };

  console.log("render PosterRoot");
  return data.posters.nodes.map((poster, index) => {
    if (limitRender && index + 1 > limitRender) return null;
    return <PosterItem key={poster.id} data={poster} cls={clsItem} />;
  });
};

export default memo(PosterRoot);
