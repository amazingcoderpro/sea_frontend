<template>
    <div class="ruleAdd">
         <el-dialog  :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false' :modal-append-to-body="false" @close='resetForm'>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="Website">
              <span style="color:red;font-size:16px;font-weight: 600;">{{website}}</span>
            </el-form-item>
            <el-form-item label=" " :class="'contentBg'">
          </el-form-item>
                <!--  Pinterest Account -->
                <el-form-item label=" Pinterest Account">
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
                <!--  Posting Date -->
              <el-form-item label="Posting Date"  prop="postingDate">
                  <el-date-picker  v-model="ruleForm.start_time" type="date" default-time="12:00:00"></el-date-picker>
                    &nbsp;<span> -- </span>&nbsp;
                  <el-date-picker  v-model="ruleForm.end_time" type="date" default-time="12:00:00"></el-date-picker>
              </el-form-item>
                <!-- Posting Time -->
                <el-form-item label="Posting Time">
                  <el-select :class="'W20'" v-model="scheduleRule.weekday" @change="weekdayChange">
                    <el-option v-for="item in weekArray" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                  </el-select>
                  <!-- 时间选择器 -->
                  <template>
                    <template v-if="scheduleRule.weekday != 'every'" >
                        <el-select :class="'W20'" v-model="scheduleRule.interval_time">
                          <template v-for="(item,index) in publishTimeArray" >
                            <template v-if="item.S == 0">
                              <el-option :key="index" :label="item.T" :value="item.T" disabled=""></el-option>
                            </template>
                            <template v-else>
                              <el-option :key="index" :label="item.T" :value="item.T"></el-option>
                            </template>
                          </template>
                        </el-select>
                    </template>
                    <template v-else>
                        <el-select :class="'W20'" v-model="scheduleRule.interval_time">
                          <template v-for="(item,index) in publishTimeArray" >
                              <el-option :key="index" :label="item" :value="item"></el-option>
                          </template>
                        </el-select>

                    </template>
                  </template>

                  <el-button type="primary"  @click="scheduleRuleFun()">Add</el-button>
                  <div class="el-form-item__error" v-if="scheduleRruleState == 2">Please add intervals</div>
                </el-form-item>
                <!-- 时间区间的列表，没有数据是处于隐藏状态 -->
                <!-- <div v-if="ruleForm.schedule_rule.length>0">
                    <ul class="scheduleRuleList">
                      <li v-for="(item,index) in ruleForm.schedule_rule" :key="item.value">
                        <span class="spanClass">第{{index+1}}条</span>
                        <template>
                            <span :class="'spanClass'" v-if="item.weekday == 'mon' ">Monday</span>
                            <span :class="'spanClass'" v-else-if="item.weekday == 'tues'">Tuesday</span>
                            <span :class="'spanClass'" v-else-if="item.weekday == 'wed'">Wednesday</span>
                            <span :class="'spanClass'" v-else-if="item.weekday == 'thur'">Thursday</span>
                            <span :class="'spanClass'" v-else-if="item.weekday == 'fri'">Friday</span>
                            <span :class="'spanClass'" v-else-if="item.weekday == 'sat'">Saturday</span>
                            <span :class="'spanClass'" v-else-if="item.weekday == 'sun'">Sunday</span>
                            <span :class="'spanClass'" v-else>every</span>
                        </template>
                        <span class="spanClass">{{item.interval_time}}</span>
                        <el-button size="mini"  type="danger" @click="deletschedule(index)">X</el-button>
                      </li>
                    </ul>
                </div> -->
                <div v-if="this.ruleForm.schedule_rule_big[0].post_time.length>0">
                    <div class="weekDayLable">Monday</div>
                    <ul  class="weekDayUl">
                      <li v-for="(item,index) in this.ruleForm.schedule_rule_big[0].post_time" :key="item.value">
                        <span class="spanClass">{{item}}</span>
                        <el-button size="mini"  type="danger" @click="deletschedule(0,index)">X</el-button>
                      </li>
                    </ul>
                </div>
                <div v-if="this.ruleForm.schedule_rule_big[1].post_time.length>0">
                    <div class="weekDayLable">Tuesday</div>
                    <ul  class="weekDayUl">
                      <li v-for="(item,index) in this.ruleForm.schedule_rule_big[1].post_time" :key="item.value">
                        <span class="spanClass">{{item}}</span>
                        <el-button size="mini"  type="danger" @click="deletschedule(1,index)">X</el-button>
                      </li>
                    </ul>
                </div>
                <div v-if="this.ruleForm.schedule_rule_big[2].post_time.length>0">
                    <div class="weekDayLable">Wednesday</div>
                    <ul  class="weekDayUl">
                      <li v-for="(item,index) in this.ruleForm.schedule_rule_big[2].post_time" :key="item.value">
                        <span class="spanClass">{{item}}</span>
                        <el-button size="mini"  type="danger" @click="deletschedule(2,index)">X</el-button>
                      </li>
                    </ul>
                </div>
                <div v-if="this.ruleForm.schedule_rule_big[3].post_time.length>0">
                    <div class="weekDayLable">Thursday</div>
                    <ul  class="weekDayUl">
                      <li v-for="(item,index) in this.ruleForm.schedule_rule_big[3].post_time" :key="item.value">
                        <span class="spanClass">{{item}}</span>
                        <el-button size="mini"  type="danger" @click="deletschedule(3,index)">X</el-button>
                      </li>
                    </ul>
                </div>
                <div v-if="this.ruleForm.schedule_rule_big[4].post_time.length>0">
                    <div class="weekDayLable">Friday</div>
                    <ul  class="weekDayUl">
                      <li v-for="(item,index) in this.ruleForm.schedule_rule_big[4].post_time" :key="item.value">
                        <span class="spanClass">{{item}}</span>
                        <el-button size="mini"  type="danger" @click="deletschedule(4,index)">X</el-button>
                      </li>
                    </ul>
                </div>
                <div v-if="this.ruleForm.schedule_rule_big[5].post_time.length>0">
                    <div class="weekDayLable">Saturday</div>
                    <ul  class="weekDayUl">
                      <li v-for="(item,index) in this.ruleForm.schedule_rule_big[5].post_time" :key="item.value">
                        <span class="spanClass">{{item}}</span>
                        <el-button size="mini"  type="danger" @click="deletschedule(5,index)">X</el-button>
                      </li>
                    </ul>
                </div>
                <div v-if="this.ruleForm.schedule_rule_big[6].post_time.length>0">
                    <div class="weekDayLable">Sunday</div>
                    <ul  class="weekDayUl">
                      <li v-for="(item,index) in this.ruleForm.schedule_rule_big[6].post_time" :key="item.value">
                        <span class="spanClass">{{item}}</span>
                        <el-button size="mini"  type="danger" @click="deletschedule(6,index)">X</el-button>
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
            <!-- Category -->
            <el-form-item label="Category">
                <el-select v-model="serchProduct.Category"  multiple :style="'width: 400px;'">
                  <el-option v-for="item in CategoryArray" :key="item.value" :label="item.title" :value="item.id"> </el-option>
                </el-select>
            </el-form-item>
            <!-- Category Name -->
            <el-form-item label="Product Name" prop="product__name" >
                <el-input v-model="serchProduct.product__name" :style="'width: 400px;'"></el-input>
            </el-form-item>
            <!-- 没有数据处于隐藏状态 -->
            <div v-if="serchProduct.titleArray.length>0">
                <ul class="scheduleRuleList">
                  <li class="scheduleRuleList_li" v-for="(item,index) in serchProduct.titleArray" :key="item.index">
                    <span class="spanTitle">{{item}}</span>
                    <span @click="clearTitle(index)"><i class="iconfont icon-chahao"></i></span>
                  </li>
                </ul>
            </div>
            <!-- Product Online Time -->
            <el-form-item label="Product Online Time"  prop="product_time">
                <span :class="'Product_time'">If you don't choose the product online time, the system will send all online products that match this category name by default.</span>
                <el-date-picker  v-model="serchProduct.publish_begin_time" type="date" default-time="12:00:00"></el-date-picker>
                  &nbsp;<span> -- </span>&nbsp;
                <el-date-picker  v-model="serchProduct.publish_end_time" type="date" default-time="12:00:00"></el-date-picker>
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
        if(this.serchProduct.Category.length>0){
            callback();
        }else{
         if(this.serchProduct.product__name){
            callback();
         }else{
           if(this.serchProduct.titleArray.length>0){
             callback();
           }else{
            return callback(new Error('Please enter the name of the product.'));
           }
         } 
        }
      };
      var productTimeFun = (rule, value, callback) => {
          if(this.serchProduct.publish_begin_time){
            if(this.serchProduct.Category.length == 0){
              if(this.serchProduct.publish_end_time){
                callback();
              }else{
                return callback(new Error('Please enter the end time of the product.'));
              }
            }else{
                callback();
            }
          }else{
            return callback(new Error('Please enter the begin time of the product.'));
          }
      };
      var postingDateFun = (rule, value, callback) => {
        // this.ruleForm.start_time
        // this.ruleForm.end_time
        if(this.ruleForm.start_time){
          if(this.ruleForm.end_time){
            callback();
          }else{
            return callback(new Error('Please enter the end time of the posting date.'));
          }
        }else{
          return callback(new Error('Please enter the begin time of the posting date.'));
        }
      };
      return {
          CategoryArray: [],
          website:'Chicdb',    
          pinterestArray:[],//Pinterest下拉框数据
          boardArray:[],     //board下拉框数据
          productListState:1,      //商品列表错误提示是否展示  1隐藏 2展示
          scheduleRruleState:1,         //添加时区的错误提示
          scheduleRule:{//时间区间临时数据
              weekday:"mon",  
              interval_time:"", 
          }, 
          weekArray:[//时间区间的星期几
          {"label":"Every","value":"every"},
          {"label":"Monday","value":"mon"},
          {"label":"Tuesday","value":"tues"},
          {"label":"Wednesday","value":"wed"},
          {"label":"Thursday","value":"thur"},
          {"label":"Friday","value":"fri"},
          {"label":"Saturday","value":"sat"},
          {"label":"Sunday","value":"sun"}
          ],
          publishTimeArray:[],//可以使用的时间
          serchProduct:{
            Rule_type:'0', //默认第一个
            Category:[],
            // start_time:'',   //产品上架时间初始数据
            Ending_time:'',   //产品特殊时间初始数据
            publish_begin_time:'',//产品上架时间最终数据
            publish_end_time:'',   
            begin_time:'',        //产品特殊时间最终数据
            // end_time:'',
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
            schedule_rule_big:[
              {"weekday":0,"start_time":"00:00:00","end_time":"23:59:59","post_time":[]},
              {"weekday":1,"start_time":"00:00:00","end_time":"23:59:59","post_time":[]},
              {"weekday":2,"start_time":"00:00:00","end_time":"23:59:59","post_time":[]},
              {"weekday":3,"start_time":"00:00:00","end_time":"23:59:59","post_time":[]},
              {"weekday":4,"start_time":"00:00:00","end_time":"23:59:59","post_time":[]},
              {"weekday":5,"start_time":"00:00:00","end_time":"23:59:59","post_time":[]},
              {"weekday":6,"start_time":"00:00:00","end_time":"23:59:59","post_time":[]},
              {"weekday":7,"start_time":"00:00:00","end_time":"23:59:59","post_time":[]},
            ],     
            product_list:[],        //满足条件的商品列表  
            tag:'',      //规则标签
          },
          rules: {
            pinterest: [{ required: true, message: 'Please choose pinterest', trigger: 'change' }],
            board: [{ required: true, message: 'Please choose board', trigger: 'change' }],
            ruleTime: [{required: true,  trigger: 'change',validator:RuleTimeFun }],
            postingDate: [{required: true,  trigger: 'change',validator:postingDateFun }],
            tag: [{ required: true, message: 'Please enter the tag', trigger: 'blur' },],
          },
          searchRules:{
            product__name: [{ message: 'Please enter the name of the product.', trigger: 'blur',validator:productNameFun },],
            product_time:[{ trigger: 'change',validator:productTimeFun }],
          },
          bigTimeDate:null,   // 可用时间数据来源
      };
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
        });
      }
    },
    methods: {
      init(){
        let _nowTime = base.dateFormat(new Date());
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
              let _schedule_rule_big = this.changeSchedule();
              if(this.scheduleRruleState == 1 && this.productListState == 1){
                 var _thisruleForm = {
                  pinterest:this.ruleForm.pinterest,
                  board:this.ruleForm.board,
                  product_category_list:JSON.stringify(this.serchProduct.Category),
                  start_time:base.dateFormat(this.ruleForm.start_time),           //规则有效期开始时间
                  end_time:base.dateFormat(this.ruleForm.end_time,"day")+" 23:59:59",             //规则有效期结束时间
                  schedule_rule:JSON.stringify(_schedule_rule_big),         // 规则集合
                  product_list:JSON.stringify(this.ruleForm.product_list),        //满足条件的商品列表  
                  tag:this.ruleForm.tag,      //规则标签
                  product_start:base.dateFormat(this.serchProduct.publish_begin_time),           //产品的发布时间范围起点
                  product_key:this.serchProduct.product__name,      //产品的搜索关键字
                  pinterest_account:this.ruleForm.pinterest,      //pinterest账号id 
                }
                if(this.serchProduct.Category.length == 0){
                    _thisruleForm.product_category_list = "";
                }
                if(this.serchProduct.publish_end_time){
                    _thisruleForm.product_end = base.dateFormat(this.serchProduct.publish_end_time,"day")+" 23:59:59";             //产品的发布时间范围终点   
                }
                this.$axios.post(`/api/v1/rule/`, _thisruleForm)
                .then(res => {
                    if(res.data.code == 1){
                        this.$message({
                          message: "Added Successfully!",
                          type: "success"
                        });
                        this.resetForm();
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
      changeSchedule(){
          let _schedule_rule_big = [] // this.ruleForm.schedule_rule_big;
          this.ruleForm.schedule_rule_big.map(e =>{
            if(e.weekday !=7 && e.post_time.length>0){
              _schedule_rule_big.push(e)
            }
          });
          return _schedule_rule_big;
      },
      scheduleRuleFun(){
        if(this.scheduleRule.interval_time){
          var _thisObj = {
                weekday:"",
                interval_time:"",
            };
          _thisObj.weekday = this.scheduleRule.weekday;
          _thisObj.interval_time = this.scheduleRule.interval_time;
          this.ruleForm.schedule_rule.push(_thisObj);
        }

        if(this.ruleForm.schedule_rule.length == 0){
          this.scheduleRruleState = 2;
        }else{
          this.scheduleRruleState = 1;
        }

        if(this.scheduleRule.interval_time){
          switch(this.scheduleRule.weekday){
            case "mon":
                  if(this.ruleForm.schedule_rule_big[0].post_time.indexOf(this.scheduleRule.interval_time)<0){
                      this.ruleForm.schedule_rule_big[0].post_time.push(this.scheduleRule.interval_time);
                  }
                 break;
            case "tues":
                  if(this.ruleForm.schedule_rule_big[1].post_time.indexOf(this.scheduleRule.interval_time)<0){
                      this.ruleForm.schedule_rule_big[1].post_time.push(this.scheduleRule.interval_time);
                  }
                 break;
            case "wed":
                  if(this.ruleForm.schedule_rule_big[2].post_time.indexOf(this.scheduleRule.interval_time)<0){
                      this.ruleForm.schedule_rule_big[2].post_time.push(this.scheduleRule.interval_time);
                  }
                 break;
            case "thur":
                  if(this.ruleForm.schedule_rule_big[3].post_time.indexOf(this.scheduleRule.interval_time)<0){
                      this.ruleForm.schedule_rule_big[3].post_time.push(this.scheduleRule.interval_time);
                  }
                 break;
            case "fri":
                  if(this.ruleForm.schedule_rule_big[4].post_time.indexOf(this.scheduleRule.interval_time)<0){
                      this.ruleForm.schedule_rule_big[4].post_time.push(this.scheduleRule.interval_time);
                  }
                 break;
            case "sat":
                  if(this.ruleForm.schedule_rule_big[5].post_time.indexOf(this.scheduleRule.interval_time)<0){
                      this.ruleForm.schedule_rule_big[5].post_time.push(this.scheduleRule.interval_time);
                  }
                 break;
            case "sun":
                  if(this.ruleForm.schedule_rule_big[6].post_time.indexOf(this.scheduleRule.interval_time)<0){
                      this.ruleForm.schedule_rule_big[6].post_time.push(this.scheduleRule.interval_time);
                  }
                 break;
            case "every":
                  if(this.ruleForm.schedule_rule_big[7].post_time.indexOf(this.scheduleRule.interval_time)<0){
                      this.ruleForm.schedule_rule_big[7].post_time.push(this.scheduleRule.interval_time);
                      for(var i = 0;i<this.ruleForm.schedule_rule_big.length;i++){
                        if(this.ruleForm.schedule_rule_big[i].post_time.indexOf(this.scheduleRule.interval_time)<0){
                          this.ruleForm.schedule_rule_big[i].post_time.push(this.scheduleRule.interval_time);
                        }
                      }
                  }
                 break;
            default:
              //  默认代码块

          }

        }
      },
      deletschedule(index,index2){
        //删除指定分区
        let _thisTime = this.ruleForm.schedule_rule_big[index].post_time[index2];
        if(this.ruleForm.schedule_rule_big[7].post_time.indexOf(_thisTime)>=0){
          this.ruleForm.schedule_rule_big[7].post_time.splice(this.ruleForm.schedule_rule_big[7].post_time.indexOf(_thisTime),1)
        }
        this.ruleForm.schedule_rule_big[index].post_time.splice(index2,1)
      },
      serchProductFun(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
              var url = "/api/v1/rule/search_product/?index=1";
              if(this.serchProduct.publish_begin_time != ""){
                  url += "&publish_begin_time="+ base.dateFormat(this.serchProduct.publish_begin_time);
              }
              if(this.serchProduct.publish_end_time != "" && this.serchProduct.publish_end_time != null){
                  url += "&publish_end_time="+ base.dateFormat(this.serchProduct.publish_end_time);
              }
              if(this.serchProduct.product__name != ""){
                  url += "&name="+this.serchProduct.product__name;
              }

              if(this.serchProduct.Category.length!=0){
                  url += "&product_category_list="+ JSON.stringify(this.serchProduct.Category);
              }
              // if(this.serchProduct.product__name != ""){
              //     let _thisArray = [];
              //     _thisArray.push(this.serchProduct.product__name)
              //     url += "&name="+JSON.stringify(_thisArray);
              // }else{
              //   if(this.serchProduct.titleArray.length>0){
              //     url += "&name="+JSON.stringify(this.serchProduct.titleArray);
              //   }
              // }
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
      this.$axios.get(`/api/v1/account/select_time/?account_id=${this.ruleForm.pinterest}`)
        .then(res =>{
          if(res.data.code==1){
            this.bigTimeDate = res.data.data;
            this.weekdayChange();
            this.ruleForm.schedule_rule_big = [
                {"weekday":0,"start_time":"00:00:00","end_time":"23:59:59","post_time":[]},
                {"weekday":1,"start_time":"00:00:00","end_time":"23:59:59","post_time":[]},
                {"weekday":2,"start_time":"00:00:00","end_time":"23:59:59","post_time":[]},
                {"weekday":3,"start_time":"00:00:00","end_time":"23:59:59","post_time":[]},
                {"weekday":4,"start_time":"00:00:00","end_time":"23:59:59","post_time":[]},
                {"weekday":5,"start_time":"00:00:00","end_time":"23:59:59","post_time":[]},
                {"weekday":6,"start_time":"00:00:00","end_time":"23:59:59","post_time":[]},
                {"weekday":7,"start_time":"00:00:00","end_time":"23:59:59","post_time":[]},
              ]
          }
        });
      },
      weekdayChange(){
          if(this.bigTimeDate[this.scheduleRule.weekday].state == 1 && this.bigTimeDate[this.scheduleRule.weekday].time.length>0){
              this.publishTimeArray = this.bigTimeDate[this.scheduleRule.weekday].time;
              if(this.scheduleRule.weekday!="every"){
                this.scheduleRule.interval_time = this.bigTimeDate[this.scheduleRule.weekday].time[0].T;
              }
          }else{
              this.publishTimeArray = [];
          }
      },
      scheduleCategory(){
        if(this.serchProduct.product__name!=''){
          this.serchProduct.titleArray.push(this.serchProduct.product__name)
          this.serchProduct.product__name = '';
        }
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
.ruleAdd .contentBg{height:225px;}
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
.ruleAdd .weekDayLable{margin-left:165px;margin-top:4px;display:inline-block;vertical-align:top;width:89px;}
.ruleAdd .weekDayUl{display:inline-block;vertical-align:top;margin:0;list-style:none;padding-left:10px;width:calc(100% - 400px);margin-bottom:3px;}
.ruleAdd .weekDayUl li{padding:3px;display:inline-block;margin-right:7px;}
.ruleAdd .weekDayUl li button{margin-left:3px;}

</style>
