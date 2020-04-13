import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/Container/Layout";
import Main from "@/views/Main";
import Background from "@/views/Background";

import question from "@/router/question";
import paper from "@/router/paper";
import result from "@/router/result";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: __dirname,
  routes: [
    {
      path: "/",
      component: Background,
      redirect: "main",
      children: [
        // 登录、注册、修改页面 Main
        {
          path: "main",
          component: Main,
          children: [{ path: "/", component: Main }]
        }
      ]
    },
    //  内容主页面的layout
    {
      path: "/layout",
      component: Layout,
      redirect: "/layout/home",
      children: [
        //主页
        {
          path: "home",
          name: "Home",
          component: () => import("@/views/Container/Context/Home/Home")
        },
        //用户管理-->学生列表
        {
          path: "student",
          name: "Student",
          component: () =>
            import("@/views/Container/Context/ManageUser/Student")
        },
        //用户管理-->管理员列表
        {
          path: "admin",
          name: "Admin",
          component: () => import("@/views/Container/Context/ManageUser/Admin")
        },
        ...question,
        ...paper,
        ...result
      ]
    }
  ]
});

export default router;
