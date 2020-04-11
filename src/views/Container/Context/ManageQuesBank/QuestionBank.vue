<template>
  <div id="question-bank">
    <!-- 查询栏 -->
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <el-form-item label="题目ID：">
        <el-input v-model="queryParam.id" clearable></el-input>
      </el-form-item>
      <el-form-item label="学科：">
        <el-select v-model="queryParam.subjectId" clearable>
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
        <el-popover placement="bottom" trigger="click">
          <!-- <el-button
            type="warning"
            size="mini"
            v-for="item in editUrlEnum"
            :key="item.key"
            @click="$router.push({ path: item.value })"
            >{{ item.name }}
          </el-button> -->
          <el-button slot="reference" type="primary" class="link-left"
            >导入</el-button
          >
        </el-popover>
      </el-form-item>
    </el-form>
    <!-- 用户信息表 -->
    <el-table :data="data" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="id" label="Id" width="90px" />
      <el-table-column prop="subject_id" label="学科" width="120px" />
      <el-table-column prop="topic" label="题干" show-overflow-tooltip />
      <el-table-column prop="difficult" label="难度" width="60px" />
      <el-table-column prop="create_time" label="创建时间" width="160px" />
      <el-table-column prop="create_user" label="创建人" width="160px" />
      <el-table-column label="操作" align="center" width="220px">
        <template slot-scope="{ row }">
          <el-button size="mini" @click="showQuestion(row)">预览</el-button>
          <el-button size="mini" @click="editQuestion(row)">编辑</el-button>
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
    <!-- <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParam.pageIndex"
      :limit.sync="queryParam.pageSize"
      @pagination="search"
    /> -->

    <!-- 预览 -->
    <el-dialog
      :visible.sync="questionShow.dialog"
      style="width: 100%;height: 100%"
    >
      <QuestionShow
        :qType="questionShow.qType"
        :question="questionShow.question"
        :qLoading="questionShow.loading"
      />
    </el-dialog>
  </div>
</template>

<script>
import QuestionShow from "@/components/Show";

export default {
  created() {
    //获取全部题目
    let d = [];
    this.$api.QueList().then(res => {
      console.log("题库列表：", res);
      res.forEach((item, index) => {
        d.push({
          key: index,
          id: item.id,
          topic: item.topic,
          difficult: item.difficult,
          create_user: item.create_user,
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
        subjectId: null
      },
      questionShow: {
        qType: 0,
        dialog: false,
        question: {},
        loading: false
      }
    };
  },
  methods: {
    //查询
    onSearch(value) {
      console.log(value);
    },
    // 预览
    showQuestion(row) {
      console.log("要预览的单个题目为：", row);
      this.questionShow.dialog = true;
      this.questionShow.loading = true;
      this.$api.SelQue(row.id).then(res => {
        console.log(res);
        // this.questionShow.qType = res.response.questionType;
        this.questionShow.question = res[0];
        this.questionShow.loading = false;
      });
    },
    editQuestion(row) {
      console.log("要编辑的单个题目为：", row);
      // 跳转到‘编辑’页面
      this.$router.push({
        path: "/layout/edit-question",
        query: { id: row.id }
      });
    },
    deleteQuestion(row) {
      let Id = row.id;
      this.$api.DelQue({ id: Id }).then(res => {
        if (res.state === 200) {
          this.data = this.data.filter(item => item.id !== Id); // 删除指定id题目
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  },
  components: {
    QuestionShow: QuestionShow
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
