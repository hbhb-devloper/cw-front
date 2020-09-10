<template>
  <div class="containers">
    <section class="search-box">
      <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="70px">
        <el-form-item label="分公司" prop="invoiceAmount">
          <el-input
            v-model="queryParams.invoiceAmount"
            placeholder="请输入分公司"
            clearable
            size="small"
            class="search-input"
          />
        </el-form-item>
        <el-form-item label="报账流水" prop="invoiceAmount">
          <el-input
            v-model="queryParams.invoiceAmount"
            placeholder="请输入报账流水"
            clearable
            size="small"
            class="search-input"
          />
        </el-form-item>
        <el-form-item label="酬金月份" prop="invoiceAmount">
          <el-date-picker
            v-model="queryParams.invoiceAmount"
            type="month"
            class="search-input"
            placeholder="选择酬金月份">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="渠道名称" prop="invoiceAmount">
          <el-input
            v-model="queryParams.invoiceAmount"
            placeholder="请输入渠道名称"
            clearable
            class="search-input"
            size="small"
          />
        </el-form-item>
        <el-form-item label="渠道编号" prop="invoiceAmount">
          <el-input
            v-model="queryParams.invoiceAmount"
            placeholder="请输入渠道编号"
            clearable
            class="search-input"
            size="small"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </section>
    <section class="table-box">
      <el-row :gutter="10">
        <el-col :span="1.5">
          <el-button type="primary" size="mini" @click="handleAdd">支付明细</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="warning" size="mini" @click="handleExport">酬金月份导出</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="warning" size="mini" @click="handleExport">查验结果导出</el-button>
        </el-col>
      </el-row>
      <el-table v-loading="loading" :data="tableData">
        <el-table-column label="报账流水" prop="arrearageMonth" align="center"/>
        <el-table-column label="酬金月份" prop="arrearageMonth" align="center"/>
        <el-table-column label="渠道编号" prop="arrearageMonth" align="center"/>
        <el-table-column label="渠道名称" prop="arrearageMonth" align="center"/>
        <el-table-column label="营业执照对公账号名称" prop="arrearageMonth" align="center"/>
        <el-table-column label="开户支行" prop="arrearageMonth" align="center"/>
        <el-table-column label="银行账号" prop="arrearageMonth" align="center"/>
        <el-table-column label="酬金金额(元)" prop="arrearageMonth" align="center"/>
        <el-table-column label="应付金额(元)" prop="arrearageMonth" align="center"/>
        <el-table-column label="本次支付(元)" prop="arrearageMonth" align="center"/>
        <el-table-column label="本次实付(元)" prop="arrearageMonth" align="center"/>
        <el-table-column label="代缴税费(元)" prop="arrearageMonth" align="center"/>
        <el-table-column label="发票编号(元)" prop="arrearageMonth" align="center"/>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        queryParams: {},
        loading: false,
        tableData: [],
        total: undefined,
      }
    },
    methods: {
      getList() {
      },
    }
  }
</script>

<style lang="scss" scoped>
  .containers {
    width: 95%;
    margin: 15px auto;

    .search-box {
      .search-input {
        width: 240px;
      }
    }
  }
</style>
