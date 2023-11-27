import axios from "axios";
import constants from "./constant";

export const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.REACT_APP_SGLIVE_API_URL;

axiosClient.defaults.headers = constants.headers;

axiosClient.defaults.withCredentials = false;

axiosClient.interceptors.request.use(
  function (config) {
    const token = JSON.parse(localStorage.getItem("auth"))
      ? JSON.parse(localStorage.getItem("auth"))
      : "";
    if (token) config.headers.Authorization = `Bearer ${token.jwt}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export function getCustomRequest(URL) {
  return axios.get(`${URL}`).then(response => response);
}

export function getRequest(URL) {
  return axiosClient.get(`${URL}`).then(response => response);
}

export function postRequest(URL, payload) {
  return axiosClient.post(`${URL}`, payload).then(response => response);
}

export function putRequest(URL, payload) {
  return axiosClient.put(`${URL}`, payload).then(response => response);
}

export function patchRequest(URL, payload) {
  return axiosClient.patch(`${URL}`, payload).then(response => response);
}

export function deleteRequest(URL) {
  return axiosClient.delete(`${URL}`).then(response => response);
}
