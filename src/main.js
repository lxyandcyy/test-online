import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import VueParticles from "vue-particles"; //引入粒子效果
import axios from "axios";
import api from "./api/api"; // 导入api接口

//全局注册
Vue.use(Antd);
Vue.use(VueParticles);
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
