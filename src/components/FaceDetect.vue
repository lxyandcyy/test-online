<template>
  <div id="face-detect">
    <video id="v" ref="video"></video>
    <div>
      <span id="ts" ref="ts">{{ detectTips }}</span>
    </div>
    <canvas
      id="canvas"
      ref="canvas"
      width="200"
      height="200"
      v-show="false"
    ></canvas>
    <!-- 加载动画 -->
    <!-- <a-button @click="success">Display a loading indicator</a-button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      n: 0,
      detectTips: "",
      user_id: this.$store.state.user.user_id,
      access_token: this.$store.state.access_token
    };
  },
  created() {
    this.openVideo();
  },
  methods: {
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
      }, 1000);
    },
    faceDetect() {
      console.log(this.father, this.n);
      this.n = this.n + 1;
      let canvas = this.$refs.canvas;
      let videoObj = this.$refs.video;
      let context = canvas.getContext("2d");
      context.drawImage(videoObj, 0, 0, 230, 230);
      var base64_img = this.convertImageToBase64(canvas).split(",")[1];
      switch (this.father) {
        case "login":
          this.Login(base64_img);
          break;
        case "register":
          this.RegFace(base64_img);
          break;
      }
    },
    RegFace(base64_img) {
      this.$api
        .postRegFace({
          user_id: this.user_id,
          group_id: "admin",
          access_token: this.access_token,
          image_type: "BASE64",
          image: base64_img
        })
        .then(res => {
          switch (res.error_code) {
            case 0:
              this.detectTips = "人脸绑定成功！";
              // 跳转到上一级页面。。。。
              setTimeout(() => {
                this.$emit("changeIsInfo", true);
              }, 2000);
              break;
            case 2213105:
              this.detectTips = "该账号已经绑定过人脸啦~";
              // 跳转到上一级页面。。。。
              setTimeout(() => {
                this.$emit("changeIsInfo", true);
              }, 2000);
              break;
            case 222202:
              this.dengdai("没有检测到人脸，正在重新检测。。");
              break;
            default:
              this.detectTips = "what?";
              break;
          }
        })
        .catch(error => {
          this.detectTips = "识别失败！请检查网络！";
          this.$message.error("失败！请检查网络");
        });
    },
    Login(base64_img) {
      console.log("执行login函数");
      this.$api
        .Login({
          group_id_list: "admin",
          access_token: this.access_token,
          image_type: "BASE64",
          image: base64_img
        })
        .then(res => {
          switch (res.error_code) {
            case 0:
              const score = res.result.user_list[0].score; //匹配分数
              if (score >= 90) {
                this.detectTips = "登录成功";
                // 跳转到内容主界面
              } else if (score >= 60 && score < 90) {
                this.detectTips = "没有匹配到相应用户，请先注册";
                // 跳转到上一级页面(Main)。。。。
                this.$message.loading("3秒后返回上一级进行注册..", 3000);
                setTimeout(() => {
                  location.reload(); //刷新页面，相当于跳转到Main页面
                }, 3000);
              } else {
                this.dengdai("没有检测到人脸，正在重新检测。。");
              }
              break;
            case 222202:
              this.dengdai("没有检测到人脸，正在重新检测。。");
              break;
          }
        })
        .catch(error => console.log(error));
    },
    convertImageToBase64(canvas) {
      var img = canvas.toDataURL("image/jpeg", 0.92);
      return img;
    }
  },
  props: ["father"]
};
</script>

<style lang="scss" scoped>
#v {
  border-radius: 50%;
}

#canvas {
  z-index: -1;
  position: absolute;
}

#ts {
  float: right;
}
</style>
