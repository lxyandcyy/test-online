import { get, post } from "./http";

export default {
  PaperList: () => get("http://localhost:6001/paper/list"), //获取所有试卷
  AddPaper: query => post("http://localhost:6001/paper/add-paper", query), //新增试卷
  SelPaper: id => get("http://localhost:6001/paper/sel-paper?id=" + id), //获取单个题目
  EditPaper: row => post("http://localhost:6001/paper/edit-paper", row),
  DelPaper: id => post("http://localhost:6001/paper/del-paper", id)
};
