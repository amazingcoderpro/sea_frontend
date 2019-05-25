
<template>
    <div class="pin_manager">
        <div class="tableTitle"><span>Pin列表管理</span></div>
        <el-form :inline="true" ref="add_data">
            <el-form-item class="btnRight">
                <el-input v-model="pinID"  placeholder="请输入PinID"></el-input>
                <el-button  type="primary" @click='serchFun()'>搜索</el-button>
            </el-form-item>
        </el-form>
        <!-- 表单部分 -->
        <div class="table_right">
          <el-table :data="tableData" border ref="topictable"  :height="tableHeight">
            <el-table-column type="selection" label="批量操作" width="55" ></el-table-column>
            <el-table-column type="index"  label="ID" width="50"></el-table-column>
            <el-table-column prop="pin_id" label="pin_id" align="center" width="100"></el-table-column>
            <el-table-column prop="pin_thumbnail" label="Pin图" align="center" width="100">
                <template slot-scope="scope"> 
                    <img :src="scope.row.pin_thumbnail"  min-width="70" height="70" />        
                </template>
            </el-table-column>
            <el-table-column prop="pin_description" label="Pin描述" align="center" width="100"></el-table-column>
            <el-table-column prop="pin_url" label="URL" align="center" width="100"></el-table-column>
            <el-table-column prop="product_sku" label="产品SKU" align="center" width="100"></el-table-column>
            <el-table-column  class="parentNodeColumn" prop="view,view_increment" label="View"  width="150">
              <template slot-scope="scope"> 总数:{{scope.row.view}}<br/>今日新增:{{scope.row.view_increment}}</template>
            </el-table-column>
            <el-table-column  class="parentNodeColumn" prop="repin,repin_increment" label="Repin"  width="150">
              <template slot-scope="scope"> 总数:{{scope.row.repin}}<br/>今日新增:{{scope.row.repin_increment}}</template>
            </el-table-column>
            <el-table-column  class="parentNodeColumn" prop="like,like_increment" label="Like"  width="150">
              <template slot-scope="scope"> 总数:{{scope.row.like}}<br/>今日新增:{{scope.row.like_increment}}</template>
            </el-table-column>
            <el-table-column  class="parentNodeColumn" prop="comment,comment_increment" label="Comment"  width="150">
              <template slot-scope="scope"> 总数:{{scope.row.comment}}<br/>今日新增:{{scope.row.comment_increment}}</template>
            </el-table-column>
            <el-table-column prop="under_board_id" label="所属Board ID" align="center" width="100"></el-table-column>
            <el-table-column prop="under_account_id" label="所属账户 ID" align="center" width="100"></el-table-column>
            <el-table-column prop="operation" align="center" label="Manage Your Pin" fixed="right" width="200">
              <template slot-scope="scope">
                  <el-button type="danger" icon="delete" size="small" @click="handleDelete(scope.row,scope.$index)">删除</el-button>
                  <el-button type="warning" icon="edit" size="small" @click="handleEdit(scope.row)">编辑</el-button>
              </template>
            </el-table-column>



          </el-table>
        </div>
        <!-- 分页 -->
        <div class="paging">
          <el-pagination :page-sizes="pagesizes" :page-size="pagesize" @size-change="handleSizeChange" @current-change="current_change" layout="total, sizes, prev, pager, next, jumper" :total=total></el-pagination>
        </div>
        <!-- 展示请求权限的弹窗 -->
        <!-- <DialogFound :dialog='dialog'  ref="dailog" ></DialogFound> -->
    </div>

</template>

<script>

// import DialogFound from "./dialog/board_manager_dialog";

export default {
  name: "pin_manager",
  data() {
    return {
      total:1,//默认数据总数
      pagesize:10,//每页的数据条数
      pagesizes:[10, 20, 30, 40],//分组数量
      currentPage:1,//默认开始页面
      tableHeight:"100",
      pinID:'',  
      account_data:{},
      board_data:{},
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
    //  DialogFound
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      // 获取表格数据
        this.account_data =JSON.parse(localStorage.getItem("account_data"));
        this.board_data =JSON.parse(localStorage.getItem("board_data"));

        //this.$axios(`/api/v1/account_list/${this.account_data.pinterest_account_id}/${this.board_data.board_id}/?page=${this.currentPage}&page_size=${this.pagesize}`).then(res => {
        this.$axios(`/api/v1/account_list/1/3/?page=${this.currentPage}&page_size=${this.pagesize}`).then(res => {
            this.tableData = res.data.data.results;
            this.total = res.data.data.count;
            console.log(res)
        });      
    },
    handleEdit(row) {
      // 编辑
      this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "put"
      };
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
/* .pin_manager {} */

.pin_manager .btnRight .el-form-item__content{
   width: 300px; 
}
.pin_manager .btnRight .el-form-item__content .el-input{
   width: 200px; 
}
.pin_manager .btnRight .el-form-item__content .el-button.el-button--primary{
    float:right;
}
</style>