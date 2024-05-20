import { Navigate, Route } from "react-router-dom";
import { getStorage } from "../utils/helpers";

const withPrivateRoute = (props, index) => {
  const accessToken = getStorage('__token__');
  if (accessToken) {
    return <Route key={props.index} {...props} />;
  }
  return <Route path="*" element={<Navigate to="/signin" />} />;
};

export default withPrivateRoute;
