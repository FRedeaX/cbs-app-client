import React from "react";
import { useLocation } from "react-router-dom";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import SEO from "../../components/Seo/Seo";
import Layout from "../../components/UI/Layout/Layout";
import BookContainer from "../Book/BookContainer";
import ModalRoot from "../ModalRoot/ModalRoot";
import PostContainer from "../Post/Post";
import classes from './Home-Page.module.css';

const HomePage = () => {
  const location = useLocation();
  // const [isLoading, setLoading] = useState({ isLoadingBook: false, isLoadingPost: false });
  // console.log(isLoading);


  if (location.search) {
    return <ModalRoot />;
  }

  return (
    <main>
      {window.location.pathname === "/" && <SEO />}

      {/* {loading && <Loader isFullscreen={true} />} */}
      <section className={ classes.book }>
        <Layout page={ true }>
          <SectionHeader HtmlTeg="h2">Обзоры книг</SectionHeader>
          <BookContainer />
        </Layout>
      </section>
        
      <Layout page={ true }>
        <PostContainer/>
      </Layout>
    </main>
  );
};

export default HomePage;
