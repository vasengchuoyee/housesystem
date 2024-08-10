import { createRouter, createWebHistory } from "vue-router";
// home and product path
import HomeView from "../views/HomeView.vue";
import Product001 from "../views/Product001.vue";
import Product002 from "../views/Product002.vue";

// admins path
import Admins from "../views/Admins/Admins.vue";
import Logins from "../views/Admins/Logins.vue";
import Register from "../views/Admins/Register.vue";
import Adminlogin from "../views/Admins/Adminlogin.vue";

import test from "../views/Admins/test.vue";
import firebase from "../views/firebase.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/logins",
      name: "logins",
      component: Logins,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/admins",
      name: "admins",
      component: Admins,
    },
    {
      path: "/adminlogin",
      name: "adminlogin",
      component: Adminlogin,
    },
    {
      path: "/prod001",
      name: "product001",
      component: Product001,
    },
    {
      path: "/prod002",
      name: "product002",
      component: Product002,
    },
    {
      path: "/test",
      name: "test",
      component: test,
    },
    {
      path: "/firebase",
      name: "firebase",
      component: firebase,
    },
  ],
});

export default router;
