<template>
  <div id="add-paper">
    <!-- 表单 -->
<!--    <el-form :model="form" ref="form" label-width="100px" :rules="rules">-->
<!--      <el-form-item label="学科" prop="subject_id" required>-->
<!--        <el-select v-model="form.subject_id" placeholder="请选择学科">-->
<!--          &lt;!&ndash; <el-option-->
<!--            v-for="(item, index) in QueType"-->
<!--            :key="index"-->
<!--            :value="item"-->
<!--            :label="item"-->
<!--          ></el-option> &ndash;&gt;-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="试卷名称：" prop="name" required>-->
<!--        <el-input v-model="form.name" />-->
<!--        <el-button-->
<!--          type="text"-->
<!--          class="link-left"-->
<!--          style="margin-left: 20px"-->
<!--          size="mini"-->
<!--          @click="addQuestion()"-->
<!--        >-->
<!--          添加题目-->
<!--        </el-button>-->
<!--        &lt;!&ndash; 所选题目的卡片列表 &ndash;&gt;-->
<!--        <el-card-->
<!--          class="exampaper-item-box"-->
<!--          v-if="form.questionItems.length !== 0"-->
<!--        >-->
<!--          <el-form-item-->
<!--            :key="index"-->
<!--            :label="'题目' + (index + 1) + '：'"-->
<!--            v-for="(item, index) in form.questionItems"-->
<!--            style="margin-bottom: 15px"-->
<!--          >-->
<!--            <el-row>-->
<!--              <el-col :span="23">-->
<!--                <QuestionShow :question="item" />-->
<!--              </el-col>-->
<!--              <el-col :span="1">-->
<!--                <el-button-->
<!--                  type="text"-->
<!--                  size="mini"-->
<!--                  @click="form.questionItems.splice(index, 1)"-->
<!--                  >删除</el-button-->
<!--                >-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--          </el-form-item>-->
<!--        </el-card>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="时长：" prop="countdown" required>-->
<!--        <el-input v-model="form.countdown" placeholder="分钟" />-->
<!--      </el-form-item>-->
<!--      &lt;!&ndash; 事件按钮 &ndash;&gt;-->
<!--      <el-form-item>-->
<!--        <el-button type="primary" @click="submitForm">提交</el-button>-->
<!--        <el-button @click="resetForm">重置</el-button>-->
<!--      </el-form-item>-->
<!--    </el-form>-->

    <!-- 添加题目弹出框 -->
<!--    <el-dialog :visible.sync="questionPage.showDialog" width="70%">-->
<!--      &lt;!&ndash; 题目查询栏 &ndash;&gt;-->
<!--      <el-form :model="questionPage.queryParam" ref="queryForm" :inline="true">-->
<!--        <el-form-item label="ID：">-->
<!--          <el-input v-model="questionPage.queryParam.id" clearable></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="题干：">-->
<!--          <el-input-->
<!--            v-model="questionPage.queryParam.topic"-->
<!--            clearable-->
<!--          ></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="queryForm">查询</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      &lt;!&ndash; 题目列表 &ndash;&gt;-->
<!--      <el-table-->
<!--        v-loading="questionPage.listLoading"-->
<!--        :data="questionPage.tableData"-->
<!--        @selection-change="handleSelectionChange"-->
<!--        border-->
<!--        fit-->
<!--        highlight-current-row-->
<!--        style="width: 100%"-->
<!--      >-->
<!--        <el-table-column type="selection" width="35"></el-table-column>-->
<!--        <el-table-column prop="id" label="Id" width="60px" />-->
<!--        <el-table-column prop="subject_id" label="学科" width="70px" />-->
<!--        <el-table-column prop="topic" label="题干" show-overflow-tooltip />-->
<!--      </el-table>-->
<!--      &lt;!&ndash; <pagination-->
<!--        v-show="questionPage.total > 0"-->
<!--        :total="questionPage.total"-->
<!--        :page.sync="questionPage.queryParam.pageIndex"-->
<!--        :limit.sync="questionPage.queryParam.pageSize"-->
<!--        @pagination="search"-->
<!--      /> &ndash;&gt;-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="questionPage.showDialog = false">取 消</el-button>-->
<!--        <el-button type="primary" @click=""-->
<!--          >确定</el-button-->
<!--        >-->
<!--      </span>-->
<!--    </el-dialog>-->

    <v-row justify="center">
      <v-col cols="12" sm="9" md="8" lg="6">
        <v-card ref="form">
          <v-card-text >
            <v-select
                    v-model="selectSubjectName"
                    :items="subjectsName"
                    label="选择学科"
                    required
                    @change="selectSubject"
            ></v-select>
            <v-text-field
                    v-model="examPaper.name"
                    label="试卷名称"
                    required
            ></v-text-field>
            <!--            选项-->
            <v-btn class="ma-2" tile color="green" dark @click.stop="dialog=true">添加题目</v-btn>
            <v-btn class="ma-2" tile color="red" dark >删除题目</v-btn>
<!--            导入的所有题目-->
            <v-col
                    v-for="(item, i) in questions"
                    :key="i"
                    cols="12"
                    class="mx-auto"
            >
              <v-card color="#26c6da" >
                <v-card-title>题号：{{item.id}} <v-spacer></v-spacer>分数：{{item.score}}</v-card-title>
                <v-card-subtitle>{{item.topic}} <v-spacer></v-spacer></v-card-subtitle>
              </v-card>
            </v-col>

<!--            弹出框选择题目导入-->
            <v-dialog v-model="dialog" max-width="290">
              <v-card>
<!--题目表格                -->
                <v-data-table
                        v-model="selected"
                        :headers="headers"
                        :items="desserts"
                        :single-select="singleSelect"
                        item-key="name"
                        show-select
                        class="elevation-1"
                >
                  <template v-slot:top>
                    <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
                  </template>
                </v-data-table>
<!--操作-->
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog = false">取消
                  </v-btn>
                  <v-btn color="green darken-1" text @click="dialog = false">
                    确定
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-text-field
                    v-model="examPaper.countDown"
                    label="考试时长(单位分钟)"
                    required
            ></v-text-field>
            <v-divider class="mt-12"></v-divider>
            <!--            操作-->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary"  @click="submit">提交</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  created() {
    //获取学科数据
  },
  data() {
    return {
      examPaper:{
        name:"",
        countDown:0,
        createUser:"",
        SubjectId:"",
        question:[
          {
            id:40,
            score:10
          }
        ]
      },
      questions:[   {
        id:40,
        topic:'地球是不是圆的？',
        score:10
      }],
     dialog:false,
      subjects:[],
      subjectsName:[],
      selectSubjectName:'',
      table:{
        singleSelect:false,
        selected:[],
        headers:[
          {
            text:'ID',
            value:'id'
          },{
            text:'题干',
            value:'topic'
          },{
            text:'学科',
            value:'SubjectId'
          },{
            text:'难度',
            value:'difficult'
          },{
            text:'分数',
            value:'score'
          }
        ],
        desserts:[]
      }
    };
  },
  methods: {
    addQuestion() {
      this.search();
      this.questionPage.showDialog = true;
    },
    selectSubject(){
      this.subjects.forEach(item=>{
        if(item.name===this.selectSubjectName){
          this.SubjectId=item.id
        }
      })
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
    clear() {},

    submit() {
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
</style>
