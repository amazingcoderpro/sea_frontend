
<template>
    <div class="account_add">
         <el-dialog  :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false' :modal-append-to-body="false"  >
          <el-form :model="objForm" :rules="rules" ref="objForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="Pin唯一标识码" prop="account_uri">
                <el-input v-model="objForm.account_uri"></el-input>
              </el-form-item>
              <el-form-item label="账户名称" prop="nickname">
                <el-input v-model="objForm.nickname"></el-input>
              </el-form-item>
              <el-form-item label="登陆邮箱" prop="email">
                <el-input v-model="objForm.email"></el-input>
              </el-form-item>
              <el-form-item label="账号类型" prop="type">
                <el-radio v-model="objForm.type" label="0">business</el-radio>
                <el-radio v-model="objForm.type" label="1">individual</el-radio>
              </el-form-item>
              <el-form-item label="账户描述" prop="description">
                <el-input v-model="objForm.description"></el-input>
              </el-form-item>
              <el-form-item label="创建时间" prop="create_time">
                    <el-date-picker
                      v-model="objForm.create_time"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
              </el-form-item>

              <el-form-item>
              <el-button type="primary" @click="submitForm('objForm')">立即创建</el-button>
              <el-button @click="resetForm('objForm')">重置</el-button>
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
        objForm:{
          account_uri: "123456-zjytest",  //PinterestAccount唯一标识码
          nickname: "123456-zjytest",     //账户名称
          email: "mark.zhang@orderplus.com",        //登陆邮箱
          type: "0",         //账号类型 (0, 'business'), (1, 'individual')
          description: "123456-zjytest",    //账户描述
          create_time: "",    //账号创建时间
        },
        rules: {
          account_uri: [{ required: true, message: '请输入PinterestAccount唯一标识码', trigger: 'blur' }],
          nickname: [{required: true, message: '账户名称不能为空', trigger: 'blur'}],
          email:[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          description: [{required: true, message: '账户描述', trigger: 'blur'}],
          create_time: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ]
        }
      };
    },
    watch: {
        dialog: function() {
            console.log(this.dialog) // 旧的值
        }
    },
    mounted() {
  //    this.$refs.dialog.open(); //方法
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
                this.$axios.post(`/api/v1/pinterest_account/`,this.objForm)
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
.account_add .el-form-item__label{
  width:115px!important;
}
.account_add .el-form-item__content{
  margin-left:115px!important;
}

</style>
