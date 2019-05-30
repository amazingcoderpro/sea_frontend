
<template>
    <div class="pin_manager">
        <div class="tableTitle"><span>Pin列表管理</span></div>
        <el-form :inline="true" ref="add_data">
            <el-form-item class="btnRight">
                <el-input v-model="pinID"  placeholder="请输入PinID"></el-input>
                <el-button  type="primary" @click='init()'>搜索</el-button>
            </el-form-item>
        </el-form>
        <!-- 表单部分 -->
        <div class="table_right">
          <el-table :data="tableData" border ref="topictable"  :height="tableHeight">
            <el-table-column type="selection" label="批量操作" align="center"  width="55" ></el-table-column>
            <el-table-column type="index"  label="ID" align="center"  width="50"></el-table-column>
            <el-table-column prop="pin_id" label="pin_id" align="center" width="100"></el-table-column>
            <el-table-column prop="pin_thumbnail" label="Pin图" align="center" width="100">
                <template slot-scope="scope"> 
                    <img :src="scope.row.pin_thumbnail"  min-width="70" height="70" />        
                </template>
            </el-table-column>
            <el-table-column prop="pin_note" label="Pin描述" align="center" width="100"></el-table-column>
            <el-table-column prop="pin_url" label="URL" align="center" width="100"></el-table-column>
            <el-table-column prop="product_sku" label="产品SKU" align="center" width="100"></el-table-column>
            <el-table-column  class="parentNodeColumn" prop="view,view_increment" label="View" align="center"  width="150">
              <template slot-scope="scope"> 总数:{{scope.row.views}}<br/>今日新增:{{scope.row.views_increment}}</template>
            </el-table-column>
            <el-table-column  class="parentNodeColumn" prop="saves,saves_increment" label="Saves" align="center"  width="150">
              <template slot-scope="scope"> 总数:{{scope.row.saves}}<br/>今日新增:{{scope.row.saves_increment}}</template>
            </el-table-column>
            <el-table-column  class="parentNodeColumn" prop="like,like_increment" label="Like" align="center"  width="150">
              <template slot-scope="scope"> 总数:{{scope.row.likes}}<br/>今日新增:{{scope.row.likes_increment}}</template>
            </el-table-column>
            <el-table-column  class="parentNodeColumn" prop="comment,comment_increment" label="Comment" align="center"  width="150">
              <template slot-scope="scope"> 总数:{{scope.row.comments}}<br/>今日新增:{{scope.row.comments_increment}}</template>
            </el-table-column>
            <el-table-column prop="under_board_id" label="所属Board ID" align="center" width="100"></el-table-column>
            <el-table-column prop="under_account_id" label="所属账户ID" align="center" width="150"></el-table-column>
            <el-table-column prop="operation" align="center" label="Manage Your Pin" fixed="right" width="200">
              <template slot-scope="scope">
                  <el-button type="primary" icon="edit" size="small" @click="handleEdit(scope.row)">编辑</el-button>
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
      pinIDInput:'',  
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
        var url = `/api/v1/account_list/${this.account_data.pinterest_account_id}/${this.board_data.board_id}/`;
            url +=`?page=${this.currentPage}&page_size=${this.pagesize}`;
            if(this.pinID!=''){
              url += `&query_str=${this.pinID}`;
            }
        this.$axios(url).then(res => {
            this.tableData = res.data.data.results;
            this.total = res.data.data.count;
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