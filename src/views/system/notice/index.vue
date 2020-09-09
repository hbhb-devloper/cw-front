<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="公告内容" prop="content">
        <el-input
          v-model="queryParams.content"
          placeholder="请输入公告内容"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公告状态" prop="state">
        <el-select v-model="queryParams.state" placeholder="请选择公告状态" clearable size="small">
          <el-option label="-全部-" :value="undefined"/>
          <el-option label="启用" :value="1"/>
          <el-option label="停用" :value="0"/>
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
          v-hasPermi="['system:notice:add']"
        >新增
        </el-button>
      </el-col>
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="success"-->
      <!--          icon="el-icon-edit"-->
      <!--          size="mini"-->
      <!--          :disabled="single"-->
      <!--          @click="handleUpdate"-->
      <!--          v-hasPermi="['system:notice:edit']"-->
      <!--        >修改</el-button>-->
      <!--      </el-col>-->
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="danger"-->
      <!--          icon="el-icon-delete"-->
      <!--          size="mini"-->
      <!--          :disabled="multiple"-->
      <!--          @click="handleDelete"-->
      <!--          v-hasPermi="['system:notice:remove']"-->
      <!--        >删除</el-button>-->
      <!--      </el-col>-->
    </el-row>

    <el-table v-loading="loading" :data="noticeList">
      <el-table-column
        label="公告内容"
        align="center"
        prop="content"
        width="500"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="显示顺序"
        align="center"
        prop="sortNum"
      />
      <el-table-column
        label="状态"
        align="center"
        prop="state">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            @change="handleChange(scope.row)"
            active-text="启用"
            inactive-text="停用">
          </el-switch>
<!--          <span>{{scope.row.state?'启用':'停用'}}</span>-->
        </template>
      </el-table-column>
<!--      <el-table-column label="创建者" align="center" prop="createBy" />-->
      <el-table-column label="创建时间" align="center" prop="createTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:notice:edit']"
          >修改
          </el-button>
                    <el-button
                      size="mini"
                      type="text"
                      icon="el-icon-delete"
                      @click="handleDelete(scope.row)"
                      v-hasPermi="['system:notice:remove']"
                    >删除</el-button>
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

    <!-- 添加或修改公告对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="16">
            <el-form-item label="公告内容" prop="content">
              <el-input type="textarea" v-model="form.content" placeholder="请输入公告标题"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态" prop="state">
              <el-switch
                v-model="form.state"
                active-text="启用"
                inactive-text="停用">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="显顺序" prop="sortNum">
              <el-input-number v-model="form.sortNum" :min="1" :max="10" label="显顺序"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="padding-top:20px">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {listNotice, delNotice, addNotice, updateNotice, exportNotice} from "@/api/system/notice";
  import Editor from '@/components/Editor';

  export default {
    name: "Notice",
    components: {
      Editor
    },
    data() {
      return {
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
        status: true,//操作状态
      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询公告列表 */
      getList() {
        this.loading = true;
        listNotice(this.queryParams).then(response => {
          response.list.map(function(item, index, arr){
            if(item.state){
              item.state=true;
            }else{
              item.state=false;
            }
          });
          this.noticeList = response.list;
          this.total = response.count;
          this.loading = false;
        }).catch(err => {
          this.loading = false;
        });
      },
      // 公告状态字典翻译
      statusFormat(row, column) {
        return this.selectDictLabel(this.statusOptions, row.status);
      },
      // 公告状态字典翻译
      typeFormat(row, column) {
        return this.selectDictLabel(this.typeOptions, row.noticeType);
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
          state:undefined
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
        console.log(row);
        let datas=JSON.parse(JSON.stringify(row));
        delete datas.createTime;
        delete datas.createBy;
        datas.state=datas.state?1:0;
        updateNotice(datas).then(response => {
          this.msgSuccess("修改成功");
          this.getList();
        });
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加公告";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        this.form = JSON.parse(JSON.stringify(row));
        delete this.form.createTime;
        delete this.form.createBy;
        this.open = true;
        this.title = "修改公告";
      },
      /** 提交按钮 */
      submitForm: function () {
        this.form.state = this.form.state ? 1 : 0;
        if (this.form.id != undefined) {
          updateNotice(this.form).then(response => {
            this.msgSuccess("修改成功");
            this.open = false;
            this.getList();
          });
        } else {
          addNotice(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
          });
        }
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const noticeIds = row.id
        this.$confirm('是否确认删除"' + row.content + '"这条公告通知?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return delNotice(noticeIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function () {
        });
      }
    }
  };
</script>
