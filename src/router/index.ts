import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Facts from "@/views/Facts.vue";
import Breeds from "@/views/Breeds.vue";
import About from "@/views/About.vue";

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
    component: Facts
  },
  {
    path: "/breeds",
    name: "Breeds",
    component: Breeds
  },
  {
    path: "/about",
    name: "About",
    component: About
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

export default router;
