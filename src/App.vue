<template>
  <div id="app">
    <button @click="openVideo">打开摄像头</button>
    <button @click="takePhoto">拍照</button>
    <video id="v" ref="video" style="width: 640px;height: 480px;"></video>
    <canvas id="canvas" ref="canvas" style="display:none;"></canvas>
    <br />
    <img ref="photo" id="photo" alt="photo" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoPlaying: false //是否开启摄像头
    };
  },
  methods: {
    openVideo() {
      let Media = navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 }
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

<style lang="scss">
</style>
