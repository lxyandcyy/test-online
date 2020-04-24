<template>
  <div id="student-account">
    <el-form>
      <el-form-item label="用户名">
        <el-input v-model.trim="userInfo.user_id" disabled />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model.trim="userInfo.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updatePassword">修改密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {
          user_id: "",
          password: "",
        };
      },
    },
  },
  methods: {
    updatePassword() {
      this.$api
        .UpdateUser(this.userInfo)
        .then((res) => {
          console.log("更新密码：", res);
          this.$message.success("用户密码更新成功");
          this.$router.push({ path: "/student-layout/home" });
        })
        .catch((err) => {
          this.$message.error("密码更新失败");
        });
    },
  },
};
</script>
