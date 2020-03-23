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
    return {};
  },
  components: {
    Main: Main
  },
  methods: {}
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
