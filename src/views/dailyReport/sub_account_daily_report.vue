<template>
  <div class="sub_account_daily_report">
      <div class="tableTitle">
        <span class="report_title">SubAccountDailyReport</span>
      </div>
      <div class="Options">
        <span>Options</span>
      </div>
        <el-form :inline="true" label-width="120px" >
            <el-form-item label="Filter">
                <el-select v-model="searchData.pinterest_account_id" placeholder="Pinterest Account 1" @change="getBodFun" :class="'W200'">
                    <el-option v-for="item in searchData.PinterestArray" :key="item.name" :label="item.nickname" :value="item.id"></el-option>
                </el-select>
                <el-select v-model="searchData.board_id" placeholder="All Boards" @change="getPinFun" :class="'W200'">
                    <el-option   :label="'All'" :value="''"></el-option>    
                    <el-option  v-for="item in searchData.BoardArray" :key="item.id" :label="item.name" :value="item.id"></el-option>    
                </el-select>
                <el-select v-model="searchData.pin_id" placeholder="All Pins" :class="'W200'">
                    <el-option   :label="'All'" :value="''"></el-option>    
                    <el-option v-for="item in searchData.PinsArray" :key="item.id" :label="item.pin_uri" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Date Range" class="searchBox">
              <el-select v-model="searchData.dataType" placeholder="Yesterday" @change="dataSelect" :class="'W200'">
                  <el-option
                  v-for="item in dataArray"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
              </el-select>
              <el-date-picker v-model="searchData.timeArray" type="datetimerange" range-separator="--" start-placeholder="start time" end-placeholder="End time" :class="'W410'">
              </el-date-picker>
              <el-input v-model="searchData.search" @keyup.enter.native="init()" :class="'W200'"></el-input>
              <el-button type="primary" icon="view" @click="init()">Search</el-button>
            </el-form-item>
        </el-form>  
                <!-- echarts图表 -->
        <div style="width:1600px;height:400px;" ref="myEchart"></div> 
                <!-- 选择按钮 -->
        <div class="menu">
            <el-button type="primary" size="small" icon="view" @click="tableInit(0)">Revenue</el-button>
            <el-button type="primary" size="small" icon="view" @click="tableInit(1)">Sales</el-button>
            <el-button type="primary" size="small" icon="view" @click="tableInit(2)">Followers</el-button>
            <el-button type="primary" size="small" icon="view" @click="tableInit(3)">pins</el-button>
            <el-button type="primary" size="small" icon="view" @click="tableInit(4)">Repins</el-button>
            <el-button type="primary" size="small" icon="view" @click="tableInit(5)">Likes</el-button>
            <el-button type="primary" size="small" icon="view" @click="tableInit(6)">Comments</el-button>
        </div>
               <!-- 日报表格 --> 
        <div class="table_right">
            <el-table border ref="topictable" :data="bigReport">
              <el-table-column prop="date" label="Data" align="center"  width="110" ></el-table-column>
              <el-table-column prop="boards" label="Board数" align="center"  width="120"></el-table-column>
              <el-table-column prop="account_followings" label="Followings" align="center" width="120"></el-table-column>
              <el-table-column prop="account_followers" label="Followers" align="center" width="120"></el-table-column>
              <el-table-column prop="pins" label="Pins" align="center" width="120"></el-table-column>
              <el-table-column prop="pin_comments" label="Repins" align="center" width="120"></el-table-column>
              <el-table-column prop="pin_likes" label="Like" align="center"  width="120"></el-table-column>
              <el-table-column prop="pin_comments" label="Comments" align="center"  width="120"></el-table-column>
              <el-table-column prop="product_visitors" label="Visitors" align="center"  width="120"></el-table-column>
              <el-table-column prop="product_new_visitors" label="New Vistors" align="center" width="120"></el-table-column>
              <el-table-column prop="account_views" label="View" align="center" width="120"></el-table-column>
              <el-table-column prop="product_clicks" label="Clicks" align="center" width="120"></el-table-column>
              <el-table-column prop="product_sales" label="Sales" align="center" width="120"> </el-table-column>   
              <el-table-column prop="product_revenue" align="center" label="Revenue" fixed="right" width="120"></el-table-column>
            </el-table>
        </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import * as base from '../../assets/js/base'

