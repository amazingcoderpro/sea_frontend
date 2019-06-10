<template>
    <div class="board_List ">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span> Home</a></li>
            <li><a href="/account_manager"><span class="el-icon-right"> </span> Account Manager</a></li>
            <li><a><span class="el-icon-right"> </span> Board Manager</a></li>
        </ul>
        <div  class="massage">
          <p>Username: {{account_data.account_name}}</p>
          <p>Email Address: {{account_data.account_email}}</p>
          <p>Admin: {{account_data.update_person}}</p>
          <p>Account Profile: {{account_data.account_description}}</p>
          <p>Account Data: Pin {{account_data.pins}} | RePin | {{account_data.repin}} Like | {{account_data.like}} Comment {{account_data.comment}}</p>
        </div>
        <!-- 表单部分 -->
        <div class="table_right">
          <el-table :data="tableData" border  ref="topictable"  :height="tableHeight">
            <el-table-column type="index"  label="ID" align="center" width="50"></el-table-column>
            <el-table-column prop="board_description" label="Board Name" align="center" width="180"></el-table-column>
            <el-table-column  class="parentNodeColumn" align="center" prop="pins,pins_increment" label="Pins"  width="180">
              <template slot-scope="scope"> Total:{{scope.row.pins}}<br/>New:{{scope.row.pins_increment}}</template>
            </el-table-column>            
            <el-table-column  class="parentNodeColumn" align="center" prop="repin,repin_increment" label="Saves"  width="180">
              <template slot-scope="scope"> Total:{{scope.row.saves}}<br/>New:{{scope.row.saves_increment}}</template>
            </el-table-column>             
            <el-table-column  class="parentNodeColumn" align="center" prop="comment,comment_increment" label="Comments"  width="180">
              <template slot-scope="scope"> Total:{{scope.row.comments}}<br/>New:{{scope.row.comments_increment}}</template>
            </el-table-column>           
            <el-table-column  class="parentNodeColumn" align="center" prop="commentt" label="Report Details"  width="180" >
              <template slot-scope="scope">
                <el-button icon="edit" type="primary" size="small" @click="PinManagerFun(scope.row)">View Pin List</el-button>
              </template>
            </el-table-column>            
            <el-table-column  prop="board_state" label="Board Status" align="center"  width="240">
              <template slot-scope="scope">
                <span v-if='scope.row.board_state=0'>Private</span><span v-else>Public</span>
              </template>
            </el-table-column>
            <el-table-column  prop="failed,finished,pending" label="Publish History" align="center"  width="240">
              <template slot-scope="scope">
                 Published Today:{{scope.row.failed}}<br/>
                 Unpublished Today:{{scope.row.finished}}<br/>
                 pending:{{scope.row.pending}}
              </template>
            </el-table-column>
            <el-table-column prop="operation" align="center" label="Manage Your Board" fixed="right" width="200">
              <template slot-scope="scope">
                  <el-button type="primary" icon="edit" size="small" @click="editFun(scope.row)">Edit</el-button>
                  <el-button type="danger" icon="delete" size="small" @click="deteleFun(scope.row,scope.$index)">Delete</el-button>
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
              this.$message({message: "Incomplete Parameters",type: 'warning',center: true});
        }else{
          this.$axios(`/api/v1/account_list/${this.account_data.pinterest_account_id}/?page=${this.currentPage}&page_size=${this.pagesize}`).then(res => {
            this.tableData = res.data.data.results;
            this.total = res.data.data.count;
          });
        }
    },
    editFun(row) {
      // 编辑
      this.dialog = {
        show: true,
        title: "Edit Board",
        option: "put"
      };
      this.formData = row;
    },
    deteleFun(row, index) {
      // 删除
      console.log(row)
        this.$confirm('Determine To Delete?', 'Tips', {
              confirmButtonText: 'Determine',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
                this.$axios.delete(`/api/v1/board_manage/${row.board_id}/`)
                  .then(res => {
                    if(res.data.code == 1){
                      this.$message({type: 'success',message: 'Successful Deletion!'});
                      this.dialog.show = false;
                      this.$parent.init();
                    }else{
                      this.$message.error('Delete Failed!');
                    }
                  })
                  .catch(error => {
                     this.$message.error('Interface Timeout!');
                  }); 
            }) 
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
.board_List .tableTitle span{
        width: 268px;
}
</style>