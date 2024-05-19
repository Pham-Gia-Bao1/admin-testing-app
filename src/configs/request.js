import React from "react";
import axios from "axios";
import _ from "lodash";
import { getAccessToken } from "../utils/helpers";
import { Alert, Space } from "antd";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
  headers: {
    "x-access-token": getAccessToken(),
    agent: "react",
  },
});

export const axiosInstance = instance;

const perform = (
  storeFunctions,
  headers,
  isLoading,
  successAction,
  failAction,
  shouldThrowError
) => {
  if (isLoading) {
    // Handle to show loading UI
    //   dispatch(showLoading());
  }

  return axiosInstance(headers)
    .then((result) => {
      if (isLoading) {
        // Handle hide loading
        // dispatch(hideLoading());
      }

      if (successAction) {
        successAction(result, storeFunctions);
      }

      return result;
    })
    .catch((error) => {
      if (isLoading) {
        // dispatch(hideLoading());
      }

      if (failAction) {
        failAction(error, storeFunctions);
      }

      if (!shouldThrowError) {
        return;
      }

      const responseData = _.get(error, "response.data");
      if (responseData) {
        <Space direction="vertical" style={{ width: "100%" }}>
          <Alert message="Error Text" type="error" />;
        </Space>;
      }
    });
};

const post =
  (headers, isLoading, successAction, failAction, shouldThrowError = true) =>
  (dispatch, getState) => {
    return perform(
      { dispatch, getState },
      { ...headers, method: "post" },
      isLoading,
      successAction,
      failAction,
      shouldThrowError
    );
  };

const get =
  (headers, isLoading, successAction, failAction, shouldThrowError = true) =>
  (dispatch, getState) => {
    return perform(
      { dispatch, getState },
      { ...headers, method: "get" },
      isLoading,
      successAction,
      failAction,
      shouldThrowError
    );
  };

const put =
  (headers, isLoading, successAction, failAction, shouldThrowError = true) =>
  (dispatch, getState) => {
    return perform(
      { dispatch, getState },
      { ...headers, method: "put" },
      isLoading,
      successAction,
      failAction,
      shouldThrowError
    );
  };

const patch =
  (headers, isLoading, successAction, failAction, shouldThrowError = true) =>
  (dispatch, getState) => {
    return perform(
      { dispatch, getState },
      { ...headers, method: "patch" },
      isLoading,
      successAction,
      failAction,
      shouldThrowError
    );
  };

const remove =
  (headers, isLoading, successAction, failAction, shouldThrowError = true) =>
  (dispatch, getState) => {
    return perform(
      { dispatch, getState },
      { ...headers, method: "delete" },
      isLoading,
      successAction,
      failAction,
      shouldThrowError
    );
  };

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  post,
  get,
  put,
  patch,
  delete: remove,
};
