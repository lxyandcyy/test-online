<template>
  <div id="login">
    <div id="info-form" v-show="isInfo">
      <div>
        <strong>用户登录</strong>
      </div>
      <div class="bt">
        <input type="text" placeholder="请输入用户名" v-model="user_id" />
      </div>
      <div class="bt">
        <a-radio-group v-model="value">
          <a-radio :value="1">普通用户</a-radio>
          <a-radio :value="2">管理员</a-radio>
        </a-radio-group>
      </div>
      <div class="bt">
        <button @click="Submit()">提交</button>
      </div>
      <div class="bt">
        <button @click="goBack()">返回</button>
      </div>
    </div>
    <div id="face-form" v-show="!isInfo">
      <div>
        <strong>通过识别人脸登录系统</strong>
      </div>
      <FaceDetect :father="this.father" ref="faceDetect"></FaceDetect>
    </div>
  </div>
</template>

<script>
import FaceDetect from "./FaceDetect";

export default {
  data() {
    return {
      value: 1, //用户类型（管理员或普通用户）
      user_id: "",
      isInfo: true, //是否是‘人脸登录’信息填写页
      father: "login"
    };
  },
  components: {
    FaceDetect: FaceDetect
  },
  computed: {
    user_type() {
      return this.value === 1 ? "user" : "admin";
    }
  },
  methods: {
    Submit() {
      this.$store.commit("updateUser", {
        user_id: this.user_id,
        user_type: this.user_type
      }); //用户user_type和user_id 存进vuex

      // 此处不用提交用户信息，后面人脸识别后自动提交搜友信息，这只只做跳转
      this.isInfo = false;
      this.$refs.faceDetect.openVideo(); //打开人脸绑定页的摄像头
    },
    goBack() {
      location.reload(); //刷新页面，相当于跳转到Main页面
    }
  }
};
</script>

<style lang="scss" scoped></style>
