<template>
  <div id="manage-user">
    <!-- 查询栏 -->
    <a-input-search
      placeholder="输入用户名查询"
      @search="onSearch"
      enterButton
    />

    <!-- 用户信息表 -->
    <el-table :data="data" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="id" label="Id" width="150px" />
      <el-table-column prop="name" label="用户名" width="150px" />
      <el-table-column prop="user_type" label="用户类型" width="90px" />
      <el-table-column prop="reg_time" label="注册时间" />
      <el-table-column prop="password" label="密码" width="160px" />
      <el-table-column label="操作" align="center" width="300px">
        <template slot-scope="{ row }">
          <el-button size="mini" @click="showGrade(row)"
            >查看用户成绩</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteQuestion(row)"
            class="link-left"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 翻页 -->
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParam.pageIndex"
      :limit.sync="queryParam.pageSize"
      @pagination="changePage"
    />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";

export default {
  components: { Pagination },
  created() {
    this.searchList();
  },
  data() {
    return {
      all_data: [], //所有用户字段
      total: 0,
      queryParam: {
        //查询栏
        id: null,
        name: null,
        pageIndex: 1,
        pageSize: 10
      }
    };
  },
  computed: {
    //单页用户列表数据
    data() {
      let page_start_index =
        this.queryParam.pageSize * (this.queryParam.pageIndex - 1);
      let d = this.all_data.slice(
        page_start_index,
        page_start_index + this.queryParam.pageSize + 1
      );
      return d;
    }
  },
  methods: {
    searchList() {
      let d = [];
      this.$api.AllUserInfo().then(res => {
        res.forEach((item, index) => {
          if (item.user_type == "user") {
            //过滤出用户类型为学生的用户数据，添加到data中
            d.push({
              key: index,
              id: item.user_id,
              name: item.user_id,
              user_type: item.user_type,
              reg_time: item.reg_time,
              password: item.password
            });
          }
        });
        this.all_data = d;
        this.total = this.all_data.length;
      });
    },
    changePage(pageObj) {
      this.queryParam.pageIndex = pageObj.page;
      this.queryParam.pageSize = pageObj.limit;
    },
    //查询
    onSearch(value) {
      console.log(value);
    },
    showGrade(row) {}
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
