import { RATE_US } from "../../config/urls";
import { apiPost } from "../../utils/utils";

export const ratingAppbb = (data) => {
  return apiPost(RATE_US, data);
};
