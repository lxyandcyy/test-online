<template>
    <div id="record-list">
        <v-card flat tile>
            <v-card-title>
                考试记录
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="输入查询内容"
                        single-line
                        hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="table" :search="search">
                <!-- 操作 -->
                <template v-slot:item.action="slotScope">
<!--                    <router-link :to="{ path: '/record/'+this.$route.params.id+'/'+slotScope.item.id }">-->
                        <v-btn color="green" small >查看答题卡</v-btn>
<!--                    </router-link>-->
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
                search: "",
                headers: [
                    { text: "试卷名称", value: "name" },
                    { text: "做题日期", value: "doTime" },
                    { text: "耗费时间（s）", value: "spendTime" },
                    { text: "得分", value: "userScore" },
                    { text: "答题人", value: "userId" },
                    { text: "操作", value: "action" },
                ],
                table: [],
            };
        },
        created() {
            this.searchRecords();
        },
        methods: {
            searchRecords() {
                let d = [];
                this.$api.RecordsList(this.$route.params.id).then((res) => {
                    console.log(res);
                    res.data.forEach((item, index) => {
                        d.push({
                            key: index,
                            name:item.id,
                            doTime: item.doTime,
                            spendTime: item.spendTime,
                            userScore: item.userScore,
                            userId: item.userId,
                        });
                    });
                    this.table = d;
                });
            },
        },
    };
</script>

<style lang="scss"></style>
