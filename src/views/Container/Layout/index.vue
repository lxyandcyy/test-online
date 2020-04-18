<template>
  <div id="layout">
    <!-- 管理员系统的layout页面 -->
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <!-- 左侧导航栏 -->
      <a-layout-sider collapsible v-model="collapsed">
        <div class="logo">Test Online</div>
        <a-menu
          theme="dark"
          :defaultSelectedKeys="['1']"
          mode="inline"
          @click="ToggleModule($event)"
        >
          <a-menu-item key="1">主页</a-menu-item>
          <a-sub-menu key="sub1">
            <span slot="title">
              <a-icon type="desktop" />
              <span>用户管理</span>
            </span>
            <a-menu-item key="2">学生列表</a-menu-item>
            <a-menu-item key="3">管理员列表</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title">
              <a-icon type="desktop" />
              <span>题库管理</span>
            </span>
            <a-menu-item key="4">题库列表</a-menu-item>
            <a-menu-item key="5">新增题目</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <span slot="title">
              <a-icon type="desktop" />
              <span>试卷管理</span>
            </span>
            <a-menu-item key="6">试卷列表</a-menu-item>
            <a-menu-item key="7">新增试卷</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub4">
            <span slot="title">
              <a-icon type="pie-chart" />
              <span>考试结果分析</span>
            </span>
            <a-menu-item key="8">用户成绩分析</a-menu-item>
            <a-menu-item key="9">试卷成绩分析</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <!-- 右边内容区 -->
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0" />

        <!-- navbar -->
        <NavBar></NavBar>

        <a-layout-content style="margin: 0 16px">
          <a-breadcrumb style="margin: 2vh 0">
            <a-breadcrumb-item>User</a-breadcrumb-item>
            <a-breadcrumb-item>Bill</a-breadcrumb-item>
          </a-breadcrumb>
          <div style="padding: 24px;background: #fff;min-height: 80vh">
            <router-view></router-view>
          </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center"
          >在线测试系统 ©2020 Created by lxy</a-layout-footer
        >
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import NavBar from "@/views/Container/Layout/Navbar";

export default {
  components: {
    NavBar
  },
  data() {
    return {
      module_name: [
        { name: "用户管理", type: "user", children: null },
        { name: "题库管理", type: "desktop", children: null },
        { name: "试卷管理", type: "desktop", children: null },
        {
          name: "考试结果分析",
          type: "pie-chart",
          children: [{ name: "用户成绩分析" }, { name: "试卷成绩分析" }]
        }
      ],
      collapsed: false
    };
  },
  methods: {
    ToggleModule(e) {
      switch (e.key) {
        case "1":
          this.$router.push({ path: "/layout/home" });
          break;
        case "2":
          this.$router.push({ path: "/layout/student" });
          break;
        case "3":
          this.$router.push({ path: "/layout/admin" });
          break;
        case "4":
          this.$router.push({ path: "/layout/question-bank" });
          break;
        case "5":
          this.$router.push({ path: "/layout/add-question" });
          break;
        case "6":
          this.$router.push({ path: "/layout/paper-bank" });
          break;
        case "7":
          this.$router.push({ path: "/layout/add-paper" });
          break;
        case "8":
          this.$router.push({ path: "/layout/all-grade" });
          break;
        case "9":
          this.$router.push({ path: "/layout/paper-grade" });
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#components-layout-demo-side {
  font-family: Georgia;
}
</style>
