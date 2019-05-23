<template>
    <div class="board_manager">
        <div>
            <el-form :inline="true" ref="add_data">
                 <el-form-item class="btnRight">
                    <el-button @click='getPinFun()'>账户添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 展示请求权限的弹窗 -->
        <DialogFound :dialog='dialog'  ></DialogFound>

    </div>
</template>

<script>

import DialogFound from "./dialog/board_manager_dialog";

export default {
  name: "board_manager",
  data() {
    return {
      iframeSrc:"dialog/board_manager_html.html",
      tableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      form: {
        id: "",
        username: "",
        password: "",
        password2: "",
        email: "",
        nickname: "",
      }
    };
  },
  components: {
     DialogFound
  },
  created() {
    //this.getProfile();
  },
  methods: {
    getProfile() {
      // 获取表格数据
      this.$axios("/api/v1/account/users/?page=1&page_size=10").then(res => {
        this.tableData = res.data.results;
        // this.filterTableData = res.data;
      });
    },
    handleEdit(row) {
      // 编辑
      this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "put"
      };
      this.form = {
        id: row.id,
        username: row.username,
        password: row.password,
        password2: row.password,
        email: row.email,
        last_name: row.last_name,
      };
    },
    handleDelete(row, index) {
      // 删除
      this.$axios.delete(`/api/v1/account/users/${row.id}/`).then(res => {
        this.$message("删除成功");
        this.getProfile();
      });
    },
    handleAdd() {
      // 添加
      this.dialog = {
        show: true,
        title: "添加用户",
        option: "post"
      };
      this.form = {
        id: "",
        username: "",
        password: "",
        password2: "",
        email: "",
        last_name: "",
      };
    },
    getPinFun(row) {
        this.$axios.post(`/api/v1/pinterest_account_outh/2/`).then(res => {
            console.log(res)
            if(res.data.code == 1){
              window.open(res.data.data.message, 'newwindow', 'height=700, width=700, top=200, left=500, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
            }else{
                this.$message({
                  message: res.data.msg,
                  type: 'warning',
                  center: true
                });
            }
        }).catch(error => {
                //超时之后在这里捕抓错误信息.
                if (error.response) {
                    console.log('error.response')
                    console.log(error.response);
                } else if (error.request) {
                    console.log(error.request)
                    console.log('error.request')
                    if(error.request.readyState == 4 && error.request.status == 0){
                        //我在这里重新请求
                    }
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });


    }



  }
};



</script>

<style>

</style>