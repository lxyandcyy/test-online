/**
 * api接口统一管理
 */
import { get, post } from "./http";
import user from "./user";
import question from "./question";

export default {
  // user_info表相关、登录注册相关操作
  getToken: user.getToken, //获取access_Token
  postRegInfo: user.postRegInfo, // 用户注册信息
  postDetectInfo: user.postDetectInfo, //用户账号密码验证
  postRegFace: user.postRegFace, //用户人脸绑定注册
  Login: user.Login, //人脸登录
  ChangeFace: user.ChangeFace, //人脸修改
  AllUserInfo: user.AllUserInfo, //所有用户列表

  // t_quetion表相关操作
  QueList: question.QueList, //获取所有题目
  AddQue: question.AddQue, //新增题目
  SelQue: question.SelQue, //预览题目
  EditQue: question.EditQue,
  DelQue: question.DelQue
};
