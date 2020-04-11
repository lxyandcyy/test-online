import { get, post } from "./http";

export default {
  /**
   * 获取access_Token
   * @returns {-} access_token
   */
  getToken: g => post("http://localhost:6001/user/getToken", g),

  /**
   * 用户注册信息
   * @param user_id [用户名]
   * @param password [密码]
   * @param {String} user_type [用户类型] 管理员or普通用户
   *
   */
  postRegInfo: p => post("http://localhost:6001/user/regInfo", p),

  /**
   * 用户账号密码验证
   * @param  user_id [用户名]
   * @param  password [密码]
   */
  postDetectInfo: p => post("http://localhost:6001/user/detectInfo", p),

  /**
   * 用户人脸绑定注册
   * @param user_id [用户名]
   * @param group_id [用户组]
   * @param access_token [验证]
   * @param image_type [图片类型] Base64或其他
   * @param image [图片]
   * @returns
   */
  postRegFace: p => post("http://localhost:6001/user/regFace", p),

  /**
   * 人脸登录
   * @param  user_id [用户名]
   * @param  group_id_list [用户组]
   * @param  access_token [验证]
   * @param  image_type [图片类型] Base64或其他
   * @param  image [图片]
   * @returns  error_code  score
   */
  Login: p => post("http://localhost:6001/user/Login", p),

  /**
   * 人脸修改
   * @param  user_id [用户名]
   * @param  group_id [用户组]
   * @param  access_token [验证]
   * @param  image_type [图片类型] Base64或其他
   * @param  image [图片]
   * @returns
   */
  ChangeFace: p => post("http://localhost:6001/user/changeFace", p),

  // 所有用户列表
  AllUserInfo: () => get("http://localhost:6001/user/allUserInfo")
};
