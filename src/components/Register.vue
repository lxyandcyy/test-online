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
      <div>
        <span id="ts" ref="ts">{{ detectTips }}</span>
      </div>
      <canvas id="canvas" ref="canvas" width="200" height="200"></canvas>
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
      has_face: false,
      detectTips: ""
    };
  },
  methods: {
    // 提交注册信息
    Register() {
      this.$api
        .postRegInfo({
          user_id: this.user_id,
          password: this.password
        })
        .then(res => {
          //如果用户注册成功
          if (res.state == 200) {
            this.has_face = true;
            this.isInfo = false; //跳转到‘人脸绑定’页
            this.openVideo();
            this.$message.success(`${res.msg}`);
          }
          // 如果用户注册失败
          else if (res.state == 400) {
            this.$message.error(`${res.msg}`);
          }
        });
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
        this.dengdai("正在识别...");
      }).catch(err => {
        //失败时调用的callback函数
        console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
      });
    },
    dengdai(msg) {
      setTimeout(() => {
        this.detectTips = msg;
        this.faceDetect();
      }, 2000);
    },
    faceDetect() {
      let canvas = this.$refs.canvas;
      let videoObj = this.$refs.video;
      let context = canvas.getContext("2d");
      context.drawImage(videoObj, 0, 0, 230, 230);
      var base64_img = this.convertImageToBase64(canvas).split(",")[1];
      console.log(base64_img);
      this.$api.postRegFace({
        user_id: this.user_id,
        group_id: "admin",
        access_token: this.$store.state.access_token,
        image_type: "BASE64",
        image: base64_img
      });

      // $.ajax({
      //   type: "post",
      //   url: ip + "/tp5/public/face/test/index",
      //   dataType: "json",
      //   data: { base64: base64.substring(23) },
      //   success: function(data) {
      //     $("#ts").html(data.msg);
      //     if (data.error_code != 0) {
      //       dengdai("正在重新识别...");
      //     } else {
      //       if (GetQueryString("type") == "register") {
      //         verification();
      //       } else if (GetQueryString("type") == "login") {
      //         login();
      //       } else {
      //         update();
      //       }
      //     }
      //   },
      //   error: function(error) {
      //     $("#ts").html("识别失败！请检查网络！");
      //     alert("失败！请检查网络！");
      //   }
      // });
    },
    convertImageToBase64(canvas) {
      var img = canvas.toDataURL("image/jpeg", 0.92);
      return img;
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

#ts {
  float: right;
}
</style>
