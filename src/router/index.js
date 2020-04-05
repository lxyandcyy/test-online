import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/Container/Layout";
import Main from "@/views/Main";
import Background from "@/views/Background";

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
      redirect: "/layout/manage-user",
      children: [
        //用户管理（管理员）
        {
          path: "manage-user",
          name: "ManageUser",
          component: () => import("@/views/Container/Context/ManageUser")
        },
        // 题库管理（管理员）
        {
          path: "question-bank",
          name: "QuestionBank",
          component: () => import("@/views/Container/Context/QuestionBank")
        },
        // 试卷管理（管理员）
        {
          path: "paper-bank",
          name: "PaperBank",
          component: () => import("@/views/Container/Context/PaperBank")
        },
        // 用户成绩分析（管理员）
        {
          path: "all-grade",
          name: "AllGrade",
          component: () => import("@/views/Container/Context/AllGrade")
        },
        // 个人成绩分析（普通用户）
        {
          path: "personal-grade",
          name: "PersonalGrade",
          component: () => import("@/views/Container/Context/PersonalGrade")
        },
        // 试卷成绩分析
        {
          path: "paper-grade",
          name: "PaperGrade",
          component: () => import("@/views/Container/Context/PaperGrade")
        }
      ]
    }
  ]
});

export default router;
