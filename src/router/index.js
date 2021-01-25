import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import Clock from "@/views/Clock.vue";
import AddUser from "@/views/AddUser.vue";
import EditClock from "@/views/EditClock.vue";
import EditSelfClock from "@/views/EditSelfClock.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.getters.isLoggedIn) next({ name: "Clock" });
      else next();
    }
  },
  {
    path: "/clock",
    name: "Clock",
    component: Clock
  },
  {
    path: "/editSelfClock",
    name: "EditSelfClock",
    component: EditSelfClock
  },
  {
    path: "/addUser",
    name: "AddUser",
    component: AddUser,
    beforeEnter: (to, from, next) => {
      if(store.getters.roles.includes('super')) next();
      else next({ name: "Clock" })
    }
  },
  {
    path: "/editClock",
    name: "EditClock",
    component: EditClock,
    beforeEnter: (to, from, next) => {
      if(store.getters.roles.includes('super')) next();
      else next({ name: "Clock" })
    }
  },
  {
    path: "*",
    name: "Else",
    beforeEnter: (to, from, next) => {
      next({ name: "Clock" });
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// Require user to be logged in
router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !store.getters.isLoggedIn 
  || Date.now() <= store.state.user.exp) {
    store.dispatch('logout');
    next({ name: "Login" });
  } else next();
});

export default router;
