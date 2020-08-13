<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--部门数据-->
      <el-col :span="4" :xs="24">
        <div class="head-container">
          <el-input
            v-model="deptName"
            placeholder="请输入部门名称"
            clearable
            size="small"
            prefix-icon="el-icon-search"
            style="margin-bottom: 20px"
          />
        </div>
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
      <el-col :span="20" :xs="24">
        <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
          <el-form-item label="登录账号" prop="userName">
            <el-input
              v-model="queryParams.userName"
              placeholder="请输入登录账号"
              clearable
              size="small"
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="用户姓名" prop="nickName">
            <el-input
              v-model="queryParams.nickName"
              placeholder="请输入用户姓名"
              clearable
              size="small"
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input
              v-model="queryParams.phone"
              placeholder="请输入手机号码"
              clearable
              size="small"
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="状态" prop="state">
            <el-select
              v-model="queryParams.state"
              placeholder="用户状态"
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
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
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
            >新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="success"
              icon="el-icon-edit"
              size="mini"
              :disabled="single"
              @click="handleUpdate"
              v-hasPermi="['system:user:edit']"
            >修改</el-button>
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
            >删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="info"
              icon="el-icon-upload2"
              size="mini"
              @click="handleImport"
              v-hasPermi="['system:user:import']"
              v-if="false"
            >导入</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="warning"
              icon="el-icon-download"
              size="mini"
              @click="handleExport"
              v-hasPermi="['system:user:export']"
              v-if="false"
            >导出</el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="用户编号" align="center" prop="id" />
          <el-table-column
            label="登录账号"
            align="center"
            prop="userName"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="用户姓名"
            align="center"
            prop="nickName"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="部门" align="center" prop="unitName" :show-overflow-tooltip="true" />
          <el-table-column label="手机号码" align="center" prop="phone" width="120" />
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.state"
                :active-value="1"
                :inactive-value="0"
                @change="handleStatusChange(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center" prop="createTime" width="160">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="180"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['system:user:edit']"
              >修改</el-button>
              <!--              <el-button-->
              <!--                v-if="scope.row.userId !== 1"-->
              <!--                size="mini"-->
              <!--                type="text"-->
              <!--                icon="el-icon-delete"-->
              <!--                @click="handleDelete(scope.row)"-->
              <!--                v-hasPermi="['system:user:remove']"-->
              <!--              >删除</el-button>-->
              <el-button
                size="mini"
                type="text"
                icon="el-icon-key"
                @click="handleResetPwd(scope.row)"
                v-hasPermi="['system:user:resetPwd']"
                v-if="false"
              >重置</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </el-col>
    </el-row>

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1200px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="7">
            <el-form-item v-if="form.userId == undefined" label="登录账号" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入登录账号" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item v-if="form.userId == undefined" label="用户密码" prop="pwd">
              <el-input v-model="form.pwd" placeholder="请输入用户密码" type="password" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item v-if="form.userId == undefined" label="校验密码" prop="CheckPassword">
              <el-input v-model="form.CheckPassword" placeholder="请再次输入用户密码" type="password" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="用户姓名" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入用户姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="归属单位" prop="unitId">
              <!-- :disable-branch-nodes="true"
              :show-count="true"-->
              <treeselect v-model="form.unitId" :options="deptOptions" placeholder="请选择归属部门" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="默认归属单位" prop="defaultUnitId">
              <!-- :disable-branch-nodes="true"
              :show-count="true"-->
              <treeselect
                v-model="form.defaultUnitId"
                :options="deptOptions"
                :disable-branch-nodes="true"
                :show-count="true"
                placeholder="请选择归属部门"
              />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入手机号码" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
            </el-form-item>
          </el-col>

          <el-col :span="7">
            <el-form-item label="工号" prop="jobNum">
              <el-input v-model="form.jobNum" placeholder="请输入工号" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="7">
            <el-form-item label="用户性别">
              <el-select v-model="form.sex" placeholder="请选择">
                <el-option
                  v-for="dict in sexOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>-->
          <el-col :span="7">
            <el-form-item label="状态">
              <el-radio-group v-model="form.state">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{dict.dictLabel}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="7">
            <el-form-item label="职务" prop="jobName">
              <el-input v-model="form.jobName" placeholder="请输入职务" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="7">
            <el-form-item label="角色">
              <el-select v-model="form.roleIds" multiple placeholder="请选择">
                <el-option
                  v-for="item in roleOptions"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
                  :disabled="item.status == 1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>-->
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="cardlist">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>菜单权限</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <el-scrollbar style="height:160px">
            <!-- <div v-for="(item,index) in RSlist" :key="index" class="text item">{{item.label}}</div> -->
            <el-checkbox-group v-model="checkedRsRoleIds">
              <el-checkbox
                v-for="item in RSlist"
                :label="item.id"
                :key="item.id"
                @change="handleCheckedRSChange(item)"
              >{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </el-scrollbar>
        </el-card>
        <button
          disabled="disabled"
          type="button"
          class="el-button el-button--primary is-disabled el-transfer__button"
        >
          <span>
            <i class="el-icon-arrow-right"></i>
          </span>
        </button>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>菜单权限列表</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <el-scrollbar style="height:160px">
            <el-tree
              :data="menuOptions"
              show-checkbox
              ref="menu"
              node-key="id"
              empty-text="加载中，请稍后"
              :props="defaultProps"
            ></el-tree>
          </el-scrollbar>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>单位权限</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <el-scrollbar style="height:160px">
            <el-checkbox-group v-model="checkedUnRoleIds">
              <el-checkbox v-for="item in UNlist" :label="item.id" :key="item.id">
                <span @click.prevent="handleCheckedUNChange(item)">{{item.label}}</span>
              </el-checkbox>
            </el-checkbox-group>
          </el-scrollbar>
        </el-card>
        <button
          disabled="disabled"
          type="button"
          class="el-button el-button--primary is-disabled el-transfer__button"
        >
          <span>
            <i class="el-icon-arrow-right"></i>
          </span>
        </button>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>单位权限列表</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <el-scrollbar style="height:160px">
            <el-tree
              :data="UnOptions"
              show-checkbox
              ref="menu1"
              node-key="id"
              empty-text="加载中，请稍后"
              :props="defaultProps"
            ></el-tree>
          </el-scrollbar>
        </el-card>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          <el-checkbox v-model="upload.updateSupport" />是否更新已经存在的用户数据
          <el-link type="info" style="font-size:12px" @click="importTemplate">下载模板</el-link>
        </div>
        <div class="el-upload__tip" style="color:red" slot="tip">提示：仅允许导入“xls”或“xlsx”格式文件！</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
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
  changeUserStatus
} from "@/api/system/user";
import { getToken } from "@/utils/auth";
import { treeselect, DeptList } from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { listRole } from "@/api/system/role";
import {
  resourceTree,
  roleMenuTreeselect,
  listMenu
} from "@/api/system/resource";
import {
  resourceTreeByUN,
  listUnit,
  UNroleMenuTreeselect
} from "@/api/system/unit";
import {Encrypt} from '@/utils/AESCrypt'