export default {
  data() {
    return {
      chart: null,
      bigReport:null,      //最大数据
      tableType:0,     
      tableValue:{
         XValue:['no value'], 
         YValue:[0], 
      },
      dataArray:[//时间区间的星期几
        {"label":"Custom","value":"0"},
        {"label":"Yesterday","value":"1"},
        {"label":"Today","value":"2"},
        {"label":"Sevenday","value":"3"},
        {"label":"The Months","value":"4"},
        {"label":"The Years","value":"5"},
      ],
      searchData:{
          dataType:'0',    //显示几天 
          store_id:'2',
          search:'',//搜索框输入的值(pin_uri or board_uri or pin_description or board_name)
          pinterest_account_id:'',
          board_id:'',          
          pin_id:'',              
          start_time:'',
          end_time:'',
          store_id:'',


          PinterestArray:[],        //Pinterest的下拉框数据源
          BoardArray:[],            //Board的下拉框数据源
          PinsArray:[],             //Pins的下拉框数据源
          timeArray:[new Date(2019, 3, 1, 8, 0), new Date(2019, 5, 1, 16, 0)],             //日期数据源
      }
    }
  },
  mounted() {
    this.getPinterestFun();
  },
  methods: {
    init(){
      this.searchData.start_time = base.dateFormat(this.searchData.timeArray[0],'day');
      this.searchData.end_time =  base.dateFormat(this.searchData.timeArray[1],'day');
      var url = `/api/v1/select/daily_report/?index=1`;
          url +=`&pinterest_account_id=${this.searchData.pinterest_account_id}`;
      if(this.searchData.board_id != ''){
          url +=`&board_id=${this.searchData.board_id}`;
      }
      if(this.searchData.pin_id != ''){
          url +=`&pin_id=${this.searchData.pin_id}`;
      }
      if(this.searchData.search != ''){
          url +=`&search=${this.searchData.search}`;
      }
      if(this.searchData.timeArray.length == 2){
          url +=`&start_time=${this.searchData.start_time}`;
          url +=`&end_time=${this.searchData.end_time}`;
      }

    this.$axios.get(url)
      .then(res=> {
          if(res.data.code == 1){
            if(res.data.data.results.length>0){
              this.bigReport = res.data.data.results;
              this.tableInit(0);
            }else{
              this.initChart();
            }
          }else{
            this.$message("获取失败!");
          }
      })
    },
    tableInit(num){
      this.tableType=num;
      this.tableValue.YValue=[];
      this.tableValue.XValue=[];
      if(this.bigReport.length>0){
          this.bigReport.map(e => {
              this.tableValue.XValue.push(e.date)
              if(this.tableType == 0){
                this.tableValue.YValue.push(parseFloat(e.Revenue));
              }
              else if(this.tableType == 1){
                this.tableValue.YValue.push(parseFloat(e.product_sales));
              }
              else if(this.tableType == 2){
                this.tableValue.YValue.push(parseFloat(e.account_followers));
              }
              else if(this.tableType == 3){
                this.tableValue.YValue.push(parseFloat(e.pins));
              }
              else if(this.tableType == 4){
                this.tableValue.YValue.push(parseFloat(e.Repins));
              }
              else if(this.tableType == 5){
                this.tableValue.YValue.push(parseFloat(e.pin_likes));
              }else{
                this.tableValue.YValue.push(parseFloat(e.pin_comments));
              }
          });    
        this.initChart();
      }
    },
    getPinterestFun:function(){
        this.$axios.get("/api/v1/select/account/")
        .then(res=> {
            if(res.data.code == 1){
              this.searchData.PinterestArray = res.data.data;
              if(res.data.data.length>0){
                this.searchData.pinterest_account_id = res.data.data[0].id;
                this.getBodFun();
             }else{
                this.searchData.pinterest_account_id = '';
                this.searchData.board_id = '';
                this.searchData.pin_id = '';
                this.init();
              }
            }else{
              this.$message("获取失败!");
            }
        }).catch(function(errof){
          this.$message("接口超时!");
        });
    },
    getBodFun:function(){
      this.$axios.get(`/api/v1/select/board/?pinterest_account_id=${this.searchData.pinterest_account_id}`)
      .then(res=> {
          if(res.data.code == 1){
            this.searchData.BoardArray = res.data.data;
            if(res.data.data.length>0){
              this.searchData.board_id = res.data.data[0].id;
              this.getPinFun();
            }else{
              this.searchData.board_id = '';
              this.searchData.pin_id = '';
              this.init();
            }
          }else{
            this.$message("获取失败!");
          }
      }).catch(function(errof){
          this.$message("接口超时!");
      });
    },
    getPinFun:function(){
      this.$axios.get(`/api/v1/select/pin/?board=${this.searchData.board_id}`)
      .then(res=> {
          if(res.data.code == 1){
            this.searchData.PinsArray = res.data.data;
            if(res.data.data.length>0){
              this.searchData.pin_id = res.data.data[0].id;
              this.init();
            }else{
              this.searchData.pin_id = '';
              this.init();
            }
          }else{
            this.$message("获取失败!");
          }
      }).catch(function(errof){
          this.$message("接口超时!");
      })
    },
    dataSelect(){
            if(this.searchData.dataType == 0){
                this.disabledType = 0;
            }else{
                this.disabledType = 1;
                var _star;
                var _end;
                if(this.searchData.dataType == 1){
                    // 昨天
                     _star = new Date(base.dateFormat(new Date(new Date().getTime()-1000*24*60*60),"day") + " 00:00:00");
                     _end = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 00:00:00");
                }else if(this.searchData.dataType == 2){
                    // 今天
                     _star = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 00:00:00");
                     _end = new Date(base.dateFormat(new Date(new Date().getTime()+1000*24*60*60),"day") + " 00:00:00");
                }else if(this.searchData.dataType == 3){
                    // 近七天
                     _star = new Date(base.dateFormat(new Date(new Date().getTime()-7*1000*24*60*60),"day") + " 00:00:00");
                     _end = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 00:00:00");
                }else if(this.searchData.dataType == 4){
                    // 本月
                    var time = new Date();
                     _star = new Date(base.dateFormat(time.getFullYear()+"-"+ (time.getMonth()+1) +"-1"+ " 00:00:00"));
                     _end = new Date(base.dateFormat(new Date(new Date().getTime()+1000*24*60*60),"day") + " 00:00:00");
                }else if(this.searchData.dataType == 5){
                    //本年度
                    var time = new Date();
                     _star = new Date(base.dateFormat(time.getFullYear()+"-1-1"+ " 00:00:00"));
                     _end = new Date(base.dateFormat(new Date(new Date().getTime()+1000*24*60*60),"day") + " 00:00:00");
                }
                this.searchData.timeArray = [_star,_end]
            }
        },
    initChart() {
      this.chart = echarts.init(this.$refs.myEchart);
      // 把配置和数据放这里
      this.chart.setOption({
            xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.tableValue.XValue
        },
        grid:{               
              top:"50px",
              left:"50px",
              right:"15px",
              bottom:"50px"
        },
        tooltip: {
                    trigger: 'axis'  //鼠标滑过时显示数据
                },
        yAxis: {
            type: 'value',
              //max: 3000,   //纵坐标的数据  最大最小值  如果不给 系统会默认分配值 会跟着值的变化而变化
              min: 0,
        },
        series: [{
            data: this.tableValue.YValue,
            type: 'line',
            areaStyle: {},
            color:['#0065a3'], //设置折线图内容颜色
            smooth:true,//折点是圆弧状的
            symbolSize: 12,   //设定实心点的大小
         
        }]
      })
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose();
    this.chart = null;
  }
}
</script>


<style scoped>
 .sub_account_daily_report .report_title{width:305px;}
  .sub_account_daily_report .searchBox .el-input{
 width: 20%;
    margin-right: 2%;  
 }
  .sub_account_daily_report .menu{
    margin-bottom:10px;
  }
</style>
