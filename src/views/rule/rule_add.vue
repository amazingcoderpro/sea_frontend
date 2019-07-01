<template>
    <div class="ruleAdd">
         <el-dialog  :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false' :modal-append-to-body="false" @close='resetForm'>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="Website">
              <span style="color:red;font-size:16px;font-weight: 600;">{{website}}</span>
            </el-form-item>
            <el-form-item label=" " :class="'contentBg'">
          </el-form-item>
        
          <el-form-item label="Pinterest">
                    <el-select v-model="ruleForm.pinterest" placeholder="Pinterest Account"  @change="pinterestChange">
                      <el-option v-for="(item,index) in pinterestArray" :key="index" :label="item.account" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <!-- Board Name -->
                <el-form-item label="Board Name" prop="board">
                  <el-select v-model="ruleForm.board" placeholder="Board">
                    <template v-for="item in pinterestArray">
                      <template v-if="item.id == ruleForm.pinterest">
                        <el-option v-for="(items,index) in item.board_pinterest_account" :key="index" :label="items.name" :value="items.id"> </el-option>
                      </template>
                    </template>
                  </el-select>
                </el-form-item>
                <!-- Posting Time -->
                <el-form-item label="Posting Time" prop="schedule_rule" ref="scheduleRuleClass" class="scheduleRuleClass">
                  <el-select :class="'W20'" v-model="scheduleRule.weekday" placeholder="schedule_rule">
                    <el-option v-for="item in weekArray" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                  </el-select>
                  <!-- 时间选择器 -->
                  <!-- <el-time-picker :class="'W36'" is-range v-model="scheduleRule.timeVal" start-placeholder="start time" end-placeholder="End time" placeholder="选择时间范围">
                  </el-time-picker> -->
                  <!-- <div class="el-form-item__error" :style="'margin-left:244px;'" v-if="timeValState == 2">Must be more than 0.5 hours</div> -->
                  <el-select :class="'W20'" v-model="scheduleRule.interval_time" placeholder="interval_time">
                    <el-option v-for="item in publishTimeArray" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                  </el-select>
                  <el-button type="primary"  @click="scheduleRuleFun()">Add</el-button>
                  <div class="el-form-item__error" v-if="scheduleRruleState == 2">Please add intervals</div>
                </el-form-item>
                <!-- 时间区间的列表，没有数据是处于隐藏状态 -->
                <div v-if="ruleForm.schedule_rule.length>0">
                    <ul class="scheduleRuleList">
                      <li v-for="(item,index) in ruleForm.schedule_rule" :key="item.value">
                        <span class="spanClass">第{{index+1}}条</span>
                        <template>
                            <span :class="'spanClass'" v-if="item.weekday == 0">Monday</span>
                            <span :class="'spanClass'" v-else-if="item.weekday == 1">Tuesday</span>
                            <span :class="'spanClass'" v-else-if="item.weekday == 2">Wednesday</span>
                            <span :class="'spanClass'" v-else-if="item.weekday == 3">Thursday</span>
                            <span :class="'spanClass'" v-else-if="item.weekday == 4">Friday</span>
                            <span :class="'spanClass'" v-else-if="item.weekday == 5">Saturday</span>
                            <span :class="'spanClass'" v-else>Sunday</span>
                        </template>
                        <!-- <span class="spanClass">Start:{{item.start_time}}</span>
                        <span class="spanClass">End:{{item.end_time}}</span> -->
                        <span class="spanClass">Interval Time:{{item.interval_time/3600}}H</span>
                        <el-button size="mini"  type="danger" @click="deletschedule(index)">X</el-button>
                      </li>
                    </ul>
                </div>
                <!-- Rules Tag -->
                <el-form-item label="Rules Tag" prop="tag"> 
                  <el-input v-model="ruleForm.tag" :style="'width: 400px;'"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">Save</el-button>
                  <el-button class="reset_button" @click="resetForm()">Reset</el-button>
                </el-form-item>
          </el-form>
              


          <el-form :model="serchProduct" :rules="searchRules" ref="serchProduct" label-width="100px" class="demo-serchProduct searchContent">
            <!-- Rules Type -->
            <el-form-item label="Rules Type" prop="">
                <el-select v-model="serchProduct.Rule_type" :style="'width: 400px;'" @change="dataSelect">
                  <el-option
                    v-for="item in ruleTypeArray"
                    :key="item.value" 
                    :label="item.label"
                    :value="item.value">
                  </el-option>  
                </el-select>
            </el-form-item>
            <!-- Category -->
            <el-form-item label="Category">
                <el-select v-model="serchProduct.Category" :style="'width: 400px;'">
                  <el-option :label="'All'" :value="''"> </el-option>
                  <el-option v-for="item in CategoryArray" :key="item.value" :label="item.title" :value="item.id"> </el-option>
                </el-select>
            </el-form-item>
            <!-- Product Name -->
            <el-form-item label="Product Name" prop="product__name" >
                <el-input v-model="serchProduct.product__name" :style="'width: 400px;'"></el-input>
                  <i class="iconfont icon-jiahao"  @click="scheduleCategory"></i>
            </el-form-item>
            <!-- 没有数据处于隐藏状态 -->
            <div v-if="serchProduct.titleArray.length>0">
                <ul class="scheduleRuleList">
                  <li class="scheduleRuleList_li" v-for="(item,index) in serchProduct.titleArray" :key="item.index">
                    <span class="spanTitle">{{item.title}}</span>
                    <span @click="clearTitle(index)"><i class="iconfont icon-chahao"></i></span>
                  </li>
                </ul>
            </div>
            <!-- Product Online Time -->
            <el-form-item label="Product Online Time" class="Product_box">
                <span :class="'Product_time'" v-if="serchProduct.Rule_type == 0">If you don't choose the product online time, the system will send all online products that match this category name by default.</span>
                <el-date-picker  v-model="serchProduct.publish_begin_time" type="date" default-time="12:00:00"></el-date-picker>
                  &nbsp;<span> -- </span>&nbsp;
                <el-date-picker  v-model="serchProduct.publish_end_time" type="date" :disabled="disabledType=='1'" default-time="12:00:00"></el-date-picker>
                <i class="iconfont icon-wenhao"></i>
            </el-form-item>
            <!-- Number of Products -->
            <el-form-item label="Number of Products">
              <el-button type="primary"  @click="serchProductFun('serchProduct')" :style="'margin-right:20px;'">Search</el-button>
              <span>{{ruleForm.product_list.length}}个</span>
              <div class="el-form-item__error" v-if="productListState == 2">Please find the goods that meet the following conditions</div>
            </el-form-item>
          </el-form>
        </el-dialog>
    </div>
