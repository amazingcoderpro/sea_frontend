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
                            <div class="el-form-item__error timeState" v-if="timeState == 2">{{timeStateStr}}</div>
                          </el-form-item>
                          <el-form-item>
                              <el-button size="medium" class="WW100 MB5" type="primary" @click="addTimeFun()">Add</el-button>
                          </el-form-item>
                        </el-form>
                      </div>
                      <div class="FR">
                        <el-button size="medium" class="WW100 MB5" type="info" @click="resetFun()">Reset</el-button>
                        <el-button size="medium" class="WW100 MB5" type="danger" @click="clearAllFun()">Clear All</el-button>
                        <el-button size="medium" class="WW100 MB5" type="primary" @click="saveFun()">Save</el-button>
                      </div>
                    </div>
                    <table class="sonTable" cellspacing="0">
                      <thead>
                        <tr>
                          <td>Monday<el-switch class="switchClass" v-model="weekState.mon" active-color="#13ce66" inactive-color="#ff4949"></el-switch></td>
                          <td>Tuesday<el-switch class="switchClass" v-model="weekState.tues" active-color="#13ce66" inactive-color="#ff4949"></el-switch></td>
                          <td>Wednesday<el-switch class="switchClass" v-model="weekState.wed" active-color="#13ce66" inactive-color="#ff4949"></el-switch></td>
                          <td>Thursday<el-switch class="switchClass" v-model="weekState.thur" active-color="#13ce66" inactive-color="#ff4949"></el-switch></td>
                          <td>Friday<el-switch class="switchClass" v-model="weekState.fri" active-color="#13ce66" inactive-color="#ff4949"></el-switch></td>
                          <td>Saturday<el-switch class="switchClass" v-model="weekState.sat" active-color="#13ce66" inactive-color="#ff4949"></el-switch></td>
                          <td>Sunday<el-switch class="switchClass" v-model="weekState.sun" active-color="#13ce66" inactive-color="#ff4949"></el-switch></td>
                          <!-- <td>every</td> -->
                        </tr>
                      </thead>
                      <tbody>
                        <tr> 
                          <td><template v-for="(item,index) in post_time_s.mon.time"><span :class="weekState.mon?'timerSpan':'timerSpan close'" :key="index">{{item}}<i class="el-icon-close" @click="deleteTime(index,'mon')"></i></span></template></td>
                          <td><template v-for="(item,index) in post_time_s.tues.time"><span :class="weekState.tues?'timerSpan':'timerSpan close'" :key="index">{{item}}<i class="el-icon-close" @click="deleteTime(index,'tues')"></i></span></template></td>
                          <td><template v-for="(item,index) in post_time_s.wed.time"><span :class="weekState.wed?'timerSpan':'timerSpan close'" :key="index">{{item}}<i class="el-icon-close" @click="deleteTime(index,'wed')"></i></span></template></td>
                          <td><template v-for="(item,index) in post_time_s.thur.time"><span :class="weekState.thur?'timerSpan':'timerSpan close'" :key="index">{{item}}<i class="el-icon-close" @click="deleteTime(index,'thur')"></i></span></template></td>
                          <td><template v-for="(item,index) in post_time_s.fri.time"><span :class="weekState.fri?'timerSpan':'timerSpan close'" :key="index">{{item}}<i class="el-icon-close" @click="deleteTime(index,'fri')"></i></span></template></td>
                          <td><template v-for="(item,index) in post_time_s.sat.time"><span :class="weekState.sat?'timerSpan':'timerSpan close'" :key="index">{{item}}<i class="el-icon-close" @click="deleteTime(index,'sat')"></i></span></template></td>
                          <td><template v-for="(item,index) in post_time_s.sun.time"><span :class="weekState.sun?'timerSpan':'timerSpan close'" :key="index">{{item}}<i class="el-icon-close" @click="deleteTime(index,'sun')"></i></span></template></td>
                          <!-- <td><template v-for="(item,index) in post_time_s.every.time"><span class="timerSpan" :key="index">{{item}}</span></template></td> -->
                        </tr>
                      </tbody>
                    </table>
              </template>
          </el-table-column>
          <el-table-column label="Pinterest ID" align="center" prop="id" width="355"></el-table-column>
          <el-table-column label="nickname" align="center" prop="nickname" width="400"></el-table-column>
          <el-table-column align="center" width="1"></el-table-column >
          <el-table-column label="timezone" align="center" prop="timezone" width="450"></el-table-column>
          <el-table-column label="update_time" align="center" prop="update_time" width="400"></el-table-column>
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
          mon:true,
          tues:true,
          wed:true,
          thur:true,
          fri:true,
          sat:true,
          sun:true,
          every:true,
          day:true
        }, 
        weekArray:[//时间区间的星期几
          {"label":"Everyday","value":"every"},
          {"label":"Monday","value":"mon"},
          {"label":"Tuesday","value":"tues"},
          {"label":"Wednesday","value":"wed"},
          {"label":"Thursday","value":"thur"},
          {"label":"Friday","value":"fri"},
          {"label":"Saturday","value":"sat"},
          {"label":"Sunday","value":"sun"},
          {"label":"Weekday","value":"weekday"},
          {"label":"Weekend","value":"weekend"}
        ],
        addData:{
          weekday:"mon",
          time:new Date(2016, 9, 10, 0, 0)
        },
        timeState:1,
        timeStateStr:'It already exists.',
        searchData:{
          pinterest:'',
          pinterestArray:[],
          pinterestIdArray:[],
        },
        tableData: [
        ],
        pinId:'',   //打开了哪一个的id
        post_time_s:{} //用于展示的那个数据
      }
    },
    watch:{
    
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
                    if(e.post_time){
                      e.post_time = JSON.parse(e.post_time);
                    }
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
        addTimeFun(){
          var _newTime = base.dateFormat(this.addData.time,"noSecondsHour");
          if(this.addData.weekday !="every" && this.addData.weekday !="weekday" && this.addData.weekday !="weekend" ){
            let _str = _newTime.split(":")[0]+":";
            let number = 0;
            this.post_time_s[this.addData.weekday].time.map(e => {
                if(e.indexOf(_str)>=0){
                    number +=1;
                }
            });
            if(this.post_time_s[this.addData.weekday].time.indexOf(_newTime)>=0){
                this.timeState = 2;
                this.timeStateStr = "It already exists.";
            }else{
              if(number == 4){
                //一小时内不得超过四条
                this.timeState = 2;
                this.timeStateStr = "No more than 4!";
              }else{
                this.timeState = 1;
                this.timeStateStr = "";
                this.post_time_s[this.addData.weekday].time.push(_newTime);
                this.post_time_s[this.addData.weekday].time.sort();
                this.getEveryFun();
              }
            }
          }else{
              if(this.addData.weekday =="every"){
                  let arr = ["mon","tues","wed","thur","fri","sat","sun","every"];
                  if(this.post_time_s[this.addData.weekday].time.indexOf(_newTime)>=0){
                    this.timeState = 2;
                    this.timeStateStr = "It already exists.";
                  }else{
                    this.changePostFun(arr);
                  }
              }else if(this.addData.weekday == "weekday"){
                  let arr = ["mon","tues","wed","thur","fri"];
                    this.changePostFun(arr);
                    this.getEveryFun();
              }else if(this.addData.weekday == "weekend"){
                  let arr = ["sat","sun"];
                    this.changePostFun(arr);
                    this.getEveryFun();
              }
              }
         },
        changePostFun(arr){
          var _newTime = base.dateFormat(this.addData.time,"noSecondsHour");
          for(var i = 0;i<arr.length;i++){
            if(this.post_time_s[arr[i]].time.indexOf(_newTime)<0){
              this.post_time_s[arr[i]].time.push(_newTime);
              this.post_time_s[arr[i]].time.sort();
            }
          }
        },
        deleteTime(index,type){
            this.post_time_s[type].time.splice(index,1); 
            this.getEveryFun();
        },
        saveFun(){
          this.$confirm('Are you sure save it?', '', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
              }).then(() => {
                for (let key in this.weekState) {
                    let state = this.weekState[key]?1:0;
                    this.post_time_s[key].state = state;
                }
                this.$axios.post("/api/v1/account/post_time/",{"account_id":this.pinId,"post_time":JSON.stringify(this.post_time_s)})
                .then(res => {
                    if(res.data.code == 1){
                        this.$message({message: "Successfully!",type: "success"});
                        this.init();
                    }else{
                        this.$message("Fail!");
                    }
                })
                .catch(error => {
                    this.$message("Interface timeout!");
                });
              }) 
        },
        resetFun(){
          this.weekState = {mon:true,tues:true,wed:true,thur:true,fri:true,sat:true,sun:true}
          let arr = ["mon","tues","wed","thur","fri","sat","sun","every"]
          for(var i = 0;i<arr.length;i++){
            this.post_time_s[arr[i]].time=["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00","13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
          }
        },
        clearAllFun(){
          this.weekState = {mon:false,tues:false,wed:false,thur:false,fri:false,sat:false,sun:false}
          let arr = ["mon","tues","wed","thur","fri","sat","sun","every"]
          for(var i = 0;i<arr.length;i++){
            this.post_time_s[arr[i]].time=[];
          }
        },
        getEveryFun(){
            let arr = ["mon","tues","wed","thur","fri","sat","sun"]
            var result = this.post_time_s["mon"].time;
            for(var i = 0;i<arr.length;i++){
              let _thisArr = this.post_time_s[arr[i]].time;
              result = _thisArr.filter(x=>{
                  return result.some(y=>{
                    return x==y;
                  })
                });
            }
            this.post_time_s['every'].time = result;
        },
        clickTable:function(row, column, cell, event){//展开事件日志列表
            if(cell.cellIndex!=3 && cell.cellIndex!=10){
                this.$refs.topictable.toggleRowExpansion(row);
            }
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
            this.post_time_s = row.post_time;
            for (let key in this.post_time_s) {
                let state = this.post_time_s[key].state == 1?true:false;
                this.weekState[key] = state;
            }
        }
    },
  }

</script>

<style>
.ruleTimeList .sonTableHead th .el-switch__core{top:-10px;}
.ruleTimeList .el-table__expanded-cell{padding:20px 20px 20px 47px;}
.ruleTimeList .sonTable{width:100%;min-height:300px;border:1px solid #ccc;border-right:0;}
.ruleTimeList .sonTable tr{border-left:1px solid #ccc;border-left:0;}
.ruleTimeList .sonTable td{text-align:center;}
.ruleTimeList .timerSpan{width:100%;display:block;position:relative;}
.ruleTimeList .timerSpan i{display:none;opacity:1;cursor:pointer;position:absolute;right:50%;margin-right:-36px;top:2px;}
.ruleTimeList .timerSpan:hover i{display:block;}
.ruleTimeList .timerSpan.close i{display:none;}
.ruleTimeList .timerSpan.close{color:#ccc;}
.ruleTimeList .switchClass{display:block;}
.ruleTimeList .el-form-item__error.timeState{position:absolute;width:338px;}
</style>
