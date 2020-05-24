<template>
  <div id="home">
<!--    数据统计-->
    <v-row  style="height: 500px;width: 100%"  class="mt-5 flex-wrap" justify="space-between">
      <v-col >
        <v-card color="#00BCD4">
          <div class="d-flex  flex-wrap justify-space-around">
            <div class="text">
              <v-card-title class="headline">用户总数</v-card-title>
              <v-card-title class="count">{{userCount}}</v-card-title>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-card color="#3F51B5">
          <div class="d-flex  flex-wrap justify-space-around">
            <div class="text">
              <v-card-title class="headline">题目总数</v-card-title>
              <v-card-title>{{questionCount}}</v-card-title>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col >
        <v-card color="#2196F3">
          <div class="d-flex  flex-wrap justify-space-around">
            <div class="text">
              <v-card-title class="headline">测试试卷总数</v-card-title>
              <v-card-title>{{examPaperCount}}</v-card-title>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col >
        <v-card color="#009688">
          <div class="d-flex  flex-wrap justify-space-around">
            <div class="text">
              <v-card-title class="headline">智能训练试卷总数</v-card-title>
              <v-card-title>{{practicePaperCount}}</v-card-title>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
<!--用户考试活跃度-->

  </div>
</template>

<script>
export default {
  data() {
    return {
      examPaperCount: 0,
      userCount: 0,
      questionCount: 0,
      practicePaperCount: 0
    };
  },
  created() {
// 获取数量
    this.$api.countData().then(res=>{
      console.log(res)
      this.userCount=res.userCount
      this.questionCount=res.questionCount
      this.examPaperCount=res.examPaperCount
      this.practicePaperCount=res.practicePaperCount
    })
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
  .text{
    color:white;
  }

</style>