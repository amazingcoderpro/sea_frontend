
<template>
    <div class="ruleAdd">
         <el-dialog  :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false' :modal-append-to-body="false">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="Website">
              <span style="color:red;font-size:16px;font-weight: 600;">{{website}}</span>
            </el-form-item>
            <el-form-item label="选择Pinterest账户" >
              <el-select v-model="ruleForm.pinterest" placeholder="请选择Pinterest账户"  @change="pinterestChange">
                <el-option v-for="(item,index) in pinterestArray" :key="index" :label="item.account_uri" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择Board" >
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
                  <el-date-picker v-model="ruleTime" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']">
                  </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="时间区间">
              <el-select :class="'W20'" v-model="scheduleRule.weekday" placeholder="请选择日期">
                <el-option v-for="item in weekArray" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
              <el-time-picker :class="'W36'" is-range v-model="scheduleRule.timeVal" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
              </el-time-picker>
              <el-select :class="'W20'" v-model="scheduleRule.interval_time" placeholder="发布频率">
                <el-option v-for="item in publishTimeArray" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
              <el-button type="primary"  @click="scheduleRuleFun()">添加时区</el-button>
            </el-form-item>
            <!-- 时间区间的列表，没有数据是处于隐藏状态 -->
            <div v-if="scheduleRuleArray.length>0">
                <ul class="scheduleRuleList">
                  <li v-for="(item,index) in scheduleRuleArray" :key="item.value">
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
                    <span class="spanClass">发布频率:{{item.interval_time}}</span>
                    <el-button size="mini"  type="danger" @click="deletschedule(index)">X</el-button>
                  </li>
                </ul>
            </div>
            <el-form-item label="产品类目">
              <el-select :class="'W20'" v-model="stroVal.storOne" @change="firstStorChange">
                <el-option v-for="(item,index) in storList" :index="index" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
              <el-select :class="'W20'" v-model="stroVal.storTwo" @change="twoStorChange">
                <template v-for="item in storList">
                  <template v-if="item.id == stroVal.storOne">
                     <el-option v-for="items in item.child" :key="items.id" :label="items.id" :value="items.id"> </el-option>
                  </template>
                </template>
              </el-select>
              <el-select :class="'W20'" v-model="stroVal.storThree">
                <template v-for="item in storList">
                  <template v-if="item.id == stroVal.storOne">
                    <template v-for="items in item.child">
                        <template v-if="items.id == stroVal.storTwo">
                          <el-option v-for="itemss in items.child" :key="itemss.id" :label="itemss.id" :value="itemss.id"> </el-option>
                        </template>
                    </template>
                  </template>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="产品上架时间">
                <el-date-picker type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="产品浏览量">
              <el-select :class="'W20'" v-model="serchProduct.scan_sign">
                <el-option  :label="'>'" :value="'1'"> </el-option>
                <el-option  :label="'<'" :value="'2'"> </el-option>
              </el-select>
              <el-input :class="'W20'" v-model="serchProduct.scan"></el-input>
            </el-form-item>
            <el-form-item label="产品销量">
              <el-select :class="'W20'"  v-model="serchProduct.sale_sign">
                <el-option  :label="'>'" :value="'1'"> </el-option>
                <el-option  :label="'<'" :value="'2'"> </el-option>
              </el-select>
              <el-input :class="'W20'" v-model="serchProduct.sale"></el-input>
            </el-form-item>
            <el-form-item label="可发布产品数量">
              <span>{{ruleForm.product_list.length}}个</span>
              <el-button type="primary"  @click="serchProduct()">查询可用商品</el-button>
      
            </el-form-item>
            <el-form-item label="规则标签" prop="tag">
              <el-input v-model="ruleForm.tag"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
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
      return {
          website:'Chicdb',    
          pinterestArray:[],//Pinterest下拉框数据
          boardArray:[],     //board下拉框数据
          ruleTime:[new Date(2019, 1, 1, 0, 0), new Date(2019, 1, 1, 0, 0)],    //规则有效期的数据来源
          scheduleRule:{//时间区间临时数据
              weekday:"0",  
              start_time:"",  
              end_time:"",  
              interval_time:"1.5", 
              timeVal:[new Date(2016, 9, 10, 8, 0), new Date(2016, 9, 10, 16, 0)], //El的展示数据
          }, 
          scheduleRuleArray:[],
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
            {"label":"0.5H","value":"0.5"},
            {"label":"1H","value":"1"},
            {"label":"1.5H","value":"1.5"},
            {"label":"2H","value":"2"},
          ],
          stroVal:{       //产品类目三级菜单
              storOne:'1',
              storTwo:'11',
              storThree:'111'
          },
          storList:[    //商品分类列表
            {
              id:'1',
              name:'一',
              child:[
                {
                  id:'11',
                  child:[
                    {id:'111'},
                    {id:'112'}
                  ]
                },
                {
                  id:'12',
                  child:[
                    {id:'111'},
                    {id:'112'}
                  ]
                }
              ]
            },
            {
              id:'2',
              name:'二',
              child:[
                {
                  id:'21',
                  child:[
                    {id:'211'},
                    {id:'212'}
                  ]
                },
                {
                  id:'22',
                  child:[
                    {id:'221'},
                    {id:'222'}
                  ]
                }
              ]
            }
          ],
          serchProduct:{
publish_begin_time:'',
publish_end_time:''.
            begin_time:'',
            end_time:'',
            store:'',
            product__name:'',
            sale_sign:'1',           // 销量标识符
            sale:'100',           //产品销量
            scan_sign:'1',       //浏览量标识符
            scan:'100',           // 浏览量
          },
          ruleForm: {//最终添加规则需要提交过去的对象
            pinterest:'无数据',
            board:'无数据',
            start_time:'',           //规则有效期开始时间
            end_time:'',             //规则有效期结束时间
            schedule_rule:[],         //时间区间最终数据    
            product_list:[],        //满足条件的商品列表  
            tag:'规则标签',      //规则标签


            
          },
          rules: {
            pinterest: [
              { required: true, message: '请选择Pinterest账户', trigger: 'change' }
            ]
          }
      };
    },
    watch:{
      dialog:function (){
        this.$axios.get("/api/v1/pinterest_account_board/")
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
          this.ruleForm.start_time = base.dateFormat(this.ruleTime[0]);
          this.ruleForm.end_time =  base.dateFormat(this.ruleTime[1]);
          this.ruleForm.schedule_rule = JSON.stringify(this.scheduleRuleArray);
          this.$axios.post(`/api/v1/rule/`, this.ruleForm).then(res => {
            // 操作成功
            // this.$message({
            //   message: "保存成功！",
            //   type: "success"
            // });
            // this.dialog.show = false;
            // this.$emit("update");
          })
          .catch(error => {
            this.$message("接口超时!");
          });          


        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     alert('submit!');
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      scheduleRuleFun(){
        // 添加分区需要做的事 把输入框的值，扔进一个scheduleRuleArray 作为最后植入ruleForm.schedule_rule
        this.scheduleRule.start_time = base.dateFormat(this.scheduleRule.timeVal[0],true);// 时间区间 中的时间数据 转成最终数据
        this.scheduleRule.end_time = base.dateFormat(this.scheduleRule.timeVal[1],true);
        var _thisObj = {
              weekday:"0",  
              start_time:"",  
              end_time:"",  
              interval_time:"1.5"
          };
        _thisObj.weekday = this.scheduleRule.weekday;
        _thisObj.start_time = this.scheduleRule.start_time;
        _thisObj.end_time = this.scheduleRule.end_time;
        _thisObj.interval_time = this.scheduleRule.interval_time;
        this.scheduleRuleArray.push(_thisObj);
      },
      deletschedule(index){
        //删除指定分区
        console.log(index)
        this.scheduleRuleArray.splice(index,1);
      },
      serchProduct(){
          this.$axios.get(`/api/v1/product_count/`, this.serchProduct).then(res => {
          })
          .catch(error => {
            this.$message("接口超时!");
          }); 
      },
      firstStorChange(){
        // 商品分类一级菜单触发时间
        this.storList.map(e => {
          if(e.id == this.stroVal.storOne){
            this.stroVal.storTwo = e.child[0].id;
            var _thisArray = e.child;
                _thisArray.map(event => {
                  if(event.id == this.stroVal.storTwo){
                    this.stroVal.storThree = event.child[0].id;
                  }
                });
          }
        });
      },
      twoStorChange(){
        // 商品分类二级菜单触发时间
        this.storList.map(e => {
          if(e.id == this.stroVal.storOne){
            var _thisArray = e.child;
                _thisArray.map(event => {
                  if(event.id == this.stroVal.storTwo){
                    this.stroVal.storThree = event.child[0].id;
                  }
                });
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
.ruleAdd .el-dialog{width:900px;height:600px;overflow:auto;}
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
</style>
