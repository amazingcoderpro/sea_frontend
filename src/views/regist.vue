<template>
    <div class="regist">
        <section class="form_container">
                    <el-form :model="loginUser" :rules="rules" ref="loginForm" class="loginForm">
                      <!-- 账号 -->
                    <el-form-item prop="username">
                      <el-input v-model="loginUser.username" :height="55" placeholder="请输入账号"></el-input>
                    </el-form-item>
                      <!-- 密码 -->
                    <el-form-item prop="password">
                      <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <!-- 确认密码 -->
                    <el-form-item prop="password2">
                      <el-input type="password" v-model="loginUser.password2" placeholder="请确认密码"></el-input>
                    </el-form-item>
                    <!-- 下拉框 -->
                    <el-select v-model="loginUser" placeholder="请选择" class="select">
                      <el-option
                        v-for="item in seleArray"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form>
                  <div class="text">
                    <div class="text_hint">
                        <span>My store is not in English</span>
                    </div>
                    <div class="button">
                       <el-button type="primary" @click="submitForm('loginForm')">Next</el-button>
                    </div>
                    <div class="clause">
                        <p>By signing up,you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></p>
                    </div>
                  </div>
        </section>
    </div>
</template>


<script>
// import jwt_decode from 'jwt-decode';
import router from '../router'
import Menufilter from '../components/menufilter.js'
export default {
    name: "regist",
    components:{},
    // 判断两次输入密码
    data(){   
        var validatePass2 = (rule, value, callback) => {
        if (value !== this.loginUser.password) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
          seleArray: [{
          value: '选项1',
          label: '北京'
        }, {
          value: '选项2',
          label: '上海'
        }, {
          value: '选项3',
          label: '深圳'
        }],
        loginUser:{
          username:"",
          password:""
        },
        rules: {
          username: [
            { required: true, message: "账号不能为空", trigger: "change" },
            { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }  
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
        }        
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/api/v1/account/set_password/41/',this.loginUser)
            .then(res => {
                // token
                document.onkeydown = undefined;
                console.log(res.data)
                if(res.data.code == 1){
                    const token=res.data.data.token;
                    localStorage.setItem("eleToken", token);
                    localStorage.setItem("user", JSON.stringify( res.data.data.user ));
                    localStorage.setItem("menu_tree", JSON.stringify( res.data.data.menu_tree ));
                    localStorage.setItem("router_tree", JSON.stringify( res.data.data.router_list ));

                    // // 解析token
                    // const decoded = jwt_decode(token)
                    // console.log(decoded)

                    // token 存储到vuex中
                    this.$store.dispatch("setAuthenticated", !this.isEmpty(token))
                    this.$store.dispatch("setUser", res.data.data.user)
                    this.$store.dispatch("setMenuTree", res.data.data.menu_tree)
                    this.$store.dispatch("setRouterTree", res.data.data.router_list)
                    let routes = []
                    // Menufilter(routes, res.data.data.router_list)
                    // router.addRoutes(routes)
                    router.push('/dashboard');
                }else{
                  this.$message({
                    message: res.data.msg.detail,
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
.regist {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 470px;
  height: 400px;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 5px;
  margin-left: -220px;
  margin-top: -280px;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}
.select{
  width: 410px;
}
.text{
  width: 470px;
  height: 172px;
  border-radius: 5px;
  background: #f9f9f9;
}
.text .text_hint{
  text-align: center;
  color: #277fc2;
  font-size: 13px;
  padding-top: 25px;
}
.button{
  text-align: center;
  padding-top: 22px;
}
.el-button{
  padding: 15px 55px;
  font-size: 16px;
  background: #0f8fcf;
}
.clause p{
  text-align: center;
  padding-top: 22px;
  font-size: 13px;
  color: #65635d;
}
.clause p a{
  color: #0f8fcf;
}

</style>
