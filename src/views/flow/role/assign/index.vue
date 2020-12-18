<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="单位" prop="unitId">
        <treeselect v-model="queryParams.unitId" :options="deptOptions" placeholder="请选择单位" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="50" class="mb8">
      <el-col :span="1.5" :offset="0.8">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="!submitAble"
          @click="submitForm"
        >保存</el-button>
      </el-col>
    </el-row>
    <div class="info">
      <div class="rolelist">
        <el-table
          v-loading="loading"
          :data="RoleList"
          highlight-current-row
          @row-click="handleCurrentChange"
        >
          <el-table-column label="角色标识号" prop="id" align="center" />
          <el-table-column label="角色名称" prop="roleName" align="center" />
        </el-table>
       <pagination
         v-show="total1>0"
         :total="total1"
         :page.sync="queryParams1.pageNum"
         :limit.sync="queryParams1.pageSize"
         @pagination="getList"
       />
        <div class="page-box">

          <!-- <el-pagination
            background
            style="margin-top:3px;"
            @current-change="handleRole"
            layout="prev, pager, next"
            :page-count="total1">
          </el-pagination> -->
          <!-- <el-select v-model="queryParams1.pageSize" placeholder="请选择" @change="getList" style="width:100px">
            <el-option value="10" label="10条/页"></el-option>
            <el-option value="20" label="20条/页"></el-option>
            <el-option value="30" label="30条/页"></el-option>
          </el-select> -->
        </div>
      </div>
      <div class="tablist">
        <!-- <div class="taglist">
          <el-tag
            style="margin-right:10px;margin-bottom:10px;"
            v-for="(tag,index) in tags"
            :key="index"
          >{{tag}}</el-tag>
        </div>
        <el-table v-loading="loading1" :data="UserList" @row-click="handleSelectionChange">
          <el-table-column label="用户姓名" prop="userName" align="center" />
          <el-table-column label="所属单位" prop="unitName" align="center" />
        </el-table>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getUserList"
        />-->
        <el-transfer v-model="form.userIds" :data="UserList" :titles="titles" filterable v-loading="loading1"></el-transfer>
      </div>
    </div>
  </div>
</template>

<script>
import { listRole, updateRoleUser } from "@/api/flow/role";
import { resourceTreeByUN } from "@/api/system/unit";
import { UserList,userSelect } from "@/api/system/user";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "Flowtype",
  components: { Treeselect },
  data() {
    return {
      tags: [],
      // submitAble:false,
      RoleAble: false,
      // UserAble: false,
      UserList: [],
      RoleList: [],
      activeName: "first",
      // 遮罩层
      loading: true,
      loading1: true,
      // 选中数组
      ids: [],
      // 总条数
      total: 0,
      total1: 0,
      // 角色表格数据
      flowList: [],
      typeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示弹出层（数据权限）
      openDataScope: false,
      // 日期范围
      dateRange: [],
      // 状态数据字典
      statusOptions: [
        { dictValue: 1, dictLabel: "正常" },
        { dictValue: 2, dictLabel: "停用" },
      ],
      // 部门列表
      deptOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 100000,
        unitId: undefined,
        state :1
      },
      queryParams1: {
        pageNum: 1,
        pageSize: 10,
      },
      // 表单参数
      form: {
        flowRoleId: undefined,
        userIds: [],
      },
      defaultProps: {
        children: "children",
        label: "label",
      },
      // 表单校验
      rules: {
        flowName: [
          { required: true, message: "类型名称不能为空", trigger: "blur" },
        ],
        sortNum: [
          { required: true, message: "显示顺序不能为空", trigger: "blur" },
        ],
      },
      //穿梭框标题
      titles:['待选用户列表','已选用户列表']
    };
  },
  computed: {
    submitAble() {
      return this.UserAble && this.RoleAble;
    },
    UserAble() {
      return this.form.userIds.length == 0 ? false : true;
    },
  },
  created() {
    this.getList();
    this.getTreeselect();
    this.getUserList();
  },
  methods: {
    getTreeselect() {
      let that = this;
      resourceTreeByUN().then((response) => {
        that.deptOptions = response.list;
        // that.queryParams.unitId = response.checked[0];
        // that.getList();
      });
    },
    handleClick() {},
    handleCurrentChange(row) {
      this.form.flowRoleId = row.id;
      this.RoleAble = true;
    },
    handleRole(cur){
      this.queryParams1.pageNum=cur;
      this.getList();
    },
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      listRole(this.queryParams1).then((response) => {
        this.RoleList = response.list;
        // this.total1 = Math.ceil(response.count/this.queryParams1.pageSize);
        this.total1 = response.totalRow
        this.loading = false;
      });
    },
    getUserList() {
      this.loading1 = true;
      userSelect().then((response) => {
        // this.UserList = response;
        response.map((item) => {
          let UserItem = {
            key: item.id,
            label: item.label,
          };
          this.UserList.push(UserItem);
        });
        // this.UserList = response.list;

        this.total = response.count;
        this.loading1 = false;
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
        flowRoleId: undefined,
        userIds: [],
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getUserList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(row) {
      let idIndex = this.form.userIds.indexOf(row.id);
      if (idIndex == -1) {
        this.form.userIds.push(row.id);
        this.tags.push(row.nickName);
      } else {
        this.form.userIds.splice(idIndex, 1);
        this.tags.splice(idIndex, 1);
      }
      this.UserAble = true;
    },
    /** 提交按钮 */
    submitForm: function () {
      updateRoleUser(this.form.flowRoleId, this.form.userIds)
        .then((response) => {
          this.msgSuccess("修改成功");
          this.open = false;
          this.form = {
            userIds: [],
            flowRoleId: undefined,
          };
          this.tags = [];
          this.getList();
        })
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      const typeIds = row.id || this.ids;
      this.$confirm(
        '是否确认删除流程类型编号为"' + typeIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delarr(typeIds);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function () {});
    },
  },
};
</script>
<style scoped>
.tablist /deep/ .el-transfer-panel{
  width: 30%;
}
.el-form-item--medium /deep/ .el-form-item__content {
  width: 230px;
}
.taglist {
  position: absolute;
  top: -80px;
  /* right: -60px; */
  /* width: 160px; */
  /* display: flex; */
  /* flex-wrap: wrap-reverse; */
  /* flex-direction: row-reverse; */
}
.rolelist {
  width: 40%;

  /* background-color: transparent; */
}
.page-box{
  width:100%;
  display: flex;
  flex-direction: row;
}
.el-table {
  /* width: 40%; */
  background-color: transparent;
}
.info {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.tablist .el-table {
  width: 100%;
  background-color: transparent;
}
.tablist {
  position: relative;
  width: 50%;
}
.tablist /deep/ .el-transfer-panel{
  width:50%;
}
.tablist  /deep/ .el-transfer{
  display: flex;
  flex-direction: row;
}

.tablist /deep/ .el-transfer__buttons {
  padding: 0px;
  marign: 0px;
  box-sizing: border-box;
  padding-top: 14%;
  text-align: center;
}

.tablist /deep/ .el-transfer__button {
  margin: 0;
  padding: 0;
  padding: 8px 10px;
}

.tablist /deep/ .el-transfer__button:nth-child(1) {
  margin-bottom: 16%;
}
</style>
