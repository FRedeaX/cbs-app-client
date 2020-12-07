import React, { useEffect } from "react";
import Layout from "../../UI/Layout/Layout";
import PosterRoot from "../PosterRoot/PosterRoot";

const PosterPage = () => {
  useEffect(() => {
    document.body.style.minHeight = "";
  }, []);
  return (
    <Layout>
      <div style={{ margin: "auto" }}>
        <PosterRoot />
      </div>
    </Layout>
  );
};

export default PosterPage;
