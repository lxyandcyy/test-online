<template>
  <div id="add-paper">
    <!-- 表单 -->
    <el-form :model="form" ref="form" label-width="100px" :rules="rules">
      <el-form-item label="学科" prop="subject_id" required>
        <el-select v-model="form.subject_id" placeholder="请选择学科">
          <!-- <el-option
            v-for="(item, index) in QueType"
            :key="index"
            :value="item"
            :label="item"
          ></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label="试卷名称：" prop="name" required>
        <el-input v-model="form.name" />
        <el-button
          type="text"
          class="link-left"
          style="margin-left: 20px"
          size="mini"
          @click="addQuestion()"
        >
          添加题目
        </el-button>
        <!-- 所选题目的卡片列表 -->
        <el-card
          class="exampaper-item-box"
          v-if="form.questionItems.length !== 0"
        >
          <el-form-item
            :key="index"
            :label="'题目' + (index + 1) + '：'"
            v-for="(item, index) in form.questionItems"
            style="margin-bottom: 15px"
          >
            <el-row>
              <el-col :span="23">
                <QuestionShow :question="item" />
              </el-col>
              <el-col :span="1">
                <el-button
                  type="text"
                  size="mini"
                  @click="form.questionItems.splice(index, 1)"
                  >删除</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>
        </el-card>
      </el-form-item>
      <el-form-item label="时长：" prop="countdown" required>
        <el-input v-model="form.countdown" placeholder="分钟" />
      </el-form-item>
      <!-- 事件按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 添加题目弹出框 -->
    <el-dialog :visible.sync="questionPage.showDialog" width="70%">
      <!-- 题目查询栏 -->
      <el-form :model="questionPage.queryParam" ref="queryForm" :inline="true">
        <el-form-item label="ID：">
          <el-input v-model="questionPage.queryParam.id" clearable></el-input>
        </el-form-item>
        <el-form-item label="题干：">
          <el-input
            v-model="questionPage.queryParam.topic"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryForm">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 题目列表 -->
      <el-table
        v-loading="questionPage.listLoading"
        :data="questionPage.tableData"
        @selection-change="handleSelectionChange"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column prop="id" label="Id" width="60px" />
        <el-table-column prop="subject_id" label="学科" width="70px" />
        <el-table-column prop="topic" label="题干" show-overflow-tooltip />
      </el-table>
      <!-- <pagination
        v-show="questionPage.total > 0"
        :total="questionPage.total"
        :page.sync="questionPage.queryParam.pageIndex"
        :limit.sync="questionPage.queryParam.pageSize"
        @pagination="search"
      /> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="questionPage.showDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmQuestionSelect"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import QuestionShow from "@/components/Show";

export default {
  components: { QuestionShow },
  created() {
    //获取学科数据
  },
  data() {
    return {
      form: {
        id: null,
        subject_id: 1,
        name: "",
        countdown: null,
        questionItems: [] //card中显示所选的题目列表数据
      },
      questionPage: {
        multipleSelection: [], //所选题目列表
        showDialog: false,
        queryParam: {
          id: null,
          subject_id: 1,
          pageIndex: 1,
          pageSize: 5
        },
        listLoading: true,
        tableData: [], //所有题目
        total: 0
      },
      rules: {
        subject_id: [
          { required: true, message: "请选择学科", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入试卷名称", trigger: "blur" }],
        countdown: [
          { required: true, message: "请输入考试时长", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    addQuestion() {
      this.search();
      this.questionPage.showDialog = true;
    },
    search() {
      //   翻页||加载题目列表
      this.questionPage.queryParam.subject_id = this.form.subject_id; //添加题目的学科与试卷的学科对应
      //   获取题库列表
      this.$api.QueList().then(res => {
        console.log("题库列表：", res);
        this.questionPage.tableData = res;
        this.questionPage.total = res.length;
        this.questionPage.queryParam.pageIndex = res.length;
        this.questionPage.listLoading = false;
      });
    },
    // 重置
    resetForm() {
      this.$refs["form"].resetFields();
    },
    // 查询
    queryForm() {},
    //题目选择复选框改变时
    handleSelectionChange(val) {
      this.questionPage.multipleSelection = val;
      console.log(val);
    },
    confirmQuestionSelect() {
      this.questionPage.multipleSelection.forEach(q => {
        this.form.questionItems.push(q);
      });
      this.questionPage.showDialog = false;
    },
    submitForm() {
      //题目创建时间=当前提交时间
      this.form.create_time = Date.now();

      this.$refs.form.validate(valid => {
        //如果表单填写完整
        if (valid) {
          this.$api
            .AddPaper(this.form)
            .then(res => {
              console.log(res);
              this.$message.success("试卷新增成功！");
              //   跳转到‘试卷列表’页面
              this.$router.push({ path: "/layout/paper-bank" });
            })
            .catch(e => {
              console.log(e);
              this.$message.error({ content: "新增试卷失败，请检查网络！" });
            });
        } else {
          this.$message.info("请把表单填写完整！");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.exampaper-item-box {
  .q-item-content {
  }
}
</style>
