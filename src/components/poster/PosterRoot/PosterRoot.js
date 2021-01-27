import { gql, useLazyQuery } from "@apollo/client";
import React, { memo, useEffect, useState } from "react";
import { delay } from "../../../helpers/delay";
import {
  getLocalStorage,
  setLocalStorage,
} from "../../../helpers/localStorage";
import Carousel from "../../Carusel/Carousel";
import SectionHeader from "../../SectionHeader/SectionHeader";
import PosterItem, { posterItem } from "../PosterItem/PosterItem";
import PosterList from "../PosterList/PosterList";

const FETCH_POSTER = gql`
  query FetchPoster {
    posters(where: { dateQuery: { year: 2021, month: 1 } }, first: 10) {
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
  const [fetchPoster, { data, error }] = useLazyQuery(FETCH_POSTER);

  const [poster, setPoster] = useState(null);
  useEffect(() => {
    getLocalStorage("poster").then(
      (result) => {
        if (result.posters.nodes.length) setPoster(result);
        delay(800).then(() => fetchPoster());
      },
      () => fetchPoster()
    );
  }, [fetchPoster]);

  useEffect(() => {
    if (!data) return;
    setLocalStorage("poster", data);
  }, [data]);

  if (error) return console.log(error);
  // if (loading || error) return null;

  const dataPosters = poster ? poster : data;
  if (!dataPosters) return null;
  const posters = dataPosters.posters.nodes;

  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();

  const lastPoster = posters[posters.length - 1].posterDate.date;
  const lastPosterDay = lastPoster.split("/")[0] * 1;
  const lastPosterMonth = lastPoster.split("/")[1] * 1;
  if (
    (lastPosterDay < day || (lastPosterDay === day && hours > 18)) &&
    lastPosterMonth === month
  )
    return null;

  const RenderPoster = () => {
    let index = 0;
    return posters.map((poster) => {
      const posterDate = poster.posterDate.date;
      const posterDay = posterDate.split("/")[0] * 1;
      const posterMonth = posterDate.split("/")[1] * 1;
      // console.log(
      //   posterMonth === month ||
      //     (isSkipPastEvent &&
      //       ((limitRender && index + 1 > limitRender) ||
      //         posterDay < day ||
      //         (posterDay === day && hours > 18)))
      // );
      if (
        (limitRender && index + 1 > limitRender) ||
        (isSkipPastEvent &&
          posterMonth === month &&
          (posterDay < day || (posterDay === day && hours > 18)))
      )
        return null;
      index++;
      return <PosterItem key={poster.id} data={poster} cls={clsItem} />;
    });
  };

  // console.log(windowWidthVar());
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
