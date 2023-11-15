import {
  GET_LOCATIONS,
  REMOVE_LOCATION,
  SAVE_LOCATION_DATA,
} from "../../config/urls";
import { apiDelete, apiGet, apiPost } from "../../utils/utils";

export const makeLocationFavorite = (data) => {
  return apiPost(SAVE_LOCATION_DATA, data);
};

export const getAllFavoriteLocations = () => {
  return apiGet(GET_LOCATIONS);
};

export const makeLocationDislike = (id) => {
  const url = REMOVE_LOCATION.replace(":id", id);
  return apiDelete(url);
};
