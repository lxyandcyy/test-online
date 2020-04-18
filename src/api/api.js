/**
 * api接口统一管理
 */
import { get, post } from "./http";
import user from "./user";
import question from "./question";
import paper from "./paper";

export default {
  verifyToken: token => {
    return get("http://localhost:6001/verify-token", token);
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

  // t_quetion表相关操作
  QueList: question.QueList, //获取所有题目
  AddQue: question.AddQue, //新增题目
  SelQue: question.SelQue, //预览题目
  EditQue: question.EditQue,
  DelQue: question.DelQue,

  // t_exam_paper表相关操作
  PaperList: paper.PaperList, //获取所有试卷
  AddPaper: paper.AddPaper, //新增试卷
  SelPaper: paper.SelPaper, //预览试卷
  EditPaper: paper.EditPaper,
  DelPaper: paper.DelPaper
};
