<template>
  <div id="do-exam">
    <v-app-bar
      app
      color="white"
      scroll-target="#scrolling-techniques-7"
      class="countdowns"
    >
      <!-- 头部 -->
        <router-link :to="{path:'/student-layout/exam-list'}">
            <v-btn class="ma-2" color=" darken-2">
                <v-icon dark left>mdi-arrow-left</v-icon>
            </v-btn>
        </router-link>
      <span>剩余时间：{{ remainTime }}</span>
    </v-app-bar>

    <!-- 中部 -->
    <v-sheet id="scrolling-techniques-7" class="overflow-y-auto">
      <v-content>
        <v-container>
          <header class="paper-header">
            <h1>{{ examPaper.name }}</h1>
            <div>
              <span class="question-title-padding"
                >试卷总分：{{ examPaper.PaperScore }}
              </span>
              <span class="question-title-padding"
                >考试时间：{{ examPaper.countDown }} 分钟
              </span>
              <span class="question-title-padding"
                >当前考生：
                {{ user.user_id }}
              </span
              >
            </div>
          </header>
          <!-- 题目内容区 -->
          <v-card
            class="mx-auto mt-6"
            style="margin-bottom:75px"
            max-width="344"
            outlined
            elevation="4"
          >
            <v-list-item three-line>
              <v-list-item-content>
