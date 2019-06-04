<template>
    <div class="personal">
        <section class="form_container">
                  <div class="tableTitle"><span>Profile Settings</span></div>
                  <el-form :model="personalUser" :rules="rules" ref="personalForm" label-width="110px" class="personalForm">
                    <!-- 名 -->
                    <el-form-item label="FirstName" prop="first_name">
                      <el-input v-model="personalUser.first_name" placeholder="Daisy"></el-input>
                    </el-form-item>
                    <!-- 姓 -->
                    <el-form-item label="LastName" prop="last_name">
                      <el-input v-model="personalUser.last_name" placeholder="zhang"></el-input>
                    </el-form-item>
                    <!-- 邮箱 -->
                    <el-form-item label="EmailAddress" prop="email">
                      <el-input v-model="personalUser.email" placeholder="请输入email"></el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item label="Psaaword" prop="password">
                      <el-input type="password" v-model="personalUser.password" placeholder="请输入新密码"></el-input> 
                      <span class="newpass">Change Password</span>
                    </el-form-item>
                    <!-- 点击 -->
                    <el-form-item>
                      <el-button type="primary" class="submit_btn" @click="submitForm('personalForm')" >Update</el-button>
                    </el-form-item>
                  </el-form>
        </section>
    </div>
</template>

<script>
import * as base from '../assets/js/base'
import router from '../router'
export default {
    name: "personal",
    components:{},
    data(){    
      return {
        personalUser:{
          first_name:"",
          last_name:"",
          email:"",
          password:"",
          id:'',
        },
        rules: {
          first_name: [
            { required: true, message: "用户名不能为空", trigger: "change" },
            { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur",left:"100px"}  
        ],
          last_name: [
            { required: true, message: "用户名不能为空", trigger: "change" },
            { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur" }  
        ],
          email: [
            { required: true, message: "邮箱格式不正确", trigger: "change",type:"email"},
        ],
          password: [
            { required: true, message: "密码不能为空", trigger: "blur" },
            { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ],
        }        
      }
    },
    created(){   // 回车事件     
        var _self = this;
        document.onkeydown = function(e){
          if(window.event == undefined){
            var key = e.keyCode;
          }else{
            var key = window.event.keyCode;
          }
          if(key == 13){
            _self.submitForm('personalForm');
          }
        }
      },
    methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .put(`/api/v1/account/users/${this.personalUser.id}/`, this.personalUser)
            .then(res => {
              if (res.data.code == 1) {
                 // router.push("/login");
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
.personal{
  width: 100%;
  height: 100%;
}
.personal .form_container {
    width: 100%;
    height: 100%;
    padding-left: 10px;
}
.personal .el-input{
    width: 500px;
}
.personal .tableTitle{
    margin-bottom:50px;
}
.personal .submit_btn{
    background: #0f8fcf;
    color: #fff;
    padding: 15px 55px;
    font-size: 16px;
    margin-top: 10px;
    margin-left: -100px;
}
.personal .newpass{
    padding-left: 17px;
    color: #0f8fcf;
}
</style>
