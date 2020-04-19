<template>
  <div id="nav-bar">
    <div class="right-menu">
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <span>{{ user_id }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/layout/profile">
            <el-dropdown-item>个人信息</el-dropdown-item>
          </router-link>
          <router-link to="/layout">
            <el-dropdown-item>主页</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="logout" divided
            >退出</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_id: this.$store.state.user.user_id
    };
  },
  created() {},
  methods: {
    logout() {
      this.$router.push({ path: "/main" });
      // 删除token
      localStorage.clear();
    }
  }
};
</script>

<style lang="scss" scoped>
#nav-bar {
  border: 1px solid black;
  width: 3rem;
  height: 2rem;
  line-height: 2rem;
  position: absolute;
  right: 1vw;
  top: 1vh;

  :hover {
    background: rgb(249, 249, 249);
  }
}
</style>
