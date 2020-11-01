import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const Archive = (props) => {
  return (
    <div>
      <Header />
      <div className="Home">thisis the a rchive-page component</div>
      <h1>thisis the slug: {props.match.params.slug}</h1>
      <Footer />
    </div>
  );
};

export default Archive;
