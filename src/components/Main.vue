<template>
  <div id="main">
    <!-- 首页面：有登录、注册、修改三个button -->
    <div id="first" v-if="!alertCMA">
      <div>
        <strong v-if="!alertCMA">在线测试系统</strong>
      </div>
      <div class="bt">
        <button @click="AlertLogin()">人脸登录</button>
      </div>
      <div class="bt">
        <button @click="AlertRegister()">人脸注册</button>
      </div>
      <div class="bt">
        <button @click="AlertUpdateFace()">人脸修改</button>
      </div>
    </div>
    <!-- 登录页面 -->
    <Login v-if="alertCMA && alertLogin"></Login>
    <!-- 注册页面 -->
    <Register v-if="alertCMA && alertRegister"></Register>
    <!-- 修改页面 -->
    <UpdateFace v-if="alertCMA && updateFace"></UpdateFace>
  </div>
</template>

<script>
import Login from "./Login";
import Register from "./Register";
import UpdateFace from "./UpdateFace";

export default {
  data() {
    return {
      alertCMA: false, //是否点击三个button中的一个
      alertLogin: false, //是否点击‘登录’
      alertRegister: false, //是否点击‘注册’
      updateFace: false, //是否点击‘修改’
      access_token: ""
    };
  },
  components: {
    Login: Login,
    Register: Register,
    UpdateFace: UpdateFace
  },
  created() {
    this.$api
      .getToken({
        grant_type: "client_credentials",
        client_id: "UwELvyWkz5Q9rFZx8uIc0Qi5",
        client_secret: "GzHQM5nrA1dbaQFPnXkOoM6IYBNhtXZ3"
      })
      .then(res => {
        this.access_token = res.access_token;
      });
  },
  methods: {
    AlertRegPage() {
      //点击三个button中的一个后跳转页面的事件
      this.alertCMA = true;
    },
    AlertLogin() {
      this.AlertRegPage();
      this.alertLogin = true;
    },
    AlertRegister() {
      //人脸识别注册
      this.AlertRegPage();
      this.alertRegister = true;
    },
    AlertUpdateFace() {
      this.AlertRegPage();
      this.updateFace = true;
    }
  }
};
</script>

<style lang="scss">
$login-width: 20rem;
$login-height: 20rem;
$div-count: 6;

#main {
  width: $login-width;
  height: $login-height;
  background: rgba(118, 20, 31, 0.8);
  color: white;
  // display: grid;
  // grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  margin: 0 auto;

  // #first,
  // #login,
  // #register,
  // #update-face
  div {
    height: $login-height/$div-count;
    text-align: center;
    line-height: $login-height/$div-count;

    div > button,
    div > input {
      border: 0;
      width: 80%;
      height: 80%;
      line-height: 80%;
      background: rgba(118, 20, 31, 0.1);
      box-shadow: 2px 2px 8px rgba(43, 20, 20, 0.8);
    }

    div > input {
      padding-left: 2rem;
    }

    input::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder {
      color: rgba($color: #ffffff, $alpha: 0.5);
    }
  }
}
</style>
