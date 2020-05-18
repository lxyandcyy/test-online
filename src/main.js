import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import {Loading,Message} from "element-ui";
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css";
import VueParticles from "vue-particles"; //引入粒子效果
import axios from "axios";
import api from "./api/api"; // 导入api接口
import vuetify from "./plugins/vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

//全局注册
Vue.use(Antd);
Vue.use([Message,Loading]);
// Vue.use(ElementUI)
Vue.use(VueParticles);
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
