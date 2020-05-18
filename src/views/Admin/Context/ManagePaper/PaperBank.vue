<template>
  <div id="paper-bank">
    <v-card-title>
      试卷列表
      <v-spacer></v-spacer>
      <v-text-field
              v-model="table.search"
              append-icon="mdi-magnify"
              label="输入相关内容查询"
              single-line
              hide-details
      ></v-text-field>
      <router-link :to="{path:'/layout/exam-paper/add'}">
        <v-btn class="ma-2" tile color="indigo" dark>新增试卷</v-btn>
      </router-link>
    </v-card-title>
    <v-data-table
            :headers="table.headers"
            :items="table.desserts"
            :search="table.search"
    >
      <!-- 操作 -->
      <template v-slot:item.action="slotScope">
        <router-link :to="{path:'/layout/exam-paper/look/'+slotScope.item.id}">
          <v-btn class="mr-2" color="primary" fab small >
            查看
          </v-btn>
        </router-link>
        <router-link :to="{path:'/layout/exam-paper/edit/'+slotScope.item.id}">
          <v-btn class="mr-2" color="orange" fab small dark >
            编辑
          </v-btn>
        </router-link>
        <v-btn class="mr-2" color="green" fab small >
          发布
        </v-btn>
        <v-btn class="mr-2" color="error" fab small dark @click="deletePaper(slotScope.item.id)">
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

    //获取全部试卷
    // this.searchList();
  },
  data() {
    return {
      table: {
        search: "",
        headers: [
          { text: "ID", align: "start", value: "id" },
          { text: "试卷名称", value: "name" },
          { text: "学科", align: "start", value: "SubjectId" },
          { text: "创建人", value: "createUser" },
          { text: "创建时间(Date)", value: "createTime" },
          { text: "发布时间(Date)", value: "startTime" },
          { text: "截至时间(Date)", value: "endTime" },
          { text: "是否发布", value: "isPublish" },
          { text: "操作", value: "action" },
        ],
        desserts: [],
      },
    };
  },
  methods: {
    async searchList() {
      let d = [];
      let res = await this.$api.PaperList();
      console.log(res);
      res.data.forEach((item, index) => {
        d.push({
          key: index,
          id: item.id,
          name:item.name,
          SubjectId: item.SubjectId,
          createUser: item.createUser,
          createTime: item.createTime,
          startTime: item.startTime,
          endTime: item.endTime,
          isPublish: item.isPublish,
        });
      });
      this.desserts = d;
    },

    deletePaper(id) {
      console.log("点击删除的item", id);
      this.$api.DelPaper({ id: id }).then((res) => {
        if (res.state === 200) {
          this.$message.success(res.msg);
          this.searchList()
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
};
</script>

<style scoped>
.icons-list > .anticon {
  margin-right: 1rem;
  font-size: 1rem;
}

.search > .ant-input-search {
  width: 20vw;
  margin-bottom: 1vh;
}
</style>
