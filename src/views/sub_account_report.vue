<template>
  <div class="sub_account_report">
    <div class="tableTitle">
      <span class="report_title">Pinterest Sub-Account Report</span>
    </div>
    <div class="Options">
      <span>Options</span>
    </div>
         <el-form :inline="true" ref="add_data">
           <el-form-item label="Date Range">
                <el-select v-model="value" placeholder="请选择时间">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
           </el-form-item>
        </el-form>
  </div>
</template>

<script>
export default {
  name: "sub_account_report",
  components: {},

};
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
</style>
