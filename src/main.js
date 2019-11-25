import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入eleui
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入font图标；
import 'font-awesome/css/font-awesome.css';
// 引入mockjs
require('./mock.js');
Vue.use(Element, {
  size: 'mini', // set element-ui default size
});
Vue.use(Element);
Vue.config.productionTip = process.env.NODE_ENV === 'production';
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
