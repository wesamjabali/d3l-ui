import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./plugins/axios";
import vuetify from "./plugins/vuetify";
import snack from "./plugins/snack";
// Attach axios
Vue.prototype.$axios = axios;
Vue.prototype.$snack = snack;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    store.dispatch("initializeApp");
  },
}).$mount("#app");
