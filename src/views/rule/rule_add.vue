
<template>
    <div class="ruleAdd">
         <el-dialog  :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false' :modal-append-to-body="false">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="Website">
              <span style="color:red;font-size:16px;font-weight: 600;">{{website}}</span>
            </el-form-item>
            <el-form-item label="选择Pinterest账户">
              <el-select v-model="ruleForm.pinterest" placeholder="请选择Pinterest账户"  @change="pinterestChange">
                <el-option v-for="(item,index) in pinterestArray" :key="index" :label="item.account_uri" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择Board" prop="board">
              <el-select v-model="ruleForm.board" placeholder="请选择选择Board">
                <template v-for="item in pinterestArray">
                  <template v-if="item.id == ruleForm.pinterest">
                     <el-option v-for="(items,index) in item.board_pinterest_account" :key="index" :label="items.name" :value="items.id"> </el-option>
                  </template>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="规则有效期" prop="ruleTime">
              <div class="block">
                  <el-date-picker v-model="ruleForm.ruleTime" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']">
                  </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="时间区间" prop="schedule_rule">
              <el-select :class="'W20'" v-model="scheduleRule.weekday" placeholder="请选择日期">
                <el-option v-for="item in weekArray" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
              <el-time-picker :class="'W36'" is-range v-model="scheduleRule.timeVal" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
              </el-time-picker>
              <div class="el-form-item__error" :style="'margin-left:154px;'" v-if="timeValState == 2">时间区间必须大于2小时</div>

              <el-select :class="'W20'" v-model="scheduleRule.interval_time" placeholder="发布频率">
                <el-option v-for="item in publishTimeArray" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
              <el-button type="primary"  @click="scheduleRuleFun()">添加时区</el-button>
            </el-form-item>
            <!-- 时间区间的列表，没有数据是处于隐藏状态 -->
            <div v-if="ruleForm.schedule_rule.length>0">
                <ul class="scheduleRuleList">
                  <li v-for="(item,index) in ruleForm.schedule_rule" :key="item.value">
                    <span class="spanClass">第{{index+1}}条</span>
                    <template>
                        <span :class="'spanClass'" v-if="item.weekday == 0">星期一</span>
                        <span :class="'spanClass'" v-else-if="item.weekday == 1">星期二</span>
                        <span :class="'spanClass'" v-else-if="item.weekday == 2">星期三</span>
                        <span :class="'spanClass'" v-else-if="item.weekday == 3">星期四</span>
                        <span :class="'spanClass'" v-else-if="item.weekday == 4">星期五</span>
                        <span :class="'spanClass'" v-else-if="item.weekday == 5">星期六</span>
                        <span :class="'spanClass'" v-else>星期天</span>
                    </template>
                    <span class="spanClass">开始时间:{{item.start_time}}</span>
                    <span class="spanClass">结束时间:{{item.end_time}}</span>
                    <span class="spanClass">发布频率:{{item.interval_time/3600}}H</span>
                    <el-button size="mini"  type="danger" @click="deletschedule(index)">X</el-button>
                  </li>
                </ul>
            </div>
            <el-form-item label="规则标签" prop="tag">
              <el-input v-model="ruleForm.tag"></el-input>
            </el-form-item>
            <el-form-item label=" " :class="'contentBg'">
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
          <el-form :model="serchProduct" :rules="searchRules" ref="serchProduct" label-width="100px" class="demo-serchProduct searchContent">
            <el-form-item label="可发布产品数量">
              <span>{{ruleForm.product_list.length}}个</span>
              <el-button type="primary"  @click="serchProductFun('serchProduct')" :style="'margin-left:20px;'">查询</el-button>
              <div class="el-form-item__error" v-if="productListState == 2">请查询出满足以下条件的商品</div>
            </el-form-item>
            <el-form-item label="产品名称" prop="product__name">
                <el-input v-model="serchProduct.product__name"></el-input>
            </el-form-item>
            <el-form-item label="产品上架时间" prop="data1">
                <el-date-picker v-model="serchProduct.data1" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="产品时间" prop="data2">
                <el-date-picker v-model="serchProduct.data2" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="产品浏览量" prop="scan">
              <el-select :class="'W20'" v-model="serchProduct.scan_sign">
                <el-option  :label="'='" :value="'=='"> </el-option>
                <el-option  :label="'>'" :value="'>'"> </el-option>
                <el-option  :label="'<'" :value="'<'"> </el-option>
                <el-option  :label="'>='" :value="'>='"> </el-option>
                <el-option  :label="'<='" :value="'<='"> </el-option>
              </el-select>
              <el-input :class="'W36'" v-model="serchProduct.scan" placeholder="请输入产品浏览量"></el-input>
            </el-form-item>
            <el-form-item label="产品销量" prop="sale">
              <el-select :class="'W20'"  v-model="serchProduct.sale_sign">
                <el-option  :label="'='" :value="'=='"> </el-option>
                <el-option  :label="'>'" :value="'>'"> </el-option>
                <el-option  :label="'<'" :value="'<'"> </el-option>
                <el-option  :label="'>='" :value="'>='"> </el-option>
                <el-option  :label="'<='" :value="'<='"> </el-option>
              </el-select>
              <el-input :class="'W36'" v-model="serchProduct.sale" placeholder="请输入产品销量"></el-input>
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
      var scheduleRuleFun = (rule, value, callback) => {
        if (this.ruleForm.schedule_rule.length == 0) {
          return callback(new Error('请添加区间'));
        }else{
          callback();
        }
      };
      return {
          website:'Chicdb',    
          pinterestArray:[],//Pinterest下拉框数据
          boardArray:[],     //board下拉框数据
          productListState:1,      //商品列表错误提示是否展示  1隐藏 2展示
          timeValState:1,          //时间区间错误提示是否展示  1隐藏 2展示
          scheduleRule:{//时间区间临时数据
              weekday:"0",  
              start_time:"",  
              end_time:"",  
              interval_time:"1800", 
              timeVal:[new Date(2016, 9, 10, 8, 0), new Date(2016, 9, 10, 16, 0)], //El的展示数据
          }, 
          weekArray:[//时间区间的星期几
            {"label":"星期一","value":"0"},
            {"label":"星期二","value":"1"},
            {"label":"星期三","value":"2"},
            {"label":"星期四","value":"3"},
            {"label":"星期五","value":"4"},
            {"label":"星期六","value":"5"},
            {"label":"星期天","value":"6"},
          ],
          publishTimeArray:[//发布频率的时间选择
            {"label":"0.5H","value":"1800"},
            {"label":"1H","value":"3600"},
            {"label":"1.5H","value":"5400"},
            {"label":"2H","value":"7200"},
          ],
          serchProduct:{
            data1:[new Date(2019, 4, 1, 8, 0), new Date(2019, 8, 1, 16, 0)],   //产品上架时间初始数据
            data2:[new Date(2019, 4, 1, 8, 0), new Date(2019, 8, 1, 16, 0)],   //产品特殊时间初始数据
            publish_begin_time:'',//产品上架时间最终数据
            publish_end_time:'',   
            begin_time:'',        //产品特殊时间最终数据
            end_time:'',
            store:'',
            product__name:'男',      
            sale_sign:'>',           // 销量标识符
            sale:'',           //产品销量
            scan_sign:'>',       //浏览量标识符
            scan:'1',           // 浏览量
          },
          ruleForm: {//最终添加规则需要提交过去的对象
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
            pinterest: [{ required: true, message: '请选择pinterest', trigger: 'change' }],
            board: [{ required: true, message: '请选择board', trigger: 'change' }],
            ruleTime: [{required: true, message: '请选择日期', trigger: 'change' }],
            schedule_rule:[{required: true,validator:scheduleRuleFun}],
            tag: [{ required: true, message: '请输入标签', trigger: 'blur' },],
          },
          searchRules:{
            product__name: [{ required: true, message: '请输入商品名', trigger: 'blur' },],
            data1:[{required: true, message: '请选择商品上架时间', trigger: 'change' }],
            data2:[{required: true, message: '请选择商品特殊时间', trigger: 'change' }],
            // sale: [{ required: true, message: '请输入产品销量', trigger: 'blur' },],
            scan: [{ required: true, message: '请输入产品浏览量', trigger: 'blur' },],
          },

      };
    },
    watch:{
      dialog:function (){
        this.$axios.get("/api/v1/rule/pinterest_account_board/")
        .then(res => {
            if(res.data.code == 1){
              this.pinterestArray = res.data.data;
              this.ruleForm.pinterest = res.data.data[0].id;
              this.pinterestChange();
            }
        })
        .catch(error => {
          this.$message("接口超时!");
        });   
      }
    },
    methods: {
      submitForm(formName) {
          // 最终提交
        this.$refs[formName].validate((valid) => {
          if (valid) {
              if(this.ruleForm.product_list.length == 0){
                //检查是否有满足条件的商品
                this.productListState = 2;
              }else{
                  this.productListState = 1;
                  this.ruleForm.start_time = base.dateFormat(this.ruleForm.ruleTime[0]);
                  this.ruleForm.end_time =  base.dateFormat(this.ruleForm.ruleTime[1]);
                  this.ruleForm.schedule_rule = JSON.stringify(this.ruleForm.schedule_rule);
                  this.ruleForm.product_list = JSON.stringify(this.ruleForm.product_list);
                  console.log(this.ruleForm)
                  this.$axios.post(`/api/v1/rule/`, this.ruleForm).then(res => {
                      if(res.data.code == 1){
                          this.$message({
                            message: "添加成功!",
                            type: "success"
                          });
                          this.dialog.show = false;
                          this.$parent.init();
                      }else{
                        this.$message("添加失败!");
                      }
                  })
                  .catch(error => {
                    this.$message("接口超时!");
                  });  
              }

        
          } else {
            console.log('error submit!!');
            return false;
          }
        });



      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      scheduleRuleFun(){
        // 添加分区需要做的事 把输入框的值，扔进一个scheduleRuleArray 作为最后植入ruleForm.schedule_rule
        var sTime = new Date(this.scheduleRule.timeVal[0]).getTime();
        var eTime = new Date(this.scheduleRule.timeVal[1]).getTime();
        var ctime = eTime - sTime;
        console.log(ctime)
        if(ctime>=7200000){
              this.timeValState = 1;
              //判断选择的时段是否大于两小时 ，不大于两小时不给添加
              this.scheduleRule.start_time = base.dateFormat(this.scheduleRule.timeVal[0],true);// 时间区间 中的时间数据 转成最终数据
              this.scheduleRule.end_time = base.dateFormat(this.scheduleRule.timeVal[1],true);
              var _thisObj = {
                    weekday:"0",  
                    start_time:"",  
                    end_time:"",  
                    interval_time:"1800"
                };
              _thisObj.weekday = this.scheduleRule.weekday;
              _thisObj.start_time = this.scheduleRule.start_time;
              _thisObj.end_time = this.scheduleRule.end_time;
              _thisObj.interval_time = this.scheduleRule.interval_time;
              this.ruleForm.schedule_rule.push(_thisObj);
        }else{
            this.timeValState = 2;
        }
      },
      deletschedule(index){
        //删除指定分区
        this.ruleForm.schedule_rule.splice(index,1);
      },
      serchProductFun(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.serchProduct.publish_begin_time = base.dateFormat(this.serchProduct.data1[0]);
              this.serchProduct.publish_end_time =  base.dateFormat(this.serchProduct.data1[1]);
              this.serchProduct.begin_time = base.dateFormat(this.serchProduct.data2[0]);
              this.serchProduct.end_time =  base.dateFormat(this.serchProduct.data2[1]);
        console.log(this.serchProduct)

              var url = "/api/v1/rule/search_product/?index=1";
              if(this.serchProduct.data1.length == 2){
                  url += "&publish_begin_time="+this.serchProduct.publish_begin_time;
                  url += "&publish_end_time="+this.serchProduct.publish_end_time;
              }
              if(this.serchProduct.data2.length == 2){
                  url += "&begin_time="+this.serchProduct.begin_time;
                  url += "&end_time="+this.serchProduct.end_time;
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
                    this.$message("获取商品列表失败!");
                  }
              })
              .catch(error => {
                this.$message("接口超时!");
              });          
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
            this.ruleForm.board = e.board_pinterest_account[0].id;
          }
        });   
      }
    }
  }
</script>
<style>
.ruleAdd .el-dialog{width: 70%;height: 86%;overflow: auto;margin: 0;left: 15%;top: -10%;}
.ruleAdd .el-form-item__label{width:145px!important;}
.ruleAdd .el-form-item__content{margin-left:145px!important;}
.ruleAdd .W20{width:20%;margin-right:2%;}
.ruleAdd .W36{width:36%;margin-right:2%;}
.ruleAdd .W40{width:40%;margin-right:2%;}
.ruleAdd .W54{width:54%;margin-right:2%;}
.ruleAdd .W60{width:60%;margin-right:2%;}
.ruleAdd .scheduleRuleList{margin-left:145px;padding:0;margin-bottom:22px;list-style:none;}
.ruleAdd .scheduleRuleList li{font-size:14px;color:#606266;margin-bottom:5px;}
.ruleAdd .scheduleRuleList li span.spanClass{margin-right: 15px;}
.ruleAdd .el-dialog__body{position: relative;}
.ruleAdd .contentBg{height:358px;}
.ruleAdd .searchContent{position: absolute;bottom:100px;}
</style>
