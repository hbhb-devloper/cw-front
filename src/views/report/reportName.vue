<!--
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2021-01-06 10:24:22
 * @LastEditors: CYZ
 * @LastEditTime: 2021-01-19 14:14:35
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
        <el-button icon="el-icon-refresh" size="mini" @click="showProperty"
          >批量修改管理内容下报表起止时间</el-button
        >
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="controlList">
      <el-table-column align="center" label="序号" prop="id" width="50" />
      <el-table-column align="center" label="报表名称" prop="reportName" />
      <el-table-column align="center" label="管理内容名称" prop="manageName" />
      <el-table-column align="center" label="备注" prop="remark">
        <!-- <template slot-scope="scope">
          <el-input
            v-model="scope.row.remark"
            placeholder="请输入备注"
          ></el-input>
        </template> -->
      </el-table-column>
      <el-table-column align="center" label="修改人" prop="updateBy" />
      <el-table-column
        align="center"
        label="修改时间"
        prop="updateTime"
        width="160"
      />
      <el-table-column label="是否启用" align="center" prop="state">
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
          <el-button size="mini" type="text" @click="handleUpdate(scope.row)"
            >修改</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="批量修改" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="showProperty(scope.row)"
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
                v-model="propertyFrom.period"
                placeholder="请选择报表周期"
                clearable
                size="small"
                style="width: 200px"
                @change="changePeriod"
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
                v-model="propertyFrom.scope"
                placeholder="请选择编报范围"
                clearable
                size="small"
                style="width: 200px"
                @change="changeScope"
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
                v-model="propertyFrom.startTime"
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
                v-model="propertyFrom.endTime"
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
                v-model="propertyFrom.flowTypeId"
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
                v-model="propertyFrom.flowId"
                placeholder="请选择流程名称"
                clearable
                size="small"
                style="width: 200px"
                @change="changeFlow"
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
            <el-form-item label="表单启用设定" prop="files">
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="mini"
                @click="addPropertyList"
                >添加</el-button
              >
              <el-table :data="form.propertyList" style="width: 100%">
                <el-table-column label="序号" type="index" width="50">
                </el-table-column>
                <el-table-column
                  prop="periodName"
                  label="报表周期"
                  width="80"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="scopeName"
                  label="编报范围"
                  width="80"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="flowTypeName"
                  label="流程类型"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="flowName"
                  label="流程名称"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="startTime"
                  label="开始时间"
                  align="center"
                >
                </el-table-column>
                <el-table-column prop="endTime" label="结束时间" align="center">
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
    <!-- 批量修改报表时间对话框 -->
    <el-dialog :title="title" :visible.sync="PropertyVisible" width="1200px">
      <div class="graphic">
        <div class="graphicTitle">图示</div>
        <div class="graphicItem" style="background: #ffcc00">未启用</div>
        <div class="graphicItem" style="background: #008aff">启用中</div>
        <div class="graphicItem" style="background: #d6d6d6">已过期</div>
      </div>
      <el-table :data="propertylist" style="width: 100%" :row-style="showColor">
        <el-table-column label="序号" type="index" width="50">
        </el-table-column>
        <el-table-column
          prop="categoryName"
          label="报表名称"
          width="80"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="periodName"
          label="报表周期"
          width="80"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="scopeName" label="编报范围" align="center">
        </el-table-column>
        <el-table-column prop="flowTypeName" label="流程类型" align="center">
        </el-table-column>
        <el-table-column prop="flowName" label="流程名称" align="center">
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" align="center">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.startTime"
              type="date"
              placeholder="选择开始时间"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              size="small"
              style="width: 80%"
              @change="changeStartTime(scope.row)"
            ></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" align="center">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.endTime"
              type="date"
              placeholder="选择结束时间"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              size="small"
              style="width: 80%"
              @change="changeEndTime(scope.row)"
            ></el-date-picker>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitProperty">确 定</el-button>
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
  categoryDetail,
  propertyList,
  propertyEdit,
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
        propertyList: [],
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
      FlowTypeOption: [],
      // 流程名称下拉框
      typeNameOption: [],
      // 表单设定
      propertyFrom: {},
      // 批量修改判定
      PropertyVisible: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      // 分页总条数
      total: 0,
      // 批量修改时间数组
      propertyTimeList: [],
      // 报表起止时间列表
      propertylist: [],
    };
  },
  created() {
    this.getList();
    this.getManageSelect();
    this.getFlowTypeList();
  },
  methods: {
    // 根据启用状态显示不同的颜色
    showColor(row) {
      let item = row.row;
      if (item.isUsing == 0) {
        return { background: "#FFCC00" };
      } else if (item.isUsing == 1) {
        return { background: "#008AFF" };
      } else {
        return { background: "#D6D6D6" };
      }
    },
    // 修改起止时间
    changeStartTime(row) {
      let propertyIndex = this.propertyTimeList.findIndex(
        (item) => item.id == row.id
      );
      if (propertyIndex != -1) {
        this.propertyTimeList[propertyIndex].startTime = row.startTime;
      } else {
        let propertyObj = {
          id: row.id,
          startTime: row.startTime,
          endTime: row.endTime,
        };
        this.propertyTimeList.push(propertyObj);
      }
    },
    // 修改结束时间
    changeEndTime(row) {
      let propertyIndex = this.propertyTimeList.findIndex(
        (item) => item.id == row.id
      );
      if (propertyIndex != -1) {
        this.propertyTimeList[propertyIndex].endTime = row.endTime;
      } else {
        let propertyObj = {
          id: row.id,
          startTime: row.startTime,
          endTime: row.endTime,
        };
        this.propertyTimeList.push(propertyObj);
      }
    },
    // 提交批量修改
    submitProperty() {
      propertyEdit(this.propertyTimeList).then((res) => {
        console.log("propertyEdit", res);
        this.msgSuccess("批量修改成功");
        this.PropertyVisible = false;
      });
    },
    // 表单重置
    reset() {
      this.propertyTimeList = [];
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
      };
      this.form = {
        state: true,
        propertyList: [],
      };
      this.propertyFrom = {};
      this.resetForm("form");
    },
    // 显示批量修改弹窗
    showProperty(row) {
      if (row) {
        this.queryParams.categoryId = row.id;
      }
      this.reset();
      propertyList(this.queryParams).then((res) => {
        res.list.map((item) => {
          item.startTimeData = Date.parse(item.startTime.replace(/-/g, "/"));
          item.endTimeData = Date.parse(item.endTime.replace(/-/g, "/"));

          let timestamp = new Date().getTime();
          // isUsing指该调表单是否在启用
          if (timestamp < item.startTimeData) {
            item.isUsing = 0;
          } else if (
            timestamp > item.startTimeData &&
            timestamp < item.endTimeData
          ) {
            item.isUsing = 1;
          } else item.isUsing = 2;
        });
        this.propertylist = res.list;
        this.total = res.totalRow;
        this.PropertyVisible = true;
        this.title = "报表起止时间编辑";
      });
    },
    // 将表单设定添加到表格
    addPropertyList() {
      this.form.propertyList.push(this.propertyFrom);
      this.propertyFrom = {};
    },
    // 获取周期名称
    changePeriod(value) {
      this.propertyFrom.periodName = this.periodOption.find(
        (val) => val.id == this.propertyFrom.period
      ).label;
    },
    // 获取编报范围名称
    changeScope(value) {
      this.propertyFrom.scopeName = this.scopeOption.find(
        (val) => val.id == this.propertyFrom.scope
      ).label;
    },
    // 获取流程名称
    changeFlow(value) {
      this.propertyFrom.flowName = this.typeNameOption.find(
        (val) => val.id == this.propertyFrom.flowId
      ).label;
    },
    // 通过流程类型获取流程名称列表
    changeFlowType(value) {
      this.propertyFrom.flowTypeName = this.FlowTypeOption.find(
        (val) => val.id == this.propertyFrom.flowTypeId
      ).label;
      listTypeName({ typeId: value }).then((res) => {
        this.typeNameOption = res;
      });
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
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      categoryDetail(row.id).then((res) => {
        this.form = res;
        this.open = true;
        this.title = "修改报表名称";
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
      this.PropertyVisible = false;
      this.open = false;
      this.reset();
    },
    // 表单重置
    // reset() {
    //   this.form = {
    //     state: true,
    //     propertyList: [],
    //   };
    //   this.resetForm("form");
    // },
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
<style scoped>
.graphic {
  height: 30px;
  display: flex;
  flex-direction: row;
}
.graphicTitle {
  font-size: 15px;
  color: #303133;
  line-height: 30px;
  font-weight: bolder;
}
.graphicItem {
  font-size: 15px;
  color: #303133;
  line-height: 30px;
  width: 100px;
  text-align: center;
}
</style>