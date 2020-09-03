<template>
  <div class="containers">
    <el-form :model="queryParams" ref="queryForm" label-width="70px" :inline="true">
      <el-form-item label="部门" prop="dptId">
        <treeselect v-model="queryParams.dptId" style="width:200px" :options="deptOptions" placeholder="请选择部门"/>
      </el-form-item>
      <el-form-item label="款项类型" prop="amountType">
        <el-select v-model="queryParams.amountType" style="width:200px" placeholder="请选择">
          <el-option label="现金" value="现金"></el-option>
          <el-option label="支票" value="支票"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="集团信息" prop="groupName">
        <el-input
          placeholder="请输入集团信息"
          v-model="queryParams.groupName"
          size="small"
          style="width:200px"
        />
      </el-form-item>
      <el-form-item label="办理业务" prop="busType">
        <el-select v-model="queryParams.busType" style="width:200px" filterable  placeholder="请选择">
          <el-option label="--全部--" value="undefined"></el-option>
          <el-option v-for="(item,index) in busTypeOptions" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资金流向" prop="fundFlows">
        <el-select v-model="queryParams.fundFlows" style="width:200px" filterable  placeholder="请选择">
          <el-option label="--全部--" value="undefined"></el-option>
          <el-option label="收款" value="收款"></el-option>
          <el-option label="使用" value="使用"></el-option>
          <el-option label="退款" value="退款"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="编号" prop="fcCode">
        <el-input
          placeholder="请输入编号"
          v-model="queryParams.fcCode"
          size="small"
          style="width:200px"
        />
      </el-form-item>
      <el-form-item label="时间" prop="peopleDownTime">
        <el-date-picker
          v-model="queryParams.peopleDownTime"
          type="date"
          placeholder="选择时间"
          style="width:200px"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="录入人" prop="userName">
        <el-input
          placeholder="请输入录入人"
          v-model="queryParams.userName"
          size="small"
          style="width:200px"
        />
      </el-form-item>
      <el-form-item label="流程状态" prop="state">
        <el-select v-model="queryParams.state" style="width:200px" filterable  placeholder="请选择">
<!--          <el-option label="&#45;&#45;全部&#45;&#45;" value="undefined"></el-option>-->
          <el-option label="审批未发起" value="0"></el-option>
          <el-option label="正在审批" value="1"></el-option>
          <el-option label="审批未通过" value="2"></el-option>
          <el-option label="审批通过" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年份" prop="year">
        <el-date-picker
          v-model="queryParams.year"
          type="year"
          style="width:200px"
          placeholder="选择年份"
          format="yyyy"
          value-format="yyyy"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="getList">查询</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['budget:split:export']"
        >导出</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column align="center" type="index" label="序号"></el-table-column>
      <el-table-column prop="fcCode" width="200px" align="center" label="编号"></el-table-column>
      <el-table-column prop="createTime" width="120px" align="center" label="日期"></el-table-column>
      <el-table-column prop="dptName" align="center" label="部门"></el-table-column>
      <el-table-column prop="groupName" width="200px" align="center" label="集团信息"></el-table-column>
      <el-table-column prop="busType" align="center" label="办理业务"></el-table-column>
      <el-table-column prop="fundFlows" align="center" label="资金流向"></el-table-column>
      <el-table-column prop="amountType" align="center" label="款项类型"></el-table-column>
      <el-table-column prop="amount" align="center" label="金额(元)"></el-table-column>
      <el-table-column prop="invoiceAmount" align="center" label="发票金额"></el-table-column>
      <el-table-column prop="invoiceCode" align="center" label="发票编号"></el-table-column>
      <el-table-column prop="preInvoiceAmount" align="center" width="100px" label="预开金额(元)"></el-table-column>
      <el-table-column prop="userName" align="center" label="录入人"></el-table-column>
      <el-table-column prop="peopleDown" align="center" label="落地人"></el-table-column>
      <el-table-column prop="peopleDownTime" align="center" width="120px" label="落地时间"></el-table-column>
      <el-table-column prop="state" align="center" label="流程状态">
        <template slot-scope="scope">
          <span style="color:#409EFF;" v-if="scope.row.state==0">审批未发起</span>
          <span style="color:#409EFF;" v-if="scope.row.state==1">正在审批</span>
          <span style="color:#409EFF;" v-if="scope.row.state==2">审批未通过</span>
          <span style="color:#409EFF;" v-if="scope.row.state==3">审批通过</span>
        </template>
      </el-table-column>
      <el-table-column prop="itemName" align="center" label="发起流程">
        <template slot-scope="scope">
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            :disabled="scope.row.state==0">查看流程-->
<!--          </el-button>-->
          <router-link style="color:#409EFF;" :to="'/fund/select/info/'+scope.row.id">查看流程
          </router-link>
        </template>
      </el-table-column>
