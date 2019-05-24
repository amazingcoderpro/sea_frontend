<template>
    <div class="account_manager">
        <div>
            <el-form :inline="true" ref="add_data">
                 <el-form-item class="btnRight">
                    <el-button @click='getPinFun()'>账户添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 表单部分 -->
        <div class="table_right">
          <el-table :data="tableData" border>
            <el-table-column label="头像" width="100"></el-table-column>
            <el-table-column type="index"  label="ID" width="50"></el-table-column>
            <el-table-column prop="account_name" label="账户信息" align="center" width="150"></el-table-column>
            <el-table-column prop="pins" label="Pin数据" align="center" width="150"></el-table-column>
            <el-table-column prop="repin" label="RePin数据" align="center" width="150"></el-table-column>
            <el-table-column prop="like" label="Like数据" align="center" width="150"></el-table-column>
            <el-table-column prop="comment" label="Comment数据" align="center" width="150"></el-table-column>
            <el-table-column prop="update_person" label="详细数据报告" align="center" width="150"></el-table-column>
            <el-table-column prop="update_person" label="更新情况" align="center" width="150"></el-table-column>
            <el-table-column prop="role_name" label="规则详情" align="center" width="150"></el-table-column>
            <el-table-column prop="finished" label="发布记录" align="center" width="150"></el-table-column>

            <el-table-column prop="operation" align="center" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button type="warning" icon="edit" size="small" @click="handleEdit(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 展示请求权限的弹窗 -->
        <DialogFound :dialog='dialog'  ></DialogFound>

    </div>
</template>

<script>

import DialogFound from "./dialog/board_manager_dialog";

export default {
  name: "account_manager",
  data() {
    return {
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
    this.init();
  },
  methods: {
    init() {
      // 获取表格数据
      this.$axios("/api/v1/account_list/").then(res => {
          console.log(res.data)
        this.tableData = res.data.data.results;
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
        this.$axios.post(`/api/v1/pinterest_account_auth/2/`).then(res => {
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
                this.$message({
                  message: "接口超时!",
                  type: 'warning',
                  center: true
                });
            });


    }



  }
};



</script>

<style>

</style>
