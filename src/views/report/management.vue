<!--
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2021-01-06 10:24:47
 * @LastEditors: CYZ
 * @LastEditTime: 2021-01-13 15:34:37
-->
<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          >添加</el-button
        >
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="controlList">
      <el-table-column align="center" label="序号" prop="id" />
      <el-table-column align="center" label="管理内容名称" prop="manageName">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.manageName"
            placeholder="请输入管理内容名称"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注" prop="remark">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.remark"
            placeholder="请输入备注"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改人" prop="updateBy" />
      <el-table-column align="center" label="修改时间" prop="updateTime" />
      <el-table-column label="是否启用" align="center" prop="hasEnable">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.hasEnable"
            @change="handleChange(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="按月打包" align="center">
        <template slot-scope="scope" prop="hasPage">
          <el-switch
            v-model="scope.row.hasPage"
            @change="handleChange(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="save(scope.row)"
            >保存</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改内容管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="管理名称" prop="manageName">
          <el-input v-model="form.manageName" placeholder="请输入管理名称" />
        </el-form-item>
        <el-form-item label="是否启用 " prop="hasEnable">
          <el-switch v-model="form.hasEnable"></el-switch>
        </el-form-item>
        <el-form-item label="启用按月打包 " prop="hasPage">
          <el-switch v-model="form.hasPage"></el-switch>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入备注"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { manageList, manageAdd, manageEdit } from "@/api/report/management";
export default {
  name: "Role",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 角色表格数据
      controlList: [],
      // 表单参数
      form: {
        hasEnable: true,
        hasPage: true,
      },
       // 表单校验
      rules: {
        manageName: [
          { required: true, message: "管理名称不能为空", trigger: "blur" },
        ]
        
      },
      // 弹出框判断
      open: false,
      // 弹出框名称
      title: undefined,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加内容管理";
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        hasEnable: true,
        hasPage: true,
      };
      this.resetForm("form");
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          manageAdd(this.form)
            .then((response) => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            })
            .catch((err) => {
              this.msgError(err.message);
            });
        }
      });
    },
    // 开关事件
    handleChange(row) {
      let datas = JSON.parse(JSON.stringify(row));
      manageEdit(datas).then((response) => {
        this.msgSuccess("修改状态成功");
        this.getList();
      });
    },
    // 保存行数据
    save(row) {
      manageEdit(row).then((res) => {
        this.$message.success("保存成功");
        this.getList();
      });
    },
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      manageList().then((response) => {
        this.controlList = response;
        this.loading = false;
      });
    },
  },
};
</script>
