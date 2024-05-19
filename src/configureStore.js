import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import reducer from "./reducers";
import { googleAnalytics } from "./reactGAMiddlewares";

const bindMiddleware = () => {
  const middlewares = [googleAnalytics, thunk];

  if (process.env.NODE_ENV !== "production") {
    const composeEnhancers =
      typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

    return composeEnhancers(applyMiddleware(...middlewares));
  }

  return applyMiddleware(...middlewares);
};

export default createStore(reducer, bindMiddleware());
