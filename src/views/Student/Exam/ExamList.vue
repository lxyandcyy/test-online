<template>
  <div id="exam-list">
    <v-card flat tile>
      <v-card-title>
        试卷列表
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="desserts" :search="search">
        <!-- 开始答题操作 -->
        <template v-slot:item.action="slotScope">
          <router-link
            :to="{
              path: '/do-exam',
              query: { id: slotScope.item.id },
            }"
          >
            <v-btn color="primary" small>开始答题</v-btn>
          </router-link>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ExamList",
  data() {
    return {
      subject: "语文",
      subjects: ["语文", "数学", "计算机", "英语"],
      search: "",
      headers: [
        {
          text: "序号",
          align: "start",
          value: "id",
        },
        { text: "试卷名称", value: "name" },
        { text: "考试时间(min)", value: "countdown" },

        { text: "开始日期(Date)", value: "start_time" },
        { text: "截止日期(Date)", value: "end_time" },
        { text: "操作", value: "action" },
      ],
      desserts: [],
    };
  },
  created() {
    this.searchList();
  },
  methods: {
    searchList() {
      let d = [];
      this.$api.PaperList().then((res) => {
        console.log("试卷列表：", res);
        res.forEach((item, index) => {
          d.push({
            key: index,
            id: item.id,
            subject_id: item.subject_id,
            name: item.name,
            countdown: item.countdown,
            start_time: item.start_time,
            end_time: item.end_time,
          });
        });
        this.desserts = d;
      });
    },
  },
};
</script>

<style lang="scss"></style>
