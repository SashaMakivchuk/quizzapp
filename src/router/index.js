import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import QuizPage from "@/views/QuizPage.vue";
import ResultPage from "@/views/ResultPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/quiz/:category", component: QuizPage, props: true },
  { path: "/results", component: ResultPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
