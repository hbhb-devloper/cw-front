<template>
  <div class="app-container">
    <div class="app-top">
      <div>
        <el-col :span="24" :xs="24">
          <el-form ref="queryForm" :inline="true" label-width="100px">
            <el-form-item label="发票代码：" prop="userName">
              <el-input
                placeholder="请输入关键词"
                v-model="obj2.invoiceCode"
                clearable
                name="invoiceCode"
                size="small"
                style="width: 240px"
              />
            </el-form-item>
            <el-form-item label="发票号码：" prop="userName">
              <el-input
                placeholder="请输入关键词"
                v-model="obj2.invoiceNumber"
                name="invoiceNumber"
                clearable
                size="small"
                style="width: 240px"
              />
            </el-form-item>
            <el-form-item label="开票日期：" prop="phonenumber">

              <el-date-picker
                v-model="obj2.invoiceDate"
                type="date"
                name="invoiceDate"
                style="width: 240px"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="购方税号：" prop="phonenumber">
              <el-input
                placeholder="请输入关键词"
                v-model="obj2.buyerTaxId"
                name="buyerTaxId"
                clearable
                size="small"
                style="width: 240px"
              />
            </el-form-item>
            <el-form-item label="不含税金额：" prop="phonenumber">
              <el-input
                placeholder="请输入关键词"
                v-model="obj2.taxFreeAmount"
                type="number"
                name="taxFreeAmount"
                clearable
                size="small"
                style="width: 240px"
              />
            </el-form-item>
            <el-form-item label="分公司：" prop="phonenumber">
              <el-input
                placeholder="请输入关键词"
                v-model="obj2.branch"
                name="branch"
                clearable
                size="small"
                style="width: 240px"
              />
            </el-form-item>
            <el-form-item label="导入人员：" prop="userName">
              <el-input
                placeholder="请输入关键词"
                v-model="obj2.personnel"
                clearable
                name="personnel"
                size="small"
                style="width: 240px"
              />
            </el-form-item>
            <el-form-item label="导入时间：">
              <el-date-picker
                v-model="obj2.itime"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleSelect">搜索</el-button>
              <el-button icon="el-icon-refresh" size="mini" @click="handleReset">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </div>
    </div>
    <div class="table-box">
      <div class="table-btn-box">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleInsrt">添加</el-button>
        <el-button type="success" icon="el-icon-edit" size="mini" @click="handleUpdata">修改</el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelarr">删除</el-button>
        <el-button type="warning" icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
        <el-button type="warning" icon="el-icon-download" size="mini" @click="handleBatchExport">批量导出</el-button>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%;margin-top:20px;text-align: center"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55"
            align="center">
          </el-table-column>
          <el-table-column
            prop="lineNumber"
            label="行号（必输）"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="invoiceType"
            label="发票种类代码"
            align="center"
            width="110">
          </el-table-column>
          <el-table-column
            prop="invoiceCode"
            label="发票代码"
            align="center"
            width="110">
          </el-table-column>
          <el-table-column
            prop="invoiceNumber"
            label="发票号码"
            align="center"
            width="90">
          </el-table-column>
          <el-table-column
            prop="invoicePageNumber"
            label="开票页码"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="invoiceDate"
            label="开票日期（格式YYY/MM/DD）"
            align="center"
            width="220">
          </el-table-column>
          <el-table-column
            prop="taxFreeAmount"
            label="不含税金额"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            prop="buyerTaxId"
            align="center"
            label="购方税号"
            width="170">
          </el-table-column>
          <el-table-column
            prop="projectProperties"
            label="项目属性（0-不动产; 1-动产; 2-其他）"
            align="center"
            width="260">
          </el-table-column>
          <el-table-column
            prop="tableNumber"
            label="红字信息表号"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="branch"
            align="center"
            label="分公司">
          </el-table-column>
          <el-table-column
            prop="itime"
            align="center"
            width="220"
            label="导入时间">
          </el-table-column>
          <el-table-column
            prop="personnel"
            label="导入人员"
            width="80">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="150">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="paging">
          <el-pagination
            background
            style="margin-top:3px;"
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :page-count="pages">
          </el-pagination>
          <el-select v-model="total" placeholder="请选择" style="width:100px">
            <el-option value="10" label="10条/页"></el-option>
            <el-option value="20" label="20条/页"></el-option>
            <el-option value="30" label="30条/页"></el-option>
          </el-select>
        </div>
      </div>
      <div class="updatas">
        <el-dialog :visible.sync="centerDialogVisible">
          <el-form ref="queryForm" :inline="true" label-width="200px">
            <el-form-item label="发票种类代码：" :required="true">
              <el-select v-model="obj.invoiceType" placeholder="请选择关键词">
                <el-option label="增值税专用发票" value="01"></el-option>
                <el-option label="机动车销售统一发票" value="03"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发票代码：" :required="true">
              <el-input
                placeholder="请输入关键词"
                v-model="obj.invoiceCode"
                @blur="handleInput(1)"
                style="width: 200px"
                clearable
                size="small"
              />
            </el-form-item>
            <el-form-item label="发票号码：" :required="true">
              <el-input
                placeholder="请输入关键词"
                v-model="obj.invoiceNumber"
                @blur="handleInput(2)"
                style="width: 200px"
                clearable
                size="small"
              />
            </el-form-item>
            <el-form-item label="开票日期："  :required="true">
              <el-date-picker
                v-model="obj.invoiceDate"
                type="date"
                name="invoiceDate"
                style="width:200px"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="不含税金额："  :required="true">
              <el-input
                placeholder="请输入关键词"
                v-model="obj.taxFreeAmount"
                style="width: 200px"
                type="number"
                clearable
                size="small"
              />
            </el-form-item>
            <el-form-item label="开票页码：" prop="userName">
              <el-input
                placeholder="请输入关键词"
                v-model="obj.invoicePageNumber"
                style="width: 200px"
                clearable
                type="number"
                size="small"
              />
            </el-form-item>
            <el-form-item label="红字信息表号：" v-if="insetUpdata==2" prop="phonenumber">
              <el-input
                placeholder="请输入关键词"
                clearable
                v-model="obj.tableNumber"
                style="width: 200px"
                size="small"
              />
            </el-form-item>
            <el-form-item style="width:100%;text-align: right;margin-top:20px;">
              <el-button type="primary" @click="handleCancel" style="margin-right: 50px;">取消</el-button>
              <el-button type="primary" @click="handleSubmit">提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>

    </div>

  </div>
