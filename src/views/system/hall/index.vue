<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      label-width="90px"
    >
      <el-form-item label="分公司" prop="unitId">
        <el-select
          v-model="queryParams.unitId"
          placeholder="请选择分公司"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in unitList"
            :key="dict.id"
            :label="dict.label"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="营业厅名称" prop="hallName">
        <el-input
          v-model="queryParams.hallName"
          placeholder="请输入营业厅名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="营业厅状态" prop="enable">
        <el-select
          v-model="queryParams.enable"
          placeholder="请选择营业厅状态"
          clearable
          size="small"
        >
          <el-option label="-全部-" :value="undefined" />
          <el-option label="启用" :value="1" />
          <el-option label="停用" :value="0" />
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
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
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
          v-hasPermi="['system:notice:add']"
          >新增
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="noticeList">
      <el-table-column
        label="营业厅名称"
        align="center"
        prop="hallName"
        width="500"
      />
      <el-table-column
        label="所属分公司名称"
        align="center"
        prop="unitName"
      ></el-table-column>
      <!-- <el-table-column label="创建时间" align="center" prop="createTime" /> -->
      <el-table-column label="状态" align="center" prop="state">
        <template slot-scope="scope">
          <!-- <el-switch
            v-model="scope.row.enable"
            @change="handleChange(scope.row)"
          >
          </el-switch> -->
          <span>{{ scope.row.state ? "启用" : "停用" }}</span>
        </template>
      </el-table-column>
      <!--      <el-table-column label="创建者" align="center" prop="createBy" />-->

      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            >修改
          </el-button>
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:notice:remove']"
            >删除
          </el-button> -->
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

    <!-- 添加或修改公告对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="90px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="分公司" prop="unitId">
              <el-select
                v-model="form.unitId"
                placeholder="请选择分公司"
                clearable
                size="small"
              >
                <el-option
                  v-for="dict in unitList"
                  :key="dict.id"
                  :label="dict.label"
                  :value="dict.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="营业厅名称" prop="hallName">
              <el-input
                v-model="form.hallName"
                placeholder="请输入营业厅名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态" prop="enable">
              <el-switch
                v-model="form.enable"
                active-text="启用"
                inactive-text="停用"
              >
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="padding-top: 20px">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listHall,
  addHall,
  updataHall,
  getUnitSubList,
} from "@/api/system/hall";

export default {
  name: "Hall",
  data() {
    return {
      rules: {
        content: [
          { required: true, message: "公告内容不能为空", trigger: "blur" },
        ],
      },
      // 遮罩层
      loading: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 公告表格数据
      noticeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        content: undefined,
        state: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      status: true, //操作状态
      // 分公司下拉框
      unitList: [],
    };
  },
  created() {
    this.getList();
    this.getUnitSubList();
  },
  methods: {
    /** 查询公告列表 */
    getList() {
      this.loading = true;
      listHall(this.queryParams)
        .then((response) => {
          response.list.map((item) => {
            if (item.enable) {
              item.state = "启用";
            } else {
              item.state = "停用";
            }
          });
          this.noticeList = response.list;
          this.total = response.totalRow;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    getUnitSubList() {
      getUnitSubList().then((res) => {
        this.unitList = res;
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
        content: undefined,
        sortNum: undefined,
        state: undefined,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 开关事件
    handleChange(row) {
      let datas = JSON.parse(JSON.stringify(row));
      delete datas.createTime;
      delete datas.createBy;
      datas.state = datas.state ? 1 : 0;
      updateNotice(datas).then((response) => {
        if (datas.state) {
          this.msgSuccess("已启用");
        } else {
          this.msgSuccess("已停用");
        }
        this.getList();
        this.$store.dispatch("SET_GETNOTICE");
      });
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加营业厅";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.form = JSON.parse(JSON.stringify(row));
      delete this.form.createTime;
      delete this.form.createBy;
      this.open = true;
      this.title = "修改营业厅";
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.form.enable = this.form.enable ? 1 : 0;
          if (this.form.id != undefined) {
            updataHall(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              // this.$store.dispatch("SET_GETNOTICE");
              this.getList();
            });
          } else {
            addHall(this.form).then((response) => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
              // this.$store.dispatch("SET_GETNOTICE");
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const noticeIds = row.id;
      this.$confirm(
        '是否确认删除"' + row.hallName + '"这条营业厅信息?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delNotice(noticeIds);
        })
        .then(() => {
          // this.$store.dispatch("SET_GETNOTICE");
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
  },
};
</script>
