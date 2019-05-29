<template>
  <div class="shopfy_regist">
    <section class="form_container">
      <el-form :model="registUser" :rules="rules" ref="loginForm" label-width="100px" class="loginForm">
        <!-- 账号 -->
        <el-form-item label="账号:" prop="username">
          <el-input v-model="registUser.username" disabled placeholder="请输入戶名"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱:" prop="emailstr">
          <el-input v-model="registUser.emailstr" disabled placeholder="请输入email"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码:" prop="password">
          <el-input type="password" v-model="registUser.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item label="确认密码:" prop="password2">
          <el-input type="password" v-model="registUser.password2" placeholder="请确认密码"></el-input>
        </el-form-item>
      </el-form>
      <div class="text">
        <div class="text_hint">
          <span>My store is not in English</span>
        </div>
        <div class="button">
          <el-button type="primary" @click="submitForm('loginForm')">Next</el-button>
        </div>
        <div class="clause">
          <p>
            By signing up,you agree to our
            <a href="#">Terms of Service</a> and
            <a href="#">Privacy Policy</a>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import * as base from '../assets/js/base'
import router from "../router";
import Menufilter from "../components/menufilter.js";
export default {
  name: "shopfy_regist",
  components: {},
  // 判断两次输入密码
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registUser: {
        password: "",
        username: "", //商铺名
        emailstr: "",
        id:'',
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "change" },
        ],
        emailstr: [
          { required: true, message: "账号不能为空", trigger: "change" },
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
        ]
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.registUser.username = base.getQueryString("shop");
      this.registUser.emailstr = base.getQueryString("email");
      this.registUser.id = base.getQueryString("id");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .put(`/api/v1/account/set_password/${this.registUser.id}/`, this.registUser)
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
    }
  }
};
</script>

<style scoped>
.shopfy_regist {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/img/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 470px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 5px;
  margin-left: -220px;
  margin-top: -300px;
}
.loginForm {
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}
.text {
  width: 470px;
  height: 172px;
  border-radius: 5px;
  background: #f9f9f9;
}
.text .text_hint {
  text-align: center;
  color: #277fc2;
  font-size: 13px;
  padding-top: 25px;
}
.button {
  text-align: center;
  padding-top: 22px;
}
.el-button {
  padding: 15px 55px;
  font-size: 16px;
  background: #0f8fcf;
}
.clause p {
  text-align: center;
  padding-top: 22px;
  font-size: 13px;
  color: #65635d;
}
.clause p a {
  color: #0f8fcf;
}
</style>
