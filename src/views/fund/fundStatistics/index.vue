<template>
  <div class="containers">
    <el-form :model="queryParams" ref="queryForm" label-width="70px" :inline="true">
      <el-form-item label="部门" prop="dptId">
        <treeselect v-model="queryParams.dptId" style="width:200px" :options="deptOptions" placeholder="请选择部门"/>
      </el-form-item>
      <el-form-item label="款项类型" prop="amountType">
        <el-select v-model="queryParams.amountType" style="width:200px" placeholder="请选择">
          <el-option label="现金" value="1"></el-option>
          <el-option label="支票" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="办理业务" prop="busType">
        <el-select v-model="queryParams.busType" style="width:200px" filterable  placeholder="请选择">
          <el-option label="--全部--" :value="undefined"></el-option>
          <el-option v-for="(item,index) in busTypeOptions" :label="item.label" :value="item.value"></el-option>
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
      <el-form-item label="开始时间" prop="peopleDownTime">
        <el-date-picker
          v-model="queryParams.startTime"
          type="date"
          placeholder="选择时间"
          style="width:200px"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="peopleDownTime">
        <el-date-picker
          v-model="queryParams.endTime"
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
      <el-form-item>
        <el-checkbox v-model="queryParams.isBalanceZero">不显示本期余额为零</el-checkbox>
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
        >导出
        </el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column align="center" type="index" label="序号"></el-table-column>
      <el-table-column prop="periodTime" width="200px" align="center" label="期间"></el-table-column>
      <el-table-column prop="dptName" align="center" label="部门"></el-table-column>
      <el-table-column prop="groupName" width="200px" align="center" label="集团信息"></el-table-column>
      <el-table-column prop="createMan" align="center" label="录入人"></el-table-column>
      <el-table-column prop="beginAmount" align="center" width="150px" label="期初余额(元)"></el-table-column>
      <el-table-column prop="addAmount" align="center" width="150px" label="本期增加(元)"></el-table-column>
      <el-table-column prop="verifyAmount" align="center" width="150px" label="核销收款(元)"></el-table-column>
      <el-table-column prop="reduceAmount" align="center" width="150px" label="本期减少(元)"></el-table-column>
      <el-table-column prop="collectionFrozen" align="center" width="150px" label="本期收款冻结(元)"></el-table-column>
      <el-table-column prop="useFrozen" align="center" width="150px" label="本期使用冻结(元)"></el-table-column>
      <el-table-column prop="refundFrozen" align="center" width="150px" label="本期退款冻结(元)"></el-table-column>
      <el-table-column prop="refund" align="center" width="150px" label="本期退款(元)"></el-table-column>
      <el-table-column prop="balance" align="center" width="150px" label="本期余额(元)"></el-table-column>
      <el-table-column prop="totalInvoiceAmount" align="center" width="150px" label="积累开票金额(元)"></el-table-column>
      <el-table-column prop="totalEnterAmount" align="center" width="150px" label="积累入账金额(元)"></el-table-column>
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
  import {getListData} from '@/api/fund/fundStaticstics'
  import {getBusiness} from '@/api/fund/fundSelect/info'
  import {getCompany} from "@/api/fund/management/index";
  import {exportData} from "../../../utils/export";
  import {getToken} from '@/utils/auth'

  export default {
    data() {
      return {
        total: 0,
        queryParams: {
          startTime: undefined,
          endTime: undefined,
          pageSize: 10,
          pageNum: 1
        },//条件搜索表单
        deptOptions: [],//单位下拉
        busTypeOptions: ['一次性收入', '集团统付', '可变资金划账', '购卡', '现金充值', '预缴(除统付外)', '开户', '终端捆绑', '退款', '其它', '欠费缴纳', '集团预付(预开发票)'],//业务下拉类
        tableData: [],//表格数据
        loading: false,//表格加载动画
      }
    },
    components: {
      Treeselect,
    },
    created() {
      this.queryParams.startTime = undefined || this.getCurrentMonthFirst();
      this.queryParams.endTime = undefined || this.getCurrentMonthLast()
      this.getUnitId();
      this.handleGetBusiness()
      // this.getList();
    },
    methods: {
      handleGetBusiness() {
        getBusiness().then(res => {
          this.busTypeOptions = res;
        })
      },
      //获取部门列表
      getUnitId() {
        getCompany().then(res => {
          this.queryParams.dptId = res.checked[0];
          this.deptOptions = res.list;
          this.getList();
        });
      },
      //表格数据列表
      getList() {
        this.loading = true;
        let data=JSON.parse(JSON.stringify(this.queryParams));
        if(!data.startTime||!data.endTime){
          this.$message.warning('请选择开始时间或结束时间');
          return;
        }
        if(data.isBalanceZero){
          data.isBalanceZero=1;
        }else{
          data.isBalanceZero=0;
        }
        getListData(data).then(res => {
          this.total = res.count;
          this.tableData = res.list;
          this.loading = false;
        }).catch(err => {
          this.loading = false;
        })
      },
      //获取本月第一天
      getCurrentMonthFirst() {
        let dates = new Date();
        dates.setDate(1);
        let months = parseInt(dates.getMonth() + 1);
        let days = dates.getDate();
        if (months < 10) {
          months = '0' + months
        }
        if (days < 10) {
          days = '0' + days
        }
        return dates.getFullYear() + '-' + months + '-' + days;
      },

      //获取本月最后一天
      getCurrentMonthLast() {
        let date = new Date(),
          currentMonth = date.getMonth(),
          nextMonth = ++currentMonth,
          nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1),
          oneDay = 1000 * 60 * 60 * 24,
          lastTime = new Date(nextMonthFirstDay - oneDay),
          month = parseInt(lastTime.getMonth() + 1),
          day = lastTime.getDate();
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        return date.getFullYear() + '-' + month + '-' + day;
      },
      resetQuery() {
        this.queryParams={
          dptId:this.queryParams.dptId,
          startTime: this.getCurrentMonthFirst(),
          endTime: this.getCurrentMonthLast(),
          pageSize: 10,
          pageNum: 1
        }
      },
      handleExport() {
        this.$confirm("是否确认导出客户资金统计数据?", "数据导出", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let data =JSON.parse(JSON.stringify(this.queryParams));
            delete data.pageSize;
            delete data.pageNum;
            exportData(getToken(),data, '/fund/stat/export', '客户资金统计')
          })
      }
    },
  }

</script>

<style scoped>
  .containers {
    margin: 20px auto;
    width: 95%;
  }
</style>
