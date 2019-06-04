<template>
    <div class="dashboard">
        <div class="tableTitle">
            <span style="width: 200px;">Account Dashboard</span>
        </div>
        <el-form :inline="true">
            <el-form-item label="Date Range">
                <el-select v-model="searchData.dataType" placeholder="Yesterday" class="week_name" @change="dataSelect">
                    <el-option
                    v-for="item in dataArray"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- 日期时间范围 -->
            <el-date-picker
                v-model="searchData.timeArray"
                type="datetimerange"
                range-separator="--"
                start-placeholder="start time"
                end-placeholder="End time"
                :disabled="disabledType=='1'">
            </el-date-picker>
            <el-button type="primary" icon="view" @click="init()">Search</el-button>
        </el-form>
        <div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart"></div>
        <div class="menu MB10">
            <el-button type="primary" size="small" icon="view" @click="tableInit(0)">board_num</el-button>
            <el-button type="primary" size="small" icon="view" @click="tableInit(1)">click_num</el-button>
            <el-button type="primary" size="small" icon="view" @click="tableInit(2)">board_followers</el-button>
            <el-button type="primary" size="small" icon="view" @click="tableInit(3)">pin_num</el-button>
            <el-button type="primary" size="small" icon="view" @click="tableInit(4)">pin_saves</el-button>
            <el-button type="primary" size="small" icon="view" @click="tableInit(5)">revenue_num</el-button>
        </div>
        <!-- 表单部分 -->
        <div class="table_right MB10">
          <el-table :data="tableData" border ref="topictable">
            <el-table-column  align="center"  class="parentNodeColumn" prop="site_num" label="Site Num"  width="200"></el-table-column>
            <el-table-column  align="center"  class="parentNodeColumn" prop="subaccount_num" label="Subaccount Num"  width="200"></el-table-column>
            <el-table-column  align="center"  class="parentNodeColumn" prop="board_num" label="Boards"  width="200"></el-table-column>
            <el-table-column  align="center"  class="parentNodeColumn" prop="pin_num" label="Pins"  width="200"></el-table-column>
            <el-table-column  align="center"  class="parentNodeColumn" prop="visitor_num" label="Visitors"  width="200"></el-table-column>
            <el-table-column  align="center"  class="parentNodeColumn" prop="click_num" label="Clicks"  width="200"></el-table-column>
            <el-table-column  align="center"  class="parentNodeColumn" prop="sales_num" label="Sales"  width="200"></el-table-column>
            <el-table-column  align="center"  class="parentNodeColumn" prop="revenue_num" label="Revenues"  ></el-table-column>
          </el-table>
        </div>
        <div class="bottomBox">
            <div class="leftBox">
                <div class="LTBox">
                    <div class="indexTitle">Latest Updates</div>
                    <div class="TC">
                        <div class="LTTime">
                            <p>{{updatesData.datetime}}</p>
                            <p>Latest Update Time</p>
                        </div>
                        <div class="bigNum">{{updatesData.new_saves}}</div>
                        <div class="smText">New Saves</div>
                        <div class="bigNum">{{updatesData.new_followers}}</div>
                        <div class="smText">New Followers</div>
                        <div class="bigNum">{{updatesData.new_pins}}</div>
                        <div class="smText">New Pins</div>
                        <div class="bigNum">{{updatesData.new_board}}</div>
                        <div class="smText">New Board</div>
                        <div class="bigNum">{{updatesData.new_accounts}}</div>
                        <div class="smText">New Accounts</div>
                    </div>
                </div>
                <div class="LBBox">
                    <div class="indexTitle">Activity Log</div>
                    <div>
                        <div class="LBTable">
                            <table cellspacing="0">
                                <thead>
                                    <tr>
                                        <td>User</td>
                                        <td>Action</td>
                                        <td>Date</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,index) in ActivityArray" :key="index">
                                        <td>{{item.username}}</td>
                                        <td>{{item.action}}</td>
                                        <td>{{item.operation_time}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rightBox">
                <div class="RTBox">
                    <div class="indexTitle">Top Pins</div>
                    <div>
                        <table cellspacing="0">
                            <thead>
                                <tr>
                                    <td>Pin ID</td>
                                    <td>SKU</td>
                                    <td>Image</td>
                                    <td>Pin Date</td>
                                    <td>Saves</td>
                                    <td>Trends</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in pinsArray" :key="index">
                                    <td>{{item.pin_uri}}</td>
                                    <td>{{item.SKU}}</td>
                                    <td>
                                        <img src="../assets/img/none.png" min-width="70" height="70" />
                                        <!-- {{item.image}} -->
                                    </td>
                                    <td>{{item.pin_date}}</td>
                                    <td>{{item.saves}}</td>
                                    <td>{{item.trends}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="RBBox">
                    <div class="indexTitle">Top Board</div>
                    <div>
                        <table cellspacing="0">
                            <thead>
                                <tr>
                                    <td>Board Name</td>
                                    <td>Pins</td>
                                    <td>saves</td>
                                    <td>Create Date</td>
                                    <td>Followers</td>
                                    <td>Trends</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in BoardArray" :key="index">
                                    <td>{{item.board_name}}</td>
                                    <td>{{item.pins}}</td>
                                    <td>{{item.saves}}</td>
                                    <td>{{item.create_date}}</td>
                                    <td>{{item.followers}}</td>
                                    <td>{{item.trends}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'
import * as base from '../assets/js/base'
export default {
    name: "dashboard",
    props: {
        className: {
        type: String,
        default: 'yourClassName'
        },
        id: {
        type: String,
        default: 'yourID'
        },
        width: {
        type: String,
        default: '100%'
        },
        height: {
        type: String,
        default: '500px'
        }
    },
    data() {
        return {
            chart: null,
            bigReport:null,      //最大数据
            tableType:0,       
            tableValue:{
                XValue:[], 
                YValue:[], 
            },
            updatesData:{
                datetime:"2019-1-1 12:00:00",
                new_accounts:"99999",
                new_board:"",
                new_followers:"99999",
                new_pins:"99999",
                new_saves:"99999"
            },
            pinsArray:[],
            BoardArray:[],
            ActivityArray:[],
            disabledType:'0',   //是否可自定义事件框  0 不可以   1 可以
            tableData:[],
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
                start_time:'',
                end_time:'',
                store_id:'1',
                timeArray:[new Date(2019, 4, 28, 8, 0), new Date(2019, 5, 6, 16, 0)],             //日期数据源
            }
        }
    },
    components:{
    },
    mounted() {
        this.init();
    },
    methods:{
        init() {
        // 获取表格数据
            this.searchData.start_time = base.dateFormat(this.searchData.timeArray[0],'day');
            this.searchData.end_time =  base.dateFormat(this.searchData.timeArray[1],'day');
            var urlString = `/api/v1/dashboard/1/?start_time=${this.searchData.start_time}&end_time=${this.searchData.end_time}`;
            this.$axios.get(urlString).then(res => {
                if(res.data.code==1){
                    this.bigReport = res.data.data.overview_list;
                    this.tableData = [];
                    this.tableData.push(res.data.data.total_data);
                    this.tableInit(0);
                    this.updates();
                }else{
                    this.$message("获取失败!");
                }
            })
            .catch(error => {
                this.$message("接口超时!");
            });
        },
        updates() {
        // 获取表格数据
            this.searchData.start_time = base.dateFormat(this.searchData.timeArray[0],'day');
            this.searchData.end_time =  base.dateFormat(this.searchData.timeArray[1],'day');
            var urlString = `/api/v1/dashboard/2/?start_time=${this.searchData.start_time}&end_time=${this.searchData.end_time}`;
            this.$axios.get(urlString).then(res => {
                if(res.data.code==1){
                    this.updatesData = res.data.data;
                    this.pins();
                }else{
                    this.$message("获取失败!");
                }
            })
            .catch(error => {
                this.$message("接口超时!");
            });
        },
        pins(){
            var urlString = `/api/v1/dashboard/3/`;
            this.$axios.get(urlString).then(res => {
                if(res.data.code==1){
                    this.pinsArray = res.data.data;
                    this.Board();
                }else{
                    this.$message("获取失败!");
                }
            })
            .catch(error => {
                this.$message("接口超时!");
            });
        },
        Board(){
            var urlString = `/api/v1/dashboard/4/`;
            this.$axios.get(urlString).then(res => {
                if(res.data.code==1){
                    this.BoardArray = res.data.data;
                    this.activity();
                }else{
                    this.$message("获取失败!");
                }
            })
            .catch(error => {
                this.$message("接口超时!");
            });
        },
        activity(){
            this.searchData.start_time = base.dateFormat(this.searchData.timeArray[0],'day');
            this.searchData.end_time =  base.dateFormat(this.searchData.timeArray[1],'day');
            var urlString = `/api/v1/dashboard/5/?start_time=${this.searchData.start_time}&end_time=${this.searchData.end_time}`;
            this.$axios.get(urlString).then(res => {
                if(res.data.code==1){
                   this.ActivityArray = res.data.data;
                }else{
                    this.$message("获取失败!");
                }
            })
            .catch(error => {
                this.$message("接口超时!");
            });
        },
        tableInit(num){
            this.tableType=num;
            this.tableValue.YValue=[];
            this.tableValue.XValue=[];
            this.bigReport.map(e => {
                    this.tableValue.XValue.push(base.dateFormat(e.date,"day"))
                if(this.tableType == 0){
                    this.tableValue.YValue.push(parseFloat(e.board_num));
                }
                else if(this.tableType == 1){
                    this.tableValue.YValue.push(parseFloat(e.click_num));
                }
                else if(this.tableType == 2){
                    this.tableValue.YValue.push(parseFloat(e.board_followers));
                }
                else if(this.tableType == 3){
                    this.tableValue.YValue.push(parseFloat(e.pin_num));
                }
                else if(this.tableType == 4){
                    this.tableValue.YValue.push(parseFloat(e.pin_saves));
                }
                else if(this.tableType == 5){
                    this.tableValue.YValue.push(parseFloat(e.revenue_num));
                }
                this.initChart();
            });    
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
                        data:  this.tableValue.YValue,
                        type: 'line',
                        areaStyle: {},
                        color:['#0065a3'], //设置折线图内容颜色
                        smooth:true,//折点是圆弧状的
                        symbolSize: 12,   //设定实心点的大小
                    
                    }]
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

<style>
.dashboard{width:calc(100% - 20px)}
.dashboard .table_right{margin-bottom:10px;}
.dashboard .leftBox{width:400px;float:left;}
.dashboard .rightBox{width:calc(100% - 420px);float:left;margin-left:20px;}
.dashboard .LTBox,.dashboard .LBBox,.dashboard .RTBox,.dashboard .RBBox{padding-bottom:10px;box-shadow:5px 4px 6px #ccc;margin-bottom:20px;}
.dashboard .bigNum{width:100%;font-size:38px;padding:5px 0;font-weight:600;}
.dashboard .smText{width:100%;font-size:14px;}
.dashboard table{width:100%;text-align: center;}
.dashboard table tbody tr td{border-top:1px solid #ccc;padding:5px 0;}
.dashboard .indexTitle{background:#006699;width:calc(100% - 50px);color:#fff;display:inline-block;padding:10px 40px 10px 10px;font-size:20px;font-weight:600;-webkit-box-shadow:0 0 5px #006699;box-shadow:0 0 5px #006699;}
</style>