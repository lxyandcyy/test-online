<template>
  <div id="practice-list">
    <v-card flat tile>
      <!-- 选择条件智能组卷 -->
      <v-card class="mx-auto text-center pb-5" max-width="400">
        <!-- 题目学科 -->
        <v-col cols="12" sm="12">
          <v-select
            v-model="filterQuestion.select_subjects"
            :items="filterQuestion.subjects_name"
            attach
            chips
            label="科目：">
          </v-select>
        </v-col>

        <!-- 题目数量 -->
        <v-slider
          v-model="filterQuestion.question_count"
          :max="6"
          class="mx-4"
          ticks
          :tick-labels="filterQuestion.tickArray"
          label="题目数量："
        ></v-slider>
        <!-- 题目难度 -->
       难度 <v-rating
          v-model="filterQuestion.difficult"
          color="yellow darken-3"
          background-color="grey darken-1"
          empty-icon="$ratingFull"
          hover
          dense
        >难度</v-rating>

        <v-btn rounded color="warning" class="mt-5" @click="addPracticePaper"
          >生成试卷</v-btn
        >
      </v-card>

      <!-- 智能试卷列表 -->
      <v-card-title>
        智能训练试卷
        <v-spacer></v-spacer>
        <v-text-field
          v-model="table.search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="table.headers"
        :items="table.desserts"
        :search="table.search"
      >
        <!-- 开始答题操作 -->
        <template v-slot:item.action="slotScope">
          <router-link
            :to="{
              path: '/do-practice',
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
  data() {
    return {
      filterQuestion: {
        //通过以下三种条件筛选题目，从而生成试卷
        practice_paper_id: null,
        practice_paper_name: null,
        subjects: [],
        select_subjects_id:[],//
        subjects_name: [],
        select_subjects: [],
        question_count: 0,//
        difficult: 0,//
        tickArray: [0, 1, 2, 3, 4, 5, 6],
      },
      //试卷列表
      table: {
        search: "",
        headers: [
          { text: "智能试卷ID", align: "start", value: "practice_paper_id" },
          { text: "名称", align: "start", value: "practice_paper_name" },
          { text: "科目", value: "subjects_name" },
          { text: "创建时间(Date)", value: "create_time" },
          { text: "操作", value: "action" },
        ],
        desserts: [],
      },
    };
  },
  created() {
    this.searchPracticePapers(); //获取所有智能试卷
    this.searchSubjects()
  },
  methods: {
    async searchPracticePapers() {
      let d = [];
      let res = await this.$api.PracticePaperList();
      console.log( res);
      res.forEach((item, index) => {
        d.push({
          practice_paper_id: item.practice_paper_id,
          practice_paper_name:
            `${item.practice_paper_name}` + `${item.practice_paper_id}`,
          subjects_name: item.subjects_id,
          create_time: item.create_time,
        });
      });
      this.table.desserts = d;
    },
    searchSubjects(){
      this.$api.SubjectList().then(res => {
        console.log(res)
        this.filterQuestion.subjects = res.data;
        res.data.forEach(item=>{
          this.filterQuestion.subjects_name.push(item.name)
        })
      });
    },
    async generatePracticePaper(conditions) {
      let res = await this.$api.AddPracticePaper(conditions);
      console.log("生成试卷", res);
    },
    async addPracticePaper() {
      this.filterQuestion.subjects_id = [];
      this.filterQuestion.select_subjects.forEach((item) => {
        let i= this.filterQuestion.subjects_name.indexOf(item)
        this.filterQuestion.select_subjects_id.push(this.filterQuestion.subjects[i].id);
      });
      let res=await this.generatePracticePaper(this.filterQuestion);
      console.log(res)
      this.searchPracticePapers();
      this.searchSubjects()
    },
  },
};
</script>

<style lang="scss"></style>
