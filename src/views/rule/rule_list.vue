<template>
    <div class="RuleList">
        <div class="tableTitle"><span>规则列表</span></div>
        <el-form :inline="true" ref="add_data">
              <el-form-item class="btnRight">
                <el-button  type="primary" @click='addFun()'>添加规则</el-button>
            </el-form-item>
        </el-form> 
        <!-- 表单部分 -->
        <div class="table_right">
          <el-table :data="tableData" border ref="topictable"  :height="tableHeight">
            <el-table-column align="center" type="selection" width="55" ></el-table-column>
            <el-table-column align="center" type="index"  label="ID" width="50"></el-table-column>
            <el-table-column  align="center"  class="parentNodeColumn" prop="tag" label="规则标签"  width="200">
              <template slot-scope="scope"> {{scope.row.tag}}</template>
            </el-table-column>
            <el-table-column  align="center" class="parentNodeColumn" prop="create_time" label="规则创建时间"  width="250">
              <template slot-scope="scope"> {{scope.row.create_time}}</template>
            </el-table-column>
            <el-table-column  align="center" class="parentNodeColumn" prop="start_time,end_time" label="规则有效期"  width="300">
              <template slot-scope="scope"> {{scope.row.start_time}}<br/>{{scope.row.end_time}}  </template>
            </el-table-column>
            <el-table-column  align="center" class="parentNodeColumn" prop="schedule_rule" label="时间区间"  width="400">
            <template slot-scope="scope" >
                <div  v-for="item in scope.row.schedule_rule" :key="item.id">
                    周{{item.weekday}}|{{item.start_time}}|{{item.end_time}}|发布频率{{item.interval_time}}
                    <br/>
                </div>
            </template>
            </el-table-column>
            <el-table-column  align="center" class="parentNodeColumn" prop="scan" label="可发布产品数量"  width="200">
              <template slot-scope="scope"> {{scope.row.scan}}</template>
            </el-table-column>
            <el-table-column  align="center" class="parentNodeColumn" prop="account_name" label="所属账户"  width="200">
              <template slot-scope="scope"> {{scope.row.account_name}}</template>
            </el-table-column>
            <el-table-column  align="center" class="parentNodeColumn" prop="baord_name" label="所属Board"  width="200">
              <template slot-scope="scope"> {{scope.row.baord_name}}</template>
            </el-table-column>
            <el-table-column prop="operation" align="center" label="操作" width="180"  fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" icon="edit" size="small" @click="editFun(scope.row)">修改</el-button>
                <el-button type="danger" icon="edit" size="small" @click="deteleFun(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="paging">
          <el-pagination :page-sizes="pagesizes" :page-size="pagesize" @size-change="handleSizeChange" @current-change="current_change" layout="total, sizes, prev, pager, next, jumper" :total=total></el-pagination>
        </div>
        <!-- 展示请求权限的弹窗 -->
        <DialogFound :dialog='dialog'></DialogFound>
    </div>
</template>

<script>
import DialogFound from "./rule_add";
export default {
  name: "RuleList",
  data() {
    return {
        total:1,//默认数据总数
        pagesize:10,//每页的数据条数
        pagesizes:[10, 20, 30, 40],//分组数量
        currentPage:1,//默认开始页面

        index:null,
        tableHeight:"100",
        tableData: [],
        dialog: {
            show: false,
            title: "",
            option: "edit"
        }
    };
  },
  components: {
      DialogFound
  },
  created() {
    this.init();
  },
  mounted() {
      setTimeout(() => {
        this.tableHeight = window.innerHeight - this.$refs.topictable.$el.offsetTop - 150;
      }, 50);
  },
  methods: {
    init() {
      // 获取表格数据
        this.index = this.$route.query.index;
        var urlString = `/api/v1/rule/?page=${this.currentPage}&page_size=${this.pagesize}`;
        if(this.index != null || this.index != undefined ){
          urlString += `&account_id=${this.index}`;
        }
        this.$axios(urlString).then(res => {
          this.tableData = res.data.data.results;
          this.total = res.data.data.count;
        });
    },
    addFun() {
      // 添加
      this.dialog = {
        show: true,
        title: "添加规则",
        option: "post"
      };
    },
    ListManagerFun(row) {
      // 去规则详情页面
      this.$router.push({path:"/list_manager", query: { index: row.index }});
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

</style>
