<template>
  <div id="app">
    <vue-particles
      color="#ffffff"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <!-- 
    <button @click="openVideo">打开摄像头</button>
    <button @click="takePhoto">拍照</button>

    <video id="v" ref="video" style="width: 640px;height: 480px;"></video>
    <canvas id="canvas" ref="canvas" style="display:none;"></canvas>
    <br />
    <img ref="photo" id="photo" alt="photo" /> -->

    <Main></Main>
  </div>
</template>

<script>
import Main from "./components/Main";
import Register from "./components/Register";
import UpdateFace from "./components/UpdateFace";

export default {
  data() {
    return {
      videoPlaying: false //是否开启摄像头
    };
  },
  mounted() {
    this.autoSize();
  },
  components: {
    Main: Main
  },
  methods: {
    autoSize() {},
    openVideo() {
      let Media = navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          width: { ideal: 500 },
          height: { ideal: 200 }
        }
      });
      Media.then(mediaStream => {
        //成功时调用的callback函数
        let videoObj = this.$refs.video;
        videoObj.srcObject = mediaStream; //设置video的srcObject
        videoObj.onloadedmetadata = e => {
          videoObj.play();
          this.videoPlaying = true;
        };
      }).catch(err => {
        //失败时调用的callback函数
        console.log("The following error occurred: " + err.message);
      });
    },
    takePhoto() {
      if (this.videoPlaying) {
        let canvas = this.$refs.canvas;
        let videoObj = this.$refs.video;
        let photoObj = this.$refs.photo;

        canvas.width = videoObj.videoWidth;
        canvas.height = videoObj.videoHeight;
        canvas.getContext("2d").drawImage(videoObj, 0, 0);
        let dataURL = canvas.toDataURL("image/png"); //canvas转换成base64图片
        photoObj.src = dataURL; //设置photo的src
      }
    }
  }
};
</script>

<style scoped>
#particles-js {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background: rgb(27, 28, 28);
  z-index: -1;
}
#main {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
