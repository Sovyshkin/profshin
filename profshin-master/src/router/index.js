import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import { useCatalogStore } from "@/store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home"),
  },
  {
    path: "/eva",
    name: "Eva",
    component: () => import("../views/EvaProView"),
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/About.vue')
  //   }
  // }
  {
    path: "/catalog",
    name: "Catalog",
    redirect: { name: "Goods" },
    children: [
      {
        path: "",
        name: "Goods",
        component: () => import("../views/CatalogPro"),
        meta: {
          label: "Каталог",
        },
      },
      {
        path: ":id",
        name: "Good",
        component: () => import("../views/CardPage"),
      },
      {
        path: "rims",
        name: "Rims",
        component: () => import("../views/CatalogView"),
        meta: {
          label: "Диски",
        },
      },
      {
        path: "tires",
        name: "Tires",
        component: () => import("../views/CatalogView"),
        meta: {
          label: "Шины",
        },
      },
    ],
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/CartView"),
    meta: {
      label: "Корзина",
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/AboutView"),
    meta: {
      label: "О компании",
    },
  },
  {
    path: "/customers",
    name: "Customers",
    component: () => import("../views/CustomersView"),
    meta: {
      label: "Покупателю",
    },
  },
  {
    path: "/support_chat",
    name: "chat",
    component: () => import("../views/SupportChat"),
    meta: {
      label: "Чат Поддержки",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
