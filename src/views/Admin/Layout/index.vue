<template>
  <div id="layout">
    <!-- 管理员系统的layout页面 -->
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <!-- 左侧导航栏 -->
      <a-layout-sider collapsible v-model="collapsed">
        <div class="logo">Test Online</div>
        <a-menu theme="dark" :defaultSelectedKeys="['1']" mode="inline">
          <a-menu-item key="1">主页</a-menu-item>
          <a-sub-menu key="sub1">
            <span slot="title">
              <a-icon type="desktop" />
              <span>用户管理</span>
            </span>
            <a-menu-item key="2">
              <router-link to="/layout/student">学生列表</router-link>
            </a-menu-item>
            <a-menu-item key="3">
              <router-link to="/layout/admin">管理员列表</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title">
              <a-icon type="desktop" />
              <span>题库管理</span>
            </span>
            <a-menu-item key="4">
              <router-link to="/layout/question-bank">题库列表</router-link>
            </a-menu-item>
            <a-menu-item key="5">
              <router-link to="/layout/add-question">新增题目</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <span slot="title">
              <a-icon type="desktop" />
              <span>试卷管理</span>
            </span>
            <a-menu-item key="6">
              <router-link to="/layout/practice-paper-bank">智能试卷列表</router-link>
            </a-menu-item>
            <a-menu-item key="7">
              <router-link to="/layout/paper-bank">试卷列表</router-link>
            </a-menu-item>
            <a-menu-item key="8">
              <router-link to="/layout/add-paper">新增试卷</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub4">
            <span slot="title">
              <a-icon type="pie-chart" />
              <span>考试结果分析</span>
            </span>
            <a-menu-item key="9">
              <router-link to="/layout/all-grade">用户成绩分析</router-link>
            </a-menu-item>
            <a-menu-item key="10">
              <router-link to="/layout/paper-grade">试卷成绩分析</router-link>
            </a-menu-item>
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
        <a-layout-footer style="text-align: center">在线测试系统 ©2020 Created by lxy</a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import NavBar from "@/views/Admin/Layout/Navbar";

export default {
  components: {
    NavBar
  },
  data() {
    return {
      collapsed: false
    };
  }
};
</script>

<style lang="scss" scoped>
#components-layout-demo-side {
  font-family: Georgia;
}
</style>
