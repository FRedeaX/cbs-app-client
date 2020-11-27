import React, { memo } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/Seo/Seo";
import Layout from "../../components/UI/Layout/Layout";
import ModalRoot from "../ModalRoot/ModalRoot";
import PosterContainer from './../../components/poster/PosterContainer/PosterContainer';
import PostContainer from "./../Post/Post";

const HomePage = () => {
  const location = useLocation();
  // const [isLoading, setLoading] = useState({ isLoadingBook: false, isLoadingPost: false });
  // console.log(isLoading);


  if (location.search) {
    return <ModalRoot />;
  }

  return (
    <>
      {window.location.pathname === "/" && <SEO />}
      
      <div>
        {/* {loading && <Loader isFullscreen={true} />} */}
        {/* <section className={ classes.book }>
          <Layout padingDisabled={true}>
            <SectionHeader HtmlTeg="h2">Обзоры книг</SectionHeader>
            <BookPreviewRoot />
          </Layout>
        </section> */}
          
        

        <Layout page={ false } padingDisabled={ true }>
          <div style={ { display: "flex", flexWrap: "wrap", width: "max-content", margin: "auto", columnGap: "40px", paddingLeft: "40px"}}>
            <div style={{width: "280px", order: 1}}>
              <PosterContainer />
            </div>
            <div style={{maxWidth: "960px"}}>
              <PostContainer/>
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
};

export default memo(HomePage);
