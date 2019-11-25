import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI)
// 引入font图标；
import 'font-awesome/css/font-awesome.css';
// 引入mockjs
require('./mock.js');
Vue.config.productionTip = process.env.NODE_ENV === 'production';
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
