export default [
  // 考试结果分析(成绩管理)-->所有用户成绩分析  路径：layout/all-grade
  {
    path: "all-grade",
    name: "AllGrade",
    component: () => import("@/views/Container/Context/ManageGrade/AllGrade")
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
    component: () => import("@/views/Container/Context/ManageGrade/PaperGrade")
  }
];
