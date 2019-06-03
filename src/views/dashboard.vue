<template>
    <div class="dashboard">
        <div class="tableTitle">
            <span>账户总览</span>
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
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :disabled="disabledType=='1'"
            >
            </el-date-picker>
            <el-button type="primary" icon="view" @click="init()">查询</el-button>
        </el-form>
        <div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart"></div>
        <!-- 表单部分 -->
        <div class="table_right">
          <el-table :data="tableData" border ref="topictable">
            <el-table-column  align="center"  class="parentNodeColumn" prop="xxxx" label="站点总数"  width="200"></el-table-column>
            <el-table-column  align="center"  class="parentNodeColumn" prop="xxxx" label="账号总数"  width="200"></el-table-column>
            <el-table-column  align="center"  class="parentNodeColumn" prop="xxxx" label="Board总数"  width="200"></el-table-column>
            <el-table-column  align="center"  class="parentNodeColumn" prop="xxxx" label="Pin总数"  width="200"></el-table-column>
            <el-table-column  align="center"  class="parentNodeColumn" prop="xxxx" label="Visitor总数"  width="200"></el-table-column>
            <el-table-column  align="center"  class="parentNodeColumn" prop="xxxx" label="Click 总数"  width="200"></el-table-column>
            <el-table-column  align="center"  class="parentNodeColumn" prop="xxxx" label="Sales 总数"  width="200"></el-table-column>
            <el-table-column  align="center"  class="parentNodeColumn" prop="xxxx" label="Revenue 总数"  ></el-table-column>
          </el-table>
        </div>
        <div class="bottomBox">
            <div class="leftBox">
                <div class="LTBox">
                    <div class="indexTitle">Latest Updates</div>
                    <div class="TC">
                        <div class="LTTime">
                            <p>2019/04/17 00:00 AM</p>
                            <p>Latest Update Time</p>
                        </div>
                        <div class="bigNum">99999</div>
                        <div class="smText">New Repins</div>
                        <div class="bigNum">99999</div>
                        <div class="smText">New Followers</div>
                        <div class="bigNum">99999</div>
                        <div class="smText">New Pins</div>
                        <div class="bigNum">99999</div>
                        <div class="smText">New Board</div>
                        <div class="bigNum">99999</div>
                        <div class="smText">New Accounts</div>
                    </div>
                </div>
                <div class="LBBox">
                    <div class="indexTitle">Activity Log</div>
                    <div>
                        <div class="LBTable">
                            <table>
                                <thead>
                                    <tr>
                                        <td>User</td>
                                        <td>Action</td>
                                        <td>Date</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
                                    </tr>
                                    <tr>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
                                    </tr>
                                    <tr>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
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
                            <table>
                                <thead>
                                    <tr>
                                        <td>Pin ID</td>
                                        <td>SKU</td>
                                        <td>Image</td>
                                        <td>Pin Date</td>
                                        <td>Repins</td>
                                        <td>Trends</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
                                    </tr>
                                    <tr>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
                                    </tr>
                                    <tr>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
                                    </tr>
                                </tbody>
                            </table>

                    </div>
                </div>
                <div class="RBBox">
                    <div class="indexTitle">Top Board</div>
                    <div>
                            <table>
                                <thead>
                                    <tr>
                                        <td>Board Name</td>
                                        <td>Pins</td>
                                        <td>Repins</td>
                                        <td>Create Date</td>
                                        <td>Followers</td>
                                        <td>Trends</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
                                    </tr>
                                    <tr>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
                                    </tr>
                                    <tr>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
                                        <td>123</td>
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
            disabledType:'0',   //是否可自定义事件框  0 不可以   1 可以
            tableData:[],
            dataArray:[//时间区间的星期几
                {"label":"Custom","value":"0"},
                {"label":"Yesterday","value":"1"},
                {"label":"Today","value":"2"},
                {"label":"近7天","value":"3"},
                {"label":"本月","value":"4"},
                {"label":"本年","value":"5"},
            ],
            searchData:{
                dataType:'0',    //显示几天            
                start_time:'',
                end_time:'',
                store_id:'1',
                timeArray:[new Date(2019, 3, 1, 8, 0), new Date(2019, 5, 1, 16, 0)],             //日期数据源
            }
        }
    },
    components:{
    },
    mounted() {
        this.init();
        this.initChart();
    },
    methods:{
        init() {
        // 获取表格数据
            this.searchData.start_time = base.dateFormat(this.searchData.timeArray[0],'day');
            this.searchData.end_time =  base.dateFormat(this.searchData.timeArray[1],'day');
            var urlString = `/api/v1/dashboard/3/?start_time=${this.searchData.start_time}&end_time=${this.searchData.end_time}`;
            this.$axios.get(urlString).then(res => {
                if(res.data.code==1){

                }else{
                    this.$message("获取失败!");
                }
            })
            .catch(error => {
                this.$message("接口超时!");
            });
        },
        initChart() {
            this.chart = echarts.init(this.$refs.myEchart);
            // 把配置和数据放这里
                    this.chart.setOption({
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
                        data:  [10, 52, 200, 334, 390, 330, 220],
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
                if(this.searchData.dataType == 1){
                    // 昨天
                    var _star = new Date(base.dateFormat(new Date(new Date().getTime()-1000*24*60*60),"day") + " 00:00:00");
                    var _end = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 00:00:00");
                    this.searchData.timeArray = [_star,_end]
                }else if(this.searchData.dataType == 2){
                    // 今天
                    var _star = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 00:00:00");
                    var _end = new Date(base.dateFormat(new Date(new Date().getTime()+1000*24*60*60),"day") + " 00:00:00");
                    this.searchData.timeArray = [_star,_end]
                }else if(this.searchData.dataType == 3){
                    // 近七天
                    var _star = new Date(base.dateFormat(new Date(new Date().getTime()-7*1000*24*60*60),"day") + " 00:00:00");
                    var _end = new Date(base.dateFormat(new Date(new Date().getTime()),"day") + " 00:00:00");
                    this.searchData.timeArray = [_star,_end]
                }else if(this.searchData.dataType == 4){
                    // 本月
                    var time = new Date();
                    var _star = new Date(base.dateFormat(time.getFullYear()+"-"+ (time.getMonth()+1) +"-1"+ " 00:00:00"));
                    var _end = new Date(base.dateFormat(new Date(new Date().getTime()+1000*24*60*60),"day") + " 00:00:00");
                    this.searchData.timeArray = [_star,_end]
                }else if(this.searchData.dataType == 5){
                    //本年度
                    var time = new Date();
                    var _star = new Date(base.dateFormat(time.getFullYear()+"-1-1"+ " 00:00:00"));
                    var _end = new Date(base.dateFormat(new Date(new Date().getTime()+1000*24*60*60),"day") + " 00:00:00");
                    this.searchData.timeArray = [_star,_end]
                }
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
.dashboard .rightBox{width:calc(100% - 420px);float:left;margin-left:10px;}
.dashboard .LTBox,.dashboard .LBBox,.dashboard .RTBox,.dashboard .RBBox{padding-bottom:10px;box-shadow:5px 4px 6px #ccc;margin-bottom:20px;}
.dashboard .bigNum{width:100%;font-size:38px;padding:5px 0;font-weight:600;}
.dashboard .smText{width:100%;font-size:14px;}
.dashboard table{width:100%;}
.dashboard .indexTitle{background:#006699;width:calc(100% - 50px);color:#fff;display:inline-block;padding:10px 40px 10px 10px;font-size:20px;font-weight:600;-webkit-box-shadow:0 0 5px #006699;box-shadow:0 0 5px #006699;}
</style>