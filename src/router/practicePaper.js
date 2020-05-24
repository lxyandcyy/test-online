export default [
    //智能试卷列表
    {path: "practicePaper", name: "PracticePaperBank", component: () => import("@/views/Admin/Context/ManagePracticePaper/PracticePaperBank"),},
// 试卷管理-->查看试卷
    {
        path: "practicePaper/look/:id",
        name: "LookPracticePaper",
        component: () => import("@/views/Admin/Context/ManagePracticePaper/LookPracticePaper")
    }
];
