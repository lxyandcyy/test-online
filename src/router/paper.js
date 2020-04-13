export default [
  // 试卷管理-->试卷列表  路径：/layout/paper-bank
  {
    path: "paper-bank",
    name: "PaperBank",
    component: () => import("@/views/Container/Context/ManagePaper/PaperBank")
  },
  // 试卷管理-->新增试卷
  {
    path: "add-paper",
    name: "AddPaper",
    component: () => import("@/views/Container/Context/ManagePaper/AddPaper")
  },
  // 试卷管理-->编辑试卷
  {
    path: "edit-paper",
    name: "EditPaper",
    component: () => import("@/views/Container/Context/ManagePaper/EditPaper")
  }
];
