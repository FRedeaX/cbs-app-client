import React, { Fragment, memo, useCallback, useEffect, useState } from "react";
import GroupCardsContainer from "../../containers/Post/GroupCards/GroupCards";
import SectionHeader from "../SectionHeader/SectionHeader";
import Card from "./Card/Card";
import classes from "./Post.module.css";

const Post = ({ data, title, groupCards = true }) => {
  let index = 0;
  const arrTags = [];
  // const date = data[0].date.split("T")[0].split("-")[2];
  // const limitDate = 7;

  // const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const innerWidth = window.innerWidth;
  const [isTwoColumns, setTwoColumns] = useState(null);
  
  const windowSize = useCallback(() => {
    if (innerWidth > 652 && innerWidth < 768 && !isTwoColumns) {
      setTwoColumns(true);
    } else if ((innerWidth <= 652 || innerWidth >= 768) && isTwoColumns) {
      setTwoColumns(false);
    }
  }, [innerWidth, isTwoColumns])
  
  useEffect(() => {
    windowSize()
  }, [windowSize, innerWidth, isTwoColumns, setTwoColumns]);

  // useEffect(() => {
  //   let timeout;
  //   const hendleResize = () => {
  //     if (!timeout) {
  //       timeout = setTimeout(function () {
  //         timeout = null;
  //         setInnerWidth(window.innerWidth);
  //       }, 150);
  //     }
  //   }
  //   window.addEventListener("resize", hendleResize, false);
  //   return () => window.removeEventListener("resize", hendleResize,false);
  // },[])

  const filterPostsByTag = (tags) =>
    data.filter((post) =>
      post.tags.nodes[0] && post.tags.nodes[0].id === tags.id);

  const indexIncrement = (isIncrement) => {
    if (isIncrement) index++
    else index = 0
  }
  
  const RenderPostAndGroupCards = () => {
    return data.map((post) => {
      const tags = post.tags.nodes[0];
      const isNewRow = !(index % 2);

      if (tags) {
        const tag = arrTags.find((tagID) => tagID.tagsID === tags.id);
        if (tag) return null;

        arrTags.push({ tagsID: tags.id, isSkipped: !isNewRow, tags: tags });

        if (!isNewRow && isTwoColumns) return null;

        indexIncrement(false);
        return <GroupCardsContainer key={tags.id} postsByTag={filterPostsByTag(tags)} tags={tags} />;
      }

      return (
        <Fragment key={ `${post.id}-${index}` }>
          {indexIncrement(true)}
          <Card key={post.id} data={post} horizontal={true} />
          {(!isNewRow && isTwoColumns) &&
            arrTags.map((skippedTag) => {
              return (
                skippedTag.isSkipped && (
                  <Fragment key={ `${skippedTag.tags.id}-${index}` }>
                    <GroupCardsContainer
                      key={skippedTag.tags.id}
                      postsByTag={filterPostsByTag(skippedTag.tags)}
                      tags={skippedTag.tags}
                    />
                    {(skippedTag.isSkipped = false) }
                    {indexIncrement(false)}
                  </Fragment>
                )
              );
            })}
        </Fragment>
      );
    });
  };

  const RenderPostNotGroupCards = () => data.map(post=><Card key={post.id} data={post} horizontal={true} />)

  if (isTwoColumns === null) {
    windowSize()
  }

  return (
    <>
      {/* {console.log('render P')} */}
      {/* <Promo /> */}
      {/* <section> */}
        {/* <Layout page={ true }>           */}
          <SectionHeader>
            {title ? title : "Мероприятия"}
          </SectionHeader>
          <div className={classes.container}>
            {groupCards ? <RenderPostAndGroupCards /> : <RenderPostNotGroupCards/>}
          </div>
        {/* </Layout> */}
      {/* </section> */}
    </>
  );
};

function areEqual(prevProps, nextProps) {
  if (prevProps.data.length === nextProps.data.length) return true;
  /*
  возвращает true, если nextProps рендерит
  тот же результат что и prevProps,
  иначе возвращает false
  */
}

export default memo(Post, areEqual);
