import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import { setScrollToTop } from "../../components/ScrollToTop/ScrollToTop";
import Loader from "../../components/UI/Loader/Loader";
import { overlayVar } from "../../store/variables/overlay";
// let isZoom;

export const GET_ARTICLE = gql`
  query GetArticle($id: ID!, $type: PostIdType, $isPreview: Boolean) {
    post(id: $id, idType: $type, asPreview: $isPreview) {
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
  const { state, search } = useLocation();
  let backUrl = state?.background.pathname || "/";
  const { slug } = useParams();
  let id = state?.id ? state.id : slug;
  let type = state?.id ? "ID" : "SLUG";
  let isPreview = false;

  if (search) {
    const q = new URLSearchParams(search);
    id = q.has("preview_id") ? q.get("preview_id") : q.get("p");
    type = "DATABASE_ID";
    isPreview = !!q.get("preview");
  }

  const { data, loading, error } = useQuery(GET_ARTICLE, {
    variables: { id, type, isPreview },
    fetchPolicy: state?.id ? "cache-first" : "network-only",
    returnPartialData: !!state?.id,
  });

  const zoomImage = useSelector((state) => state.UI.zoomImage);
  const history = useHistory();

  useEffect(() => {
    const hendleCloseEsc = (event) => {
      event.stopPropagation();
      setScrollToTop(false);
      if (!zoomImage.isZoom && event.keyCode === 27) {
        // if (history.length === 1) history.push("/");
        // else history.goBack();
        overlayVar({ isOpen: false });
        history.push(backUrl);
      }
    };

    window.addEventListener("keydown", hendleCloseEsc, false);
    return () => window.removeEventListener("keydown", hendleCloseEsc, false);
  }, [zoomImage.isZoom, history, backUrl]);

  const hendleClose = (event) => {
    event.stopPropagation();
    if (event.target.getAttribute("data-close")) {
      setScrollToTop(false);
      overlayVar({ isOpen: false });
      history.push(backUrl);
    }
  };

  if (loading && !state?.id) return <Loader isFullscreen={true} />;
  if (error) return console.error(error);

  const defaultPost = {
    title: null,
    excerpt: null,
    content: null,
    featuredImage: null,
    terms: null,
  };
  const { title, excerpt, content, categories, featuredImage } =
    data?.post || defaultPost;

  return createPortal(
    <Modal
      title={title}
      excerpt={excerpt}
      content={content}
      loading={loading}
      image={featuredImage?.node.sourceUrl}
      categories={categories}
      onCloseHendler={hendleClose}
      notFound={!data?.post}
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
