import {
  FORGOT_PASSWORD_API,
  GET_ME,
  LOGIN_API,
  SIGNUP_API,
} from "../../config/urls";
import { apiGet, apiPost } from "../../utils/utils";
import { saveUserData } from "../reducers/auth";
import store from "../store";
const { dispatch } = store;

export const userLogin = (data) => {
  return new Promise((resolve, reject) => {
    apiPost(LOGIN_API, data)
      .then((res) => {
        resolve(res);
        dispatch(saveUserData(res.data));
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const userSignup = (data) => {
  return apiPost(SIGNUP_API, data);
};

export const forgotPassword = (data) => {
  return apiPost(FORGOT_PASSWORD_API, data);
};

export const getMyDetails = () => {
  return apiGet(GET_ME);
};
