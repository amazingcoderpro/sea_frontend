<template>
<div class="store_personal">
    <div class="personal">
            <section class="form_container">
                      <div class="tableTitle"><span>Profile Settings</span></div>
                      <el-form :model="personalUser" :rules="rules" ref="personalForm" label-width="110px">
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
                          <el-input v-model="personalUser.email" disabled placeholder="请输入email"></el-input>
                        </el-form-item>
                        <!-- 点击 -->
                        <el-form-item>
                          <el-button type="primary" class="submit_btn" @click="submitForm('personalForm')" >Update</el-button>
                        </el-form-item>
                      </el-form>
            </section>
        </div>
    <div class="storeSetting">
        <section class="form_container">
                  <div class="tableTitle"><span>Store Settings</span></div>
                  <el-form :model="storeUser" ref="personalForm" label-width="180px" class="personalForm">
                  <!-- Store Name -->
                   <div class="storename">
                     <span>Store Name</span>
                     <el-input v-model="storeUser.name" disabled placeholder="Berrylook" class="input_name"></el-input>
                   </div>
                  <!-- Store URL -->
                   <div class="storeurl">
                     <span>Store URL</span>
                     <el-input v-model="storeUser.url" disabled placeholder="Berrylook"></el-input>
                   </div>
                  <!-- Link Parameter -->
                   <div class="storeurl">
                     <span>Link Parameter</span>
                     <el-input v-model="storeUser.url_format" disabled placeholder="Berrylook"></el-input>
                   </div>
                  <!-- Store Timezone -->
                   <div class="storeurl">
                     <span>Store Timezone</span>
                      <el-input id="result" v-model="storeUser.timezone" disabled></el-input>
                   </div>
                   <!-- store_view_id -->
                   <div class="storeurl">
                      <div>
                        <span>Google Analytics View ID</span>
                      </div>
                      <el-input v-model="storeUser.store_view_id" placeholder="请输入内容" class="btn_input"></el-input>
                      <el-button type="primary"  size="small" @click="showStatement()" class="btn_stat">Statement</el-button>
                   </div>
                    <!-- 点击 -->
                    <el-form-item>
                      <el-button type="primary" class="submit_btn" @click="submitForm()">Save Changes</el-button>
                      <div class="storeurl_s">
                      </div>
                    </el-form-item>
                  </el-form>
                  <!-- 展示请求权限的弹窗 -->
                  <DialogFound :dialog='dialog'  ref="dailog" ></DialogFound>
        </section>
    </div>
  </div>
</template>

<script>
import * as base from '../../assets/js/base'
import router from '../../router'
import DialogFound from "./statement";
export default {
    name: "storeSetting",
    name: "personal",
    components:{
      DialogFound
    },
     created(){  
          this.init();
      },

    data(){    
      return {
        dialog: {
            show: false,
            title: "",
            option: "edit"
        },
        storeUser:{
          url:"",
          name:"",
          timezone:"",
          url_format:"",
          storeID:"",
          store_view_id:"",
        },
         personalUser:{
          first_name:"",
          last_name:"",
          email:"",
          password:"",
          personalID:"",
        },     
         rules: {
          first_name: [
            { required: true, message: "The user name cannot be empty", trigger: "change" },
            { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur",left:"100px"}  
        ],
          last_name: [
            { required: true, message: "The user name cannot be empty", trigger: "change" },
            { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur" }  
        ],
          email: [
            { required: true, message: "邮箱格式不正确", trigger: "change",type:"email"},
        ],
        }          
      }
    },
    mounted(){
      setTimeout(() => {
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth()+1;
        var day = today.getDate();
        month  = month<10  ? "0"+month : month;
        day  = day <10  ? "0"+day : day;
        var str = year+"-"+month+"-"+day+"";
        var obj = document.getElementById("result");
        obj.placeholder = str;
      },1000);
    },
    methods: {
      init() {
        this.storeUser.storeID = JSON.parse(window.localStorage.getItem('store')).id;
        this.storeUser.store_view_id = JSON.parse(window.localStorage.getItem('store')).store_view_id;
        this.$axios(`/api/v1/store/${this.storeUser.storeID}/`).then(res => {
            if(res.data.code == 1){
              this.storeUser.name = res.data.data.name;
              this.storeUser.url = res.data.data.url;
              this.storeUser.timezone = res.data.data.timezone;
              this.storeUser.url_format = res.data.data.url_format;
              this.storeUser.store_view_id = res.data.data.store_view_id;
            }else{
                this.$message({
                  message: "code 异常!",
                  type: 'warning',
                  center: true
                });
            }
        })
         this.personalUser.personalID = JSON.parse(window.localStorage.getItem('user')).id;
          this.$axios(`/api/v1/account/users/${this.personalUser.personalID}/`).then(res => {
              if(res.data.code == 1){
                  this.personalUser.first_name = res.data.data.first_name;
                  this.personalUser.last_name = res.data.data.last_name;
                  this.personalUser.email = res.data.data.email;
              }else{
                  this.$message({
                    message: "code 异常!",
                    type: 'warning',
                    center: true
                  });
              }                                                   
          })
      }, 
      submitForm() {
        this.$axios
          .put(`/api/v1/store/${this.storeUser.storeID}/`, this.storeUser)
          .then(res => {
            if (res.data.code == 1) {
              this.$message({
                message: "修改成功!",
                type: "success"
              });
            } else {
              this.$message("接口超时!");
            }
          })
          .catch(error => {
            this.$message("接口超时!");
       });
       this.$refs[formName].validate(valid => {
          if (valid) {
            this.$axios
              .put(`/api/v1/account/users/${this.personalUser.personalID}/`, this.personalUser)
              .then(res => {
                if (res.data.code == 1) {
                  this.$message({message: res.data.msg,type: 'success'});
                } else {
                  this.$message("修改成功!");
                }
              })
            }
        });  
      },
      showStatement(){
      this.dialog = {
        show: true,
        title: "Statement",
        option: "post"
      };    
      }
    },
      
  };
</script>



<style scope>
.store_personal{
  width: 100%;
  height: 100%;
}
.storeSetting .el-input{
  width: 400px;
  display: block;
  margin-top: 10px;
}
.storeSetting .el-select{
  display: block;
  width: 400px;
}
.storeSetting .submit_btn{
    background: #0f8fcf;
    color: #fff;
    padding: 15px 55px;
    font-size: 16px;
    margin-left: -180px;
    margin-top: 30px;
}
.storeSetting .newpass{
    padding-left: 17px;
    color: #0f8fcf;
}
.storeSetting .storename{
  margin-top: 30px;
}
.storeSetting .storeurl{
  margin-top: 15px;
}
.storeurl_s{
  display: inline-block;
  margin-left: 150px;
}
.storeurl_s .el-input{
    width: 150px;
}
.personal{
    margin-bottom: 100px;
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
.storeurl .btn_input{
  display: inline-block;
}
.storeurl .btn_stat{
  margin-left: 20px;
}
</style>
