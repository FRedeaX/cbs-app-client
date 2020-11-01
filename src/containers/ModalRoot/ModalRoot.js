import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import { setScrollToTop } from "../../components/ScrollToTop/ScrollToTop";
import Loader from "../../components/UI/Loader/Loader";
// let isZoom;

const GET_ARTICLE = gql`
  query GetArticle($slug: ID!, $type: PostIdType, $isPreview: Boolean) {
    post(id: $slug, idType: $type, asPreview: $isPreview) {
      categories {
        nodes {
          id
          name
          uri
        }
      }
      content
      excerpt
      featuredImage {
        node {
          sourceUrl(size: THUMBNAIL)
        }
      }
      id
      title
    }
  }
`;

const ModalRoot = () => {
  const location = useLocation();
  let backUrl = "/";
  let { slug } = useParams();
  let type = "SLUG";
  let isPreview = false;

  if (location.state) backUrl = location.state.background.pathname;
  if (location.search) {
    const q = new URLSearchParams(location.search);
    slug = q.has("preview_id") ? q.get("preview_id") : q.get("p");
    type = "DATABASE_ID";
    isPreview = !!q.get("preview");
  }

  const { data, loading, error } = useQuery(GET_ARTICLE, {
    variables: { slug, type, isPreview },
  });

  const zoomImage = useSelector((state) => state.UI.zoomImage);
  const history = useHistory();

  // useLocation().state.scrollToTop = false;
  useEffect(() => {
    const hendleCloseEsc = (event) => {
      setScrollToTop(false);
      if (!zoomImage.isZoom && event.keyCode === 27) {
        // if (history.length === 1) history.push("/");
        // else history.goBack();
        history.push(backUrl);
      }
    };

    window.addEventListener("keydown", hendleCloseEsc, false);
    return () => window.removeEventListener("keydown", hendleCloseEsc, false);
  }, [zoomImage.isZoom, history, backUrl]);

  const hendleClose = (event) => {
    if (event.target.getAttribute("data-close")) {
      // event.stopPropagation();
      setScrollToTop(false);
      // history.push(backUrl);
      // <SEO />;

      history.push(backUrl);

      // if (history.length === 1) history.push("/");
      // else history.goBack();
    }
  };

  if (loading) return <Loader isFullscreen={true} />;
  if (error) return console.error(error);

  const defaultPost = {
    title: null,
    excerpt: null,
    content: null,
    featuredImage: null,
    terms: null,
  };
  const { title, excerpt, content, categories, featuredImage } = data.post
    ? data.post
    : defaultPost;

  return createPortal(
    <Modal
      title={title}
      excerpt={excerpt}
      content={content}
      image={featuredImage && featuredImage.node.sourceUrl}
      categories={categories}
      onCloseHendler={hendleClose}
      notFound={!data.post}
    />,
    document.getElementById("modal_root")
  );
};

// function mapStateToProps(state) {
//   return {
//     post: state.post.post,
//     loaded: state.post.loaded,
//     UI: state.UI.overlay,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     getPostBySlug: (type, slug) => dispatch(getPostBySlug(type, slug)),
//   };
// }
export default ModalRoot;
