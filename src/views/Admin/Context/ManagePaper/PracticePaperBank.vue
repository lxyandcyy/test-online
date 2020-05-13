<template>
  <div id="practice-paper-bank">
    <v-card-title>
      智能训练试卷
      <v-spacer></v-spacer>
      <v-text-field
        v-model="table.search"
        append-icon="mdi-magnify"
        label="输入相关内容查询"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="table.headers"
      :items="table.desserts"
      :search="table.search"
    >
      <!-- 操作 -->
      <template v-slot:item.action="slotScope">
        <router-link
          :to="{
            path: '/practice-paper/sel',
            query: { id: slotScope.item.practice_paper_id },
          }"
        >
          <v-btn class="mr-2" color="primary" fab small>
            查看
          </v-btn>
        </router-link>
        <router-link
          :to="{
            path: '/practice-paper/edit',
            query: { id: slotScope.item.practice_paper_id },
          }"
        >
          <v-btn class="mr-2" color="orange" fab small dark>
            编辑
          </v-btn>
        </router-link>
        <v-btn
          class="mr-2"
          color="error"
          fab
          small
          dark
          @click="deletePaper(slotScope.item.practice_paper_id)"
        >
          删除
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  created() {
    // 获取学科数据
    // 。。。

    //获取全部试卷
    this.searchList();
  },
  data() {
    return {
      table: {
        search: "",
        headers: [
          { text: "智能试卷ID", align: "start", value: "practice_paper_id" },
          { text: "名称", align: "start", value: "practice_paper_name" },
          { text: "学科", value: "subject_id" },
          { text: "创建时间(Date)", value: "create_time" },
          { text: "操作", value: "action" },
        ],
        desserts: [],
      },
    };
  },
  methods: {
    async searchList() {
      let d = [];
      let res = await this.$api.PracticePaperList();
      console.log("试卷列表：", res);
      res.forEach((item, index) => {
        d.push({
          practice_paper_id: item.practice_paper_id,
          practice_paper_name: item.practice_paper_name,
          subject_id: item.subject_id,
          create_time: item.create_time,
        });
      });
      this.table.desserts = d;
    },
    deletePaper(Id) {
      console.log("点击删除的item", Id);
      this.$api.DelPracticePaper({ practice_paper_id: Id }).then((res) => {
        if (res.state === 200) {
          this.table.desserts = this.table.desserts.filter(
            (item) => item.practice_paper_id !== Id
          ); // 删除指定id题目
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
};
</script>

<style scoped></style>
