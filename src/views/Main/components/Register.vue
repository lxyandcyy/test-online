<template>
  <div id="register">
    <div id="info-from" v-show="isInfo">
      <div>
        <strong>人脸注册</strong>
      </div>
      <div class="bt">
        <input
          type="text"
          placeholder="请输入用户名"
          v-model="user_info.user_id"
        />
      </div>
      <div class="bt">
        <input
          type="password"
          placeholder="请输入密码"
          v-model="user_info.password"
        />
      </div>
      <div>
        <a-radio-group @change="onChange" v-model="value">
          <a-radio :value="1">普通用户</a-radio>
          <a-radio :value="2">管理员</a-radio>
        </a-radio-group>
      </div>
      <div class="bt">
        <button @click="Register()">点击绑定人脸</button>
      </div>
      <div class="bt">
        <button @click="goBack()">返回</button>
      </div>
    </div>
    <!-- 人脸绑定页 -->
    <div id="face-from" v-show="!isInfo">
      <div>
        <strong>绑定人脸</strong>
      </div>
      <FaceDetect
        @changeIsInfo="ChangeIsInfo()"
        :father="father"
        ref="faceDetect"
      ></FaceDetect>
    </div>
  </div>
</template>

<script>
import FaceDetect from "./FaceDetect";

export default {
  data() {
    return {
      value: 1, //用户类型（管理员或普通用户）
      user_info: {
        user_type: this.$store.state.user.user_type,
        user_id: this.$store.state.user.user_id,
        password: this.$store.state.user.password,
        reg_time: this.$store.state.user.reg_time
      },
      isInfo: true, //是否是‘人脸注册’信息填写页
      father: "register"
    };
  },
  components: {
    FaceDetect: FaceDetect
  },
  methods: {
    //切换管理员和普通用户时触发
    onChange() {
      if (this.value === 1) {
        this.user_info.user_type = "user";
      } else if (this.value === 2) {
        this.user_info.user_type = "admin";
      }
    },
    // 提交注册信息
    async Register() {
      this.user_info.reg_time = Date.now(); //获取当前注册时间
      this.RegInfo(); //提交注册信息
      this.$store.commit("updateUser", this.user_info); //注册信息存进vuex
    },
    RegInfo() {
      this.$api.postRegInfo(this.user_info).then(res => {
        switch (res.state) {
          case 200:
            this.isInfo = false; //跳转到‘人脸绑定’页
            this.$refs.faceDetect.openVideo(); //打开人脸绑定页的摄像头
            // this.$message.success(`${res.msg}`); //用户注册成功！
            break;
          case 400:
            this.$message.error(`${res.msg}`); //用户注册失败！
            break;
        }
      });
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
