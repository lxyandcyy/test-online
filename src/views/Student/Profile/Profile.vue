<template>
  <div id="student-profile">
    <div>
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <UserCard :userInfo="userInfo"></UserCard>
        </el-col>
        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs active-name="account">
              <el-tab-pane label="账户" name="account">
                <Account :userInfo="userInfo"></Account>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import UserCard from "./UserCard.vue";
import Account from "./Account.vue";

export default {
  components: { UserCard, Account },
  data() {
    return {
      userInfo: {
        user_id: "",
        reg_time: "",
        user_type: "1",
        imagePath: null,
        password: "",
      },
    };
  },
  created() {
    this.userInfo = this.$store.state.user;
    this.userInfo.imagePath = null;
  },
};
</script>
