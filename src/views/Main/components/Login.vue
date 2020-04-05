<template>
  <div id="login">
    <div id="info-form" v-show="isInfo">
      <div>
        <strong>请选择您的用户类型</strong>
      </div>
      <div class="bt">
        <a-radio-group @change="onChange" v-model="value">
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
      <FaceDetect :father="this.father"></FaceDetect>
    </div>
  </div>
</template>

<script>
import FaceDetect from "./FaceDetect";
export default {
  data() {
    return {
      value: 1, //用户类型（管理员或普通用户）
      isInfo: true, //是否是‘人脸登录’信息填写页
      father: "login"
    };
  },
  components: {
    FaceDetect: FaceDetect
  },
  methods: {
    onChange() {
      console.log("asdf");
    },
    Submit() {
      // 此处不用提交用户信息，后面人脸识别后自动提交搜友信息，这只只做跳转
      this.isInfo = false;
    },
    goBack() {
      location.reload(); //刷新页面，相当于跳转到Main页面
    }
  }
};
</script>

<style lang="scss" scoped></style>
