import React from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/Seo/Seo";
import Layout from "../../components/UI/Layout/Layout";
import ModalRoot from "../ModalRoot/ModalRoot";
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

      {/* {loading && <Loader isFullscreen={true} />} */}
      <Layout page={true}>
        {/* <BookContainer/> */}
        <PostContainer/>
      </Layout>
    </>
  );
};

export default HomePage;
