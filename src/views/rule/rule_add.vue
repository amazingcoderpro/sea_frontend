
<template>
    <div class="ruleAdd">
         <el-dialog  :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal='false' :close-on-press-escape='false' :modal-append-to-body="false">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-form-item label="Website" prop="website">
              <el-input v-model="ruleForm.website"  placeholder="后台提供的数据"></el-input>
            </el-form-item>

            <el-form-item label="选择Pinterest账户" prop="pinterest" >
              <el-select v-model="ruleForm.pinterest" placeholder="请选择Pinterest账户">
                <el-option
                  v-for="item in pinterestArray"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="选择Board" >
              <el-select v-model="ruleForm.board" placeholder="请选择选择Board">
                <el-option
                  v-for="item in boardArray"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="规则有效期" prop="effectiveTime">
              <div class="block">
                  <el-date-picker
                    v-model="ruleForm.effectiveTime"
                    type="datetimerange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['12:00:00']">
                  </el-date-picker>
              </div>
            </el-form-item>
            <div class="timeSection">
              <el-form-item label="时间区间">
                <el-select :class="'weekClass'" v-model="ruleForm.week" placeholder="请选择时间">
                  <el-option
                    v-for="item in weekArray"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input :class="'hourClass'" v-model="ruleForm.name"></el-input>
                <el-input :class="'intervalTimeClass'" v-model="ruleForm.name"></el-input>
              </el-form-item>
            </div>
















            <el-form-item label="发布频率" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>





            <el-form-item label="产品上架时间" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="产品类目" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="产品浏览量" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="产品销量" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="可发布产品数量" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="规则标签" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>







            
            <el-form-item label="活动名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>






            <el-form-item label="活动区域" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活动时间" required>
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="date2">
                  <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="即时配送" prop="delivery">
              <el-switch v-model="ruleForm.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="活动性质" prop="type">
              <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源" prop="resource">
              <el-radio-group v-model="ruleForm.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式" prop="desc">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "ruleAdd",
    props: {
      dialog: Object
    },
    data() {
      return {
          pinterestArray:[                           //Pinterest下拉框数据
            {"label":"pinterestArray1","value":"123123"},
            {"label":"pinterestArray2","value":"123123"}
          ],
          boardArray:[                           //Pinterest下拉框数据
            {"label":"boardArray1","value":"123123"},
            {"label":"boardArray2","value":"123123"}
          ],
          weekArray:[                           //Pinterest下拉框数据
            {"label":"星期一","value":"0"},
            {"label":"星期二","value":"1"},
            {"label":"星期三","value":"2"},
            {"label":"星期四","value":"3"},
            {"label":"星期五","value":"4"},
            {"label":"星期六","value":"5"},
            {"label":"星期天","value":"6"},
          ],
          ruleForm: {
            website:'',    
            pinterest:'',
            board:'',
            effectiveTime:'',        //有效时间
            schedule_rule:{          //时间区间
              weekday:'',
              start_time:'',
              end_time:'',
              interval_time:'',      //发布频率
            },        


            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          },
        rules: {
          pinterest: [
            { required: true, message: '请选择Pinterest账户', trigger: 'change' }
          ],
          effectiveTime: [
            { type: 'date', required: true, message: '请选择有效日期', trigger: 'change' }
          ],
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style>
.ruleAdd .el-dialog{
      width: 800px;
    height: 600px;
    overflow: auto;
}
.ruleAdd .el-form-item__label{
    width:145px!important;
}
.ruleAdd .el-form-item__content {
    margin-left: 145px!important;
}


.ruleAdd .weekClass {
  width: 30%;
}
.ruleAdd .hourClass {
  width: 30%;
  margin-left: 3%;
}
.ruleAdd .intervalTimeClass {
  width: 20%;
  margin-left: 3%;
}


</style>
