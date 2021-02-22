import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./plugins/axios";
import vuetify from "./plugins/vuetify";

// Attach axios
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

Vue.prototype.$snack = {
  success: (message = "Success!") => {
    store.commit("snack", { message: message, type: "success" });
  },
  error: (message = "Error!") => {
    store.commit("snack", { message: message, type: "error" });
  },
  info: (message = "Info.") => {
    store.commit("snack", { message: message, type: "grey darken-4" });
  },
};

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    store.dispatch("initializeApp");
  }
}).$mount("#app");
