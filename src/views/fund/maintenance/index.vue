<template>
  <div class="app-container">
    <div class="uploadList">
      <div style="color:blue;">发票单位信息导入模板下载</div>
      <div style="color:red;">注意：导入单位模块后，请认真查看返回信息，若没有提示导入成功，则需要重新编辑模板导入</div>
      <!--      <el-upload-->
      <!--        class="upload-demo"-->
      <!--        action="https://jsonplaceholder.typicode.com/posts/"-->
      <!--        :on-preview="handlePreview"-->
      <!--        :on-remove="handleRemove"-->
      <!--        :before-remove="beforeRemove"-->
      <!--        multiple-->
      <!--        :limit="3"-->
      <!--        :on-exceed="handleExceed"-->
      <!--        :file-list="fileList"-->
      <!--      >-->
      <!--        <el-button size="small" type="primary">点击上传</el-button>-->
      <!--      </el-upload>-->
      <el-upload
        class="upload-demo"
        :show-file-list="false"
        multiple
        :accept="'.xls,.xlsx'"
        action="#"
        :http-request="UploadFile"
        :file-list="fileList"
      >
        <el-button size="small" type="primary" class="uploadImgBtn">导入</el-button>
      </el-upload>
      <el-table :data="tableData" style="width: 100%;margin-top:15px;">
        <el-table-column prop="date" label="数据导入检查结果"></el-table-column>
      </el-table>
    </div>
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="单位名称" prop="unitName">
        <el-input
          v-model="queryParams.unitName"
          placeholder="请输入单位名称"
          clearable
          size="small"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="单位编号" prop="unitCode">
        <el-input
          v-model="queryParams.unitCode"
          placeholder="请输入单位编号"
          clearable
          size="small"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="warning" icon="el-icon-download" size="mini" @click="handleExport" v-if="false">导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="TableData">
      <el-table-column label="序号" prop="id" align="center"/>
      <el-table-column label="单位名称" prop="unitName" align="center"/>
      <el-table-column label="单位编号" prop="unitCode" align="center"/>
      <el-table-column label="是否启用(1为是,0为否)" prop="state" align="center"/>
      <el-table-column label="期初金额" prop="initialAmount" align="center"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click.stop="handleOpen(scope.row)">编辑</el-button>
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
    <el-dialog title="修改" :visible.sync="open" width="500px">
      <el-form :model="queryParams" ref="queryForm" :inline="true">
        <el-form-item label="单位名称" prop="unitName">
          <el-input
            v-model="queryParams1.unitName"
            placeholder="请输入单位名称"
            clearable
            size="small"
            style="width: 240px"
          />
        </el-form-item>
        <el-form-item label="单位编号" prop="unitCode">
          <el-input
            v-model="queryParams1.unitCode"
            placeholder="请输入单位编号"
            clearable
            size="small"
            style="width: 240px"
          />
        </el-form-item>
        <el-form-item label="是否启用" prop="state">
          <el-switch
            v-model="queryParams1.state"
            active-text="是"
            inactive-text="否">
          </el-switch>
        </el-form-item>

      </el-form>
      <el-button size="mini" @click="cancel">取消</el-button>
      <el-button type="primary" size="mini" @click="submitForm">提交</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import {getUnitList,UpdateUnit} from "@/api/fund/maintenance/index";
  import {listType} from "@/api/flow/type";
  import {listUnit} from "@/api/system/unit";
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";
  import {exportData} from "@/utils/export";
  import {getToken} from "@/utils/auth";
  import axios from "axios";

  export default {
    data() {
      return {
        tableData: [],
        ActionUrl: process.env.VUE_APP_BASE_API + '/fund/import',
        fileList: [],
        // 遮罩层
        loading: true,
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 总条数
        total: 0,
        TableData: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        queryParams: {
          pageNum: 1,
          pageSize: 10,
        },
        queryParams1:{},
        // 表单参数
        form: {},
        defaultProps: {
          children: "children",
          label: "label",
        },
      };
    },
    created() {
      this.getList();
    },
    methods: {
      //文件上传
      UploadFile(param) {
        const _file = param.file;
        let params = new FormData();
        params.append('file', _file);
        axios({
          url: this.ActionUrl,
          method: 'post',
          data: params,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': getToken()
          }
        }).then(res => {
          this.tableData=[];

          if(!res.data.data&&res.data.status==1000){
            this.msgSuccess('数据导入成功');
            this.getList();
          }else{
            for(let item in res.data.data){
              this.tableData.push({date:res.data.data[item]});
            }
            this.msgError('数据导入失败，请查看错误信息重新导入');
          }
        })
      },
      //获取列表
      getList() {
        this.loading = true;
        getUnitList(this.queryParams).then(response => {
          this.TableData = response.list;
          this.total = response.count;
          this.loading = false;
        });
      },
      handleOpen(row){
        this.open=true;
        let rows=JSON.parse(JSON.stringify(row));
        this.queryParams1={
          unitCode:rows.unitCode,
          unitName:rows.unitName,
          state:rows.state?true:false,
          id:rows.id
        }
      },
      // 取消按钮
      cancel() {
        this.queryParams1={};
        this.open = false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.form = {
          id: undefined,
          flowName: undefined,
          sortNum: 0,
          remark: undefined,
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
        this.queryParams={
          pageNum: 0,
          pageSize: 10
        }
        this.handleQuery();
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map((item) => item.id);
        this.single = selection.length != 1;
        this.multiple = !selection.length;
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加类型";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const typeId = row.id || this.ids;
        //   getRole(typeId).then(response => {
        this.form = row;
        this.open = true;
        this.title = "修改类型";
        //   });
      },

      /** 提交按钮 */
      submitForm: function () {
        UpdateUnit(this.queryParams1).then(res=>{
          this.$message.success('修改成功');
          this.open=false;
          this.getList();
        })
      },


    },
  };
</script>
<style scoped>
  .uploadList {
    width: 100%;
    padding: 15px;
    border: 1px solid #0d8efd;
    background: #fff;
    border-radius: 15px;
    margin-bottom: 15px;
  }
</style>
