import { connect } from "react-redux";
import Column from "../components/column";
import { getPosts } from "../redux/posts/action";

const Post = () => {
  return <Column />; // thay omponent khác vào
};

const mapState = (state) => {
  const { rootReducer } = state;

  return {};
};

const actionCreators = { getPosts };

export default connect(mapState, actionCreators)(Post);
