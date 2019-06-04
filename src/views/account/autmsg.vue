
<template>
    <div class="autmsg">
         <el-dialog  :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false' :modal-append-to-body="false"  >
          <el-form ref="form" label-width="200px" class="demo-ruleForm">
              <p class="title">Pinterest Account Authorization Guide</p>
              <p>You are currently trying to license your pinterest account to the Pinbooster system. To ensure that pinbooster is successfully authorized by your designated pinterest account, please follow these tips:</p>
              <p>1. If you are already logged into your pinterest account in your current browser, please check to make sure that the account you are currently logged into is an account that will be licensed to pinbooster.</p>
              <p>2. If your current browser is not logged in to any pinterest account, please log in to the pinterest account you are about to authorize to pinbooster.</p>
              <el-form-item>
                <el-button type="primary" @click="clickFun()">Confirmed</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "autmsg",
    props: {
      dialog: Object
    },
    data() {
      return {
      };
    },
    methods: {
      clickFun() {
        this.dialog.show = false;
        this.$parent.AutFun();
      }
    }
  }
</script>
<style>
.autmsg .el-button.el-button--primary{background: #fff;color: #ccc;padding: 0;border: 0;}
.autmsg p{width: 60%;margin-left: 20%;color: #000;text-indent: 2em;}
.autmsg p.title{font-size: 20px;font-weight: 600;text-align: center;text-indent: 0;}
</style>
