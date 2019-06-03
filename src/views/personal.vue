<template>
    <div class="personal">
        <section class="form_container">
                  <span class="title">Profile Settings</span>
                  <el-form :model="loginUser" :rules="rules" ref="loginForm" label-width="60px" class="loginForm">
                    
                    <el-form-item label="First name" prop="surname">
                      <el-input v-model="loginUser.username" placeholder=""></el-input>
                    </el-form-item>

                    <el-form-item label="Last name" prop="name">
                      <el-input v-model="loginUser.username" placeholder=""></el-input>
                    </el-form-item>

                    <el-form-item label="Email Address" prop="emailstr">
                      <el-input v-model="registUser.emailstr" disabled placeholder="请输入email"></el-input>
                    </el-form-item>

                    <el-form-item label="Psaaword" prop="password">
                      <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>

                    <el-form-item>
                      <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')" >Update</el-button>
                    </el-form-item>
                  </el-form>
        </section>
    </div>
</template>

<script>
import * as base from '../assets/js/base'
import router from '../router'
import Menufilter from '../components/menufilter.js'
export default {
    name: "login",
    components:{},
    data(){    
      return {
        loginUser:{
          surname:"",
          name:"",
          emailstr:"",
          password:"",
        },
        rules: {
          surname: [
            { required: true, message: "用户名不能为空", trigger: "change" },
            { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur" }  
        ],
          name: [
            { required: true, message: "用户名不能为空", trigger: "change" },
            { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur" }  
        ],
          emailstr: [
            { required: true, message: "账号不能为空", trigger: "change" },
        ],
          password: [
            { required: true, message: "密码不能为空", trigger: "blur" },
            { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ],
        }        
      }
    },
    created(){            // 回车事件
        var _self = this;
        document.onkeydown = function(e){
          if(window.event == undefined){
            var key = e.keyCode;
          }else{
            var key = window.event.keyCode;
          }
          if(key == 13){
            _self.submitForm('loginForm');
          }
        }
      },
    methods: {
      submitForm(formName) {
        this.loginUser.code = base.getQueryString("code") == null?'':base.getQueryString("code");
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/api/v1/account/login/',this.loginUser)
            .then(res => {
                document.onkeydown = undefined;
                console.log(res.data)
                if(res.data.code == 1){
                    const token=res.data.data.token;
                    localStorage.setItem("eleToken", token);
                    localStorage.setItem("user", JSON.stringify( res.data.data.user ));
                    this.$store.dispatch("setAuthenticated", !this.isEmpty(token))
                    this.$store.dispatch("setUser", res.data.data.user)
                    router.push('/dashboard');
                }else{
                  this.$message({
                    message: res.data.msg,
                    type: 'warning',
                    center: true
                  });
                }
              });
          }
        });
      },
      isEmpty(value) {
        return (
          value === undefined ||
          value === null || 
          (typeof value === "object" && Object.keys(value).length === 0) ||
          (typeof value === "string" && value.trim().length === 0)
        );
      }
    }
};
</script>

<style scoped>

</style>
