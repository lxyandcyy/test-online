<template>
  <div id="home">
    <v-row  style="height: 500px;width: 100%"  class="mt-5 flex-wrap">
      <v-col
              v-for="(item, i) in items"
              :key="i"
              cols="5"
      >
        <v-card color="rgb(24, 103, 192)">
          <div class="d-flex  flex-wrap justify-space-around">
            <div>
              <v-card-title class="headline" v-text="item.title"></v-card-title>
              <v-card-subtitle v-text="item.count"></v-card-subtitle>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: '用户总数',
          count: 0,
        },
        {
          title: '题目总数',
          count: 0,
        },
        {
          title: '试卷总数',
          count: 0,
        },
      ],
    };
  },
  created() {
// 获取数量
  },
  methods: {}
};
</script>
