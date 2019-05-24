<template>
  <div class="fillcontain">
    <!-- 搜索框 -->
    <div class="btnLeft">
        <el-input
          placeholder="请输入内容"
          v-model="input10"
          clearable>
        </el-input>
      <el-button type="primary" icon="el-icon-search" class="seek">搜索</el-button>
    </div>
    <!-- 新增账户 -->
    <div>
      <el-form :inline="true" ref="add_data">
        <el-form-item class="btnRight">
          <el-button type="primary" size="small" icon="view" @click="handleAdd()">新增账户</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表单部分 -->
    <div class="table_container">
      <el-table
        v-if="tableData.length > 0"
        :data="tableData"
        max-height="100%"
        border
        style="width: 100%"
      >
        <el-table-column prop="id" label="序号" align="center" width="70"></el-table-column>
        <el-table-column prop="nickname" label="用户名" align="center" width="150">
          <template slot-scope="scope">
            <span style="color:#00d053">{{ scope.row.nickname }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="角色" align="center" width="150"></el-table-column>
        <el-table-column prop="role" label="登录账号" align="center" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center" width="180"></el-table-column>
        <el-table-column prop="section" label="部门" align="center" width="150"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" align="center" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间" align="center" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.update_time }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="角色管理" align="center" width="180"></el-table-column>
        <el-table-column prop="operation" align="center" label="操作" fixed="right" width="190">
          <template slot-scope="scope">
            <el-button type="warning" icon="edit" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              type="danger"
              icon="delete"
              size="small"
              @click="handleDelete(scope.row,scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
    <!-- <div class="block">
      <el-pagination
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100"
      ></el-pagination>
    </div> -->
    <!-- 弹框页面 -->
    <DialogFound :dialog="dialog" :form="form" @update="getProfile"></DialogFound>
  </div>
</template>

<script>
import DialogFound from "./dialog/user_manager";

export default {
  name: "userinfo",
  data() {
    return {
      input10: '',
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
        nickname: ""
      }
    };
  },
  components: {
    DialogFound
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      // 获取表格数据
      this.$axios("/api/v1/account/users/?page=1&page_size=10").then(res => {
        this.tableData =res.data.data.results;
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
        last_name: row.last_name
      };
    },
     handleDelete(row) {
      // 删除
      this.tree = {
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
        last_name: row.last_name
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
        last_name: ""
      };
    },
    // methods: {
    //   handleSizeChange(val) {
    //     console.log(`每页 ${val} 条`);
    //   },
    //   handleCurrentChange(val) {
    //     console.log(`当前页: ${val}`);
    //   }
    // },
    // data() {
    //   return {
    //     currentPage1: 5,
    //     currentPage2: 5,
    //     currentPage3: 5,
    //     currentPage4: 4
    //   };
    // }
  }
};
</script>
<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnLeft {
  float: left;
  display: flex;
}
.seek {
  margin-left: 5px;
  padding: 11px 20px;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
.block {
  float: right;
  margin-top: 15px;
}
</style>