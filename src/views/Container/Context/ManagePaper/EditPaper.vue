<template>
  <div id="edit-paper">
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
        <el-card
          class="exampaper-item-box"
          v-if="form.questionItems.length !== 0"
        >
          <el-form-item
            :key="questionIndex"
            :label="'题目' + (questionIndex + 1) + '：'"
            v-for="(questionItem, questionIndex) in form.questionItems"
            style="margin-bottom: 15px"
          >
            <el-row>
              <el-col :span="23">
                <QuestionShow :question="questionItem" />
              </el-col>
              <el-col :span="1">
                <el-button type="text" size="mini">删除 </el-button>
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
    // ......

    let id = this.$route.query.id;
    console.log("当前编辑的试卷id是：", id);

    //获取试卷初始数据
    this.$api
      .SelPaper(id)
      .then(res => {
        console.log("当前编辑的试卷初始数据是：", res);
        this.form = {
          id: res.id,
          subject_id: res.subject_id,
          name: res.name,
          countdown: res.countdown,
          questionItems: res.questionItems
        };
        console.log(this.form);
      })
      .catch(err => console.log(err));
  },
  data() {
    return {
      form: {
        id: null,
        subject_id: 1,
        name: "",
        countdown: null,
        questionItems: []
      },
      questionPage: {
        multipleSelection: [],
        showDialog: false,
        queryParam: {
          id: null,
          subject_id: 1,
          pageIndex: 1,
          pageSize: 5
        },
        listLoading: true,
        tableData: null, //所有题目
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
    //提交新编辑好的题目数据
    // submitForm() {
    //   //题目最新编辑时间=当前提交时间
    //   this.form.create_time = Date.now();

    //   this.$refs.form.validate(valid => {
    //     //如果表单填写完整
    //     if (valid) {
    //       this.$api
    //         .EditQue(this.form)
    //         .then(res => {
    //           console.log(res);
    //           this.$message.success("题目编辑成功！");
    //           //   跳转到‘题库列表’页面
    //           this.$router.push({ path: "/layout/question-bank" });
    //         })
    //         .catch(e => {
    //           console.log(e);
    //           this.$message.error({ content: "题目提交失败，请检查网络！" });
    //         });
    //     } else {
    //       this.$message.info("请把表单填写完整！");
    //       return false;
    //     }
    //   });
    // },
    // 重置
    resetForm() {
      this.$refs["form"].resetFields();
    },

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
        // this.questionPage.total = res.length;
        // this.questionPage.queryParam.pageIndex = res.length;
        this.questionPage.listLoading = false;
      });
    },
    submitForm() {
      //题目创建时间=当前提交时间
      this.form.create_time = Date.now();

      this.$refs.form.validate(valid => {
        //如果表单填写完整
        if (valid) {
          this.$api
            .AddQue(this.form)
            .then(res => {
              console.log(res);
              this.$message.success("题目新增成功！");
              //   跳转到‘题库列表’页面
              this.$router.push({ path: "/layout/question-bank" });
            })
            .catch(e => {
              console.log(e);
              this.$message.error({ content: "题目提交失败，请检查网络！" });
            });
        } else {
          this.$message.info("请把表单填写完整！");
          return false;
        }
      });
    },
    // 查询
    queryForm() {},
    handleSelectionChange() {},
    confirmQuestionSelect() {}
  }
};
</script>

<style scoped></style>
