import { get, post } from "./http";

export default {
    SubjectList: () => get("http://localhost:6001/subject"), //获取所有学科
    AddSubject: body => post("http://localhost:6001/subject/add", body), //新增学科
    SelSubject: id => get("http://localhost:6001/subject/" + id), //查找单个学科
    UpdateSubject: body => post("http://localhost:6001/subject/update/"+id, body),
    DelSubject: id => post("http://localhost:6001/subject/destory/"+id)
};
