<template>
  <div id="do-practice">
    <!-- 中部 -->
    <v-sheet id="scrolling-techniques-7" class="overflow-y-auto">
      <v-content>
        <v-container>
          <header class="paper-header">
            <h1>{{ paper.name }}</h1>
            <div>
              <span class="question-title-padding"
                >题目数量：{{ paper.paper_score }}</span
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
                <v-list-item-title class="headline mb-1">
                  {{ current_question + 1 }}.{{ formQueItem.topic }}
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
                        v-for="(item, i) in formQueItem.options"
                        :key="i"
                        @click="toggleOption(i)"
                      >
                        {{ item.prefix }}.
                        {{ item.content }}
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

    <!-- 底部 -->
    <v-footer absolute class="font-weight-medium">
      <v-col class="text-center" cols="12">
        <v-bottom-sheet v-model="sheet" persistent>
          <template v-slot:activator="{ on }">
            <v-btn color="green" dark v-on="on">查看答题卡</v-btn>
          </template>
          <v-sheet class="text-center" height="200px">
            <v-btn class="mt-6" text color="error" @click="sheet = !sheet"
              >close</v-btn
            >
            <div class="py-3">
              <v-btn
                class="ma-2"
                :outlined="item.current_option === -1 ? true : false"
                fab
                color="teal"
                v-for="(item, i) in formQueItems"
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

    <SnackBar
      :snackbar="snackbar_tips.snackbar"
      :text="snackbar_tips.text"
      @input="snackbar_tips.snackbar = $event"
    ></SnackBar>
  </div>
</template>

<script>
import SnackBar from "@/components/SnackBar";

export default {
  data() {
    return {
      snackbar_tips: {
        //提示信息
        snackbar: false,
        text: "",
      },
      dialog_tips: {
        dialog: false, //是否弹出对话框
        card_title: "",
      },
      testValue: 0,
      sheet_color: "white",
      current_paper_id: this.$route.query.id,
      current_question: 0,
      current_option: -1, //当前选项
      sheet: false,
      formQueItems: [], //题目列表
      paper: {
        //试卷列表
        id: 1,
        name: "",
        subject_id: "",
        grade_level: "",
        paper_score: "",
        question_count: "",
        countdown: "",
        frame_text_content_id: "",
        create_user: "",
        create_time: "",
        deleted: "",
        task_exam_id: "",
        end_time: "",
        start_time: "",
      },
      remainTime: 0,
      timer: null,
    };
  },
  created() {
    this.$api.SelPaper(this.$route.query.id).then((res) => {
      console.log(res)
      this.paper = res.pap;
      this.remainTime = this.paper.countdown; //倒计时起始值
      this.timeReduce(); //倒计时
      this.formQueItems = res.questionItems;
      this.formQueItems.forEach((item) => {
        return (item.current_option = -1);
      });
      console.log("当前编辑的试卷：", this.paper, this.formQueItems);
    });
  },
  computed: {
    formQueItem() {
      console.log(this.formQueItems[this.current_question]);
      return this.formQueItems[this.current_question] || {};
    },
  },
  methods: {
    nextQue() {
      if (this.current_question < this.formQueItems.length - 1) {
        this.getOptionFromQueItems(++this.current_question);
        console.log("当前题目号为：", this.current_question + 1);
      } else {
        this.snackbar_tips.snackbar = true;
        this.snackbar_tips.text = "没有题目了";
      }
      return;
    },
    preQue() {
      if (this.current_question > 0) {
        this.getOptionFromQueItems(--this.current_question);
        console.log(this.current_option);
        console.log("当前题目号为：", this.current_question + 1);
      } else {
        this.snackbar_tips.snackbar = true;
        this.snackbar_tips.text = "没有题目了";
      }
      return;
    },
    jumpToQue(queIndex) {
      this.current_question = queIndex;
      this.getOptionFromQueItems(queIndex);
      console.log("当前题目号为：", this.current_question + 1);
    },
    toggleOption(optionIndex) {
      this.formQueItems[this.current_question].current_option = optionIndex;
    },
    getOptionFromQueItems(queIndex) {
      this.current_option = this.formQueItems[queIndex].current_option;
    },

    // 确认是否提交
    confirmSubmitExam() {
      // 判断是否有未填写题目
      let i;
      for (i = 0; i < this.formQueItems.length; i++) {
        let item = this.formQueItems[i];
        if (item.current_option === -1) {
          this.dialog_tips.dialog = true;
          this.dialog_tips.card_title = "你还有题目未做，是否提交？";
          break;
        }
      }

      if (i === this.formQueItems.length) {
        this.dialog_tips.dialog = true;
        this.dialog_tips.card_title = "时间还未到，是否继续提交？";
        // 直接提交试卷
        this.submitExam();
      }
    },
    submitExam() {
      this.dialog_tips.dialog = false;

      // this.$api.
    },
    // 倒计时
    timeReduce() {
      this.timer = setInterval(() => {
        if (this.remainTime <= 0) {
          this.snackbar_tips.snackbar = true;
          this.snackbar_tips.text = "时间到！系统自动提交试卷。。";
          setTimeout(() => {
            this.submitExam();
          }, 2000);
        } else {
          this.remainTime--;
        }
      }, 1000);
    },
  },
  components: {
    SnackBar,
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
