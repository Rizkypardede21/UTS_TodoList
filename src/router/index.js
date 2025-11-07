import { createRouter, createWebHistory } from "vue-router";
import TodoApp from "../views/TodoApp.vue";

const routes = [{ path: "/", name: "TodoApp", component: TodoApp }];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
