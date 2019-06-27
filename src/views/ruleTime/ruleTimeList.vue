<template>
    <div class="ruleTimeList">
        <ul id="breadcrumb">
            <li><a href="/dashboard"><span class="el-icon-house"> </span> Home</a></li>
            <li><a><span class="el-icon-right"> </span>Account Posting Times</a></li>
        </ul>
        <el-table :data="tableData"  border ref="topictable" class="topictable"  :height="tableHeight" style="width: 100%" @expand-change="expandSelect" @cell-click="clickTable">
          <el-table-column type="expand">
              <template slot-scope="props">
                    <el-table :data="props.row.children"  header-row-class-name="sonTableHead" border style="width: 100%">
                      <el-table-column label="Monday" prop="desc" align="center">
                          <template slot="header" slot-scope="scope">Monday<br/><el-switch v-model="weekState.Monday" active-color="#13ce66" inactive-color="#ff4949"></el-switch></template>
                          <template prop="desc"></template>
                      </el-table-column>
                      <el-table-column label="Tuesday" prop="desc" align="center">
                          <template slot="header" slot-scope="scope">Monday<br/><el-switch v-model="weekState.Tuesday" active-color="#13ce66" inactive-color="#ff4949"></el-switch></template>
                          <template prop="desc"></template>
                      </el-table-column>
                      <el-table-column label="Wednesday" prop="desc" align="center">
                          <template slot="header" slot-scope="scope">Monday<br/><el-switch v-model="weekState.Wednesday" active-color="#13ce66" inactive-color="#ff4949"></el-switch></template>
                          <template prop="desc"></template>
                      </el-table-column>
                      <el-table-column label="Thursday" prop="desc" align="center">
                          <template slot="header" slot-scope="scope">Monday<br/><el-switch v-model="weekState.Thursday" active-color="#13ce66" inactive-color="#ff4949"></el-switch></template>
                          <template prop="desc"></template>
                      </el-table-column>
                      <el-table-column label="Friday" prop="desc" align="center">
                          <template slot="header" slot-scope="scope">Monday<br/><el-switch v-model="weekState.Friday" active-color="#13ce66" inactive-color="#ff4949"></el-switch></template>
                          <template prop="desc"></template>
                      </el-table-column>
                      <el-table-column label="Saturday" prop="desc" align="center">
                          <template slot="header" slot-scope="scope">Monday<br/><el-switch v-model="weekState.Saturday" active-color="#13ce66" inactive-color="#ff4949"></el-switch></template>
                          <template prop="desc"></template>
                      </el-table-column>
                      <el-table-column label="Sunday" prop="desc" align="center">
                          <template slot="header" slot-scope="scope">Monday<br/><el-switch v-model="weekState.Sunday" active-color="#13ce66" inactive-color="#ff4949"></el-switch></template>
                          <template prop="desc"></template>
                      </el-table-column>
                    </el-table>
              </template>
          </el-table-column>
          <el-table-column label="商品 ID" align="center" prop="id" width="200"></el-table-column>
          <el-table-column label="商品名称" align="center" prop="name" width="200"> </el-table-column>
          <el-table-column label="描述" align="center" prop="desc" width="300"> </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="medium" class="WW100 MB5" type="success" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button size="medium" class="WW100 MB5" type="info" @click="handleDelete(scope.$index, scope.row)">Reset</el-button>
              <el-button size="medium" class="WW100 MB5" type="primary" @click="handleEdit(scope.$index, scope.row)">Save</el-button>
              <el-button size="medium" class="WW100 MB5" type="danger" @click="handleDelete(scope.$index, scope.row)">Clear All</el-button>
            </template>
          </el-table-column>
      </el-table>
    </div>
</template>

<script>
// import DialogFound from "./rule_add";
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


tableData: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333',
          children:[{
                    id: '12987123',
                    name: 'son',
                    category: '江浙小吃、小吃零食',
                    desc: 'son',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: ' 10333'
                }]
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333',
          children:[{
                    id: '12987123',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: ' 10333'
                }]
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }],
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
          this.tableHeight = window.innerHeight - this.$refs.topictable.$el.offsetTop - 150;
          });
      },
    methods: {
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
        },
    },
  }

</script>

<style>
.ruleTimeList .sonTableHead th .el-switch__core{top:-10px;}

.ruleTimeList .el-table__expanded-cell{padding:0 0 0 47px;}
</style>
