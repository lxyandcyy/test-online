import { get, post } from "./http";

export default {
  PaperList: () => get("http://localhost:6001/exam-paper"), //获取所有试卷
  AddPaper: (query) => post("http://localhost:6001/exam-paper/add", query), //新增试卷
  SelPaper: (id) => get("http://localhost:6001/exam-paper/" + id), //获取单个题目
  EditPaper: (id) => post("http://localhost:6001/exam-paper/edit/"+id),
  DelPaper: (id) => post("http://localhost:6001/exam-paper/delete/"+id),
  SubmitExam: (data) => post("http://localhost:6001/exam-paper/submit", data),
};
