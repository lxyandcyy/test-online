import { get, post } from "./http";

export default {
  QueList: () => get("http://localhost:6001/question/list"), //获取所有题目
  AddQue: query => post("http://localhost:6001/question/add-que", query), //新增题目
  SelQue: id => get("http://localhost:6001/question/sel-que?id=" + id), //预览某个题目
  EditQue: row => post("http://localhost:6001/question/edit-que", row),
  DelQue: id => post("http://localhost:6001/question/del-que", id)
};
