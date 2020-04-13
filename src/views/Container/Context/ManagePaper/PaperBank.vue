<template>
  <div id="paper-bank">
    <!-- 查询栏 -->
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <el-form-item label="试卷ID：">
        <el-input v-model="queryParam.id" clearable></el-input>
      </el-form-item>
      <el-form-item label="学科：">
        <el-select v-model="queryParam.subject_id" clearable>
          <!-- <el-option
            v-for="item in subjectFilter"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          ></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 试卷信息表 -->
    <el-table :data="data" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="id" label="Id" width="90px" />
      <el-table-column prop="subject_id" label="学科" width="120px" />
      <el-table-column prop="name" label="试卷名称" show-overflow-tooltip />
      <el-table-column prop="create_time" label="创建时间" width="160px" />
      <el-table-column label="操作" align="center" width="220px">
        <template slot-scope="{ row }">
          <el-button size="mini" @click="editPaper(row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deletePaper(row)"
            class="link-left"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 翻页 -->
    <!-- <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParam.pageIndex"
      :limit.sync="queryParam.pageSize"
      @pagination="search"
    /> -->
  </div>
</template>

<script>
export default {
  created() {
    //获取全部试卷
    let d = [];
    this.$api.PaperList().then(res => {
      console.log("试卷列表：", res);
      res.forEach((item, index) => {
        d.push({
          key: index,
          id: item.id,
          subject_id: item.subject_id,
          name: item.name,
          create_time: item.create_time
        });
      });
      this.data = d;
    });
  },
  data() {
    return {
      data: null,
      queryParam: {
        id: null,
        subject_id: null
      }
    };
  },
  methods: {
    //查询
    onSearch(value) {
      console.log(value);
    },
    editPaper(row) {
      console.log("要编辑的单个试卷为：", row);
      // 跳转到‘编辑’页面
      this.$router.push({
        path: "/layout/edit-paper",
        query: { id: row.id }
      });
    },
    deletePaper(row) {
      let Id = row.id;
      console.log("点击删除的item", row);
      this.$api.DelPaper({ id: Id }).then(res => {
        if (res.state === 200) {
          this.data = this.data.filter(item => item.id !== Id); // 删除指定id题目
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  }
};
</script>

<style scoped>
.icons-list > .anticon {
  margin-right: 1rem;
  font-size: 1rem;
}

.search > .ant-input-search {
  width: 20vw;
  margin-bottom: 1vh;
}
</style>
