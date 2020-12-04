import React, { memo } from "react";
import { useLocation } from "react-router-dom";
import PosterRoot from '../../components/poster/PosterRoot/PosterRoot';
import SEO from "../../components/Seo/Seo";
import Layout from "../../components/UI/Layout/Layout";
import ModalRoot from "../ModalRoot/ModalRoot";
import PostContainer from "./../Post/Post";
import classes from './Home-Page.module.css';

const HomePage = () => {
  const location = useLocation();
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
          <Layout padingDisabled={true}>
            <SectionHeader HtmlTeg="h2">Обзоры книг</SectionHeader>
            <BookPreviewRoot />
          </Layout>
        </section> */}
          
      <Layout page={ false } padingDisabled={ true }>
        <div className={classes.wrapper}>
          <section className={ classes.poster }> 
            { window.innerWidth < 1330 ?
              <PosterRoot isCarousel={ true } clsItem={ classes.item } /> : (
              <div className={ classes.list }>
                <PosterRoot limitRender={ 2 } clsItem={ classes.item } />
              </div>
            )}
          </section>
          <section className={classes.post}>
            <PostContainer/>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default memo(HomePage);
