<template>
    <div class="pin_edit">
         <el-dialog  :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false' :modal-append-to-body="false"  >
          <el-form :model="editData" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
               <el-form-item label="board_uri">
                <el-input v-model="editData.board_uri" disabled></el-input>
              </el-form-item>
               <el-form-item label="board名称" prop="name">
                <el-input v-model="editData.name"></el-input>
              </el-form-item>
               <el-form-item label="board描述" prop="description">
                <el-input v-model="editData.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "pin_edit",
    props: {
      dialog: Object,
      formData: Object
    },
    data() {
      return {
        editData:{
          board_uri: '',
          description: '',
          id: '',
          name: '',
          pinterest_account_id: ''
        },
        rules: {
          name: [{required: true, message: '请输入账户名称', trigger: 'blur'}],
          description: [{required: true, message: '请输入账户描述', trigger: 'blur'}],
        }
      };
    },
    watch: {
        dialog: function() {
            this.init();
        }
    },
    methods: {
      init(){
          this.$axios(`/api/v1/board_manage/${this.formData.board_id}/`)
          .then(res => {
            if(res.data.code == 1){
              this.editData = res.data.data;
            }else{
              this.$message({
                message: "获取数据失败",
                type: 'warning',
                center: true
              });
            }
          });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
                this.$axios.put(`/api/v1/board_manage/${this.formData.board_id}/`,this.editData)
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
/* .pin_edit  */

</style>
