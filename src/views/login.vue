<template>
    <div class="login">
        <section class="form_container">
                  <span class="title">Social Media管理系统</span>
                  <el-form :model="loginUser" :rules="rules" ref="loginForm" label-width="60px" class="loginForm">
                    
                    <el-form-item label="账号" prop="username">
                      <el-input v-model="loginUser.username" placeholder="请输入账号"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="password">
                      <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>

                    <el-form-item>
                      <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')" >登录</el-button>
                    </el-form-item>

                    <div class="tiparea">
                        <p>还没有账号？现在<router-link to='/login'>注册</router-link> </p>
                    </div>
                  </el-form>
        </section>
    </div>
</template>


<script>
// import jwt_decode from 'jwt-decode';
import router from '../router'
import Menufilter from '../components/menufilter.js'
export default {
    name: "login",
    components:{},
    data(){    
      return {
        loginUser:{
          username:"",
          password:""
        },
        rules: {
          username: [
            { required: true, message: "用户名不能为空", trigger: "change" },
            { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }  
          ],
          password: [
            { required: true, message: "密码不能为空", trigger: "blur" },
            { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
          ]
        }        
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/api/v1/account/login/',this.loginUser)
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
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
    width: 370px;
    height: 314px;
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    margin-left: -210px;
    margin-top: -200px;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>
