/**
 * api接口统一管理
 */
import { get, post } from "./http";

const postApi = p => post("api/v1/users/my_address/address_edit_before", p);

const getToken = g => get("https://aip.baidubce.com/oauth/2.0/token", g);

export default { postApi, getToken };
