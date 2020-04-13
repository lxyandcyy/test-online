export default [
  // 题库管理-->题库列表  路径：/layout/question-bank
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
  }
];
