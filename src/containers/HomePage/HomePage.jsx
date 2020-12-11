import React, { memo, useRef } from "react";
import { useLocation } from "react-router-dom";
import Carousel from "../../components/Carusel/Carousel";
import PosterRoot from "../../components/poster/PosterRoot/PosterRoot";
import SEO from "../../components/Seo/Seo";
import Slider from "../../components/slider/Slider/Slider";
import Layout from "../../components/UI/Layout/Layout";
import ModalRoot from "../ModalRoot/ModalRoot";
import SliderRoot from "./../../components/slider/SliderRoot";
import PostContainer from "./../Post/Post";
import classes from "./Home-Page.module.css";

const HomePage = () => {
  const location = useLocation();
  // const [isLoading, setLoading] = useState({ isLoadingBook: false, isLoadingPost: false });
  // console.log(isLoading);
  const postRef = useRef();

  if (location.search) {
    return <ModalRoot />;
  }

  //style={isMobile && { paddingRight: 0 }}
  // console.log('render HomePage');
  return (
    <>
      {window.location.pathname === "/" && <SEO />}

      {/* {loading && <Loader isFullscreen={true} />} */}
      {/* <section className={ classes.book }>
          <Layout padingDisabled={true}>
            <SectionHeader HtmlTeg="h2">Обзоры книг</SectionHeader>
            <BookPreviewRoot />
          </Layout>
        </section> */}

      <Layout page={false} padingDisabled={true}>
        <div className={classes.wrapper}>
          <section className={classes.poster}>
            {window.innerWidth < 1330 ? (
              <PosterRoot
                isCarousel={true}
                isSkipPastEvent={true}
                url={"/poster"}
                clsHeader={classes.header}
                clsItem={classes.item}
              />
            ) : (
              <PosterRoot
                limitRender={2}
                isSkipPastEvent={true}
                url={"/poster"}
                clsHeader={classes.header}
                clsItem={classes.item}
              />
            )}
          </section>
          <section className={classes.post}>
            <Slider>
              <Carousel isHeightInherit={false} isShadow={false}>
                <SliderRoot data={postRef.current} />
              </Carousel>
            </Slider>
            <PostContainer setPostVar={postRef.current} />
          </section>
        </div>
      </Layout>
    </>
  );
};

export default memo(HomePage);
