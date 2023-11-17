export const API_BASE_URL = "http://localhost:10000/api";

export const getApiURL = (endpoint) => API_BASE_URL + endpoint;

export const SIGNUP_API = getApiURL("/register");
export const LOGIN_API = getApiURL("/login");
export const FORGOT_PASSWORD_API = getApiURL("/forgot-password-token");
export const CREATE_EVENT_API = getApiURL("/create-event");
export const GET_ALL_EVENTS_API = getApiURL("/");
export const GET_ME = getApiURL("/me");
export const MAKE_EVENT_FAVORITE = getApiURL("/add-favorite/:id");
export const MAKE_EVENT_UN_FAVORITE = getApiURL("/remove-favorite/:id");
export const GET_SINGLE_EVENT = getApiURL("/:id");
export const UPDATE_EVENT = getApiURL("/:id");
export const DELETE_EVENT = getApiURL("/:id");
export const SAVE_LOCATION_DATA = getApiURL("/favorite-location");
export const GET_LOCATIONS = getApiURL("/all-location");
export const REMOVE_LOCATION = getApiURL("/favorite-location/:id");
export const RATE_US = getApiURL("/rate");
export const UPDATE_USER = getApiURL("/update-profile");
