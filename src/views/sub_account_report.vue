<template>
  <div class="sub_account_report">
      <div class="tableTitle">
        <span class="report_title">Pinterest Sub-Account Report</span>
      </div>
      <div class="Options">
        <span>Options</span>
      </div>
        <el-form :inline="true" ref="add_data">
            <!-- 日期下拉框 -->
           <el-form-item label="Date Range">
                <el-select v-model="week" placeholder="Yesterday" class="week_name" >
                    <el-option
                    v-for="item in weekArray"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
           </el-form-item>
            <!-- 日期时间范围 -->
          <div class="block">
            <el-date-picker
                v-model="weekscope"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
               >
            </el-date-picker>
          </div>
            <!-- Filter -->
          <div class="Filter">
            <el-form-item label="Filter">
                  <el-select v-model="Account" placeholder="Yesterday" class="Filter_week">
                      <el-option
                      v-for="item in formAccount"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>

                   <el-select v-model="week" placeholder="Yesterday" class="Filter_week">
                      <el-option
                      v-for="item in weekArray"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>

                   <el-select v-model="week" placeholder="Yesterday" class="Filter_week">
                      <el-option
                      v-for="item in weekArray"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>
                <div class="input_id">
                  <el-input v-model="search"  placeholder="请输入内容"></el-input>
                     <i class="iconfont el-icon-search"></i>
                </div>
            </el-form-item>
          </div>
        </el-form>  

          <!-- echarts -->
          <div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart"></div> 
  
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
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
      default: '1600px'
    },
    height: {
      type: String,
      default: '400px'
    }
  },
  data() {
    return {
      Account:"",
      formAccount:[],
      chart: null,
      orgOptions: {},
      search:"",
      week:"",
      weekscope:"",
      weekArray:[//时间区间的星期几
        {"label":"Yesterday","value":"0"},
        {"label":"Today","value":"1"},
        {"label":"近7天","value":"2"},
        {"label":"本月","value":"3"},
        {"label":"本年","value":"4"},
        {"label":"Custom","value":"5"},
      ],
       shortcuts: [{
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit('pick', [start, end]);
        }
      }],
    }
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.myEchart);
      // 把配置和数据放这里
      this.chart.setOption({
            xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['20', '21', '22', '23', '24', '25', '26','27','28','29','30','31','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','']
        },
        grid:{               // 铺满div 
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
              max: 3000,   //纵坐标的数据  最大最小值  如果不给 系统会默认分配值 会跟着值的变化而变化
              min: 0,
        },
        series: [{
            data: [2300, 2400, 2200, 2150, 2150, 2160, 2260,2280,2310,2360,2300,2450,2520,2330,2460,2560,2610,2530,2430,2230,2680,2610,2400,2630,2540,2960,2650,2350,2450,2330,],
            type: 'line',
            areaStyle: {},
            color:['#0065a3'], //设置折线图内容颜色
            smooth:true,//折点是圆弧状的
            symbolSize: 12,   //设定实心点的大小
         
        }]
      })
    }
  }
}
</script>


<style scoped>
.report_title {
  width: 305px;
}
.Options span {
  display: block;
  margin-top: 30px;
  margin-bottom: 20px;
}
.week_name{
  width: 120px;
}
.block{
  display: inline;
  padding-left: 20px;
}
.Filter_week{
  padding-left: 44px;
}
.input_id{
  float: right;
  display: flex;
  padding-left: 40px;
  width: 170px;
  }
.iconfont{
  font-size: 25px;
  padding-left: 15px;
  padding-top: 7px;
  cursor: pointer;
}
#main{
  background: #ccc;
}
</style>
