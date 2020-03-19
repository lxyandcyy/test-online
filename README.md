## vue-particles 来做背景的粒子效果

参考网站：https://blog.csdn.net/qq_35366269/article/details/97889896

```javascript
import VueParticles from "vue-particles";
Vue.use(VueParticles);
```

## axios 的 api 管理

参考网站：https://juejin.im/post/5b55c118f265da0f6f1aa354

重写 axios 的 get、post 方法（http.js），并且封装所有需要调用的 api（api.js）

```javascript
/**
 * 封装post方法
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
```

用 api.js 一个文件统一管理所有 api

```javascript
export const getApi = () =>
  get(
    "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=UwELvyWkz5Q9rFZx8uIc0Qi5&client_secret=GzHQM5nrA1dbaQFPnXkOoM6IYBNhtXZ3"
  );
```

## 调用百度 api 时遇到跨域问题

参考网站解决：
https://blog.csdn.net/wandoumm/article/details/80280680
https://juejin.im/post/5afd79aa6fb9a07ac162a540

使用代理解决跨域问题