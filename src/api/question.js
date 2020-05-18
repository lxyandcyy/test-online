import { get, post } from "./http";

export default {
  QueList: () => get("http://localhost:6001/question"), //获取所有题目
  AddQue: body => post("http://localhost:6001/question/add", body), //新增题目
  SelQue: id => get("http://localhost:6001/question/" + id), //预览单个题目
  EditQue: id => post("http://localhost:6001/question/edit/"+id),
  DelQue: id => post("http://localhost:6001/question/delete/"+id)
};
