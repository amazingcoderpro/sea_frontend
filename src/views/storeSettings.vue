<template>
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
                     <el-input v-model="storeUser.url_format" disabled placeholder="Berrylook" class="Parameter"></el-input>
                   </div>
                  <!-- Store Timezone -->
                   <div class="storeurl">
                     <span>Store Timezone</span>
                      <el-input v-model="storeUser.timezone" disabled placeholder="请输入内容"></el-input>
                   </div>
                    <!-- 点击 -->
                    <el-form-item>
                      <el-button type="primary" class="submit_btn" @click="submitForm()">Save Changes</el-button>
                    </el-form-item>
                  </el-form>
        </section>
    </div>
</template>

<script>
import * as base from '../assets/js/base'
import router from '../router'
export default {
    name: "storeSetting",
    components:{},
    data(){    
      return {
        storeUser:{
          url:"",
          name:"",
          timezone:"",
          url_format:"",
          storeID:"",
          store_view_id:"",
        }       
      }
    },
    created(){  
        this.init();
    },
    methods: {
      init() {
        this.storeUser.storeID = JSON.parse(window.localStorage.getItem('store')).id;
        this.$axios(`/api/v1/store/${this.storeUser.storeID}/`).then(res => {
            if(res.data.code == 1){
              this.storeUser.name = res.data.data.name;
              this.storeUser.url = res.data.data.url;
              this.storeUser.timezone = res.data.data.timezone;
              this.storeUser.url_format = res.data.data.url_format;
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
        this.storeUser.store_view_id = JSON.parse(window.localStorage.getItem('store')).store_view_id;
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
.storeSetting .Parameter{
  width: 1500px;
}
</style>
