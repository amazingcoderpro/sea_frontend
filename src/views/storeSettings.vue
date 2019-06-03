<template>
    <div class="storeSetting">
        <section class="form_container">
                  <div class="tableTitle"><span>Store Settings</span></div>
                  <el-form :model="storeUser" :rules="rules" ref="personalForm" label-width="180px" class="personalForm">
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
                     <el-input v-model="storeUser.link" disabled placeholder="Berrylook" class="Parameter"></el-input>
                   </div>
                  <!-- Your Store Industry -->
                   <div class="storeurl">
                     <span>Your Store Industry</span>
                     <el-select v-model="storeUser.Industry" placeholder="请选择">
                      <el-option
                        v-for="item in storeUser.IndustryArray"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                   </div>
                  <!-- Store Timezone -->
                   <div class="storeurl">
                     <span>Store Timezone</span>
                     <el-select v-model="storeUser.Timezone" placeholder="请选择">
                      <el-option
                        v-for="item in storeUser.TimezoneArray"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                   </div>
                  <!-- Language -->
                    <div class="storeurl">
                     <span>Language</span>
                     <el-select v-model="storeUser.Language" placeholder="请选择">
                      <el-option
                        v-for="item in storeUser.LanguageArray"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                   </div>
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
import Menufilter from '../components/menufilter.js'
export default {
    name: "storeSetting",
    components:{},
    data(){    
      return {
        storeUser:{
          url:"",
          name:"",
          link:"",
          Industry:"",
          Timezone:"",
          Language:"",

          IndustryArray:[],
          TimezoneArray:[],
          LanguageArray:[],
        },
        rules: {
         
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
    mounted(){
        this.getIndustry();
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$axios
              .put(`/api/v1/account/set_password/${this.storeUser}/`, this.storeUser)
              .then(res => {
                if (res.data.code == 1) {
                    router.push("/login");
                } else {
                  this.$message("接口超时!");
                }
              })
              .catch(error => {
                this.$message("接口超时!");
              });
          }
      });
    },
    getIndustry:function(){
        this.$axios.get("/api/v1/select/account/")
        .then(res=> {
            if(res.data.code == 1){
              this.storeUser.IndustryArray = res.data.data;
              this.storeUser.Industry = res.data.data[0].id;
            }else{
              this.$message("获取失败!");
            }
        }).catch(function(errof){
          this.$message("接口超时!");
        });
    },
  },
};
</script>



<style scope>
.storeSetting{
  width: 100%;
  height: 100%;
}
.storeSetting .form_container {
    width: 100%;
    height: 100%;
    padding-left: 10px;
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
    margin-left: -60px;
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
.storeSetting .Parameter{
  width: 1500px;
}

</style>
