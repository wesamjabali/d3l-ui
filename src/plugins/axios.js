const Axios = require("axios");
import store from "../store";

const baseURL = {
  development: "http://localhost:3333/app",
  production: "https://csc394-5.herokuapp.com/app"
};

const axios = Axios.create({
  baseURL: baseURL[process.env.NODE_ENV]
});

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  response => {
    // successful response interceptor
    return response;
  },
  error => {
    console.log("error", error.response.status);
    // failed response interceptor (status codes 300+)
    if (error.response.status == 401) {
      store.dispatch("logout");
      store.commit("snack", {type: "error", message: "Session timed out."});
    }
    return Promise.reject(error);
  }
);

export default axios;