<!--                题目标题-->
                <v-list-item-title class="headline mb-1">
                  {{ current_question + 1 }}.{{ currentQueItem.topic }}
                </v-list-item-title>
                <!-- 选项列表 -->
                <v-list-item-subtitle>
                  <v-item v-slot:default="{ active, toggle }">
                    <v-chip-group
                      column
                      active-class="purple"
                      v-model="current_option"
                    >
                      <v-chip
                        class="option"
                        v-for="(item, i) in questions[current_question].Options"
                        :key="i"
                        @click="toggleOption(item.id)"
                      >
                        {{ item.label }}.
                        {{ item.description }}
                      </v-chip>
                    </v-chip-group>
                  </v-item>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-card-actions class="btn">
              <v-btn class="ma-2" outlined color="indigo" @click="preQue()"
                >上一题</v-btn
              >
              <v-btn class="ma-2" outlined color="indigo" @click="nextQue()"
                >下一题</v-btn
              >
              <v-btn
                class="ma-2"
                tile
                color="indigo"
                dark
                @click="confirmSubmitExam"
                >提交</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-container>
      </v-content>
    </v-sheet>

    <!-- 答题卡 -->
    <v-footer absolute class="font-weight-medium">
      <v-col class="text-center" cols="12">
        <v-bottom-sheet v-model="sheet" persistent>
          <template v-slot:activator="{ on }">
            <v-btn color="green" dark v-on="on">查看答题卡</v-btn>
          </template>
          <v-sheet class="text-center" height="200px">
            <v-btn class="mt-6" text color="error" @click="sheet = !sheet"
              >x</v-btn
            >
            <div class="py-3">
              <v-btn
                class="ma-2"
                :outlined="item.current_option === -1 ? true : false"
                fab
                color="teal"
                v-for="(item, i) in examPaper.questions"
                :key="i"
                @click="jumpToQue(i)"
                >{{ i + 1 }}</v-btn
              >
            </div>
          </v-sheet>
        </v-bottom-sheet>
      </v-col>
    </v-footer>

    <!-- 是否提交的对话框 -->
    <v-dialog v-model="dialog_tips.dialog" persistent max-width="290">
      <v-card>
        <v-card-text>{{ dialog_tips.card_title }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="submitExam"
            >是的，我确定提交</v-btn
          >
          <v-btn color="green darken-1" text @click="dialog_tips.dialog = false"
            >返回继续答题</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

<!--    考试结果展示对话框-->
    <v-dialog v-model="dialog_tips.dialog2" persistent max-width="290">
      <v-card>
        <v-card-text>你的得分是：{{ result.score }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" @click="goExamResult">前往查看考试结果</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      dialog_tips: {
        dialog: false,
        dialog2:false,
        card_title: "",
      },
      current_paper_id: this.$route.query.id,
      current_question: 0,
      current_option: -1, //当前选项
      sheet: false,
      remainTime: 0,
      timer: null,
      examPaper: {
        // name: "",
        // countDown: 0,
        // createUser: 0,
        // SubjectId: 0,
        // startTime:"",
        // endTime:"",
        // questions: [{
        //    id:,
        //    current_option:,
        // }], //题目列表
      },
       questions:[{}
          // Options: Array(2)
          // length: 2
          // SubjectId: 18
          // analysis: "asdgrttrhrt"
          // createTime: "2020-05-18T11:54:28.000Z"
          // createUser: 63
          // difficult: "1"
          // id: 49
          // topic: "sadfa"
       ],
      result:{
        score:-1,
      }
    };
  },
    async created() {
      let examPaper=await this.searchPaper()
      // 获取详细的题目选项
      let all_questions=[]
      examPaper.questions.forEach(item=>{
         all_questions.push(item.questionId)
      })
      this.questions=await this.searchOptions(all_questions)
      // 倒计时设置
      this.remainTime = this.examPaper.countDown * 60; //倒计时起始值
      this.timeReduce()
    },
  computed: {
    ...mapState(["user"]),
    currentQueItem() {
      return this.questions[this.current_question] || {};
    },
  },
  methods: {
     async searchPaper(){
      await this.$api.SelPaper(this.$route.params.id).then((res) => {
        console.log(res)
        let questions= res.data.examPaper_question.map(item=>{item.current_option=-1;return item})
        this.examPaper={
          ...res.data.examPaper,
          questions:questions
        }
      });
         return this.examPaper
     },
     async searchOptions(allQuestion){
        let res=await this.$api.GetOptions({allQuestion:allQuestion})
        console.log(res)
        return res.data
      },
    nextQue() {
      if (this.current_question < this.examPaper.questions.length - 1) {
        this.getOptionFromQueItems(++this.current_question);
      } else {
        this.$message.info('没有题目啦！')
      }
      return;
    },
    preQue() {
      if (this.current_question > 0) {
        this.getOptionFromQueItems(--this.current_question);
      } else {
          this.$message.info('没有题目啦！')
      }
      return;
    },
    jumpToQue(queIndex) {
      this.current_question = queIndex;
      this.getOptionFromQueItems(queIndex);
    },
    toggleOption(optionId) {
      this.examPaper.questions[this.current_question].current_option = optionId;
    },
    getOptionFromQueItems(queIndex) {
      this.current_option = this.examPaper.questions[queIndex].current_option;
    },
    // 倒计时
    timeReduce()  {
       this.timer = setInterval(() => {
        if (this.remainTime <= 0) {
          clearInterval(this.timer)
          this.$message.info('时间到！系统自动提交试卷。。')
          setTimeout(() => {
            this.submitExam();
          }, 1000);
        } else {
          this.remainTime--;
        }
      }, 1000);
    },
    // 查看考试结果
    goExamResult(){
      this.dialog_tips.dialog2 = false;
      // this.$router.push({path:'/student-layout/record/'})//前往考试记录的具体考试结果页面
    },
    // 确认是否提交
    confirmSubmitExam() {
      // 判断是否有未填写题目
      let i;
      for (i = 0; i < this.examPaper.questions.length; i++) {
        let item = this.examPaper.questions[i];
        if (item.current_option === -1) {
          this.dialog_tips.dialog = true;
          this.dialog_tips.card_title = "你还有题目未做，是否提交？";
          break;
        }
      }

      if (i === this.examPaper.questions.length) {
        this.dialog_tips.dialog = true;
        this.dialog_tips.card_title = "时间还未到，是否继续提交？";
      }
    },
    async submitExam() {
      this.dialog_tips.dialog = false;
      // 获取options
      let options=[];
      this.examPaper.questions.forEach(item=>{
        let option={
          optionId:item.current_option,
          questionId:item.questionId
        }
        options.push(option)
      })
      // 整合提交的数据
      let submitForm={
        userId:this.user.id,
        examPaperId: this.examPaper.id,
        spendTime:this.examPaper.countDown*60 - this.remainTime,
        options:options
      }

      // 提交答题卡，计算分数
      let res = await this.$api.SubmitExam(submitForm);
      console.log(res);
      this.result.score=res.data.score
      if(res.code===200){
        this.$message.success(`${res.msg}`)
        setTimeout(() => {
          clearInterval(this.timer)
          this.dialog_tips.dialog2=true;//打开考试结果对话框
        }, 1000);
      }else if(res.code===400){
        this.$message.error(`${res.msg}`)
        setTimeout(() => {
          clearInterval(this.timer)
          this.$router.push({path:'/student-layout/exam-list'})
        }, 1000);
      }
    },

  },
};
</script>

<style lang="scss" scoped>
.countdowns {
  display: flex;
  justify-content: center;
}

.paper-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

::v-deep .option {
  width: 100%;
}

.btn {
  display: grid;
  grid-template: 1fr 1fr 2fr;
}
</style>
