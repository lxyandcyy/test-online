<template>
  <div id="add-question">
    <el-form :model="form" ref="form" label-width="100px" :rules="rules">
      <el-form-item label="学科" prop="subject_id" required>
        <el-select v-model="form.subject_id" placeholder="请选择学科">
          <!-- <el-option
            v-for="(item, index) in QueType"
            :key="index"
            :value="item"
            :label="item"
          ></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label="题干：" prop="topic" required>
        <el-input v-model="form.topic" />
      </el-form-item>
      <el-form-item label="选项：" prop="options" required>
        <el-form-item
          :label="item.prefix"
          :key="item.prefix"
          v-for="(item, index) in form.options"
          label-width="50px"
          class="question-item-label"
        >
          <el-input v-model="item.prefix" style="width:50px;" />
          <el-input
            v-model="item.content"
            class="question-item-content-input"
          />
          <el-button
            type="danger"
            size="mini"
            class="question-item-remove"
            icon="el-icon-delete"
            @click="questionItemRemove(index)"
          ></el-button>
        </el-form-item>
      </el-form-item>
      <el-form-item label="解析：" prop="parse" required>
        <el-input v-model="form.parse" />
      </el-form-item>
      <el-form-item label="难度：" required>
        <el-rate v-model="form.difficult" class="question-item-rate"></el-rate>
      </el-form-item>
      <el-form-item label="正确答案：" prop="correct" required>
        <el-radio-group v-model="form.correct">
          <el-radio
            v-for="item in form.options"
            :key="item.prefix"
            :label="item.prefix"
            >{{ item.prefix }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <!-- 事件按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="success" @click="questionItemAdd">添加选项</el-button>
      </el-form-item>
    </el-form>


<!--    <form>-->
<!--      <v-text-field-->
<!--              v-model="name"-->
<!--              :error-messages="nameErrors"-->
<!--              :counter="10"-->
<!--              label="Name"-->
<!--              required-->
<!--              @input="$v.name.$touch()"-->
<!--              @blur="$v.name.$touch()"-->
<!--      ></v-text-field>-->
<!--      <v-text-field-->
<!--              v-model="email"-->
<!--              :error-messages="emailErrors"-->
<!--              label="E-mail"-->
<!--              required-->
<!--              @input="$v.email.$touch()"-->
<!--              @blur="$v.email.$touch()"-->
<!--      ></v-text-field>-->
<!--      <v-select-->
<!--              v-model="select"-->
<!--              :items="items"-->
<!--              :error-messages="selectErrors"-->
<!--              label="Item"-->
<!--              required-->
<!--              @change="$v.select.$touch()"-->
<!--              @blur="$v.select.$touch()"-->
<!--      ></v-select>-->
<!--      <v-checkbox-->
<!--              v-model="checkbox"-->
<!--              :error-messages="checkboxErrors"-->
<!--              label="Do you agree?"-->
<!--              required-->
<!--              @change="$v.checkbox.$touch()"-->
<!--              @blur="$v.checkbox.$touch()"-->
<!--      ></v-checkbox>-->

<!--      <v-btn class="mr-4" @click="submit">submit</v-btn>-->
<!--      <v-btn @click="clear">clear</v-btn>-->
<!--    </form>-->
  </div>
</template>

<script>
export default {
  created() {
    //获取学科数据
  },
  data() {
    return {
      form: {
        id: null,
        subject_id: 1,
        gradeLevel: null,
        topic: "",
        options: [
          { prefix: "A", content: "" },
          { prefix: "B", content: "" },
          { prefix: "C", content: "" },
          { prefix: "D", content: "" }
        ],
        parse: "",
        correct: "",
        difficult: 0,
        create_time: "",
        create_user: this.$store.state.user.userId
      },
      rules: {
        subject_id: [
          { required: true, message: "请选择学科", trigger: "change" }
        ],
        topic: [{ required: true, message: "请输入题干", trigger: "blur" }],
        parse: [{ required: true, message: "请输入解析", trigger: "blur" }],
        correct: [
          { required: true, message: "请选择正确答案", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    //移除某个选项A/B/C/D
    questionItemRemove(index) {
      this.form.options.splice(index, 1);
    },
    //添加选项
    questionItemAdd() {
      let options = this.form.options;
      let last = options[options.length - 1];
      let newLastPrefix = String.fromCharCode(last.prefix.charCodeAt() + 1);
      options.push({ id: null, prefix: newLastPrefix, content: "" });
    },
    submitForm() {
      //题目创建时间=当前提交时间
      this.form.create_time = Date.now();

      this.$refs.form.validate(valid => {
        //如果表单填写完整
        if (valid) {
          this.$api
            .AddQue(this.form)
            .then(res => {
              console.log(res);
              this.$message.success("题目新增成功！");
              //   跳转到‘题库列表’页面
              this.$router.push({ path: "/layout/question-bank" });
            })
            .catch(e => {
              console.log(e);
              this.$message.error({ content: "题目提交失败，请检查网络！" });
            });
        } else {
          this.$message.info("请把表单填写完整！");
          return false;
        }
      });
    },
    // 重置
    resetForm() {
      this.$refs["form"].resetFields();
    }
  }
};
</script>

<style scoped></style>
