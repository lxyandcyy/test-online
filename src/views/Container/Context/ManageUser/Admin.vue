<template>
  <div id="admin">
    <!-- 查询栏 -->
    <a-input-search
      placeholder="输入用户名查询"
      @search="onSearch"
      enterButton
    />
    <!-- 用户信息表 -->
    <a-table
      :columns="columns"
      :dataSource="data"
      :pagination="{ pageSize: 10 }"
      :scroll="{ y: 550 }"
    >
      <template slot="name" slot-scope="name">{{ name }}</template>
      <template slot="option" slot-scope="option">
        <div class="icons-list">
          <a-icon type="eye" theme="twoTone" />
          <a-icon type="edit" theme="twoTone" />
          <a-icon type="delete" theme="twoTone" />
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
let data = [];

export default {
  beforeCreate() {
    data = [];
    this.$api.AllUserInfo().then(res => {
      res.forEach((item, index) => {
        if (item.user_type == "admin") {
          //过滤出用户类型为管理员的用户数据，添加到data中
          data.push({
            key: index,
            id: item.user_id,
            name: item.user_id,
            user_type: item.user_type,
            reg_time: item.reg_time,
            password: item.password
          });
        }
      });
    });
  },
  data() {
    return {
      n: 0,
      data, //所有用户字段
      columns: [
        {
          title: "用户ID",
          dataIndex: "id",
          width: "10%",
          scopedSlots: { customRender: "id" }
        },
        {
          title: "用户名",
          dataIndex: "name",
          width: "10%",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "用户类型",
          dataIndex: "user_type",
          width: "10%",
          scopedSlots: { customRender: "user_type" }
        },
        {
          title: "注册时间",
          dataIndex: "reg_time",
          sorter: true
        },
        {
          title: "密码",
          dataIndex: "password",
          width: "10%"
        },
        {
          title: "操作",
          dataIndex: "option",
          scopedSlots: { customRender: "option" },
          width: "10%"
        }
      ]
    };
  },
  methods: {
    //查询
    onSearch(value) {
      console.log(value);
    }
  }
};
</script>

<style scoped>
.icons-list > .anticon {
  margin-right: 1rem;
  font-size: 1rem;
}

.ant-input-search {
  width: 20vw;
  margin-bottom: 1vh;
}
</style>
