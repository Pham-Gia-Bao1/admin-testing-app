import { Navigate, Route } from "react-router-dom";
import { getAccessToken } from "../utils/helpers";

const withPrivateRoute = (props) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    return <Route key={props.key} {...props} />;
  }
  return <Navigate to="/login" />;
};

export default withPrivateRoute;
