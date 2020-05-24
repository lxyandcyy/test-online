<template>
  <div id="app">
    <v-app>
      <router-view></router-view>
      <notification-container />
    </v-app>
  </div>
</template>

<script>
import NotificationContainer from "./components/NotificationContainer";
export default {
  name: "App",
  components: {NotificationContainer},
  data() {
    return {};
  }
}
</script>

<style scoped>
  #app{
    /*background:url("https://s1.ax1x.com/2020/05/20/YojNw9.jpg") no-repeat ;*/
    /*background-size: cover;*/
  }
</style>
