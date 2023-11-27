import axios from "axios";
import Swal from "sweetalert2";

export const sgAxios = axios.create();

export const Request = async request => {
  const links = ["/auth/login"];
  if (!links.includes(request.url)) {
    let token = localStorage.getItem("auth");
    request.headers = {
      ...request.headers,
      authorization: `Bearer ${token}`,
    };
  }
  return request;
};

export const RequestError = async error => {
  return Promise.reject(error);
};

export const Response = response => {
  return response;
};

export const ResponseError = async error => {
  const original = error?.config;
  if (error?.response) {
    if (error?.response?.status === 401 && !original?.sent) {
      original.sent = true;
      if (error.response.data === "Unauthorized") {
        Swal.fire("Authentication Expired. Please login again");
        localStorage.removeItem("auth");
        window.location.href = "/login";
      }
    }
  }
  return Promise.reject(error);
};
