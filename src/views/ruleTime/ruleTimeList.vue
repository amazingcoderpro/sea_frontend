<template>
    <div class="ruleTimeList">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span> Home</a></li>
            <li><a><span class="el-icon-right"> </span>Account Posting Times</a></li>
        </ul>
        <el-form :inline="true" :model="searchData" class="demo-form-inline" label-width="100px">
          <el-form-item label="Pinterest">
            <el-select v-model="searchData.pinterest" placeholder="Pinterest" :class="'W200'" @change="pinterestChange">
              <el-option :label="'All'" :value="''"></el-option>
              <el-option v-for="(item,index) in searchData.pinterestArray" :key="index" :label="item.account" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="init">Search</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData"  border ref="topictable" class="topictable"  :height="tableHeight" style="width: 100%" @expand-change="expandSelect" @cell-click="clickTable">
          <el-table-column type="expand">
              <template slot-scope="props">
                    <div>
                      <div class="FL">
                        <el-form :inline="true" :model="addData" class="addFrom" label-width="0">
                          <el-form-item>
                              <el-select :class="'W200'" v-model="addData.weekday">
                                <el-option v-for="item in weekArray" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item>
                            <el-time-picker v-model="addData.time"></el-time-picker>
                          </el-form-item>
                          <el-form-item>
                              <el-button size="medium" class="WW100 MB5" type="primary" @click="AddFun(pinId)">Add</el-button>
                          </el-form-item>

                        </el-form>
                      </div>
                      <div class="FR">
                        <el-button size="medium" class="WW100 MB5" type="info" @click="handleDelete(pinId)">Reset</el-button>
                        <el-button size="medium" class="WW100 MB5" type="primary" @click="handleEdit(pinId)">Save</el-button>
                        <el-button size="medium" class="WW100 MB5" type="danger" @click="handleDelete(pinId)">Clear All</el-button>
                      </div>
                    </div>
                    <table class="sonTable" cellspacing="0">
                      <thead>
                        <tr>
                          <td>Monday<el-switch class="switchClass" v-model="weekState.Monday" active-color="#13ce66" inactive-color="#ff4949"></el-switch></td>
                          <td>Tuesday<el-switch class="switchClass" v-model="weekState.Tuesday" active-color="#13ce66" inactive-color="#ff4949"></el-switch></td>
                          <td>Wednesday<el-switch class="switchClass" v-model="weekState.Wednesday" active-color="#13ce66" inactive-color="#ff4949"></el-switch></td>
                          <td>Thursday<el-switch class="switchClass" v-model="weekState.Thursday" active-color="#13ce66" inactive-color="#ff4949"></el-switch></td>
                          <td>Friday<el-switch class="switchClass" v-model="weekState.Friday" active-color="#13ce66" inactive-color="#ff4949"></el-switch></td>
                          <td>Saturday<el-switch class="switchClass" v-model="weekState.Saturday" active-color="#13ce66" inactive-color="#ff4949"></el-switch></td>
                          <td>Sunday<el-switch class="switchClass" v-model="weekState.Sunday" active-color="#13ce66" inactive-color="#ff4949"></el-switch></td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><template v-for="(item,index) in post_time_little.mon"><span :class="weekState.Monday?'timerSpan':'timerSpan close'" :key="index">{{item}}<i class="el-icon-close" @click="deleteTime(index,'mon')"></i></span></template></td>
                          <td><template v-for="(item,index) in post_time_little.tues"><span :class="weekState.Tuesday?'timerSpan':'timerSpan close'" :key="index">{{item}}<i class="el-icon-close" @click="deleteTime(index,'tues')"></i></span></template></td>
                          <td><template v-for="(item,index) in post_time_little.wed"><span :class="weekState.Wednesday?'timerSpan':'timerSpan close'" :key="index">{{item}}<i class="el-icon-close" @click="deleteTime(index,'wed')"></i></span></template></td>
                          <td><template v-for="(item,index) in post_time_little.thur"><span :class="weekState.Thursday?'timerSpan':'timerSpan close'" :key="index">{{item}}<i class="el-icon-close" @click="deleteTime(index,'thur')"></i></span></template></td>
                          <td><template v-for="(item,index) in post_time_little.fri"><span :class="weekState.Friday?'timerSpan':'timerSpan close'" :key="index">{{item}}<i class="el-icon-close" @click="deleteTime(index,'fri')"></i></span></template></td>
                          <td><template v-for="(item,index) in post_time_little.sat"><span :class="weekState.Saturday?'timerSpan':'timerSpan close'" :key="index">{{item}}<i class="el-icon-close" @click="deleteTime(index,'sat')"></i></span></template></td>
                          <td><template v-for="(item,index) in post_time_little.sun"><span :class="weekState.Sunday?'timerSpan':'timerSpan close'" :key="index">{{item}}<i class="el-icon-close" @click="deleteTime(index,'sun')"></i></span></template></td>
                        </tr>
                      </tbody>
                    </table>
              </template>
          </el-table-column>
          <el-table-column label="商品 ID" align="center" prop="id" width="200"></el-table-column>
          <el-table-column label="nickname" align="center" prop="nickname"></el-table-column>
          <el-table-column label="timezone" align="center" prop="timezone"></el-table-column>
          <el-table-column label="update_time" align="center" prop="update_time"></el-table-column>
          <!-- <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                    <el-button size="medium" class="WW100 MB5" type="success" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button size="medium" class="WW100 MB5" type="info" @click="handleDelete(scope.$index, scope.row)">Reset</el-button>
                    <el-button size="medium" class="WW100 MB5" type="primary" @click="handleEdit(scope.$index, scope.row)">Save</el-button>
                    <el-button size="medium" class="WW100 MB5" type="danger" @click="handleDelete(scope.$index, scope.row)">Clear All</el-button>
            </template>
          </el-table-column> -->
      </el-table>
    </div>
