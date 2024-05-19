import React from "react";
import { Route } from "react-router-dom";

const withPublicRoute = (props, index) => {
  return <Route key={index} {...props} />;
};

export default withPublicRoute;
