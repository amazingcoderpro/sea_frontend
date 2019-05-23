<template>
  <div class="fillcontain">
    <!-- 搜索框 -->
    <div class="btnLeft">
      <el-select v-model="RoleOptionsVal" placeholder="请选择">
        <el-option
          v-for="item in RoleOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" class="seek">搜索</el-button>
    </div>
    <!-- 添加 -->
    <div>
      <el-form :inline="true" ref="add_data">
        <el-form-item class="btnRight">
          <el-button type="primary" size="small" icon="view" @click="onAddMoney()">新增账户</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <div class="table_container">
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
        <el-table-column prop="email" label="邮箱" align="center" width="200"></el-table-column>
        <el-table-column prop="role" label="登录账号" align="center" width="200"></el-table-column>
        <el-table-column prop="section" label="部门" align="center" width="150"></el-table-column>
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
        <el-table-column prop="operation" align="center" label="操作" fixed="right" width="220">
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
    </div>-->
    <!-- 表单部分 -->
    <div class="table_right">
      <el-table :data="tableData" border>
        <el-table-column prop="username" label="角色" align="center" width="400"></el-table-column>
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
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100"
      ></el-pagination>
    </div>
    <!-- 弹框页面 -->
    <DialogFound :dialog="dialog" :form="form" @update="getProfile"></DialogFound>
  </div>
</template>

<script>
import DialogFound from "./dialog/role_manager";

export default {
  name: "userinfo",
  data() {
    return {
      RoleOptionsVal:"",
      tableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      RoleOptions: [{
        value: '选项1',
        label: '站长'
      }, {
        value: '选项2',
        label: '运营专员'
      }, {
        value: '选项3',
        label: '用户名'
      }, {
        value: '选项4',
        label: '创建时间'
      }],
      form: {
        id: "",
        name: "",
        menu_list: ""
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
      this.$axios("/api/v1/account/role/?page=1&page_size=10").then(res => {
        this.tableData = res.data.data.results;
      });
    },
    handleDelete(row) {
      // 权限设置
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
    // onDeleteMoney(row, index) {
    //   // 删除
    //   this.$axios.delete(`/api/v1/account/users/${row.id}/`).then(res => {
    //     this.$message("删除成功");
    //     this.getProfile();
    //   });
    // },
    onAddMoney() {
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
    }
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
  padding-top: 10px;
}
</style>