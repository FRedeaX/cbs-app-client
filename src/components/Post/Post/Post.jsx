import React, { memo } from "react";
import SectionHeader from "../../SectionHeader/SectionHeader";
import PostAndGroupCards from "../PostAndGroupCards/PostAndGroupCards";
import PostNotGroupCards from "../PostNotGroupCards/PostNotGroupCards";
import classes from "./Post.module.css";

const Post = ({ data, title, groupCards = true }) => {
  // const date = data[0].date.split("T")[0].split("-")[2];
  // const limitDate = 7;

  // const [innerWidth, setInnerWidth] = useState(window.innerWidth);

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

  return (
    <>
      {/* {console.log('render Post')} */}
      <SectionHeader cls={classes.header}>
        {title ? title : "Мероприятия"}
      </SectionHeader>
      <div className={classes.container}>
        {groupCards ? (
          <PostAndGroupCards data={data} />
        ) : (
          <PostNotGroupCards data={data} />
        )}
      </div>
    </>
  );
};

// function areEqual(prevProps, nextProps) {
//   if (
//     prevProps.title === nextProps.title ||
//     prevProps.data.length === nextProps.data.length
//   ) {
//     return true;
//   }
//   /*
//   возвращает true, если nextProps рендерит
//   тот же результат что и prevProps,
//   иначе возвращает false
//   */
// }

export default memo(Post);
