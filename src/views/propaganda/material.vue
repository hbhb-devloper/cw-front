<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="归属部门" prop="state">
        <el-select
          v-model="queryParams.state"
          placeholder="请选择归属部门"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:user:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:user:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:user:remove']"
          v-if="false"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport"
          v-hasPermi="['system:user:import']"
          v-if="false"
          >导入</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:user:export']"
          v-if="false"
          >导出</el-button
        >
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <!--部门数据-->
      <el-col :span="10" :xs="24">
        <div class="head-container">
          <el-tree
            :data="deptOptions"
            :props="defaultProps"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            ref="tree"
            default-expand-all
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <!--用户数据-->
      <el-col :span="14" :xs="24">
        <el-form label-width="100px" width="500px" :model="form">
          <el-form-item label="管理员姓名：">
            <el-input
              v-model="form.administrator"
              :disabled="Isdisable"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系方式：">
            <el-input v-model="form.phone" :disabled="Isdisable"></el-input>
          </el-form-item>
          <el-form-item label="管理员邮箱：">
            <el-input v-model="form.email" :disabled="Isdisable"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  listUser,
  getUser,
  delUser,
  adduser,
  UserList,
  updateUser,
  resetUserPwd,
  changeUserStatus,
} from "@/api/system/user";
import { getToken } from "@/utils/auth";
import { treeselect, DeptList } from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { listRole } from "@/api/system/role";
import {
  resourceTree,
  roleMenuTreeselect,
  listMenu,
} from "@/api/system/resource";
import {
  resourceTreeByUN,
  listUnit,
  UNroleMenuTreeselect,
} from "@/api/system/unit";
import { Encrypt } from "@/utils/AESCrypt";

export default {
  name: "User",
  components: { Treeselect },
  data() {
    return {
      Isdisable: true,
      form: {},
      // 部门树选项
      deptOptions: undefined,
      // 状态数据字典
      statusOptions: [
        { dictValue: 1, dictLabel: "正常" },
        { dictValue: 0, dictLabel: "停用" },
      ],
      // 查询参数
      queryParams: {},
      // 表单校验
      rules: {
        userName: [
          { required: true, message: "登录账号不能为空", trigger: "blur" },
        ],
        nickName: [
          { required: true, message: "用户姓名不能为空", trigger: "blur" },
        ],
        unitId: [
          { required: true, message: "归属单位不能为空", trigger: "blur" },
        ],
        defaultUnitId: [
          { required: true, message: "默认数据单位不能为空", trigger: "blur" },
        ],
        jobNum: [{ required: true, message: "工号不能为空", trigger: "blur" }],
        email: [
          { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        phone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    this.getTreeselect();
  },
  methods: {
    /** 查询部门下拉树结构 */
    getTreeselect() {
      DeptList().then((response) => {
        this.deptOptions = response;
      });
    },
  },
};
</script>

<style scoped>
</style>
