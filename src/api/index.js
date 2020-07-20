import axios from "axios";
import { REQUEST_URL, API_KEY } from "../utils/constants";

const get = (action = "", params, source, id = "") => {
  return axios.get(`${REQUEST_URL}${action}/movie${id}`, {
    params: {
      api_key: API_KEY,
      ...params,
    },
    ...source,
  });
};

export default { get };
