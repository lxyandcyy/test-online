import { get, post, deleted } from "./http";

export default {
  PracticePaperList: () => get("http://localhost:6001/practice-paper/list"), //获取所有试卷
  AddPracticePaper: (query) =>
    post("http://localhost:6001/practice-paper/add", query), //按条件生成试卷
  SelPracticePaper: (id) =>
    get("http://localhost:6001/practice-paper/sel?id=" + id), //获取单个智能试卷
  EditPracticePaper: (row) =>
    post("http://localhost:6001/practice-paper/edit", row),
  DelPracticePaper: (id) =>
    post("http://localhost:6001/practice-paper/del", id),
};
