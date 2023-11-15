import {
  CREATE_EVENT_API,
  DELETE_EVENT,
  GET_ALL_EVENTS_API,
  GET_SINGLE_EVENT,
  MAKE_EVENT_FAVORITE,
  MAKE_EVENT_UN_FAVORITE,
  UPDATE_EVENT,
} from "../../config/urls";
import { apiDelete, apiGet, apiPost, apiPut } from "../../utils/utils";

export const createEvent = (data) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  return apiPost(CREATE_EVENT_API, data, headers);
};

export const getAllEvents = () => {
  return apiGet(GET_ALL_EVENTS_API);
};

export const makeEventLike = (id) => {
  const url = MAKE_EVENT_FAVORITE.replace(":id", id);
  return apiPost(url);
};

export const makeEventDislike = (id) => {
  const url = MAKE_EVENT_UN_FAVORITE.replace(":id", id);
  return apiPost(url);
};

export const getSingleEvent = (id) => {
  const url = GET_SINGLE_EVENT.replace(":id", id);
  return apiGet(url);
};

export const updateEvent = (data, id) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const url = UPDATE_EVENT.replace(":id", id);
  return apiPut(url, data, headers);
};

export const deleteEvent = (id) => {
  const url = DELETE_EVENT.replace(":id", id);
  return apiDelete(url);
};
