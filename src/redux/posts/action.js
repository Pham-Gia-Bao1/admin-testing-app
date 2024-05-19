import request from "../../configs/request";

export const Types = {
  GET_LIST_POST_REQUEST: "GET_LIST_POST_REQUEST",
  GET_LIST_POST_SUCCESS: "GET_LIST_POST_SUCCESS",
  GET_LIST_POST_FAILED: "GET_LIST_POST_FAILED",
};

export const getPosts = (params) => {
  return (dispatch, getState) => {
    dispatch({ type: Types.GET_LIST_POST_REQUEST });

    return dispatch(
      request.get(
        { url: "api-url", params: params },
        true,
        (response, { dispatch }) => {
          const {
            data: { data },
          } = response;

          return dispatch({
            type: Types.GET_LIST_POST_SUCCESS,
            payload: { list: [{ value: "test" }] },
          });
        },
        (error, { dispatch }) => {
          dispatch({ type: Types.GET_LIST_POST_FAILED });
        }
      )
    );
  };
};
