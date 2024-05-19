import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./configureStore";
import { privateRoutes, publicRoutes } from "./utils/routes";
import withPrivateRoute from "./routes/PrivateRouter";
import withPublicRoute from "./routes/PublicRouter";

export default function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            {publicRoutes.map((route, index) =>
              withPublicRoute({ ...route }, index)
            )}
            {privateRoutes.map((route, index) =>
              withPrivateRoute({ ...route }, index)
            )}
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
