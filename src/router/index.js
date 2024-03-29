import Vue from "vue";
import VueRouter from "vue-router";
// 一级目录
const loadView = (view) => () => import(`@views/${view}/index.vue`);
// 二级目录 包含要进入的页面路径
const levelView = (view, level, name) => () => import(`@views/${view}/${level}/${name}/index.vue`);
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: loadView('index')
  },
  {
    path: "/index",
    name: "index",
    component: loadView('index')
  }
];
const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