</template>

<script>
  import { getList, adddata, update, delData, delarr,getInfo } from '@/api/invoice/pro_vat/6vat.js'
  import {exportData,BatchExport} from '@/utils/export'
  import { getToken } from '@/utils/auth'
  import { dateTimes } from '@/utils/date.js'

  export default {
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        count: 0,
        total: 20,
        centerDialogVisible: false,
        obj: {
          branch: '',
          buyerTaxId: '',
          invoiceCode: '',
          invoiceDate: '',
          invoiceNumber: '',
          invoicePageNumber: '',
          invoiceType: '',
          itime: '',
          lineNumber: '',
          personnel: '',
          projectProperties: '',
          tableNumber: '',
          taxFreeAmount: '',
          vat6Id: null
        },
        insetUpdata: 1,
        delarrs: [],
        page: 1,
        pagesize: 20,
        obj2: {
          invoiceType:undefined,
          invoiceNumber: undefined,
          invoiceDate: undefined,
          buyerTaxId:undefined,
          taxFreeAmount: undefined,
          branch: undefined,
          itime: undefined,
          personnel: undefined,
          pageNum:1,
          pageSize:20,
        },
        batch:{}
      }
    },
    mounted() {
      this.handleSelect();
    },
    computed:{
      pages(){
        let page=Math.ceil(this.count/this.total);
        return page
      }
    },
    watch: {
      //监听选择条数
      total: function(newVal, oldVal) {
        this.obj2.pageNum=this.page;
        this.obj2.pageSize=newVal;
        this.handleSelect();
      }
    },
    methods: {
      //获取列表信息
      handleList(data) {
        this.token = getToken()
        getList(data).then(res => {
          this.tableData = res.list
          this.count = res.count
        })
      },
      //模糊查询
      handleSelect() {
        let params = {};
        params=JSON.parse(JSON.stringify(this.obj2));
        if(params.itime){
          params.beginTime=params.itime[0];
          params.endTime=params.itime[1];
        }else{
          params.beginTime=undefined;
          params.endTime=undefined;
        }
        delete params.itime;
        this.batch=params;
        getList(params).then(res => {
          this.tableData = res.list;
          this.count = res.count;
        })

      },
      //验证发票代码号码长度
      handleInput(id) {
        switch (id) {
          case 1:
            if (this.obj.invoiceCode.length != 10) {
              this.$message.warning('发票代码必须为10位');
            }
            break
          case 2:
            if (this.obj.invoiceNumber.length != 8) {
              this.$message.warning('发票号码必须为8位');
            }
            break
        }
      },
      //分页
      handleCurrentChange(val) {
        this.page = val;
        this.obj2.pageNum=val;
        this.obj2.pageSize=this.total;
        this.handleSelect();
      },
      //添加弹窗
      handleInsrt() {
        this.obj = {
          branch: '', //分公司
          buyerTaxId: '', //购方税号
          invoiceCode: '',  //发票代码
          invoiceDate: '',  //开票日期
          invoiceNumber: '',  //发票号码
          invoicePageNumber: '',  //发票页码
          invoiceType: '',  //发票种类
          itime: '',  //导入时间
          lineNumber: '', //行号
          personnel: '',  //导入人员
          projectProperties: '',  //项目属性
          tableNumber: '',  //红色信息代表
          taxFreeAmount: ''  //不含税金额
        };
        this.centerDialogVisible = true;
        this.insetUpdata=1;
      },
      //修改弹窗
      handleEdit(index, row, type) {

        getInfo(row.vat6Id).then((res)=>{
          this.obj=res;
        });
        this.insetUpdata = type || 2;
        this.centerDialogVisible = true;
      },
      //记录删除
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delData(row.vat6Id).then(res => {
            this.$message.success('删除成功！')
            this.handleSelect();
          })
        })
      },
      //选择
      handleSelectionChange(val) {
        let arr = [];
        for (let key of val) {
          arr.push(key.vat6Id);
        }
        this.delarrs = arr;
        this.insetUpdata=2;
      },
      //批量删除
      handleDelarr() {
        if (this.delarrs.length <= 0) {
          this.$message.warning('请选择要删除的记录')
          return
        }
        this.$confirm('此操作将永久删除记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delarr(this.delarrs).then(res => {
            this.$message({
              message: '删除成功！',
              type: 'success'
            })
            this.handleSelect();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      //关闭弹窗
      handleCancel() {
        this.centerDialogVisible = false
      },
      //重置
      handleReset() {
        this.obj2 = {
          invoiceCode:undefined,
          invoiceNumber: undefined,
          invoiceDate: undefined,
          buyerTaxId: undefined,
          taxFreeAmount: undefined,
          branch: undefined,
          itime:undefined,
          pageNum: 1,
          pageSize: 20
        };
        this.total=20;
        this.page=1;
        this.batch={};
      },
      //修改记录
      handleUpdata() {
        if (this.delarrs.length != 1) {
          this.$message.warning('只能选择一条数据进行修改！')
          return
        }
        getInfo(this.delarrs[0]).then(res=>{
          this.obj=res;
        });
        this.centerDialogVisible = true;
      },
      //信息提交
      handleSubmit() {
        this.obj.invoiceDate=dateTimes(this.obj.invoiceDate);
        let datas={
          invoiceType:this.obj.invoiceType,
          invoiceCode:this.obj.invoiceCode,
          invoiceNumber:this.obj.invoiceNumber,
          invoicePageNumber:this.obj.invoicePageNumber,
          invoiceDate:this.obj.invoiceDate,
          taxFreeAmount:this.obj.taxFreeAmount,
          projectProperties:this.obj.projectProperties,
          tableNumber:this.obj.tableNumber
        }
        if(!datas.invoiceCode||!datas.invoiceType||!datas.invoiceNumber||!datas.invoiceDate||!datas.taxFreeAmount){
          this.$message.warning('必填项不能为空！');
          return;
        }
        if(this.obj.invoiceCode.length!=10){
          this.$message.warning('发票代码必须为10位');
          return;
        }
        if(this.obj.invoiceNumber.length!=8){
          this.$message.warning('发票号码必须为8位');
          return;
        }
        if (this.insetUpdata == 1) {
          adddata(datas).then(res => {
            this.$message.success('添加成功！');
            this.handleSelect();
          })
        } else if (this.insetUpdata == 2) {

          update(this.obj).then(res => {
            this.$message.success('修改成功！');
            this.handleSelect();
          })
        }
        this.centerDialogVisible = false;
      },
      //Excel导出
      handleExport() {
        if (this.delarrs.length == 0) {
          this.$message.warning('请勾选出需要导出的记录！');
          return;
        }
        exportData(getToken(), this.delarrs, '/invoice/invoice_6vat/export', '增值税6%专票');
      },
      handleBatchExport(){
        this.$confirm('是否按当前搜索条件导出', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delete this.batch.pageNum;
          delete this.batch.pageSize;
          BatchExport(getToken(), this.batch, '/invoice/invoice_6vat/export/all', '增值税6%专票')
        });
      }
    }
  }
</script>
<style scoped>

  body {
    background: #F4F4F4;
  }

  .app-container {
    background: #F4F4F4;
    display: flex;
    flex-direction: column;
  }
  .table-box {
    padding: 15px 20px;
    margin-top: 20px;
    background: #fff;
  }

  .table-btn-box {
    position: relative;
  }

  .el-icon-printer {
    position: absolute;
    right: 0;
    font-size: 21px;
    top: 5px;
  }

  .paging {
    margin: 20px 0 0 80px;
    display: flex;
    flex-direction: row;
  }
</style>
