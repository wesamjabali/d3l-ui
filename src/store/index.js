import Vue from "vue";
import Vuex from "vuex";
import jwtDecode from "jwt-decode";
import axios from "@/plugins/axios";
import router from "../router";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const state = {
  token: "",
  user: {}
};

const getters = {
  isLoggedIn: state => !!state.token,
  username: state => state.user.username || "",
  roles: state => state.user.roles
};

const actions = {
  async login({
    dispatch
  }, {
    username,
    password
  }) {
    try {
      const builtURL = `/auth/login`;
      const {
        data = {}
      } = await axios.post(builtURL, {
        username,
        password
      });
      const {
        token
      } = data;
      dispatch("setUser", {
        token
      });
    } catch (err) {
      console.log("login -> err", err);
      throw err;
    }
  },

  logout({
    commit
  }) {
    // clear user auth
    delete axios.defaults.headers.common.authorization;
    localStorage.removeItem("token");
    commit("clearUser");
    router.push("/");
  },

  setUser({
    commit
  }, {
    token
  }) {
    // handle axios header update
    axios.defaults.headers.common.authorization = "Bearer " + token;
    // handle localstorage updates
    localStorage.setItem("token", token);
    const user = jwtDecode(token);
    // commit user details to vuex
    commit("setUser", {
      token,
      user
    });
  },

  initializeApp({
    dispatch
  }) {
    // handle main init logic
    const storageToken = localStorage.getItem("token") || "";
    if (storageToken) {
      const user = jwtDecode(storageToken);
      const remainingTime = user.exp - Math.floor(Date.now() / 1000);
      // console.log("TCL: initializeApp -> remainingTime", remainingTime);
      // If initialized and stored token has more than 2 hours left, use same token
      // otherwise, attempt refresh
      if (remainingTime > 7200) {
        // initialize user if user exists
        dispatch("setUser", {
          token: storageToken
        });
      }
    }
  }
};

const mutations = {
  setUser: (state, payload) => {
    state.token = payload.token;
    state.user = payload.user;
    state.roles = payload.user.roles;
    return state;
  },
  clearUser: state => {
    state.token = "";
    state.user = {};
    state.roles = [];
    return state;
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [createPersistedState()]
});