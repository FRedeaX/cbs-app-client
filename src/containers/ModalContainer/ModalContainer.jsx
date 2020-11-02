import { connect } from "react-redux";
import Modal from "../../components/Modal/Modal";
import { getPost } from "./../../store/reducers/post";

function mapStateToProps(state, ownProps) {
  return {
    post: getPost(state, ownProps.slug),
  };
}

const ModalContainer = connect(mapStateToProps)(Modal);
export default ModalContainer;
