import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Register from "@/views/Register.vue";
import Profile from "@/views/Profile.vue";
import Playground from "@/views/Playground.vue";
import Faculty from "@/views/Faculty.vue";
import Course from "@/views/Course.vue";
import axios from "../plugins/axios";
import snack from "../plugins/snack";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter: (to, from, next) => {
      if (!store.getters.isLoggedIn) next();
      else next({ name: "Home" });
    },
  },
  {
    path: "/",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.getters.isLoggedIn) next({ name: "Home" });
      else next();
    },
  },
  {
    path: "/Home",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/faculty",
    name: "Faculty",
    component: Faculty,
  },
  {
    path: "/course",
    name: "Course",
    component: Course,
    beforeEnter: (to, from, next) => {
      axios
        .get("/user/course/belongs", {
          params: { course_id: to.query.course_id },
        })
        .then((res) => {
          if (res.data.value) {
            // If user belongs to this course
            next();
          } else {
            snack.error("You don't belong in that course!");
            next({ name: "Home" });
          }
        });
    },
    // Send query as prop
    props: (route) => ({ course_id: route.query.course_id }),
  },
  {
    path: "/playground",
    name: "Playground",
    component: Playground,
  },
  {
    path: "*",
    name: "Else",
    beforeEnter: (to, from, next) => {
      next({ name: "Home" });
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// Require user to be logged in
router.beforeEach((to, from, next) => {
  if (
    (to.name !== "Login" &&
      to.name !== "Register" &&
      !store.getters.isLoggedIn) ||
    Date.now() <= store.state.user.exp
  ) {
    store.dispatch("logout");
    next({ name: "Login" });
  } else next();
});

export default router;
