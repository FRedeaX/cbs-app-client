import React from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/Seo/Seo";
import ModalRoot from "../ModalRoot/ModalRoot";
import PostContainer from "./../Post/Post";

const HomePage = () => {
  const location = useLocation();

  if (location.search) {
    return <ModalRoot />;
  }

  return (
    <main>
      {window.location.pathname === "/" && <SEO />}

      <PostContainer />
    </main>
  );
};

export default HomePage;
