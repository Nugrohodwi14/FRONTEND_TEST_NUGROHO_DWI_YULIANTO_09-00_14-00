import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/Views/LoginPage.vue";
import Homepage from "@/Views/Homepage.vue";
import ErrorPage from "@/Views/ErrorPage.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: LoginPage,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/welcome",
    name: "homepage",
    component: Homepage,
    meta: {
      title: "Welcome",
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "ErrorPage",
    component: ErrorPage,
    meta: {
      title: "Error | Instabug",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
