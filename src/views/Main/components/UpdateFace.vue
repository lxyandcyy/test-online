<template>
  <div id="update-face">
    <div id="info-from" v-show="isInfo">
      <div>
        <strong>人脸修改</strong>
      </div>
      <div class="bt">
        <input type="text" placeholder="请输入用户名" v-model="user_id" />
      </div>
      <div class="bt">
        <input type="password" placeholder="请输入密码" v-model="password" />
      </div>
      <div class="bt">
        <a-radio-group @change="onChange" v-model="value">
          <a-radio :value="1">普通用户</a-radio>
          <a-radio :value="2">管理员</a-radio>
        </a-radio-group>
      </div>
      <div class="bt">
        <button @click="UpdateFace()">点击修改人脸</button>
      </div>
      <div class="bt">
        <button @click="goBack()">返回</button>
      </div>
    </div>
    <!-- 人脸修改页 -->
    <div id="face-from" v-show="!isInfo">
      <div>
        <strong>修改人脸</strong>
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
      value: 1, //用户类型（管理员或普通用户）
      user_id: this.$store.state.user.user_id,
      password: this.$store.state.user.password,
      isInfo: true, //是否是‘人脸修改’信息填写页
      father: "update-face"
    };
  },
  components: {
    FaceDetect: FaceDetect
  },
  methods: {
    onChange() {
      console.log("asdf");
    },
    UpdateFace() {
      this.DetectInfo();
      this.$store.commit("updateUser", {
        user_id: this.user_id,
        password: this.password
      });
    },
    DetectInfo() {
      this.$api
        .postDetectInfo({
          user_id: this.user_id,
          password: this.password
        })
        .then(res => {
          switch (res.state) {
            case 200:
              this.isInfo = false;
              this.$message.success(`${res.msg}`); //账户验证成功！
              break;
            case 400:
              this.$message.error(`${res.msg}`); //没有此用户！
              break;
            case 401:
              this.$message.error(`${res.msg}`); //密码错误！
              break;
          }
        })
        .catch(error => console.log(error));
    },
    ChangeIsInfo(p) {
      this.isInfo = p;
    },
    goBack() {
      location.reload(); //刷新页面，相当于跳转到Main页面
    }
  }
};
</script>

<style lang="scss" scoped>
#face-from {
  position: relative;
}
</style>
