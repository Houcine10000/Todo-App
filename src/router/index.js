import { createRouter, createWebHistory } from "vue-router";
import todoList from "../views/TodoList.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: todoList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
