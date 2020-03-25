import axios from "axios";

const API_PROXY = "https://bird.ioliu.cn/v1/?url="; //远程代理接口（为了解决跨域）

axios.defaults.baseURL = "";

axios.defaults.timeout = 10000;

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

/**
 * 封装get方法
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(API_PROXY + url, {
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

/**
 * 封装post方法
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, body) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, body)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

// $('body').particleground({
//   dotColor: '#5cbdaa',
//   lineColor: '#5cbdaa'
// });

// var ip = "https://rlsb.cxlwt.cn";
// //访问用户媒体设备的兼容方法
// function register(){
//   var group = "";
//   if (GetQueryString("role") == "admin") {
//     group = "1_101";
//   }else if(GetQueryString("role") == "dormManager"){
//     group = "1_102";
//   }else if(GetQueryString("role") == "student"){
//     group = "1_103";
//   }else{
//     group = GetQueryString("role");
//   }
//   var base64 = convertImageToBase64();
//   //var pass2=Secret_Key(GetQueryString("name"),"123123",'decryption');
//   var pass2 = GetQueryString("name");
//   alert(GetQueryString("name"));
//   $.ajax({
//       type : 'post',
//       url : ip+"/tp5/public/face/test/faceRegister",
//       dataType : 'json',
//       data  : {base64:base64.substring(23),user_info:pass2,group:group,user:GetQueryString("id")},
//       success : function (data) {
//         alert(data.msg+"点击确定重新登录！");
//         $(location).attr("href","https://rlsb.cxlwt.cn/main.html");
//       },
//       error : function (error) {
//         $("#ts").html('注册失败！请检查网络！');
//           alert('失败！请检查网络！');
//       }
//   });
// }

// function update(){
//   var group = "";
//   if (GetQueryString("role") == "admin") {
//     group = "1_101";
//   }else if(GetQueryString("role") == "dormManager"){
//     group = "1_102";
//   }else if(GetQueryString("role") == "student"){
//     group = "1_103";
//   }else{
//     group = GetQueryString("role");
//   }
//   var base64 = convertImageToBase64();
//   $.ajax({
//       type : 'post',
//       url : ip+"/tp5/public/face/test/updateFace",
//       dataType : 'json',
//       data  : {base64:base64.substring(23),user_info:GetQueryString("name"),group:group,user:GetQueryString("id")},
//       success : function (data) {
//         alert(data.msg);
//         $(location).attr("href","https://rlsb.cxlwt.cn/main.html");
//       },
//       error : function (error) {
//         $("#ts").html('更新失败！请检查网络！');
//           alert('失败！请检查网络！');
//       }
//   });
// }

// function verification(){
//   var group = "";
//   if (GetQueryString("role") == "admin") {
//     group = "1_101";
//   }else if(GetQueryString("role") == "dormManager"){
//     group = "1_102";
//   }else if(GetQueryString("role") == "student"){
//     group = "1_103";
//   }else{
//     group = GetQueryString("role");
//   }
//   var user_id = GetQueryString("id");
//   $.ajax({
//       type : 'post',
//       url : ip+"/tp5/public/face/test/testingUser",
//       dataType : 'json',
//       data  : {user_id:user_id,group_id:group},
//      wata.error_code == 402) {
//           testing();
//         }else if (data.error_code == 0){
//           alert("您的账号已经绑定过人脸啦~~！");
//           window.history.back();
//         }else{
//           alert(data.msg);
//         }

//       },
//       error : function (error) {
//         $("#ts").html('检测失败！请检查网络后刷新界面！');
//           alert('检测失败！请检查网络后刷新界面！');
//       }
//   });
// }

// function testing(){
//   var group = "";
//   if (GetQueryString("role") == "admin") {
//     group = "1_101";
//   }else if(GetQueryString("role") == "dormManager"){
//     group = "1_102";
//   }else if(GetQueryString("role") == "student"){
//     group = "1_103";
//   }else{
//     group = GetQueryString("role");
//   }
//   var base64 = convertImageToBase64();
//   $.ajax({
//       type : 'post',
//       url : ip+"/tp5/public/face/test/faceJc",
//       dataType : 'json',
//       data  : {base64:base64.substring(23),groupIdList:group},
//       success : function (data) {
//         $("#ts").html("人脸匹配中...");
//         if (data.error_code == 401) {
//           register();
//         }else if (data.error_code == 0){
//           alert("您的人脸已经绑定过账号啦~~！");
//           window.history.back();
//         }else{
//           alert(data.msg);
//         }

//       },
//       error : function (error) {
//         $("#ts").html('检测失败！请检查网络后刷新界面！');
//           alert('检测失败！请检查网络后刷新界面！');
//       }
//   });
// }

// function login(){
//   var group = "";
//   if (GetQueryString("role") == "admin") {
//     group = "1_101";
//   }else if(GetQueryString("role") == "dormManager"){
//     group = "1_102";
//   }else if(GetQueryString("role") == "student"){
//     group = "1_103";
//   }else{
//     group = GetQueryString("role");
//   }
//   var base64 = convertImageToBase64();
//   $.ajax({
//       type : 'post',
//       url : ip+"/tp5/public/face/test/faceJc",
//       dataType : 'json',
//       data  : {base64:base64.substring(23),groupIdList:group},
//       success : function (data) {
//         $("#ts").html("人脸匹配中...");
//         if (data.error_code !=0) {
//           alert(data.msg);
//         }else{
//           var pwd = data.result.user_list[0].user_info;
//           var psd = "123123";
//           var pass1=Secret_Key(pwd,psd,'encryption');
//           var pass2=Secret_Key(pass1,psd,'decryption');
//           alert("登陆成功！\n账号："+data.result.user_list[0].user_id+"\n密码："+pwd);
//           $(location).attr("href","https://rlsb.cxlwt.cn/main.html");
//           //$(location).attr("href","http://127.0.0.1:8080/DormManage/login.jsp?p="+pass1+"&a="+data.result.user_list[0].user_id);
//         }

//       },
//       error : function (error) {
//         $("#ts").html('检测失败！请检查网络后刷新界面！');
//           alert('检测失败！请检查网络后刷新界面！');
//       }
//   });
// }

// function convertImageToBase64() {
//   var canvas = document.getElementById("canvas");
//   var img = canvas.toDataURL("image/jpeg", 0.5);
//   return img;
// }
// function GetQueryString(name)
// {
// 　　var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
// 　　var r = window.location.search.substr(1).match(reg);
// 　　if(r!=null)return unescape(r[2]);
//    return null;
// }
