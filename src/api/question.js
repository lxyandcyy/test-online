import { get, post } from "./http";

export default {
  QueList: () => get("http://localhost:6001/question"), //获取所有题目
  AddQue: body => post("http://localhost:6001/question/add", body), //新增题目
  SelQue: id => get("http://localhost:6001/question/" + id), //预览单个题目
  UpdateQue: (id,body) => post("http://localhost:6001/question/update/"+id,body),
  DelQue: id => post("http://localhost:6001/question/delete/"+id),
  GetOptions:(body)=>post("http://localhost:6001/question/options",body)//获取一些题目的options
};
