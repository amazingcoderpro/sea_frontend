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
          <div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart">
        </div>
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
      default: '1500px'
    },
    height: {
      type: String,
      default: '500px'
    }
  },
  data() {
    return {
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
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
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
