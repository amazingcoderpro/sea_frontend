<template>
    <div class="logFund">
         <el-dialog 
            :title="dialog.title" 
            :visible.sync="dialog.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'
            :modal-append-to-body="false">
            <div class="form">
                <el-form 
                    ref="form" 
                    :model="form"
                    :rules="form_rules"
                    label-width="120px" 
                    style="margin:10px;width:auto;">
                    <!-- 用户名 -->
                    <el-form-item label="用户名" prop="username">
                      <el-input v-model="form.username" placeholder="Leslie"></el-input>
                    </el-form-item>
                    <!-- 部门 -->
                    <!-- <el-form-item label="部门" prop="id">
                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                    </el-form-item> -->
                    <!-- 角色配置 -->
                    <el-form-item label="角色配置" prop="role">
                      <el-select v-model="roleArray"  @click='roleName("form")' placeholder="请选择" class="role_name">
                        <el-option
                          v-for="item in userArray"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <!-- 邮箱 -->
                    <el-form-item label="邮箱" prop="email">
                      <el-input v-model="form.email" placeholder="请输入email"></el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item label="密码" prop="password">
                      <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <!-- 确认密码 -->
                    <el-form-item label="确认密码" prop="password2">
                      <el-input type="password" v-model="form.password2" placeholder="请确认密码"></el-input>
                    </el-form-item>
                    <!-- 取消，提交 -->
                    <el-form-item  class="text_right">
                        <el-button @click="dialog.show = false">取 消</el-button>
                        <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import role_managerVue from '../role_manager.vue';
export default {
  name: "logfound",
  props: {
    dialog: Object,
    form: Object
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
            roleArray:'',
            input: '',
            userArray:[                         //Pinterest下拉框数据
            {"label":"区域三","value":"选项一"},
            {"label":"区域二","value":"选项二"}
          ],
      form_rules: {
          username: [
            { required: true, message: "用户名不能为空", trigger: "change" },
            { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
          ],
          password: [
            { required: true, message: "密码不能为空", trigger: "blur" },
            { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
          ],
          password2: [
            { required: true, message: "确认密码不能为空", trigger: "blur" },
            {
              min: 6,
              max: 30,
              message: "长度在 6 到 30 个字符",
              trigger: "blur"
            },
            { validator: validatePass2, trigger: "blur" }
          ],
          email: [
            {
              type: "email",
              required: true,
              message: "邮箱格式不正确",
              trigger: "blur"
            },
          ]
        }
      };
    },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，提交数据;
          if (this.dialog.option == "post"){
            this.$axios.post(`/api/v1/account/users/`, this.form).then(res => {
              // 操作成功
              this.$message({
                message: "保存成功！",
                type: "success"
              });
              this.dialog.show = false;
              this.$emit("update");
            });
          }else{
            const id = this.form.id
            this.$axios.put(`/api/v1/account/users/${id}/`, this.form).then(res => {
              // 操作成功
              this.$message({
                message: "保存成功！",
                type: "success"
              });
              this.dialog.show = false;
              this.$emit("update");
            });
          }
        }
      });
    },
    //  roleName(form) {
    //   // 获取角色配置
    //   this.$axios.GET("/api/v1/role/").then(res => {
       
    //   });
    // },
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，提交数据;
          this.$axios.post(`/api/account/users/`, this.form).then(res => {
            // 操作成功
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.dialog.show = false;
            this.$emit("update");
          });
        }
      });
    },

    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，提交数据;
          const url =
            this.dialog.option == "add" ? "add" : `edit/${this.form.id}`;
          this.$axios.post(`/api/account/${url}`, this.form).then(res => {
            // 操作成功
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.dialog.show = true;
            this.$emit("update");
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.role_name{
   width: 771px;
}
</style>

