import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Layout from "@/views/Admin/Layout";
import StudentLayout from "@/views/Student/StudentLayout";
import Main from "@/views/Main";
import Background from "@/views/Background";
import { Message } from "element-ui";

import api from "../api/api"; // 导入api接口

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
          children: [{ path: "/", component: Main }],
        },
      ],
    },
    //  管理员主页面的layout
    {
      path: "/layout",
      component: Layout,
      redirect: "/layout/home",
      children: [
        //管理员主页
        {
          path: "home",
          name: "Home",
          component: () => import("@/views/Admin/Context/Home/Home"),
        },
        {
          // 管理员个人信息
          path: "profile",
          name: "Profile",
          component: () => import("@/views/Admin/Context/Profile/Profile"),
        },
        //用户管理-->学生列表
        {
          path: "student",
          name: "Student",
          component: () => import("@/views/Admin/Context/ManageUser/Student"),
        },
        //用户管理-->管理员列表
        {
          path: "admin",
          name: "Admin",
          component: () => import("@/views/Admin/Context/ManageUser/Admin"),
        },
        ...question,
        ...paper,
        ...result,
      ],
    },
    //  考生主页面的布局/student-layout
    {
      path: "/student-layout",
      component: StudentLayout,
      redirect: "/student-layout/home",
      children: [
        //考生主页
        {
          path: "home",
          name: "Home",
          component: () => import("@/views/Student/Home/Home"),
        },
        // {
        //   // 考生个人信息
        //   path: "profile",
        //   name: "Profile",
        //   component: () => import("@/views/Admin/Context/Profile/Profile"),
        // },
        // //用户管理-->学生列表
        // {
        //   path: "student",
        //   name: "Student",
        //   component: () => import("@/views/Admin/Context/ManageUser/Student"),
        // },
        // //用户管理-->管理员列表
        // {
        //   path: "admin",
        //   name: "Admin",
        //   component: () => import("@/views/Admin/Context/ManageUser/Admin"),
        // },
        // ...question,
        // ...paper,
        // ...result,
      ],
    },
  ],
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 验证token是否有效
  if (to.path.match(/^\/layout/i) || to.path.match(/^\/student-layout/i)) {
    console.log("userjfalskdfalsdhfaslkjdh");

    let log_token = localStorage.getItem("log_token");
    if (log_token !== null) {
      api.verifyToken(log_token).then((res) => {
        // token已过期
        if (!res.valid) {
          Message.error("你的身份验证已经过期，请重新登录", 2000);
          next({ path: "/main" });
        } else {
          // token有效
          getUserInfo(res.decoded.user_id).then(() => {
            next();
          });
        }
      });
    } else {
      // 没有token，进入登录页面
      Message.error("你还未登录，请先登录");
      next({ path: "/main" });
    }
  } else {
    next();
  }
});

let getUserInfo = (userId) => {
  // 从用户信息表 (user_info) 获取个人用户基本信息（profile）
  console.log("user_id:", userId);
  return api.SelUser({ user_id: userId }).then((res) => {
    console.log("获取个人用户信息:", res);
    store.commit("updateUser", res); //用户信息 存进vuex
  });
};

export default router;
