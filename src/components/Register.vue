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
      <video id="v" ref="video"></video>
      <canvas id="canvs" ref="canvas" width="230" height="230"></canvas>
      <div>
        <span id="ts" style="text-align: center;color: red;"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_id: "",
      password: "",
      isInfo: true, //是否是‘人脸注册’信息填写页
      has_face: false
    };
  },
  methods: {
    // 提交注册信息
    Register() {
      this.$api.postRegInfo({
        user_id: this.user_id,
        password: this.password
      });
      this.openVideo();
      this.has_face = true;
      this.isInfo = false; //跳转到‘人脸绑定’页
      setTimeout(() => {
        this.takePhoto();
      }, 10);
    },
    //打开摄像头
    openVideo() {
      let Media = navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          width: { ideal: 230 },
          height: { ideal: 230 }
        }
      });
      Media.then(mediaStream => {
        //成功时调用的callback函数
        let videoObj = this.$refs.video;
        videoObj.srcObject = mediaStream; //设置video的srcObject
        videoObj.onloadedmetadata = e => {
          videoObj.play();
        };
      }).catch(err => {
        //失败时调用的callback函数
        console.log("The following error occurred: " + err.message);
      });
    },
    takePhoto() {
      let canvas = this.$refs.canvas;
      let videoObj = this.$refs.video;
      console.log(canvas);
      canvas.getContext("2d").drawImage(videoObj, 0, 0, 230, 230);
      let dataURL = canvas.toDataURL("image/png"); //canvas转换成base64图片
    }
  }
};
</script>

<style lang="scss" scoped>
#v {
  border-radius: 50%;
}

#canvas {
  // z-index: -1;
  position: absolute;
}
</style>
