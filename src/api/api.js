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
   * 用户注册
   * @param {String、Number、特殊字符、无空格} user_id [用户名]
   * @param {String、Number、特殊字符、无空格} password [密码]
   */
  postRegInfo(p) {
    return post("http://localhost:6001/user/regInfo", p);
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
    return post(
      "https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/add",
      p
    );
  }
};
