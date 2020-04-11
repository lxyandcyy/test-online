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
        // 题库管理-->题库列表
        {
          path: "question-bank",
          name: "QuestionBank",
          component: () =>
            import("@/views/Container/Context/ManageQuesBank/QuestionBank")
        },
        // 题库管理-->新增题目
        {
          path: "add-question",
          name: "AddQuestion",
          component: () =>
            import("@/views/Container/Context/ManageQuesBank/AddQuestion")
        },
        // 题库管理-->编辑题目
        {
          path: "edit-question",
          name: "EditQuestion",
          component: () =>
            import("@/views/Container/Context/ManageQuesBank/EditQuestion")
        },
        // 试卷管理-->试卷列表
        {
          path: "paper-bank",
          name: "PaperBank",
          component: () =>
            import("@/views/Container/Context/ManagePaper/PaperBank")
        },
        // 试卷管理-->新增试卷
        {
          path: "add-paper",
          name: "AddPaper",
          component: () =>
            import("@/views/Container/Context/ManagePaper/AddPaper")
        },
        // 考试结果分析(成绩管理)-->所有用户成绩分析
        {
          path: "all-grade",
          name: "AllGrade",
          component: () =>
            import("@/views/Container/Context/ManageGrade/AllGrade")
        },
        // 考试结果分析(成绩管理)-->个人成绩分析
        {
          path: "personal-grade",
          name: "PersonalGrade",
          component: () =>
            import("@/views/Container/Context/ManageGrade/PersonalGrade")
        },
        // 考试结果分析(成绩管理)-->试卷成绩分析
        {
          path: "paper-grade",
          name: "PaperGrade",
          component: () =>
            import("@/views/Container/Context/ManageGrade/PaperGrade")
        }
      ]
    }
  ]
});

export default router;
