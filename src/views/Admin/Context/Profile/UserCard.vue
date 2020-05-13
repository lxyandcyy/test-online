<template>
  <div id="user-card">
    <v-card class="pa-4" max-width="800px">
      <v-card-title>
        <v-icon small left>
          关于我
        </v-icon>
      </v-card-title>

      <v-col>
        <v-row justify="center">
          <v-avatar>
            <img src="@/assets/avatar.gif" alt="John">
          </v-avatar>
        </v-row>
        <v-row justify="center">
          <strong>{{ userInfo.user_id }}</strong>
        </v-row>
        <v-row justify="center">
        <span> {{ userInfo.user_type === "ADMIN" ? "管理员" : "考生" }}</span>
        </v-row>
        <v-divider class="mx-4"></v-divider>
        <v-row >
              <span>注册时间:{{ userInfo.reg_time }}</span>
        </v-row>
      </v-col>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {
          user_id: "",
          reg_time: "",
          user_type: ""
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
