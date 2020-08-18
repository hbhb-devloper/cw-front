<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item label="单位名称">
        <el-input
          v-model="queryParams.unitName"
          placeholder="请输入部门名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="queryParams.status" placeholder="部门状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
        >搜索</el-button>
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:dept:add']"
        >新增</el-button>
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:user:edit']"
        >修改</el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="single"
          @click="handleDelete"
          v-hasPermi="['system:user:remove']"
        >删除</el-button>
      </el-form-item>
    </el-form>

    <div class="info">
      <el-table
        v-loading="loading"
        :data="deptList"
        row-key="id"
        default-expand-all
        @row-click="getinfo"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        @selection-change="handleSelectionChange"
        style="width:35%;"
      >
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="label" label="单位名称" width="350"></el-table-column>
      </el-table>
      <el-form
        class="deptinfo"
        ref="form1"
        :model="form1"
        :rules="rules"
        label-width="80px"
        v-if="deptId"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="单位名称" prop="unitName">
              <el-input readonly v-model="form1.unitName" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="通信地址" prop="address">
              <el-input readonly v-model="form1.address" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="简称标志" prop="abbr">
              <el-input readonly v-model="form1.abbr" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电子邮箱" prop="email">
              <el-input readonly v-model="form1.email" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="传真" prop="fax">
              <el-input readonly v-model="form1.fax" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话" prop="officePhone">
              <el-input readonly v-model="form1.officePhone" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位缩写" prop="shortName">
              <el-input readonly v-model="form1.shortName" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位职能" prop="unitFunc">
              <el-input readonly v-model="form1.unitFunc" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位级别" prop="unitGrade">
              <el-input readonly v-model="form1.unitGrade" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位名称" prop="unitHeader">
              <el-input readonly v-model="form1.unitHeader" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮编" prop="zipCode">
              <el-input readonly v-model="form1.zipCode" disabled />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 添加或修改部门对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24" v-if="form.parentId !== 0">
            <el-form-item label="上级部门" prop="parentId">
              <treeselect v-model="form.parentId" :options="deptOptions" placeholder="选择上级部门" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位名称" prop="unitName">
              <el-input v-model="form.unitName" placeholder="请输入单位名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="通信地址" prop="address">
              <el-input v-model="form.address" placeholder="请输入通信地址" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="简称标志" prop="abbr">
              <el-input v-model="form.abbr" placeholder="请输入简称标志" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电子邮箱地址" prop="email">
              <el-input v-model="form.email" placeholder="请输入电子邮箱地址" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="传真" prop="fax">
              <el-input v-model="form.fax" placeholder="请输入传真" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话" prop="officePhone">
              <el-input v-model="form.officePhone" placeholder="请输入电话" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位缩写名称" prop="shortName">
              <el-input v-model="form.shortName" placeholder="请输入单位缩写名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位职能" prop="unitFunc">
              <el-input v-model="form.unitFunc" placeholder="请输入单位职能" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位级别" prop="unitGrade">
              <el-input v-model="form.unitGrade" placeholder="请输入单位级别" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位负责人" prop="unitHeader">
              <el-input v-model="form.unitHeader" placeholder="请输入单位负责人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮编" prop="zipCode">
              <el-input v-model="form.zipCode" placeholder="请输入邮编" />
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
  listUnit,
  getUnit,
  addUnit,
  updateUnit,
  delarr,
} from "@/api/system/unit";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "Dept",
  components: { Treeselect },
  data() {
    return {
      single: true,
      // 遮罩层
      loading: true,
      // 表格树数据
      deptList: [],
      // 部门树选项
      deptOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 状态数据字典
      statusOptions: [
        { dictValue: 1, dictLabel: "正常" },
        { dictValue: 0, dictLabel: "停用" },
      ],
      // 查询参数
      queryParams: {
        unitName: undefined,
        status: undefined,
      },
      // 表单参数
      form: {},
      form1: {},
      deptId: "",
      // 表单校验
      rules: {
        parentId: [
          { required: true, message: "上级部门不能为空", trigger: "blur" },
        ],
        unitName: [
          { required: true, message: "部门名称不能为空", trigger: "blur" },
        ],
        abbr: [
          { required: true, message: "菜单顺序不能为空", trigger: "blur" },
        ],
        email: [
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        // fax: [
        //   {
        //     pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        //     message: "请输入正确的手机号码",
        //     trigger: "blur"
        //   }
        // ]
      },
    };
  },
  created() {
    this.getList();
    // this.getTreeselect();
    // this.getDicts("sys_normal_disable").then(response => {
    //   this.statusOptions = response.data;
    // });
  },
  methods: {
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.idsname = selection.map((item) => item.label);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    getinfo(data) {
      this.deptId = data.id;
      getUnit(data.id).then((res) => {
        this.form1 = res;
      });
    },
    /** 查询部门列表 */
    getList() {
      this.loading = true;
      listUnit(this.queryParams).then((response) => {
        this.deptList = this.handleTree(response, "id");
        this.deptOptions = this.handleTree(response, "id");
        this.loading = false;
      });
    },
    /** 转换部门数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.deptId,
        label: node.unitName,
        children: node.children,
      };
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      listUnit().then((response) => {
        this.deptOptions = this.handleTree(response, "id");
      });
    },
    // 字典状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        deptId: undefined,
        parentId: undefined,
        unitName: undefined,
        address: undefined,
        abbr: undefined,
        email: undefined,
        fax: undefined,
        shortName: undefined,
        unitFunc: undefined,
        unitGrade: undefined,
        unitHeader: undefined,
        officePhone: undefined,
        zipCode: undefined,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset();
      // this.getTreeselect();
      if (row != undefined) {
        this.form.parentId = row.deptId;
      }
      this.open = true;
      this.title = "添加部门";
    },
    /** 修改按钮操作 */
    handleUpdate() {
      this.reset();
      this.getTreeselect();
      getUnit(this.ids).then((response) => {
        this.form = response;
        this.open = true;
        this.title = "修改部门";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != undefined) {
            updateUnit(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addUnit(this.form).then((response) => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      var that = this;
      that
        .$confirm('是否确认删除名称为"' + that.idsname + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(function () {
          return delarr(that.ids);
        })
        .then(() => {
          that.getList();
          that.msgSuccess("删除成功");
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
};
</script>

<style scoped>
 .el-table {
  width: 30%;
  background-color: transparent;
}
.info {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.deptinfo {
  position: fixed;
  padding: 15px;
  right: 1%;
  width: 45%;
}
.el-dialog .el-form-item--medium /deep/ .el-form-item__label {
  width: 120px !important;
}
.el-dialog .el-form-item--medium /deep/ .el-form-item__content {
  margin-left: 120px !important;
}
</style>