<!--      <el-table-column prop="itemName" align="center" label="编辑"></el-table-column>-->
<!--      <el-table-column prop="itemName" align="center" label="编辑发票"></el-table-column>-->
<!--      <el-table-column prop="itemName" align="center" label="编辑附件"></el-table-column>-->
      <el-table-column prop="itemName" align="center" label="删除">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            :disabled="scope.row.state==1||scope.row.state==3"
            icon="el-icon-delete">删除
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="document" align="center" label="是否含附件"></el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";
  import { resourceTreeByUN } from "@/api/system/unit";
  import {getHistroyList,getUnitList} from '@/api/fund/fundSelect'
  import {fundSelectExprot} from '@/utils/export.js'
  import {getToken} from '@/utils/auth'
  export default {
    name: "index",
    data() {
      return {
        total:0,
        queryParams:{
          dptId:undefined,//部门
          amountType:undefined,//款项类型
          groupName:undefined,//集团信息
          busType:undefined,//办理业务
          fundFlows:undefined,//资金流向
          fcCode:undefined,//编号
          peopleDownTime:undefined,//时间
          userName:undefined,//录入人
          state:undefined,//流程状态
          year:undefined,//年份
          pageSize:10,
          pageNum:1
        },//条件搜索表单
        deptOptions:[],//单位下拉
        busTypeOptions:['一次性收入','集团统付','可变资金划账','购卡','现金充值','预缴(除统付外)','开户','终端捆绑','退款','其它','欠费缴纳','集团预付(预开发票)'],//业务下拉类
        tableData:[
          {
            id:8,
            fcCode:1,
            createTime:2020,
            dptName:'ddd',
            groupName:'eed',
            busType:'add',
            fundFlows:52,
            amountType:'dss',
            amount:'sd',
            invoiceAmount:55,
            invoiceCode:5855,
            preInvoiceAmount:'dssd0',
            userName:'sdfsd',
            peopleDown:559,
            peopleDownTime:5,
            state:2,
            document:'是'
          }
        ],//表格数据
        loading:true,//表格加载动画
      }
    },
    components:{
      Treeselect,
    },
    created() {
      this.getUnitId();
      this.getList();
    },
    methods:{
      //获取部门列表
      getUnitId(){
        resourceTreeByUN().then(res=>{
          this.queryParams.dptId=res.checked[0];
          this.deptOptions=res.list;
        });
      },
      //表格数据列表
      getList(){
        this.loading=true;
        getHistroyList(this.queryParams).then(res=>{
          this.total=res.count;
          this.tableData=res.list;
          this.loading=false;
        }).catch(err=>{
          this.loading=false;
        })
      },
      //充置搜索
      resetQuery(){
        this.queryParams={};
      },
      //导出
      handleExport(){
        this.$confirm(
          '是否导出数据？',
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).then(res=>{
          this.queryParams.pageSize=this.queryParams.pageNum=undefined

          fundSelectExprot(getToken(),this.queryParams,'/fund/history/export','客户资金查询')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-form-item--medium /deep/ .el-form-item__content {
    width: 230px;
  }
  .containers {
    width: 95%;
    margin: 20px auto 0 auto;

    .top-control {
      margin-bottom: 20px;

      label {
        margin-right: 30px;
      }
    }
  }
  .uploadCss {
    margin-bottom: 10px;
  }
  /deep/ .el-table__row--level-0 {
    background: #f5f7fa;
  }
</style>
