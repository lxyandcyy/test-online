/**
 * api接口统一管理
 */
import { get, post } from "./http";
import user from "./user";
import question from "./question";
import paper from "./paper";
import practice_paper from "./practice_paper";
import subject from "./subject";
import records from "./records";



export default {
  verifyToken: (token) => {
    return get("http://localhost:6001/verify-token", token);
  }, //验证log_token
  countData: () => {
    return get("http://localhost:6001/statistic/countData");
  }, //验证log_token

  // user_info表相关、登录注册相关操作
  getToken: user.getToken, //获取access_Token
  postRegInfo: user.postRegInfo, // 用户注册信息
  postDetectInfo: user.postDetectInfo, //用户账号密码验证
  postRegFace: user.postRegFace, //用户人脸绑定注册
  Login: user.Login, //人脸登录
  ChangeFace: user.ChangeFace, //人脸修改
  AllUserInfo: user.AllUserInfo, //所有用户列表
  SelUser: user.SelUser, //单个用户信息
  UpdateUser: user.UpdateUser, //修改当前用户信息
  DelUser:user.DelUser,

  // t_quetion表相关操作
  QueList: question.QueList, //获取所有题目
  AddQue: question.AddQue, //新增题目
  SelQue: question.SelQue, //预览题目
  UpdateQue: question.UpdateQue,
  DelQue: question.DelQue,
  GetOptions:question.GetOptions,

  // t_exam_paper表相关操作
  PaperList: paper.PaperList, //获取所有试卷
  AddPaper: paper.AddPaper, //新增试卷
  SelPaper: paper.SelPaper, //预览试卷
  UpdatePaper: paper.UpdatePaper,
  DelPaper: paper.DelPaper,
  SubmitExam: paper.SubmitExam,
  PublishExamPaper:paper.PublishExamPaper,

  PracticePaperList: practice_paper.PracticePaperList,
  AddPracticePaper: practice_paper.AddPracticePaper,
  SelPracticePaper: practice_paper.SelPracticePaper,
  EditPracticePaper: practice_paper.EditPracticePaper,
  DelPracticePaper: practice_paper.DelPracticePaper,


  SubjectList:subject.SubjectList,
  AddSubject:subject.AddSubject,
  SelSubject:subject.SelSubject,
  UpdateSubject:subject.UpdateSubject,
  DelSubject:subject.DelSubject,

  RecordsList:records.RecordsList,
  ExamResult:records.ExamResult,//查看某用户做该试卷的具体情况
};
