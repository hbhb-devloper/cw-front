<!--
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2021-01-06 10:24:22
 * @LastEditors: CYZ
 * @LastEditTime: 2021-01-18 13:30:54
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2021-01-06 10:24:47
 * @LastEditors: CYZ
 * @LastEditTime: 2021-01-06 15:12:34
-->
<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="管理内容" prop="manageId">
        <el-select
          v-model="queryParams.manageId"
          placeholder="请选择管理内容"
          clearable
          size="small"
          style="width: 200px"
        >
          <el-option
            v-for="dict in manageList"
            :key="dict.id"
            :label="dict.label"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >

        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          >添加</el-button
        >
        <el-button icon="el-icon-refresh" size="mini"
          >批量修改管理内容下报表起止时间</el-button
        >
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="controlList">
      <el-table-column align="center" label="序号" prop="id" />
      <el-table-column align="center" label="管理内容名称" prop="reportName" />
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
      <el-table-column label="是否请用" align="center" prop="state">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            @change="handleChange(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="save(scope.row)"
            >修改</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="批量修改" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleDelete(scope.row)"
            >修改报表起止时间</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改内容管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="900px">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="报表名称" prop="reportName">
              <el-input
                v-model="form.reportName"
                placeholder="请输入报表名称"
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理内容" prop="manageId">
              <el-select
                v-model="form.manageId"
                placeholder="请选择管理内容"
                clearable
                size="small"
                style="width: 200px"
              >
                <el-option
                  v-for="dict in manageList"
                  :key="dict.id"
                  :label="dict.label"
                  :value="dict.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="是否启用 " prop="state">
              <el-switch v-model="form.state"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input
                v-model="form.remark"
                type="textarea"
                placeholder="请输入备注"
                size="small"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报表周期" prop="period">
              <el-select
                v-model="form.propertyList.period"
                placeholder="请选择报表周期"
                clearable
                size="small"
                style="width: 200px"
              >
                <el-option
                  v-for="dict in periodOption"
                  :key="dict.id"
                  :label="dict.label"
                  :value="dict.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="编报范围" prop="scope">
              <el-select
                v-model="form.propertyList.scope"
                placeholder="请选择编报范围"
                clearable
                size="small"
                style="width: 200px"
              >
                <el-option
                  v-for="dict in scopeOption"
                  :key="dict.id"
                  :label="dict.label"
                  :value="dict.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开始时间" prop="startTime">
              <el-date-picker
                v-model="form.propertyList.startTime"
                type="date"
                placeholder="选择开始时间"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                size="small"
                style="width: 200px"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" prop="endTime">
              <el-date-picker
                v-model="form.propertyList.endTime"
                type="date"
                placeholder="选择结束时间"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                size="small"
                style="width: 200px"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="流程类型" prop="flowTypeId">
              <el-select
                v-model="form.propertyList.flowTypeId"
                placeholder="请选择流程类型"
                clearable
                size="small"
                style="width: 200px"
                @change="changeFlowType"
              >
                <el-option
                  v-for="dict in FlowTypeOption"
                  :key="dict.id"
                  :label="dict.label"
                  :value="dict.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="流程名称" prop="flowId">
              <el-select
                v-model="form.propertyList.flowId"
                placeholder="请选择流程名称"
                clearable
                size="small"
                style="width: 200px"
              >
                <el-option
                  v-for="dict in typeNameOption"
                  :key="dict.id"
                  :label="dict.label"
                  :value="dict.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="附件" prop="files">
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  size="mini"
                  >添加</el-button
                >
              <el-table :data="form.files" style="width: 100%">
                <el-table-column
                  prop="fileName"
                  label="序号"
                  width="180"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="author"
                  label="报表周期"
                  width="180"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  label="编报范围"
                  width="180"
                  align="center"
                >
                </el-table-column>
                <el-table-column prop="fileSize" label="流程类型" align="center">
                </el-table-column>
                 <el-table-column prop="fileSize" label="流程名称" align="center">
                </el-table-column>
                 <el-table-column prop="fileSize" label="开始时间" align="center">
                </el-table-column>
                 <el-table-column prop="fileSize" label="结束时间" align="center">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="text"
                      icon="el-icon-edit"
                      @click="deleteFile(scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  categoryList,
  categoryAdd,
  categoryEdit,
} from "@/api/report/reportName";
import { FlowTypeList } from "@/api/flow/list.js";
import { listTypeName } from "@/api/flow/type.js";

import { manageSelect } from "@/api/report/management";

export default {
  name: "Role",
  data() {
    return {
      // 查询条件
      queryParams: {},
      // 遮罩层
      loading: true,
      // 角色表格数据
      controlList: [],
      // 弹出框判断
      open: false,
      // 弹出框名称
      title: undefined,
      // 表单参数
      form: {
        state: true,
        propertyList: {},
      },
      // 表单校验
      rules: {
        reportName: [
          { required: true, message: "报表名称不能为空", trigger: "blur" },
        ],
        manageId: [
          { required: true, message: "管理内容不能为空", trigger: "blur" },
        ],
      },
      // 管理内容下拉框
      manageList: [],
      // 周期下拉框
      periodOption: [
        {
          id: 0,
          label: "年",
        },
        {
          id: 1,
          label: "季",
        },
        {
          id: 2,
          label: "月",
        },
        {
          id: 3,
          label: "旬",
        },
        {
          id: 4,
          label: "日",
        },
      ],
      // 编报范围下拉框
      scopeOption: [
        {
          id: 0,
          label: "分公司",
        },
        {
          id: 1,
          label: "营业厅",
        },
      ],
      // 流程类型下拉框
      FlowTypeOption:[],
      // 流程名称下拉框
      typeNameOption:[]
    };
  },
  created() {
    this.getList();
    this.getManageSelect();
    this.getFlowTypeList();
  },
  methods: {
    // 通过流程类型获取流程名称列表
    changeFlowType(value){
      console.log('value',value);
      this.form.propertyList.flowTypeName=this.FlowTypeOption.find(val=>val.id==this.form.propertyList.flowTypeId).label
      console.log('this.form.propertyList.flowTypeName',this.form.propertyList.flowTypeName);
      listTypeName({typeId:value}).then(res=>{
        this.typeNameOption=res
      })
    },
    // 获取流程类型下拉框
    getFlowTypeList() {
      FlowTypeList().then((res) => {
        this.FlowTypeOption = res;
      });
    },
    // 获取管理内容下拉框
    getManageSelect() {
      manageSelect().then((res) => {
        this.manageList = res;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    // 开关事件
    handleChange(row) {
      let datas = JSON.parse(JSON.stringify(row));
      categoryEdit(datas).then((response) => {
        this.msgSuccess("修改状态成功");
        this.getList();
      });
    },
    // 保存行数据
    save(row) {
      categoryEdit(row).then((res) => {
        this.$message.success("保存成功");
        this.getList();
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          categoryAdd(this.form)
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
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        state: true,
        propertyList: {},
      };
      this.resetForm("form");
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加报表名称";
    },
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      categoryList().then((response) => {
        this.controlList = response;
        this.loading = false;
      });
    },
  },
};
</script>
