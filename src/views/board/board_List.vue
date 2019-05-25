<template>
    <div class="board_List ">
        <div class="tableTitle"><span>账户基础信息管理</span></div>
        <div  class="massage">
          <p>账户名称:{{account_data.account_name}}</p>
          <p>登陆邮箱:{{account_data.account_email}}</p>
          <p>管理员:{{account_data.update_person}}</p>
          <p>账户描述:{{account_data.account_description}}</p>
          <p>账户数据: Pin {{account_data.pins}} RePin {{account_data.repin}} Like {{account_data.like}} Comment {{account_data.comment}}</p>
        </div>
        <div class="tableTitle"><span>Board List</span></div>
        <!-- 表单部分 -->
        <div class="table_right">
          <el-table :data="tableData" border  ref="topictable"  :height="tableHeight">
            <el-table-column type="index"  label="ID" width="50"></el-table-column>
            <el-table-column prop="board_description" label="Board描述" align="center" width="100"></el-table-column>
            <el-table-column  class="parentNodeColumn" align="center" prop="pins,pins_increment" label="Pin"  width="150">
              <template slot-scope="scope"> 总数:{{scope.row.pins}}<br/>今日新增:{{scope.row.pins_increment}}</template>
            </el-table-column>            
            <el-table-column  class="parentNodeColumn" align="center" prop="repin,repin_increment" label="RePin"  width="150">
              <template slot-scope="scope"> 总数:{{scope.row.repin}}<br/>今日新增:{{scope.row.repin_increment}}</template>
            </el-table-column>            
            <el-table-column  class="parentNodeColumn" align="center" prop="like,like_increment" label="Like"  width="300">
              <template slot-scope="scope"> 总数:{{scope.row.like}}<br/>今日新增:{{scope.row.like_increment}}</template>
            </el-table-column>           
            <el-table-column  class="parentNodeColumn" align="center" prop="comment,comment_increment" label="Comment"  width="150">
              <template slot-scope="scope"> 总数:{{scope.row.comment}}<br/>今日新增:{{scope.row.comment_increment}}</template>
            </el-table-column>           
            <el-table-column  class="parentNodeColumn" align="center" prop="commentt" label="详细数据报告"  width="200" >
              <template slot-scope="scope">
                <el-button icon="edit" type="primary" size="small" @click="PinManagerFun(scope.row)">去pin列表</el-button>
              </template>
            </el-table-column>            
            <el-table-column  prop="board_state" label="Board状态" align="center"  width="250">
              <template slot-scope="scope">
                <span v-if='scope.row.board_state=0'>Private</span><span v-else>Public</span>
              </template>
            </el-table-column>
            <el-table-column  prop="failed,finished,pending" label="发布记录" align="center"  width="250">
              <template slot-scope="scope">
                 今日已发布数:{{scope.row.failed}}<br/>
                 今日未发布数:{{scope.row.finished}}<br/>
                 pending:{{scope.row.pending}}
              </template>
            </el-table-column>
            <el-table-column prop="operation" align="center" label="Manage Your Board" fixed="right" width="200">
              <template slot-scope="scope">
                  <el-button type="primary" icon="edit" size="small" @click="editFun(scope.row)">编辑</el-button>
                  <el-button type="danger" icon="delete" size="small" @click="handleDelete(scope.row,scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 分页 -->
        <div class="paging">
          <el-pagination :page-sizes="pagesizes" :page-size="pagesize" @size-change="handleSizeChange" @current-change="current_change" layout="total, sizes, prev, pager, next, jumper" :total=total></el-pagination>
        </div>
        <!-- 展示请求权限的弹窗 -->
        <DialogFound :dialog='dialog' :formData='formData' ></DialogFound>

    </div>
</template>

<script>

 import DialogFound from "./board_edit";

export default {
  name: "board_List",
  data() {
    return {
      total:1,//默认数据总数
      pagesize:10,//每页的数据条数
      pagesizes:[10, 20, 30, 40],//分组数量
      currentPage:1,//默认开始页面
      tableHeight:"100",

      formData:{}, // row data
      account_data:{},
      thisId:'-1',
      tableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
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
    init() {
      // 获取表格数据
        this.account_data =JSON.parse(localStorage.getItem("account_data"));
        this.thisId = this.$route.query.thisId;
        if( this.account_data.pinterest_account_id == null || this.account_data.pinterest_account_id == undefined){
              this.$message({message: "参数不全",type: 'warning',center: true});
        }else{
          // this.$axios(`/api/v1/account_list/${this.account_data.pinterest_account_id}/?page=${this.currentPage}&page_size=${this.pagesize}`).then(res => {
          this.$axios(`/api/v1/account_list/1/?page=${this.currentPage}&page_size=${this.pagesize}`).then(res => {
            this.tableData = res.data.data.results;
            this.total = res.data.data.count;
          });
        }
    },
    editFun(row) {
      // 编辑
      this.dialog = {
        show: true,
        title: "修改board信息",
        option: "put"
      };
      this.formData = row;
    },
    handleDelete(row, index) {
      // 删除
      this.$axios.delete(`/api/v1/account/users/${row.id}/`).then(res => {
        this.$message("删除成功");
        this.getProfile();
      });
    },
    PinManagerFun(row) {
      // 去pin列表页面
      localStorage.setItem("board_data",JSON.stringify(row) );
      this.$router.push({path:"/pin_manager"});
    },
    current_change(val){
        //点击数字时触发
        this.currentPage = val;
        this.init();
    },
    handleSizeChange(val){
        //修改每页显示多少条时触发
        this.pagesize = val;
        this.init();
    }
  }
};

</script>

<style>
.board_List .massage p{
    margin: 5px 0;
    padding-left: 5px;
    font-size: 16px;
}
</style>