import { Types } from "./action";

const INIT_STATE = {
  list: [],
  total: 0,
  loading: false,
  query: {
    page: 1,
    q: "",
    perPage: 20,
  },
};

const postReducer = (state = INIT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case Types.GET_LIST_POST_REQUEST: {
      return { ...state, loading: true };
    }
    case Types.GET_LIST_POST_SUCCESS: {
      return { ...state, loading: false, list: payload.list };
    }

    case Types.GET_LIST_POST_FAILED: {
      return { ...state, loading: false };
    }

    default:
      return state;
  }
};

export default postReducer;
