<template>
  <div class="fillcontain">
    <!-- 搜索框 -->
    <div class="btnLeft">
        <span>账户</span>
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
          <el-button type="primary" size="small" icon="view" @click="handleAdd()">增加用户</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表单部分 -->
    <div class="table_container">
      <el-table
        :data="tableData"
        ref="topictable"
        :height="tableHeight"
        border
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
        <!-- <el-table-column prop="section" label="部门" align="center" width="150"></el-table-column> -->
        <el-table-column prop="create_time" label="创建时间" align="center" width="250">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间" align="center" width="250">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.update_time }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="账户名称" align="center" width="180"></el-table-column>
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
      <div class="paging" style="text-align: right;  padding-right: 20px;padding-top: 20px;">
          <el-pagination
            :page-sizes="pagesizes"
            :page-size="pagesize"
            @current-change="current_change"
            layout="total, sizes, prev, pager, next, jumper"
            :total=total
          >
          </el-pagination>
      </div>
    <!-- 弹框页面 -->
    <DialogFound :dialog="dialog" :form="form" @update="init" ref="dialog"></DialogFound>
  </div>
</template>

<script>
import DialogFound from "./dialog/user_manager";

export default {
  name: "userinfo",
  data() {

    return {
      total:1,//默认数据总数
      pagesize:10,//每页的数据条数
      pagesizes:[10, 20, 30, 40],//分组数量
      currentPage:1,//默认开始页面
      tableHeight:"100",
     
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
  mounted() {
      setTimeout(() => {
        this.tableHeight = window.innerHeight - this.$refs.topictable.$el.offsetTop - 150;
      }, 50);
  },
  components: {
    DialogFound
  },
  created() {
    this.init();
  },
  methods: {
      current_change(currentPage){
      this.currentPage = currentPage;
    },
    init() {
      // 获取表格数据
      this.$axios("/api/v1/account/users/?page=1&page_size=10").then(res => {
        this.tableData =res.data.data.results;
        this.total = res.data.data.count;
      });
    },
    handleEdit(row) {
      // 编辑
      this.dialog = {
        show: true,
        title: "编辑信息",
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
      this.$axios.delete(`/api/v1/users/3/`).then(res => {
        this.$message("删除成功");
        this.init();
      });
    },
    handleAdd() {
      // 添加
      this.dialog = {
        show: true,
        title: "增加用户",
        option: "post"
      };
      this.form = {
        nickname:"adminq",
        role:"",
        username: "leslieto",
        password: "123456",
        password2: "123456",
        email: "654@qq.com",
        role_name:"adminthree",
      };
    },
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
.btnLeft span{
  color: #909399;
  padding-right: 5px;
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