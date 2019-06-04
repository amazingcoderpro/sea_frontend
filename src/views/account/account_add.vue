
<template>
    <div class="account_add">
         <el-dialog  :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false' :modal-append-to-body="false"  >
          <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
              <el-form-item label="account" prop="account">
                <el-input v-model="form.account"></el-input>
              </el-form-item>
              <el-form-item label="email" prop="email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item label="type" prop="type">
                <el-radio v-model="form.type" label="0">business</el-radio>
                <el-radio v-model="form.type" label="1">individual</el-radio>
              </el-form-item>
              <el-form-item label="create_time" prop="create_time">
                    <el-date-picker
                      v-model="form.create_time"
                      type="datetime">
                    </el-date-picker>
              </el-form-item>
              <el-form-item label="description">
                <el-input v-model="form.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('form')">Add</el-button>
                <el-button @click="resetForm('form')">Reset</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "account_add",
    props: {
      dialog: Object,
      form: Object
    },
    data() {
      return {
        rules: {
          account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
          email:[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          create_time: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
                this.$axios.post(`/api/v1/pinterest_account/`,this.form)
                .then(res => {
                    if(res.data.code == 1){
                      this.dialog.show = false;
                      this.$message({message: res.data.msg,type: 'success'});
                      this.$parent.init();
                    }else{
                      this.dialog.show = false; 
                      this.$message("添加失败!");
                    }
                })
                .catch(error => {
                  this.$message("接口超时!");
                });
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style>
.account_add .el-form-item__label{width:115px!important;}
.account_add .el-form-item__content{margin-left:115px!important;}
</style>
