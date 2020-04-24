<template>
  <div id="mistake-list">
    <v-card flat tile>
      <v-card-title>
        错题本
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
            <v-btn color="primary" small>查看</v-btn>
          </router-link>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss"></style>
