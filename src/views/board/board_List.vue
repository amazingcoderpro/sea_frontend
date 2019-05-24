<template>
    <div class="board_List ">
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
            <el-table-column prop="role_name" label="角色" align="center" width="400"></el-table-column>
            <el-table-column prop="create_time" label="创建时间" align="center" width="400">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="update_time" label="更新时间" align="center" width="400">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.update_time }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="operation" align="center" label="操作" fixed="right" width="400">
              <template slot-scope="scope">
                  <el-button
                  type="danger"
                  icon="delete"
                  size="small"
                  @click="handleDelete(scope.row,scope.$index)"
                >权限范围配置</el-button>
                <el-button type="warning" icon="edit" size="small" @click="handleEdit(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>




        <!-- 展示请求权限的弹窗 -->
        <!-- <DialogFound :dialog='dialog'  ></DialogFound> -->

    </div>
</template>

<script>

// import DialogFound from "./dialog/board_manager_dialog";

export default {
  name: "board_List",
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
    //  DialogFound
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      // 获取表格数据
      this.$axios("/api/v1/account/users/?page=1&page_size=10").then(res => {
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