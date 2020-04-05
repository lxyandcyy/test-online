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
import Login from "./components/Login";
import Register from "./components/Register";
import UpdateFace from "./components/UpdateFace";

export default {
  data() {
    return {
      baiduDB: this.$store.state.baiduDB,
      alertCMA: false, //是否点击三个button中的一个
      alertLogin: false, //是否点击‘登录’
      alertRegister: false, //是否点击‘注册’
      updateFace: false //是否点击‘修改’
    };
  },
  components: {
    Login: Login,
    Register: Register,
    UpdateFace: UpdateFace
  },
  created() {
    // 获取access_token
    this.$api.getToken(this.baiduDB).then(res => {
      this.$store.commit("updateAccessToken", res.access_token);
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
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: $login-width;
  height: $login-height;
  background: rgba(38, 52, 69, 1);
  color: white;
  margin: 0 auto;

  // #first,
  // #login,
  // #register,
  // #update-face
  div,
  select {
    height: $login-height/$div-count;
    text-align: center;
    line-height: $login-height/$div-count;

    div > button,
    div > input,
    select > option {
      border: 0;
      width: 80%;
      height: 80%;
      line-height: 80%;
      background: rgba(38, 52, 69, 0.8);
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
