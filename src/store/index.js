import Vue from "vue";
import Vuex from "vuex";
import jwtDecode from "jwt-decode";
import axios from "@/plugins/axios";
import router from "../router";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const state = {
  token: "",
  user: {},
  snack: false,
  snack_message: "",
  snack_type: ""
};

const getters = {
  isLoggedIn: state => !!state.token,
  token: state => state.token || null,
  email: state => state.user.email || "",
  roles: state => state.user.roles || [],
  first_name: state => state.user.first_name || "",
  last_name: state => state.user.last_name || "",
};

const actions = {
  async login({ dispatch }, { email, password }) {
    try {
      const builtURL = `/non_auth/login`;
      const { data = {} } = await axios.post(builtURL, {
        email,
        password
      });
      const { token } = data;
      dispatch("setUser", {
        token
      });
    } catch (err) {
      console.log("login -> err", err);
      throw err;
    }
  },

  logout({ commit }) {
    // clear user auth
    localStorage.removeItem("token");
    commit("clearUser");
    router.push("/");
  },

  setUser({ commit }, { token }) {
    // handle localstorage updates
    localStorage.setItem("token", token);
    const user = jwtDecode(token);
    // commit user details to vuex
    commit("setUser", {
      token,
      user
    });
  },
  

  initializeApp({ dispatch }) {
    // handle main init logic
    const storageToken = localStorage.getItem("token") || "";
    if (storageToken) {
      const user = jwtDecode(storageToken);
      const remainingTime = user.exp - Math.floor(Date.now() / 1000);
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
    state.roles = payload.roles;
    return state;
  },
  clearUser: state => {
    state.token = "";
    state.user = {};
    state.roles = [];
    return state;
  },
  snack: (state, payload) => {
    state.snack = true,
    state.snack_message = payload.message,
    state.snack_type = payload.type
    return state;
  },
  snack_toggle: (state, payload) => {
    state.snack = payload;
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