</template>
<script>
import * as base from '../../assets/js/base'
export default {
  name: "ruleTimeList",
    data() {
      return {
        tableHeight:"100",
        weekState:{
          Monday:true,
          Tuesday:true,
          Wednesday:true,
          Thursday:true,
          Friday:true,
          Saturday:true,
          Sunday:true
        }, 
        weekArray:[//时间区间的星期几
          {"label":"Every","value":"7"},
          {"label":"Monday","value":"0"},
          {"label":"Tuesday","value":"1"},
          {"label":"Wednesday","value":"2"},
          {"label":"Thursday","value":"3"},
          {"label":"Friday","value":"4"},
          {"label":"Saturday","value":"5"},
          {"label":"Sunday","value":"6"},
        ],
        addData:{
          weekday:"0",
          time:new Date(2016, 9, 10, 0, 0)
        },
        searchData:{
          pinterest:'',
          pinterestArray:[],
          pinterestIdArray:[],
        },
        tableData: [
          //mon-tues-wed-thur-fri-sat-sun-every
          //   {
          //     id: '12987122',
          //     post_time:{"mon": ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
          //                 "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"], 
          //         "tues": ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
          //                 "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"], 
          //         "wed": ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
          //                 "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"], 
          //         "thur": ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
          //                 "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"], 
          //         "fri": ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
          //                 "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"], 
          //         "sat": ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
          //                 "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"], 
          //         "sun": ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
          //                 "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"], 
          //         "every": ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
          //                 "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]}
          // }
        ],
        pinId:'',   //打开了哪一个的id
        post_time_little:{} //用于展示的那个数据

      }
    },
    watch:{
      tableData: {
          handler: function() {
            //  console.log(this.tableData[0].post_time.mon)
          },
          deep: true
      }
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
        this.searchInit();
    },
    methods: {
        init(){
            let pinterestIdArrayStr = JSON.stringify(this.searchData.pinterestIdArray);
            this.$axios.get(`/api/v1/account/post_time/?account_list=${pinterestIdArrayStr}`)
            .then(res => {
                if(res.data.code == 1){
                  this.tableData = res.data.data;
                  this.tableData.map(e => {
                    e.post_time = JSON.parse(e.post_time);
                  });
                }
            })
            .catch(error => {
                this.$message("Interface timeout!");
            });
        },
        searchInit(){
            this.$axios.get("/api/v1/select/account/")
            .then(res => {
                if(res.data.code == 1){
                  this.searchData.pinterestArray = res.data.data;
                  this.pinterestChange();
                  this.init();
                }
            })
            .catch(error => {
                this.$message("Interface timeout!");
            });
        },
        pinterestChange(){
          this.searchData.pinterestIdArray = [];
          if(this.searchData.pinterest == ''){
            this.searchData.pinterestArray.map(e => {
              this.searchData.pinterestIdArray.push(e.id);
            });
          }else{
              this.searchData.pinterestIdArray.push(this.searchData.pinterest);
          }
        },
        clickTable:function(row, column, cell, event){//展开事件日志列表
            if(cell.cellIndex!=3 && cell.cellIndex!=10){
                this.$refs.topictable.toggleRowExpansion(row);
            }
        },
        AddFun(){
          // console.log(base.dateFormat(this.addData.time,"noSecondsHour"))
          // switch(this.addData.weekday) {
          //     case "0":
          //         this.post_time_little.mon.splice(index,1)
          //         break;
          //     case "1":
          //         this.post_time_little.tues.splice(index,1)
          //         break;
          //     case "2":
          //         this.post_time_little.wed.splice(index,1)
          //         break;
          //     case "3":
          //         this.post_time_little.thur.splice(index,1)
          //         break;
          //     case "4":
          //         this.post_time_little.fri.splice(index,1)
          //         break;
          //     case "5":
          //         this.post_time_little.sat.splice(index,1)
          //         break;
          //     case "6":
          //         this.post_time_little.sun.splice(index,1)
          //         break;
          //     case "7":
          //         break;
          //     default:
          //        // 默认代码块
          // } 
        },
        handleEdit(Pid){
          console.log(Pid)
        },
        expandSelect:function (row, expandedRows) {
            var that = this
            if (expandedRows.length>1) {
                that.expands = []
                if (row) {
                    that.expands.push(row);
                }
                this.$refs.topictable.toggleRowExpansion(expandedRows[0]);
            } else {
                that.expands = [];
            }
            this.pinId = row.id;
            this.post_time_little = row.post_time;
            this.weekState = {
              Monday:true,
              Tuesday:true,
              Wednesday:true,
              Thursday:true,
              Friday:true,
              Saturday:true,
              Sunday:true
            }
        },
        deleteTime(index,type){
          switch(type) {
              case "mon":
                  this.post_time_little.mon.splice(index,1)
                  break;
              case "tues":
                  this.post_time_little.tues.splice(index,1)
                  break;
              case "wed":
                  this.post_time_little.wed.splice(index,1)
                  break;
              case "thur":
                  this.post_time_little.thur.splice(index,1)
                  break;
              case "fri":
                  this.post_time_little.fri.splice(index,1)
                  break;
              case "sat":
                  this.post_time_little.sat.splice(index,1)
                  break;
              case "sun":
                  this.post_time_little.sun.splice(index,1)
                  break;
              case "every":
                  break;
              default:
                 // 默认代码块
          } 
        }
    },
  }

</script>

<style>
.ruleTimeList .sonTableHead th .el-switch__core{top:-10px;}
.ruleTimeList .el-table__expanded-cell{padding:20px 20px 0 47px;}
.ruleTimeList .sonTable{width:100%;border:1px solid #ccc;border-right:0;}
.ruleTimeList .sonTable tr{border-left:1px solid #ccc;border-left:0;}
.ruleTimeList .sonTable td{text-align:center;}
.ruleTimeList .sonTable tbody td span{}
.ruleTimeList .timerSpan{width:100%;display:block;position: relative;}
.ruleTimeList .timerSpan i{display: none;opacity: 1;
    cursor: pointer;
    position: absolute;
    right: 50%;
    margin-right: -36px;
    top: 2px;}
.ruleTimeList .timerSpan:hover i{display: block;}
.ruleTimeList .timerSpan.close i{display: none;}
.ruleTimeList .timerSpan.close{color: #ccc;}
.ruleTimeList .switchClass{display: block;}
</style>
