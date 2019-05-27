<template>
    <div class="account_List">
        <div class="tableTitle"><span>用户列表</span></div>
        <el-form :inline="true" ref="add_data">
              <el-form-item class="btnRight">
                <el-button  type="primary" @click='addFun()'>添加账户</el-button>
            </el-form-item>
        </el-form>
        <!-- 表单部分 -->
        <div class="table_right">
          <el-table :data="tableData" border ref="topictable"  :height="tableHeight">
            <el-table-column type="selection" align="center" width="55" ></el-table-column>
            <el-table-column label="头像" align="center" width="100"></el-table-column>
            <el-table-column type="index"  label="ID" align="center" width="50"></el-table-column>
            <el-table-column  class="parentNodeColumn" prop="account_name,account_email,account_create_time,account_type" label="账户信息" align="center"  width="120">
              <template slot-scope="scope"> 
                用户名:{{scope.row.account_name}}<br/>
                登陆邮箱:{{scope.row.account_email}}<br/> 
                创建时间:{{scope.row.account_create_time}}<br/> 
                账户类型:<span v-if='scope.row.account_type=0'>business</span><span v-else>individual</span>
              </template>
            </el-table-column>
            <el-table-column  class="parentNodeColumn" prop="pins,pins_increment" align="center" label="Pin数据"  width="120">
              <template slot-scope="scope"> 总数:{{scope.row.pins}}<br/>今日新增:{{scope.row.pins_increment}}</template>
            </el-table-column>
            <el-table-column  prop="repin,repin_increment" label="RePin数据" align="center"  width="120">
              <template slot-scope="scope"> 总数:{{scope.row.repin}}<br/>今日新增:{{scope.row.repin_increment}}</template>
            </el-table-column>
            <el-table-column  prop="like,like_increment" label="Like数据" align="center"  width="120">
              <template slot-scope="scope"> 总数:{{scope.row.like}}<br/>今日新增:{{scope.row.like_increment}}</template>
            </el-table-column>
            <el-table-column  prop="comment,comment_increment" label="Comment数据" align="center"  width="150">
              <template slot-scope="scope"> 总数:{{scope.row.comment}}<br/>今日新增:{{scope.row.comment_increment}}</template>
            </el-table-column>
            <el-table-column prop="update_person" label="详细数据报告" align="center" width="150">
               <template slot-scope="scope">
                <el-button icon="edit"  type="primary"  size="small" @click="BoardManagerFun(scope.row)">border列表</el-button>
              </template>
             
            </el-table-column>
            <el-table-column  prop="update_person,account_state,account_publish_time,account_crawl_time" label="更新情况" align="center"  width="150">
              <template slot-scope="scope">
                 更新人:{{scope.row.update_person}}<br/>
                 账户最新状态:<span v-if='scope.row.account_state=0'>normal</span><span v-else>forbidden</span><br/>
                 最新发布时间:{{scope.row.account_publish_time}}<br/>
                 最新抓取时间:{{scope.row.account_crawl_time}}
              </template>
            </el-table-column>

            <el-table-column prop="role_name" label="规则详情" align="center" width="150" >
              <template slot-scope="scope">
                <el-button icon="edit" size="small"  type="primary"  @click="ListManagerFun(scope.row)">规则列表</el-button>
              </template>
            </el-table-column>
            <el-table-column  prop="finished,pending" align="center" label="发布记录"  width="150">
              <template slot-scope="scope">
                 今日已发布数:{{scope.row.finished}}<br/>
                 今日未发布数:{{scope.row.pending}}<br/>
              </template>
            </el-table-column>
            <el-table-column prop="account_authorized" align="center" label="授权" width="150">
              <template slot-scope="scope">
                <el-button v-if="scope.row.account_authorized == 1">已授权</el-button>
                <el-button v-else icon="edit"  type="primary"  size="small" @click="AutFun(scope.row)">授权</el-button>
              </template>
            </el-table-column>

            <el-table-column prop="operation" align="center" label="操作" width="100" fixed="right" >
              <template slot-scope="scope">
                <!-- <el-button icon="edit" type="primary" size="small" @click="EditFun(scope.row)">编辑</el-button> -->
                <el-button icon="edit" type="danger" size="small" @click="handleEdit(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="paging">
          <el-pagination :page-sizes="pagesizes" :page-size="pagesize" @size-change="handleSizeChange" @current-change="current_change" layout="total, sizes, prev, pager, next, jumper" :total=total></el-pagination>
        </div>
        <!-- 展示请求权限的弹窗 -->
        <DialogFound :dialog='dialog' :form='form'  ref="dailog" ></DialogFound>
    </div>
</template>

<script>
 import DialogFound from "./account_add";
export default {
  name: "account_List",
  data() {
    return {
      total:1,//默认数据总数
      pagesize:10,//每页的数据条数
      pagesizes:[10, 20, 30, 40],//分组数量
      currentPage:1,//默认开始页面

      tableHeight:"100",
      tableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      form: {
        account_uri: "",  //PinterestAccount唯一标识码
        nickname: "",     //账户名称
        email: "",        //登陆邮箱
        type: "",         //账号类型 (0, 'business'), (1, 'individual')
        description: "",    //账户描述
        create_time: "",    //账号创建时间
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
      this.$axios(`/api/v1/account_list/?page=${this.currentPage}&page_size=${this.pagesize}`).then(res => {
        this.tableData = res.data.data.results;
        this.total = res.data.data.count;
      });
    },
    addFun() {
      // 添加
      this.dialog = {
        show: true,
        title: "添加账户",
        option: "post"
      };
      this.form = {
        account_uri: "",  //PinterestAccount唯一标识码
        nickname: "",     //账户名称
        email: "",        //登陆邮箱
        type: "0",         //账号类型 (0, 'business'), (1, 'individual')
        description: "",    //账户描述
        create_time: "",    //账号创建时间
      };
    },
    EditFun(row) {
      // 添加
      this.dialog = {
        show: true,
        title: "添加账户",
        option: "post"
      };
      this.form = row;
    },
    handleDelete(row, index) {
      // 删除
      this.$axios.delete(`/api/v1/account/users/${row.id}/`).then(res => {
        this.$message("删除成功");
        this.getProfile();
      });
    },
    AutFun(row) {
      // 获取授权
      this.$axios.post(`/api/v1/pinterest_account_auth/${row.index}/`).then(res => {
          if(res.data.code == 1){
            window.open(res.data.data.message, 'newwindow', 'height=700, width=700, top=200, left=500, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
          }else{
              this.$message({
                message: res.data.msg,
                type: 'warning',
                center: true
              });
          }
      }).catch(error => {
              this.$message({
                message: "接口超时!",
                type: 'warning',
                center: true
              });
          });
    },
    ListManagerFun(row) {
      // 去规则列表页面
      this.$router.push({path:"/list_manager", query: { index: row.index }});
    },
    BoardManagerFun(row) {
      // 去board_manager页面
      localStorage.setItem("account_data",JSON.stringify( row ) );
      this.$router.push({path:"/board_manager"});
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
