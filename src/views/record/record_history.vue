
<template>
    <div class="record_manager">
        <div class="tableTitle"><span>发布记录管理</span></div> 
        <el-form :inline="true" ref="add_data">
            <el-form-item class="btnRight">
                <el-input v-model="search.product__sku"  placeholder="请输入SKU"></el-input>
                <el-button  type="primary" @click='init()'>搜索</el-button>
            </el-form-item>
        </el-form>
        <el-select v-model="search.state" filterable placeholder="请选择" class="btnLeft">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <!-- 表单部分 -->
        <div class="table_right">
          <el-table :data="tableData" border ref="topictable" :height="tableHeight">
                <!-- 批量操作 -->
            <el-table-column type="selection" label="批量操作" align="center"  width="55" ></el-table-column>
                <!-- ID -->
            <el-table-column type="index"  label="ID" align="center"  width="50"></el-table-column>
                <!-- 产品SKU -->
            <el-table-column prop="product.sku" label="产品SKU" align="center" width="200"></el-table-column>
                <!-- Pin图 -->
            <el-table-column prop="thumbnail" label="Pin图" align="center" width="110">
                <template slot-scope="scope"> 
                    <img :src="scope.row.product.image_url"  min-width="70" height="70" />        
                </template>
            </el-table-column>
                <!-- Pin描述 -->
            <el-table-column prop="pin.note"  label="Pin描述" align="center" width="110">
            </el-table-column>
                <!-- pin URL -->
            <el-table-column prop="pin.url" label="Pin URL" align="center" width="110"></el-table-column>
                <!-- 产品浏览量 -->
            <el-table-column  class="parentNodeColumn" prop="rule.scan" label="产品浏览量" align="center"  width="120">
              <template slot-scope="scope">
                {{scope.row.rule.scan_sign}} == {{scope.row.rule.scan}}
              </template>
            </el-table-column>
                <!-- 产品销量 -->
            <el-table-column  class="parentNodeColumn" prop="sale" label="产品销量" align="center"  width="120">
              <template slot-scope="scope">
                {{scope.row.rule.sale_sign}} == {{scope.row.rule.sale}}
              </template>
            </el-table-column>
                <!-- 价格 -->
            <el-table-column  class="parentNodeColumn" prop="product.price" label="价格" align="center"  width="120">
            </el-table-column>
                <!-- 所属规则标签 -->
            <el-table-column prop="product.tag" label="所属规则标签" align="center" width="120">
                <template slot-scope="scope"> {{scope.row.tag}}</template>
            </el-table-column>
                <!-- 所属Board ID -->
            <el-table-column prop="board.id" label="所属Board ID" align="center" width="120"></el-table-column>
                <!-- 所属账户ID -->
            <el-table-column prop="board.pinterest_account" label="所属账户ID" align="center" width="120"></el-table-column>
                <!-- 发布状态 --> 
            <el-table-column prop="state" label="发布记录" align="center" width="150">
              <template  slot-scope="scope">
                <template v-if="scope.row.state == 1">
                    finished
                </template>
                <template v-else>
                    <el-button type="primary" icon="edit" size="small" @click="recordHead(scope.row)" >手动发布</el-button>
                </template>
              </template>

            </el-table-column>
            <el-table-column prop="remark" align="center" label="备注" fixed="right" width="180">

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


      options: [
        {
          value: '[1,2]', 
          label: '全部'
        },
        {
          value: '[1]', 
          label: '已发布'
        },
        {
          value: '[2]',
          label: '发布失败'
        }
      ],
      search:{
        state:'[1,2]',
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
          this.$message("接口超时!");
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
    recordHead(row){
        this.$confirm('是否要手动发布?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              
                this.$axios.post(`/api/v1//rule/report/send_pin/${row.id}/`)
                  .then(res => {
                    if(res.data.code == 1){
                      this.$message({type: 'success',message: '发布成功!'});
                    }else{
                      this.$message.error( res.data.msg.detail);
                    }
                  })
                  .catch(error => {
                     this.$message.error('接口超时!');
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
.record_manager .btnRight .el-form-item__content{
   width: 300px; 
}
.record_manager .btnRight .el-form-item__content .el-input{
   width: 200px; 
}
.record_manager .btnRight .el-form-item__content .el-button.el-button--primary{
    float:right;
}
.record_manager .btnLeft{
    float: right;
    width: 110px;
    padding-right: 20px;
}
</style>