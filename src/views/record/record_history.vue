
<template>
    <div class="record_history">
         <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span> Home</a></li>
            <li><a><span class="el-icon-right"> </span> Record History</a></li>
        </ul>
        <el-form :inline="true" ref="add_data">
            <el-form-item class="btnRight">
                <el-input v-model="search.product__sku"  placeholder="SKU"></el-input>
                <el-button  type="primary" class="button_left" @click='init()'>search</el-button>
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
        <!-- 表单部分 -->
        <div class="table_right">
          <el-table :data="tableData" border ref="topictable" class="topictable"  :height="tableHeight">
                <!-- 批量操作 -->
            <el-table-column type="selection" label="批量操作" align="center"  width="55" ></el-table-column>
                <!-- ID -->
            <el-table-column type="index"  label="ID" align="center"  width="55"></el-table-column>
                <!-- 产品SKU -->
            <el-table-column prop="product.sku" label="SKU" align="center" width="150"></el-table-column>
                <!-- Pin图 -->
            <el-table-column prop="thumbnail" label="Pin Image" align="center" width="150">
                <template slot-scope="scope"> 
                  <el-popover
                    placement="right"
                    title=""
                    trigger="hover">
                    <img :src="scope.row.product.image_url"  :style="'width: 500px;'" width="100"/>
                    <img slot="reference" :src="scope.row.product.image_url" :alt="scope.row.product.image_url" style="height: 70px;width: 70px">
                  </el-popover>
                </template>
            </el-table-column>
                <!-- Pin描述 -->
            <el-table-column prop="pin.note"  label="Pin Note" align="center" width="150">
            </el-table-column>
                <!-- pin URL -->
            <el-table-column prop="pin.url" label="Pin URL" align="center" width="150"></el-table-column>
                <!-- 价格 -->
            <el-table-column  class="parentNodeColumn" prop="product.price" label="Price" align="center"  width="150">
            </el-table-column>
                <!-- 所属规则标签 -->
            <el-table-column prop="product.tag" label="Tag" align="center" width="150">
                <template slot-scope="scope"> {{scope.row.tag}}</template>
            </el-table-column>
                <!-- 所属Board ID -->
            <el-table-column prop="board.id" label="Board Name" align="center" width="138"></el-table-column>
                <!-- 所属账户ID -->
            <el-table-column prop="board.pinterest_account" label="Pinterest Account Name" align="center" width="200"></el-table-column>
                <!-- 发布状态 --> 
            <el-table-column prop="state" label="State" align="center" width="150">
              <template  slot-scope="scope">
                <template v-if="scope.row.state == 3">
                    <el-button type="primary" icon="edit" size="small" @click="recordHead(scope.row)" >Manual release</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" icon="edit" size="small" disabled="">Unpublic</el-button>
                </template>
              </template>

            </el-table-column>
            <el-table-column prop="remark" align="center" label="Error" width="160">
                
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
  name: "record_history",
  data() {
    return {

      total:0,//默认数据总数
      pagesize:10,//每页的数据条数
      pagesizes:[10, 20, 30, 40],//分组数量
      currentPage:1,//默认开始页面
      tableHeight:"100",


      options: [
        {
          value: '[1,3]', 
          label: 'All'
        },
        {
          value: '[1]', 
          label: 'Published'
        },
        {
          value: '[3]',
          label: 'Publishing failure'
        }
      ],
      search:{
        state:'[1,3]',
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
    handleEdit(row) {
      // 编辑
      this.dialog = {
        show: true,
        title: "Modification of funds information",
        option: "put"
      };
    },
    recordHead(row){             //发布状态
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
.record_history .btnRight .el-form-item__content{width:300px;}
.record_history .btnRight .el-form-item__content .el-input{width:200px;}
.record_history .btnRight .el-form-item__content .el-button.el-button--primary{float:right;}
.record_history .btnLeft{float:right;width:110px;padding-right:20px;}
.record_history .button_left{color: #fff;font-weight: 600;}
</style>