export default {
  name: "User",
  components: { Treeselect },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      menuOptions: [],
      UnOptions: [],
      checkedRsRoleIds: [],
      checkedUnRoleIds: [],
      RSlist: [],
      UNlist: [],
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 用户表格数据
      userList: null,
      // 弹出层标题
      title: "",
      // 部门树选项
      deptOptions: undefined,
      // 是否显示弹出层
      open: false,
      // 部门名称
      deptName: undefined,
      // 默认密码
      initPassword: '',
      // 日期范围
      dateRange: [],
      // 状态数据字典
      statusOptions: [
        { dictValue: 1, dictLabel: "正常" },
        { dictValue: 0, dictLabel: "停用" }
      ],
      // 性别状态字典
      sexOptions: [],
      // 岗位选项
      postOptions: [],
      // 角色选项
      roleOptions: [],
      // 表单参数
      form: {
        checkedRsRoleIds: [],
        checkedUnRoleIds: []
      },
      defaultProps: {
        children: "children",
        label: "label"
      },

      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        // headers: { Authorization: "Bearer " + getToken() },
        headers: { Authorization: getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/system/user/importData"
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        nickName: undefined,
        phone: undefined,
        state: undefined,
        unitId: undefined,
        defaultUnitId: undefined
      },
      // 表单校验
      rules: {
        userName: [
          { required: true, message: "登录账号不能为空", trigger: "blur" }
        ],
        nickName: [
          { required: true, message: "用户姓名不能为空", trigger: "blur" }
        ],
        unitId: [
          { required: true, message: "归属单位不能为空", trigger: "blur" }
        ],
        defaultUnitId: [
          { required: true, message: "默认归属单位不能为空", trigger: "blur" }
        ],
        // pwd: [{ required: true, message: "用户密码不能为空", trigger: "blur" }],
        // CheckPassword: [
        //   { required: true, validator: validatePass2, trigger: "blur" }
        // ],
        jobNum: [{ required: true, message: "工号不能为空", trigger: "blur" }],
        email: [
          { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    this.getList();
    this.getTreeselect();
    this.getRoleListRS();
    this.getMenuTreeselect();

  },
  methods: {
    changeDisabled(data, disabled) {
      for (var i = 0; i < data.length; i++) {
        var children = data[i].children;
        if (children !== undefined) {
          this.changeDisabled(children, true);
        }
        data[i]["disabled"] = disabled;
      }
    },
    /** 查询菜单树结构 */
    getMenuTreeselect() {
      var that = this;
      resourceTree().then(response => {
        var Moptiongs = that.changeDisabled(response, true);

        this.menuOptions = response;
      });
      listUnit().then(response => {
        var Uoptiongs = that.changeDisabled(response, true);

        this.UnOptions = response;

      });
    },
    handleCheckedRSChange(row) {
      roleMenuTreeselect(row.id).then(response => {
        this.$refs.menu.setCheckedKeys(response);
      });
    },
    handleCheckedUNChange(row) {
      UNroleMenuTreeselect(row.id).then(response => {
        this.$refs.menu1.setCheckedKeys(response);
      });
    },
    getRoleListRS() {
      listRole("RS").then(res => {
        this.RSlist = res;
      });
      listRole("UN").then(res => {
        this.UNlist = res;
      });
    },
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      UserList(this.queryParams).then(response => {
        this.userList = response.list;
        this.total = response.count;
        this.loading = false;
      });
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      DeptList().then(response => {
        this.deptOptions = response;
      });
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      this.queryParams.unitId = data.id;
      this.getList();
    },
    // 用户状态修改
    handleStatusChange(row) {
      let text = row.state === 1 ? "启用" : "停用";
      this.$confirm(
        '确认要"' + text + '""' + row.userName + '"用户吗?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return changeUserStatus(row.id, row.state);
        })
        .then(() => {
          this.msgSuccess(text + "成功");
        })
        .catch(function() {
          row.state = row.state === 1 ? 0 : 1;
        });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.checkedRsRoleIds=[]
      this.checkedUnRoleIds=[]
      this.form = {
        userId: undefined,
        unitId: undefined,
        userName: undefined,
        nickName: undefined,
        pwd: undefined,
        phone: undefined,
        email: undefined,
        sex: undefined,
        state: 1,
        remark: undefined,
        postIds: [],
        roleIds: [],
        checkedRsRoleIds: [],
        checkedUnRoleIds: []
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.page = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.getTreeselect();
      DeptList().then(response => {
        this.postOptions = response.data;
        // this.roleOptions = response.roles;
        this.open = true;
        this.title = "添加用户";
        this.form.pwd = this.initPassword;
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.getTreeselect();
      const userId = row.id || this.ids;

      getUser(userId).then(response => {
        this.form = response;
        this.checkedRsRoleIds = this.form.checkedRsRoleIds;
        this.checkedUnRoleIds = this.form.checkedUnRoleIds;
        // this.postOptions = response.posts;
        // this.roleOptions = response.roles;
        // this.form.postIds = response.postIds;
        // this.form.roleIds = response.roleIds;
        this.open = true;
        this.title = "修改用户";
        this.form.pwd = "";
      });
    },
    /** 重置密码按钮操作 */
    handleResetPwd(row) {
      this.$prompt('请输入"' + row.userName + '"的新密码', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          resetUserPwd(row.userId, value).then(response => {
            if (response.code === 200) {
              this.msgSuccess("修改成功，新密码是：" + value);
            }
          });
        })
        .catch(() => {});
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.checkedRsRoleIds = this.checkedRsRoleIds;
          this.form.checkedUnRoleIds = this.checkedUnRoleIds;
          this.form.pwd = Encrypt(this.form.pwd)
          if (this.form.id != undefined) {
            updateUser(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            adduser(this.form).then(response => {
              console.log("adduser", response);
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
      const userIds = row.userId || this.ids;
      console.log(row);
      this.$confirm(
        '是否确认删除用户编号为"' + userIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delUser(userIds);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "system/user/export",
        {
          ...this.queryParams
        },
        `user_${new Date().getTime()}.xlsx`
      );
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "用户导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download(
        "system/user/importTemplate",
        {
          ...this.queryParams
        },
        `user_${new Date().getTime()}.xlsx`
      );
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    }
  }
};
</script>

<style scoped>
.el-dialog .el-form-item--medium /deep/ .el-form-item__label {
  width: 120px !important;
}
.el-dialog .el-form-item--medium /deep/ .el-form-item__content {
  margin-left: 120px !important;
}
.el-textarea {
  width: 86% !important;
}
.cardlist {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.el-card {
  width: 43%;
  margin-bottom: 20px;
  height: 200px;
}
.el-checkbox-group {
  display: flex;
  flex-direction: column;
}
</style>
