<template>
    <div class="logFund">
         <el-dialog 
            :title="dialog.title" 
            :visible.sync="dialog.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'
            :modal-append-to-body="false">
            <div class="form">
                <el-form 
                    ref="form" 
                    :model="form"
                    :rules="form_rules"
                    label-width="120px" 
                    style="margin:10px;width:auto;">
                    <!-- 用户名 -->
                    <el-form-item label="用户名" prop="username">
                      <el-input v-model="form.username" placeholder="admin"></el-input>
                    </el-form-item>
                    <!-- 部门 -->
                    <el-form-item label="部门" prop="section">
                      <el-select v-model="value" placeholder="请选择">
                          <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                      </el-select>
                    </el-form-item>
                    <!-- 角色配置 -->
                    <el-form-item label="角色配置" prop="role">
                      <el-select v-model="value" placeholder="请选择">
                          <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                      </el-select>
                    </el-form-item>
                    <!-- 创建时间 -->
                     <el-form-item label="创建时间" prop="create_time">
                       <el-date-picker
                        v-model="value10"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日">
                      </el-date-picker>
                     </el-form-item>
                     <!-- 更新时间 -->
                       <el-form-item label="更新时间" prop="update_time">
                       <el-date-picker
                        v-model="value11"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日">
                      </el-date-picker>
                     </el-form-item>
                        <!-- 密码 -->
                    <el-form-item label="密码" prop="password">
                      <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <!-- 确认密码 -->
                    <el-form-item label="确认密码" prop="password2">
                      <el-input type="password" v-model="form.password2" placeholder="请确认密码"></el-input>
                    </el-form-item>
                    <!-- 取消，提交 -->
                    <el-form-item  class="text_right">
                        <el-button @click="dialog.show = false">取 消</el-button>
                        <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
                    </el-form-item>
                    
                </el-form>
            </div>
        </el-dialog>
    </div>
  
</template>

<script>
export default {
  name: "logfound",
  props: {
    dialog: Object,
    form: Object,
    options1: [{
          value: '选项1',
          label: '站长'
        }, {
          value: '选项2',
          label: '运营专员'
        }, {
          value: '选项3',
          label: '用户名'
        }, {
          value: '选项4',
          label: '创建时间'
        }],
        options2: [{
          value: '选项1',
          label: '站长'
        }, {
          value: '选项2',
          label: '运营专员'
        }, {
          value: '选项3',
          label: '用户名'
        }, {
          value: '选项4',
          label: '创建时间'
        }]
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
        value10: '',
        value11: '',
      form_rules: {
          username: [
            { required: true, message: "用户名不能为空", trigger: "change" },
            { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
          ],
          password: [
            { required: true, message: "密码不能为空", trigger: "blur" },
            { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
          ],
          password2: [
            { required: true, message: "确认密码不能为空", trigger: "blur" },
            {
              min: 6,
              max: 30,
              message: "长度在 6 到 30 个字符",
              trigger: "blur"
            },
            { validator: validatePass2, trigger: "blur" }
          ],
      }
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，提交数据;
          if (this.dialog.option == "post"){
            this.$axios.post(`/api/account/users/`, this.form).then(res => {
              // 操作成功
              this.$message({
                message: "保存成功！",
                type: "success"
              });
              this.dialog.show = false;
              this.$emit("update");
            });
          }else{
            const id = this.form.id
            this.$axios.put(`/api/account/users/${id}/`, this.form).then(res => {
              // 操作成功
              this.$message({
                message: "保存成功！",
                type: "success"
              });
              this.dialog.show = false;
              this.$emit("update");
            });
          }
        }
      });
    }
  }
};
</script>