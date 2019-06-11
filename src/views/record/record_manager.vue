
<template>
    <div class="record_manager">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span> Home</a></li>
            <li><a><span class="el-icon-right"> </span> Record Manager</a></li>
        </ul>
        <el-form :inline="true" ref="add_data">
            <el-form-item class="btnRight">
                <el-input v-model="search.product__sku"  placeholder="SKU"></el-input>
                <el-button  type="primary" class="button_left" @click='init()'>Search</el-button>
            </el-form-item>
        </el-form>
        <el-select v-model="search.state" filterable class="btnLeft">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
         <!-- 批量删除 -->
         <el-button type="primary" round class="button_right" @click="cancelAll()">Bulk Delete</el-button>
        <!-- 表单部分 -->
        <div class="table_right">
          <el-table :data="tableData" border ref="topictable" class="topictable" :height="tableHeight" @selection-change="handleSelectionChange">
            <el-table-column type="selection" label="批量操作" align="center"  width="55" ></el-table-column>
            <el-table-column type="index"  label="ID" align="center"  width="55"></el-table-column>
            <el-table-column prop="product.sku" label="SKU" align="center" width="200"></el-table-column>
            <el-table-column prop="thumbnail" label="Pin Image" align="center" width="120">
                <template slot-scope="scope"> 
                    <img :src="scope.row.product.image_url"  min-width="70" height="70" />        
                </template>
            </el-table-column>
            <el-table-column prop="board.description"  label="Description" align="center" width="120">
            </el-table-column>
            <el-table-column prop="product.url" label="Pin URL" align="center" width="200"></el-table-column>
            <el-table-column  class="parentNodeColumn" prop="product.price" label="Price" align="center"  width="120">
            </el-table-column>
            <el-table-column prop="product.tag" label="Tag" align="center" width="120">
                <template slot-scope="scope"> {{scope.row.tag}}</template>
            </el-table-column>
            <el-table-column prop="board.pinterest_account" label="Pinterest Account Name" align="center" width="200"></el-table-column>
            <el-table-column prop="board.id" label="Board Name" align="center" width="120"></el-table-column>
            <el-table-column prop="state" label="State" align="center" width="198">
              <template  slot-scope="scope">
                <template v-if="scope.row.state == 0">
                    <el-button type="primary" icon="edit" size="small" disabled="">Unpublic</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" icon="edit" size="small" @click="recordHead(scope.row)">Manual release</el-button>
                </template>
              </template>
            </el-table-column>
            <el-table-column align="center" label="Edit" width="150" >
              <template  slot-scope="scope">
                <el-button type="danger" icon="edit" size="small" @click="cancelFun(scope.row)" >Cancel</el-button>
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
  name: "record_manager",
  data() {
    return {
      total:0,//默认数据总数
      pagesize:10,//每页的数据条数
      pagesizes:[10, 20, 30, 40],//分组数量
      currentPage:1,//默认开始页面
      tableHeight:"100",
      multipleSelection: [],//选中显示的值
      options: [
        {
          value: '[0,3]', 
          label: 'All'
        },
        {
          value: '[0]', 
          label: 'To be released'
        },
        {
          value: '[3]',
          label: 'Post failure'
        }
      ],
      search:{
        state:'[0,3]',
        product__sku:'',
      },

      recordID:'',  
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
      window.addEventListener('resize', () => {
        if(document.getElementsByClassName("topictable").length>0){
            this.tableHeight = window.innerHeight - document.getElementsByClassName("topictable")[0].offsetTop - 150;
        }
      });
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
        var url = `/api/v1/rule/report/?page=${this.currentPage}&page_size=${this.pagesize}`;
            url +=`&state=${this.search.state}`;
        if(this.search.product__sku !=''){
            url +=`&product__sku=${this.search.product__sku}`;
        }
        this.$axios.get(url).then(res => {
          if(res.data.code == 1){
            this.tableData = res.data.data.results;
            this.total = res.data.data.count;
          }
        })
        .catch(error => {
          this.$message("Interface timeout!");
        });   
           
    },
    cancelFun(row){
        var statedata = {
            state :'4'   //((-1, "新建"), (0, '待执行'), (1, '运行中'), (2, '暂停中'), (3, '已完成'), (4, '已过期'), (5, '已删除'))
        }
        console.log()       //取消
        this.$confirm('Make sure to cancel?', 'Tips', {
              confirmButtonText: 'Determine',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
                this.$axios.put(`/api/v1/rule/state/${row.id}/`,statedata)
                  .then(res => {
                    if(res.data.code == 1){
                      this.$message({type: 'success',message: 'Cancellation Successful!'});
                      this.init();
                    }else{
                      this.$message.error('Cancellation failure!');
                    }
                  })
                }) 
            },
    recordHead(row){
        this.$confirm('Do you want to publish manually?', 'Tips', {
              confirmButtonText: 'Determine',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
            this.$axios.post(`/api/v1//rule/report/send_pin/${row.id}/`)
              .then(res => {
                if(res.data.code == 1){
                  this.$message({type: 'success',message: 'Successful release!'});
                  this.init();
                }else{
                  this.$message.error( res.data.msg.detail);
                }
              })
              .catch(error => {
                this.$message.error('Interface timeout!');
              }); 
            }) 
          },
    // 批量取消
    cancelAll(){
      var ids = [];
      this.multipleSelection.forEach(element =>{
        ids.push(element.id)
      });
      var ids = [];
      this.multipleSelection.forEach(element =>{
        ids.push(element.pin_id)
      });
      var pin_list = JSON.stringify(ids);
      this.$confirm('Are you sure you wanna delete this account?', 'Warning', {
            confirmButtonText: 'Yes, I’m Sure',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
              this.$axios.delete(`/api/v1/pin_manage/?pin_list=` + pin_list)
                .then(res => {
                  if(res.data.code == 1){
                    this.$message({type: 'success',message: 'Successful deletion!'});
                    this.dialog.show = false;
                    this.init();
                  }else{
                    this.$message.error('Delete failed!');
                  }
                })
                .catch(error => {
                    this.$message.error('Interface timeout!');
                }); 
          }) 
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
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
.record_manager .btnRight .el-form-item__content{width:300px;}
.record_manager .btnRight .el-form-item__content .el-input{width:200px;}
.record_manager .btnRight .el-form-item__content .el-button.el-button--primary{float:right;}
.record_manager .btnLeft{float:right;width:150px;padding-right:20px;}
.record_manager .button_right{float:right;margin-right:20px;color: #fff;font-weight: 600;}
.record_manager .button_left{color: #fff;font-weight: 600;}
</style>