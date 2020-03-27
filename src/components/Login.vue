<template>
  <div id="login">
    <div>
      <strong>通过识别人脸登录系统</strong>
    </div>
    <FaceDetect :father="this.father"></FaceDetect>
  </div>
</template>

<script>
import FaceDetect from "./FaceDetect";
export default {
  data() {
    return {
      father: "login"
    };
  },
  created() {},
  components: {
    FaceDetect: FaceDetect
  }
};
</script>

<style lang="scss" scoped></style>
