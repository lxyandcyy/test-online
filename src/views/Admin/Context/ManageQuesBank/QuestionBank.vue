<template>
  <div id="question-bank">
    <v-card-title>
      题库
      <v-spacer></v-spacer>
      <v-text-field
              v-model="table.search"
              append-icon="mdi-magnify"
              label="输入相关内容查询"
              single-line
              hide-details
      ></v-text-field>
      <router-link :to="{path:'/layout/add-question'}">
        <v-btn class="ma-2" tile color="indigo" dark>新增题目</v-btn>
      </router-link>
    </v-card-title>
    <v-data-table
            :headers="table.headers"
            :items="table.desserts"
            :search="table.search"
    >
      <!-- 操作 -->
      <template v-slot:item.action="slotScope">
        <v-btn class="mr-2" color="primary" fab small @click="showQuestion(slotScope.item.id)">
            预览
        </v-btn>
        <router-link :to="{path:'/layout/edit-question',query: {id:slotScope.item.id}}">
          <v-btn class="mr-2" color="orange" fab small dark >
            编辑
          </v-btn>
        </router-link>
        <v-btn class="mr-2" color="error" fab small dark @click="deleteQuestion(slotScope.item.id)">
            删除
        </v-btn>
      </template>
    </v-data-table>

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
   this.searchList()
  },
  data() {
    return {
      table: {
        search: "",
        headers: [
          { text: "ID", align: "start", value: "id" },
          { text: "学科", align: "start", value: "subject_id" },
          { text: "题干", value: "topic" },
          { text: "难度", value: "difficult" },
          { text: "创建时间(Date)", value: "create_time" },
          { text: "创建人", value: "create_user" },
          { text: "操作", value: "action" },
        ],
        desserts: [],
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
    searchList(){
      //获取全部题目
      let d = [];
      this.$api.QueList().then(res => {
        console.log(res);
        res.data.forEach((item, index) => {
          d.push({
            key: index,
            id: item.id,
            topic: item.topic,
            difficult: item.difficult,
            create_user: item.create_user,
            create_time: item.create_time
          });
        });
        this.table.desserts = d;
      });
    },
    // 预览
    showQuestion(id) {
      this.questionShow.dialog = true;
      this.questionShow.loading = true;
      this.$api.SelQue(id).then(res => {
        console.log(res);
        this.questionShow.question = res[0];
        this.questionShow.loading = false;
      });
    },
    deleteQuestion(id) {
      this.$api.DelQue(id).then(res => {
        if (res.state === 200) {
          this.table.desserts = this.data.filter(item => item.id !== Id); // 删除指定id题目
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
</style>