</template>

<script>

import * as base from '../../assets/js/base'
  export default {
    name: "ruleAdd",
    props: {
      dialog: Object
    },
    data() {
      var RuleTimeFun = (rule, value, callback) => {
        var _nowTime = new Date().getTime();
        var _startTime = new Date(this.ruleForm.ruleTime[0]).getTime();
        if(this.ruleForm.ruleTime.length == 2){
            if (_startTime < _nowTime) {
              return callback(new Error('Start time should be greater than current time!'));
            }else{
              var _endTime = new Date(this.ruleForm.ruleTime[1]).getTime();
              if(_endTime - _startTime < 1000 * 60 * 30){
                return callback(new Error('End time should be half an hour late from the start time at least!'));
              }else{
                callback();
              }
            }
        }else{
          return callback(new Error('Please choose the date!'));
        }
      };
      var productNameFun = (rule, value, callback) => {
        if(this.serchProduct.Category){
            callback();
        }else{
         if(this.serchProduct.product__name){
            callback();
         }else{
           return callback(new Error('Please enter the name of the product.'));
         } 
        }
      };
      
      return {
          ruleTypeArray: [
            {value: '0', label: 'Short Term Rule'},
            {value: '1',label: 'Long Term Rule'}
          ],
          CategoryArray: [],
          disabledType:'1', 
          website:'Chicdb',    
          pinterestArray:[],//Pinterest下拉框数据
          boardArray:[],     //board下拉框数据
          productListState:1,      //商品列表错误提示是否展示  1隐藏 2展示
          scheduleRruleState:1,         //添加时区的错误提示
          timeValState:1,          //时间区间错误提示是否展示  1隐藏 2展示
          scheduleRule:{//时间区间临时数据
              weekday:"0",  
              // start_time:"",  
              // end_time:"",  
              interval_time:"1800", 
              timeVal:[new Date(2016, 9, 10, 8, 0), new Date(2016, 9, 10, 16, 0)], //El的展示数据
          }, 
          weekArray:[//时间区间的星期几
            {"label":"Monday","value":"0"},
            {"label":"Tuesday","value":"1"},
            {"label":"Wednesday","value":"2"},
            {"label":"Thursday","value":"3"},
            {"label":"Friday","value":"4"},
            {"label":"Saturday","value":"5"},
            {"label":"Sunday","value":"6"},
          ],
          publishTimeArray:[//发布频率的时间选择
            {"label":"0.5H","value":"1800"},
            {"label":"1H","value":"3600"},
            {"label":"1.5H","value":"5400"},
            {"label":"2H","value":"7200"},
          ],
          serchProduct:{
            Rule_type:'0', //默认第一个
            Category:'',
            // start_time:'',   //产品上架时间初始数据
            // Ending_time:'',   //产品特殊时间初始数据
            publish_begin_time:'',//产品上架时间最终数据
            publish_end_time:'',   
            begin_time:'',        //产品特殊时间最终数据
            end_time:'',
            store:'',
            product__name:'',      
            sale_sign:'>',           // 销量标识符
            sale:'',           //产品销量
            scan_sign:'>',       //浏览量标识符
            scan:'',           // 浏览量
            titleArray:[],   //查询多个条件拼接起来的
          },
          ruleForm: {//最终添加规则需要提交过去的对象
            // start_time:'',   //产品上架时间初始数据
            // Ending_time:'',   //产品特殊时间初始数据
            pinterest:'',
            board:'',
            ruleTime:'',    //规则有效期的初始数据来源
            start_time:'',           //规则有效期开始时间
            end_time:'',             //规则有效期结束时间
            schedule_rule:[],         // 
            product_list:[],        //满足条件的商品列表  
            tag:'',      //规则标签
          },
          rules: {
            pinterest: [{ required: true, message: 'Please choose pinterest', trigger: 'change' }],
            board: [{ required: true, message: 'Please choose board', trigger: 'change' }],
            ruleTime: [{required: true,  trigger: 'change',validator:RuleTimeFun }],
            // schedule_rule:[{required: true,validator:scheduleRuleFun}],
            tag: [{ required: true, message: 'Please enter the label', trigger: 'blur' },],
          },
          searchRules:{
            product__name: [{ message: 'Please enter the name of the product.', trigger: 'blur',validator:productNameFun },],
            data1:[{required: true, message: 'Please choose the shelf time of the goods.', trigger: 'change' }],
            data2:[{required: true, message: 'Please select the browsing volume of the goods.Sales time', trigger: 'change' }],
          },
      };
    },
    mounted() {
        this.dataSelect();
    },
    watch:{
      dialog:function (){
        this.init();
        this.$axios.get("/api/v1/rule/pinterest_account_board/?authorized=[1]")
        .then(res => {
            if(res.data.code == 1){
              this.pinterestArray = res.data.data;
              if(res.data.data.length>0){
                this.ruleForm.pinterest = res.data.data[0].id;
              }else{
                this.ruleForm.pinterest = '';
              }
              this.pinterestChange();
            }
        });
        this.$axios(`/api/v1/store/`).then(res => {
          if (res.data.code == 1) {
            this.website = res.data.data[0].name;
          } else {
            this.$message({
              message: "code Abnormal!",
              type: "warning",
              center: true
            });
          }
        });
        this.$axios.get(`/api/v1/rule/get_collections/`)
          .then(res => {      
              if(res.data.code==1){
                this.CategoryArray = res.data.data;
            }
          })  
        this.$axios.get(`/api/v1/account/select_time/`)
          .then(res =>{
            if(res.data.code==1){
               this.publishTimeArray = res.data.data;
            }
          })
      }
    },
    methods: {
      init(){
        let _nowTime = base.dateFormat(new Date());
        this.serchProduct.publish_begin_time = new Date(_nowTime);
        this.serchProduct.publish_end_time = new Date(2099, 8, 9, 18, 40);
      },
      submitForm(formName) {
          // 最终提交
        if(this.ruleForm.schedule_rule.length == 0){
          //检查是否有满足条件的区间
          this.scheduleRruleState = 2;
        }else{
          this.scheduleRruleState = 1;
        }
        if(this.ruleForm.product_list.length == 0){
          //检查是否有满足条件的商品
          this.productListState = 2;
        }else{
            this.productListState = 1;
        }   
        this.$refs[formName].validate((valid) => {
          if (valid) {
              if(this.scheduleRruleState == 1 && this.productListState == 1){
              var _thisruleForm = {
                  pinterest:this.ruleForm.pinterest,
                  board:this.ruleForm.board,
                  start_time:base.dateFormat(this.ruleForm.ruleTime[0]),           //规则有效期开始时间
                  end_time:base.dateFormat(this.ruleForm.ruleTime[1]),             //规则有效期结束时间
                  schedule_rule:JSON.stringify(this.ruleForm.schedule_rule),         // 
                  product_list:JSON.stringify(this.ruleForm.product_list),        //满足条件的商品列表  
                  tag:this.ruleForm.tag,      //规则标签
                  product_start:base.dateFormat(this.serchProduct.publish_begin_time),           //产品的发布时间范围起点
                  product_end:base.dateFormat(this.serchProduct.publish_end_time),             //产品的发布时间范围终点
                  product_key:this.serchProduct.product__name,      //产品的搜索关键字
                  pinterest_account:this.ruleForm.pinterest,      //pinterest账号id 
                }
                this.$axios.post(`/api/v1/rule/`, _thisruleForm)
                .then(res => {
                    if(res.data.code == 1){
                        this.$message({
                          message: "Added Successfully!",
                          type: "success"
                        });
                        this.dialog.show = false;
                        this.$parent.init();
                    }else{
                      this.$message("Failure to add!");
                    }
                })
                .catch(error => {
                    this.$message("Interface timeout!");
                }); 
              }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.$refs['ruleForm'].resetFields();
        this.$refs['serchProduct'].resetFields();
      },
      scheduleRuleFun(){
        var sTime = new Date(this.scheduleRule.timeVal[0]).getTime();
        var eTime = new Date(this.scheduleRule.timeVal[1]).getTime();
        var ctime = eTime - sTime;
        if(ctime>=1800000){
              this.timeValState = 1;
              // this.scheduleRule.start_time = base.dateFormat(this.scheduleRule.timeVal[0],"hour");
              // this.scheduleRule.end_time = base.dateFormat(this.scheduleRule.timeVal[1],"hour");
              var _thisObj = {
                    weekday:"0",  
                    // start_time:"",  
                    // end_time:"",  
                    interval_time:"1800"
                };
              _thisObj.weekday = this.scheduleRule.weekday;
              // _thisObj.start_time = this.scheduleRule.start_time;
              // _thisObj.end_time = this.scheduleRule.end_time;
              _thisObj.interval_time = this.scheduleRule.interval_time;
              this.ruleForm.schedule_rule.push(_thisObj);
        }else{
            this.timeValState = 2;
        }
        console.log(this.ruleForm.schedule_rule.length)
        if(this.ruleForm.schedule_rule.length == 0){
          //检查是否有满足条件的商品
          this.scheduleRruleState = 2;
        }else{
          this.scheduleRruleState = 1;
        }
      },
      deletschedule(index){
        //删除指定分区
        this.ruleForm.schedule_rule.splice(index,1);
      },
      serchProductFun(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
              var url = "/api/v1/rule/search_product/?index=1";
              if(this.serchProduct.publish_begin_time != ""){
                  url += "&publish_begin_time="+ base.dateFormat(this.serchProduct.publish_begin_time);
              }
              if(this.serchProduct.publish_end_time != ""){
                  url += "&publish_end_time="+ base.dateFormat(this.serchProduct.publish_end_time);
              }
              if(this.serchProduct.product__name != ""){
                  url += "&product__name="+this.serchProduct.product__name;
              }
              if(this.serchProduct.sale != ""){
                  url += "&sale_sign="+this.serchProduct.sale_sign;
                  url += "&sale="+this.serchProduct.sale;
              }
              if(this.serchProduct.scan != ""){
                  url += "&scan_sign="+this.serchProduct.scan_sign;
                  url += "&scan="+this.serchProduct.scan;
              }
              this.$axios.get(url).then(res => {
                  if(res.data.code == 1){
                    this.ruleForm.product_list = res.data.data;
                  }else{
                    this.$message("Failed to get the list of goods!");
                  }
              })  
    
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      dataSelect(){        
        //  0. Short Term Rule  1.Long Term Rule
        if(this.serchProduct.Rule_type == 0){
          // 当选择Long Term Rule时间选择框禁用
              this.disabledType = 0;
        }else{
              this.disabledType = 1;
        }
      },
      pinterestChange(){
        //pinterest账户变更触发的事件
        this.pinterestArray.map(e => {
          if(e.id == this.ruleForm.pinterest){
            if(e.board_pinterest_account.length>0){
              this.ruleForm.board = e.board_pinterest_account[0].id;
            }else{
              this.ruleForm.board = '';
            }
          }
        });   
      },
      scheduleCategory(){
        let obj = {
          title:this.serchProduct.product__name,
        }
        this.serchProduct.product__name = '';
        this.serchProduct.titleArray.push(obj)
      },
      clearTitle(index){
        this.serchProduct.titleArray.splice(index,1);
      },
    }
  }
</script>
<style>
.ruleAdd .el-dialog{width: 70%;height: 86%;overflow: auto;margin: 0;left: 15%;top: -10%;}
.ruleAdd .el-form-item__label{width:165px!important;}
.ruleAdd .el-form-item__content{margin-left:165px!important;}
.ruleAdd .W20{width:20%;margin-right:2%;}
.ruleAdd .W36{width:36%;margin-right:2%;}
.ruleAdd .W40{width:40%;margin-right:2%;}
.ruleAdd .W54{width:54%;margin-right:2%;}
.ruleAdd .W60{width:60%;margin-right:2%;}
.ruleAdd .scheduleRuleList{margin-left:145px;padding:0;margin-bottom:0px;list-style:none;margin-top: -10px;}
.ruleAdd .scheduleRuleList li{font-size:15px;margin-bottom:5px; padding-left:22px;}
.ruleAdd .scheduleRuleList li span.spanClass{margin-right: 15px;}
.ruleAdd .scheduleRuleList li .spanTitle{color: #169BD5!important;margin-right: 5px;}
.ruleAdd .el-dialog__body{position: relative;}
.ruleAdd .contentBg{height:300px;}
.ruleAdd .searchContent{position: absolute;top: 82px;}
.ruleAdd .specialTime{  position: absolute;left: 346px;}
.ruleAdd input::-webkit-outer-spin-button,
.ruleAdd input::-webkit-inner-spin-button {-webkit-appearance: none;}
.ruleAdd input[type="number"]{ -moz-appearance: textfield;}
.ruleAdd .reset_button{display: inline-block!important; margin-left: 20px!important; color: #fff;background-color: rgba(204, 204, 204, 1);}
.ruleAdd .Product_box{position: relative;width: 1250px;}
.ruleAdd .Product_time{display: none; position: absolute;left: 515px;line-height: 20px;}
.ruleAdd .Product_box:hover .Product_time{display: block;}
.ruleAdd .icon-jiahao{font-size: 20px;padding-left: 5px;}
.ruleAdd .icon-wenhao{font-size: 20px;padding-left: 5px;}
.ruleAdd .Bodycon{color: #169BD5;font-size: 13px;padding-right: 15px;}
.ruleAdd .MiniDress{color: #169BD5;font-size: 13px;}
.ruleAdd .icon-chahao{color: gray!important; font-size: 10px;}
.ruleAdd .iconfont{cursor: pointer;}
.ruleAdd .scheduleRuleList .scheduleRuleList_li{display: inline-block;}
</style>
