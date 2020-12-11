import React, { Fragment, memo, useCallback, useEffect, useState } from "react";
import Card from "../Card/Card";
import GroupCardsContainer from "./../../../containers/Post/GroupCards/GroupCards";

const PostAndGroupCards = ({ data }) => {
  let index = 0;
  const arrTags = [];

  const innerWidth = window.innerWidth;
  const [isTwoColumns, setTwoColumns] = useState(null);

  const windowSize = useCallback(() => {
    if (innerWidth > 652 && innerWidth < 768 && !isTwoColumns) {
      setTwoColumns(true);
    } else if ((innerWidth <= 652 || innerWidth >= 768) && isTwoColumns) {
      setTwoColumns(false);
    }
  }, [innerWidth, isTwoColumns]);

  useEffect(() => {
    windowSize();
  }, [windowSize, innerWidth, isTwoColumns, setTwoColumns]);

  if (isTwoColumns === null) {
    windowSize();
  }

  const filterPostsByTag = (tags) => {
    return data.filter(
      (post) => post.tags.nodes[0] && post.tags.nodes[0].id === tags.id
    );
  };

  const indexIncrement = (isIncrement) => {
    if (isIncrement) index++;
    else index = 0;
  };

  return data.map((post) => {
    const tags = post.tags.nodes[0];
    const isNewRow = !(index % 2);

    if (tags) {
      const tag = arrTags.find((tagID) => tagID.tags.id === tags.id);
      if (tag) return null;

      arrTags.push({ isSkipped: !isNewRow, tags: tags });

      if (!isNewRow && isTwoColumns) return null;

      indexIncrement(false);
      return (
        <GroupCardsContainer
          key={tags.id}
          postsByTag={filterPostsByTag(tags)}
          tags={tags}
        />
      );
    }

    return (
      <Fragment key={`${post.id}-${index}`}>
        {indexIncrement(true)}
        <Card key={post.id} data={post} horizontal={true} />
        {!isNewRow &&
          isTwoColumns &&
          arrTags.map((skippedTag) => {
            return (
              skippedTag.isSkipped && (
                <Fragment key={`${skippedTag.tags.id}-${index}`}>
                  <GroupCardsContainer
                    key={skippedTag.tags.id}
                    postsByTag={filterPostsByTag(skippedTag.tags)}
                    tags={skippedTag.tags}
                  />
                  {(skippedTag.isSkipped = false)}
                  {indexIncrement(false)}
                </Fragment>
              )
            );
          })}
      </Fragment>
    );
  });
};

export default memo(PostAndGroupCards);
