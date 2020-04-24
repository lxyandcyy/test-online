<template>
  <div id="practice-list">
    <v-card flat tile>
      <!-- 选择条件智能组卷 -->
      <v-card class="mx-auto text-center pb-5" max-width="400">
        <!-- 题目学科 -->
        <v-col cols="12" sm="12">
          <v-select
            v-model="filterQuestion.subject_id"
            :items="items"
            attach
            chips
            label="学科："
            multiple
          ></v-select>
        </v-col>

        <!-- 题目数量 -->
        <v-slider
          v-model="filterQuestion.question_count"
          :max="6"
          class="mx-4"
          ticks
          label="题目数量："
        ></v-slider>
        <!-- 题目难度 -->
        <v-rating
          v-model="filterQuestion.difficult"
          color="yellow darken-3"
          background-color="grey darken-1"
          empty-icon="$ratingFull"
          hover
          dense
        ></v-rating>

        <v-btn rounded color="warning" class="mt-5" @click="generatePaper"
          >生成试卷</v-btn
        >
      </v-card>

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
  data() {
    return {
      filterQuestion: {
        //通过以下三种条件筛选题目，从而生成试卷
        subject_id: [],
        question_count: 0,
        difficult: 0,
      },
      table: {
        search: "",
        headers: [
          { text: "名称", align: "start", value: "name" },
          { text: "学科", value: "subject_id" },

          { text: "创建时间(Date)", value: "create_time" },
          { text: "操作", value: "action" },
        ],
        desserts: [],
      },
    };
  },
  created() {
    this.searchList();
  },
  methods: {
    searchList() {
      let d = [];
      this.$api.PracticeList().then((res) => {
        console.log("智能训练卷列表：", res);
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
