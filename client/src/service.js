import axios from "axios";
import constants from "./config/constants";

axios.defaults.baseURL = constants.apiUrl;

export const createShortUrl = obj => {
  const requestUrl = "http://localhost:3000/urls/";
  return axios.post(requestUrl, obj);
};

export const getShortUrls = () => {
  const requestUrl = "http://localhost:3000/urls/";
  return axios.get(requestUrl);
};
