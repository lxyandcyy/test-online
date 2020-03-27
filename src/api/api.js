/**
 * api接口统一管理
 */
import { get, post } from "./http";
// import Qs from "Qs";

export default {
  /**
   * 获取access_Token
   * @param {-} grant_type []
   * @param {-} client_id []
   * @param {-} client_secret []
   * @returns {-} access_token
   */
  getToken(g) {
    return get("https://aip.baidubce.com/oauth/2.0/token", g);
  },

  /**
   * 用户注册信息
   * @param {String、Number、特殊字符、无空格} user_id [用户名]
   * @param {String、Number、特殊字符、无空格} password [密码]
   */
  postRegInfo(p) {
    return post("http://localhost:6001/user/regInfo", p);
  },

  /**
   * 用户账号密码验证
   * @param {String、Number、特殊字符、无空格} user_id [用户名]
   * @param {String、Number、特殊字符、无空格} password [密码]
   */
  postDetectInfo(p) {
    return post("http://localhost:6001/user/detectInfo", p);
  },

  /**
   * 用户人脸绑定注册
   * @param {String、Number、特殊字符、无空格} user_id [用户名]
   * @param {-} group_id [用户组]
   * @param {-} access_token [验证]
   * @param {-} image_type [图片类型] Base64或其他
   * @param {-} image [图片]
   * @returns {-}
   */
  postRegFace(p) {
    return post("http://localhost:6001/user/regFace", p);
  },

  /**
   * 人脸登录
   * @param {String、Number、特殊字符、无空格} user_id [用户名]
   * @param {-} group_id_list [用户组]
   * @param {-} access_token [验证]
   * @param {-} image_type [图片类型] Base64或其他
   * @param {-} image [图片]
   * @returns {-} error_code  score
   */
  Login(p) {
    return post("http://localhost:6001/user/Login", p);
  },

  /**
   * 人脸修改
   * @param {String、Number、特殊字符、无空格} user_id [用户名]
   * @param {-} group_id [用户组]
   * @param {-} access_token [验证]
   * @param {-} image_type [图片类型] Base64或其他
   * @param {-} image [图片]
   * @returns {-}
   */
  ChangeFace(p) {
    return post("http://localhost:6001/user/changeFace", p);
  }
};
