import { useQuery } from "@apollo/client";
import React, { memo, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/Seo/Seo";
import Layout from "../../components/UI/Layout/Layout";
import { GET_WIDTH } from "../../store/variables/windowWidth";
import ModalRoot from "../ModalRoot/ModalRoot";
import PosterRoot from "./../../components/poster/PosterRoot/PosterRoot";
import PostContainer from "./../Post/Post";
import classes from "./Home-Page.module.css";

const HomePage = () => {
  const location = useLocation();
  const {
    data: { windowWidth },
  } = useQuery(GET_WIDTH);
  const [isTowColumn, setTowColumn] = useState(windowWidth >= 1300);

  useLayoutEffect(() => {
    if (windowWidth >= 1300 && !isTowColumn) {
      setTowColumn(true);
    } else if (windowWidth < 1300 && isTowColumn) {
      setTowColumn(false);
    }
  }, [isTowColumn, windowWidth]);
  // const [isLoading, setLoading] = useState({ isLoadingBook: false, isLoadingPost: false });
  // console.log(isLoading);

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
            <SectionHeader HtmlTeg="h2">Обзоры книг</SectionHeader>
            <BookPreviewRoot />
        </section> */}

      <Layout page={false} padingDisabled={true}>
        <div className={classes.wrapper}>
          <section className={classes.poster}>
            {console.log(isTowColumn)}
            {isTowColumn ? (
              <PosterRoot
                limitRender={2}
                isSkipPastEvent={true}
                clsHeader={classes.header}
                clsItem={classes.item}
              />
            ) : (
              <PosterRoot
                isCarousel={true}
                isSkipPastEvent={true}
                clsHeader={classes.header}
                clsItem={classes.item}
              />
            )}
          </section>
          <section className={classes.post}>
            <PostContainer />
          </section>
        </div>
      </Layout>
      {/* <Alert>
        <Link
          to={"/biblioteki/?lib=cgb&schedule=1"}
          className={classes["alert-link"]}
        >
          Изменение графика работ в период новогодних праздничных дней.
        </Link>
      </Alert> */}
    </>
  );
};

export default memo(HomePage);
