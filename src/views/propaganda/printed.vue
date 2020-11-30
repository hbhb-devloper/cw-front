<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="单位" prop="unitId">
        <el-input
          v-model="queryParams.unitId"
          placeholder="请输入单位"
          clearable
          size="small"
          style="width: 200px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="日期" prop="roleName">
        <el-date-picker
          v-model="queryParams.value1"
          type="datetime"
          placeholder="选择日期时间"
          size="small"
          style="width: 200px"
        >
        </el-date-picker>
        <el-select
          v-model="queryParams.state"
          placeholder="请选择归属部门"
          clearable
          size="small"
          style="width: 200px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="审批状态" prop="state">
        <el-select
          v-model="queryParams.state"
          placeholder="请选择审批状态"
          clearable
          size="small"
          style="width: 200px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="申请单名称" prop="printName">
        <el-input
          v-model="queryParams.printName"
          placeholder="请输入申请单名称"
          clearable
          size="small"
          style="width: 200px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申请单号" prop="printNum">
        <el-input
          v-model="queryParams.printNum"
          placeholder="请输入申请单号"
          clearable
          size="small"
          style="width: 200px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >保存</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          >添加新申请</el-button
        >
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="printList">
      <el-table-column align="center" label="申请单号" prop="printNum" />
      <el-table-column align="center" label="申请单名称" prop="printName" />
      <el-table-column align="center" label="申请单位" prop="unitName" />
      <el-table-column align="center" label="申请时间" prop="applyTime" />
      <el-table-column align="center" label="申请人" prop="userName" />
      <el-table-column
        align="center"
        label="预估金额（万元）"
        prop="predictAmount"
      />
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <el-dialog
      title="中国移动通信集团印刷品申请单"
      :visible.sync="SetVisible"
      width="1000px"
    >
      <el-row style="margin-bottom: 25px">
        <el-col v-for="i in 3" :key="i" :span="8">
          <div class="flowItem">
            <el-form>
              <el-form-item label="印刷品申请人" label-width="110px">
                <el-select
                  v-model="queryParams.state"
                  placeholder="请选择审批状态"
                  clearable
                >
                  <el-option
                    v-for="dict in statusOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="意见" label-width="110px">
                <el-select
                  v-model="queryParams.state"
                  placeholder="请选择审批状态"
                  clearable
                >
                  <el-option
                    v-for="dict in statusOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <div class="flowItemDown">
                <div>李华 2020/4/28 14:05:11</div>
                <i class="el-icon-success" v-if="true"></i>
                <i class="el-icon-error" v-if="false"></i>
              </div>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请单名称" prop="unitId">
              <el-input
                v-model="queryParams.unitId"
                placeholder="请输入申请单名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请部门" prop="unitId">
              <el-input
                v-model="queryParams.unitId"
                placeholder="请输入申请部门"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请单人" prop="unitId">
              <el-input
                v-model="queryParams.unitId"
                placeholder="请输入申请单人"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请时间" prop="unitId">
              <el-input
                v-model="queryParams.unitId"
                placeholder="请输入申请时间"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="材料类型" prop="unitId">
              <el-select
                v-model="queryParams.state"
                placeholder="请选择材料类型"
                style="width:100%"
                clearable
              >
                <el-option
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="市场部审核员" prop="unitId">
              <el-select
                v-model="queryParams.state"
                placeholder="请选择市场部审核员"
                style="width:100%"
                clearable
              >
                <el-option
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预估金额" prop="unitId">
              <el-input
                v-model="queryParams.unitId"
                placeholder="请输入预估金额"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="unitId">
              <el-input
                type="textarea"
                v-model="queryParams.unitId"
                placeholder="请输入备注"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="附件" prop="unitId">
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="mini"
                @click="handleAdd"
                >添加附件</el-button
              >
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="标题" width="180">
                </el-table-column>
                <el-table-column prop="name" label="作者" width="180">
                </el-table-column>
                <el-table-column prop="address" label="时间"> </el-table-column>
                <el-table-column prop="address" label="大小"> </el-table-column>
                <el-table-column prop="address" label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="text"
                      icon="el-icon-edit"
                      @click="handleUpdate(scope.row)"
                      >修改</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <el-button size="small" type="text">业务单式模板下载</el-button>
                <el-button size="small" type="text">宣传单页模板下载</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { listUnit, UNroleMenuTreeselect } from "@/api/system/unit";
import { pageRole } from "@/api/system/role";
import { listPrint } from "@/api/propaganda/printed";
import { resourceTree, roleMenuTreeselect } from "@/api/system/resource";
export default {
  name: "Role",
  data() {
    return {
      SetVisible: false,
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 印刷品表格数据
      printList: [],
      // 状态数据字典
      statusOptions: [
        { dictValue: 1, dictLabel: "正常" },
        { dictValue: 2, dictLabel: "停用" },
      ],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        roleType: "UN",
        roleName: undefined,
        roleKey: undefined,
        state: undefined,
      },
    };
  },
  created() {
    this.getList();
    this.getMenuTreeselect();
  },
  methods: {
    handleAdd() {
      this.SetVisible = true;
    },
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      listPrint(this.queryParams).then((response) => {
        this.printList = response.list;
        this.total = response.count;
        this.loading = false;
      });
    },
    /** 查询菜单树结构 */
    getMenuTreeselect() {
      listUnit().then((response) => {
        this.menuOptions = response;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有角色数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportRole(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
        })
        .catch(function () {});
    },
  },
};
</script>
<style lang="scss" scoped>
.tips {
  width: 100%;
  text-align: center;
  display: flex;
  align-items: start;
  justify-content: center;
  margin-bottom: 10px;
}
.flowItem {
  padding-right: 10px;
  border-right: 1px solid #e6e6e6;
  .flowItemDown {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .el-icon-success {
      color: #67c23a;
      font-size: 27px;
    }

    .el-icon-error {
      color: #f56c6c;
      font-size: 27px;
    }
  }
}
</style>