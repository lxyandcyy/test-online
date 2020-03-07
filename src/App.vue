<template>
  <div id="app">
    <button @click="handleVideo">打开摄像头</button>
    <video id="v" ref="video" :srcObject="this.videoInfo.srcObject"></video>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoInfo: {
        srcObject: ""
      }
    };
  },
  methods: {
    handleVideo() {
      let Media = navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      }); 
      Media.then(mediaStream => {
        //成功时调用的callback函数
        let video = this.$refs.video;
        video.srcObject = mediaStream
        video.onloadedmetadata = function(e) {
          
          video.play();
        };
      }).catch(err => {
        //失败时调用的callback函数
        console.log("The following error occurred: " + err.name);
      });
    }
  }
};
</script>

<style lang="scss">
</style>
