import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import {Loading,Message} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import api from "./api/api"; // 导入api接口
import vuetify from "./plugins/vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import {Radio} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

//全局注册
Vue.use([Message,Loading]);
Vue.use(Radio);
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
