import { gql, useQuery } from "@apollo/client";
import React, { memo } from "react";
import Carousel from "../../Carusel/Carousel";
import SectionHeader from "../../SectionHeader/SectionHeader";
import PosterItem, { posterItem } from "../PosterItem/PosterItem";
import PosterList from "../PosterList/PosterList";

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

const PosterRoot = ({
  limitRender = false,
  isCarousel = false,
  isSkipPastEvent = false,
  url,
  clsHeader,
  clsItem,
}) => {
  const { data, loading, error } = useQuery(FETCH_POSTER);
  if (error) console.log(error);
  if (loading || error || data.posters.nodes) return null;

  const posters = data.posters.nodes;

  const date = new Date();
  const day = date.getDate();
  const hours = date.getHours();

  const lastPosterDay =
    posters[posters.length - 1].posterDate.date.split("/")[0] * 1;
  if (lastPosterDay < day || (lastPosterDay === day && hours > 18)) return null;

  const RenderPoster = () => {
    let index = 0;
    return posters.map((poster) => {
      const posterDate = poster.posterDate.date.split("/")[0] * 1;
      if (
        isSkipPastEvent &&
        ((limitRender && index + 1 > limitRender) ||
          posterDate < day ||
          (posterDate === day && hours > 18))
      )
        return null;
      index++;
      return <PosterItem key={poster.id} data={poster} cls={clsItem} />;
    });
  };

  // console.log("render PosterRoot");
  return (
    <>
      <SectionHeader url={url} cls={clsHeader}>
        Анонсы
      </SectionHeader>
      <PosterList>
        {isCarousel ? (
          <Carousel
            length={posters.length}
            articleWidth={window.innerWidth < 480 ? 280 : 440}
            isShadow={true}
            articleMargin={5}
            // textLog="Anons"
          >
            <RenderPoster />
          </Carousel>
        ) : (
          <RenderPoster />
        )}
      </PosterList>
    </>
  );
};

export default memo(PosterRoot);
