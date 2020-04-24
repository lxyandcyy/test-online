<template>
  <div id="student-layout">
    <v-app id="student-layout">
      <!-- 头 -->
      <v-app-bar
        app
        color="#6A76AB"
        dark
        shrink-on-scroll
        prominent
        src="https://picsum.photos/1920/1080?random"
        fade-img-on-scroll
      >
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
          ></v-img>
        </template>

        <!-- 首页导航 -->
        <v-btn icon @click="changeRouter('/student-layout/home')">
          <v-icon large>home</v-icon>
        </v-btn>

        <v-toolbar-title>在线测试系统</v-toolbar-title>

        <!-- 间隙 -->
        <v-spacer></v-spacer>

        <!-- 个人信息，退出弹出框，tooltip -->
        <v-menu offset-y dark>
          <template v-slot:activator="{ on }">
            <!-- 头像 -->
            <v-btn icon v-on="on">
              <v-icon large>mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <!-- dropdown -->
          <v-list>
            <v-list-item
              v-for="(item, index) in dropdown_items"
              :key="index"
              @click="changeRouter(item.router)"
            >
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- 顶部导航 -->
        <template v-slot:extension>
          <v-tabs class="elevation-2" :grow="true">
            <v-tabs-slider></v-tabs-slider>
            <v-tab
              v-for="item in tabs"
              :key="item.router"
              @change="changeRouter(item.router)"
            >
              {{ item.name }}
            </v-tab>
          </v-tabs>
        </template>
      </v-app-bar>

      <!-- 内容区 -->
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    isdropdown: false,
    dropdown_item: "",
    dropdown_items: [
      { router: "/student-layout/profile", icon: "", name: "个人中心" },
      { router: "/main", icon: "", name: "退出" },
    ],
    tab: "/student-layout/home", //当前路由
    tabs: [
      { router: "/student-layout/home", name: "首页" },
      { router: "/student-layout/practice-list", name: "智能训练" },
      { router: "/student-layout/exam-list", name: "考试中心" },
      { router: "/student-layout/mistake-list", name: "错题本" },
    ],
  }),
  methods: {
    changeRouter(router) {
      if (router == "/main") {
        // 当点击‘退出’时,清除 token
        localStorage.clear();
      }
      this.$router.push({ path: router });
    },
  },
};
</script>

<style></style>
