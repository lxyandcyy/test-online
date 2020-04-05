<template>
  <div id="manage-user">
    <!-- 查询栏 -->
    <a-input-search
      placeholder="input search text"
      @search="onSearch"
      enterButton
    />
    <!-- 用户信息表 -->
    <a-table
      :columns="columns"
      :rowKey="record => record.login.uuid"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template slot="name" slot-scope="name">
        {{ name.first }} {{ name.last }}
      </template>
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
import reqwest from "reqwest";

export default {
  mounted() {
    this.fetch(); //获取用户信息数据
  },
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns: [
        {
          title: "用户ID",
          dataIndex: "id",
          sorter: true,
          width: "10%",
          scopedSlots: { customRender: "id" }
        },
        {
          title: "用户名",
          dataIndex: "name",
          sorter: true,
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
          title: "性别",
          dataIndex: "gender",
          filters: [
            { text: "男", value: "男" },
            { text: "女", value: "女" }
          ],
          width: "10%"
        },
        {
          title: "注册时间",
          dataIndex: "email",
          width: "20%"
        },
        {
          title: "注册地址",
          dataIndex: "address",
          width: "20%"
        },
        {
          title: "密码",
          dataIndex: "password",
          width: "10%"
        },
        {
          title: "操作",
          dataIndex: "option",
          scopedSlots: { customRender: "option" }
        }
      ]
    };
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      });
    },
    fetch(params = {}) {
      console.log("params:", params);
      this.loading = true;
      reqwest({
        url: "https://randomuser.me/api",
        method: "get",
        data: {
          results: 10,
          ...params
        },
        type: "json"
      }).then(data => {
        console.log(data);
        const pagination = { ...this.pagination };
        pagination.total = 200;
        this.loading = false;
        this.data = data.results;
        this.pagination = pagination;
      });
    },
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
