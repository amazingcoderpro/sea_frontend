<template>
    <div class="modifyPassword">
         <el-dialog 
            :title="dialog.title" 
            :visible.sync="dialog.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'
            :modal-append-to-body="false"
            width="500px">
            <div class="form">
                <el-form 
                    ref="form" 
                    :model="form"
                    :rules="form_rules"
                    label-width="90px" >

                    <el-form-item label="密码:" prop="password">
                      <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <!-- 确认密码 -->
                    <el-form-item label="确认密码:" prop="password2">
                      <el-input type="password" v-model="form.password2" placeholder="请确认密码"></el-input>
                    </el-form-item>


                    <!-- 取消，提交 -->
                    <el-form-item  class="text_right">
                        <el-button @click="dialog.show = false">取 消</el-button>
                        <el-button type="primary" @click='submitForm("form")'>提  交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
  
</template>

<script>
export default {
  name: "modifyPassword",
  props: {
    dialog: Object
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
      form:{
        password:'',
        password2:'',
        userID:'',
      },
      form_rules: {
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
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.form.userID = JSON.parse(window.localStorage.getItem('user')).id;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .put(`/api/v1/account/set_passwords/${this.form.userID}/`, this.form)
            .then(res => {
              if (res.data.code == 1) {
                this.$message({message: "修改成功",type: "success"});
                this.dialog.show = false;
              } else {
                this.$message("接口超时!");
              }
            })
            .catch(error => {
              this.$message("接口超时!");
            });
        }
      });
    }
  }

};
</script>
<style scoped>
</style>
