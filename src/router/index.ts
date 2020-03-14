import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Breeds from "../views/Breeds.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/facts",
    name: "Facts",
    component: () => import("../views/Facts.vue")
  },
  {
    path: "/breeds",
    name: "Breeds",
    component: Breeds
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
