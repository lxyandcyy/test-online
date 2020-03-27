<template>
  <div id="register">
    <div id="info-from" v-if="isInfo">
      <div>
        <strong>人脸注册</strong>
      </div>
      <div class="bt">
        <input type="text" placeholder="请输入用户名" v-model="user_id" />
      </div>
      <div class="bt">
        <input type="text" placeholder="请输入密码" v-model="password" />
      </div>
      <div class="bt">
        <button @click="Register()">点击绑定人脸</button>
      </div>
    </div>
    <div id="face-from" v-if="!isInfo">
      <div>
        <strong>绑定人脸</strong>
      </div>
      <FaceDetect @changeIsInfo="ChangeIsInfo()" :father="father"></FaceDetect>
    </div>
  </div>
</template>

<script>
import FaceDetect from "./FaceDetect";
export default {
  data() {
    return {
      user_id: this.$store.state.user.user_id,
      password: this.$store.state.user.password,
      isInfo: true, //是否是‘人脸注册’信息填写页
      father: "register"
    };
  },
  components: {
    FaceDetect: FaceDetect
  },
  methods: {
    // 提交注册信息
    Register() {
      this.RegInfo();
      this.$store.commit("updateUser", {
        user_id: this.user_id,
        password: this.password
      });
    },
    RegInfo() {
      this.$api
        .postRegInfo({
          user_id: this.user_id,
          password: this.password
        })
        .then(res => {
          //如果用户注册成功
          if (res.state == 200) {
            this.isInfo = false; //跳转到‘人脸绑定’页
            this.$message.success(`${res.msg}`);
          }
          // 如果用户注册失败
          else if (res.state == 400) {
            this.$message.error(`${res.msg}`);
          }
        });
    },
    ChangeIsInfo(p) {
      this.isInfo = p;
    }
  }
};
</script>

<style lang="scss" scoped>
#face-from {
  position: relative;
}
</style>
