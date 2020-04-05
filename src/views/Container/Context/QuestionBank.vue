<template>
  <div id="question-bank">
    <!-- 查询栏 -->
    <div class="search">
      <a-input-search placeholder="input search text" @search="onSearch" enterButton />
      <a-button type="primary" @click="addQuestion()">新增</a-button>
      <!-- 弹出的新增框 -->
    </div>
    <!-- 题目表 -->
    <a-table
      :columns="columns"
      :rowKey="record => record.login.uuid"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template slot="name" slot-scope="name">{{ name.first }} {{ name.last }}</template>
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
          title: "题目ID",
          dataIndex: "id",
          sorter: true,
          width: "10%",
          scopedSlots: { customRender: "id" }
        },
        {
          title: "题干",
          dataIndex: "context",
          width: "40%",
          scopedSlots: { customRender: "context" }
        },
        {
          title: "题目类型",
          dataIndex: "question_type",
          width: "10%",
          scopedSlots: { customRender: "question_type" }
        },
        {
          title: "题目难度",
          dataIndex: "question_level",
          filters: [
            { text: "难", value: "3" },
            { text: "中等", value: "2" },
            { text: "易", value: "1" }
          ],
          width: "10%"
        },
        {
          title: "操作",
          dataIndex: "option",
          scopedSlots: { customRender: "option" }
        }
      ],
      visible: false,
      confirmLoading: false
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
    },
    addQuestion() {
      // 弹出新增框
      this.visible = true;
    }
  }
};
</script>

<style scoped>
.icons-list > .anticon {
  margin-right: 1rem;
  font-size: 1rem;
}

.search {
  display: grid;
  grid-template-columns: 95% 5%;
}

.search > .ant-input-search {
  width: 20vw;
  margin-bottom: 1vh;
}
</style>
