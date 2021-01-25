const Axios = require("axios");
const store = require("../store");

const baseURL = {
  development: "http://localhost:3333/app",
  production: "https://cbs-backend.herokuapp.com/app"
};

const axios = Axios.create({
  baseURL: baseURL[process.env.NODE_ENV]
});
console.log(process.env.NODE_ENV);

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    //console.log("config", config);
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
      console.log("store", store);
      store.default.dispatch("logout");
    }
    return Promise.reject(error);
  }
);

module.exports = axios;
