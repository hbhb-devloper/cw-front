<template>
  <div class="containers">
    <section class="search-box">
      <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="100px">

        <el-form-item label="开票日期" prop="invoiceAmount">
          <el-date-picker
            v-model="queryParams.invoiceAmount"
            type="date"
            class="search-input"
            placeholder="选择酬开票日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="销售方纳税号" prop="invoiceAmount">
          <el-input
            v-model="queryParams.invoiceAmount"
            placeholder="请输入销售方纳税号"
            clearable
            class="search-input"
            size="small"
          />
        </el-form-item>
        <el-form-item label="购买方税号" prop="invoiceAmount">
          <el-input
            v-model="queryParams.invoiceAmount"
            placeholder="请输入购买方税号"
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
      <el-row :gutter="10" >
        <el-col :span="1.5">
          <el-button type="warning" size="mini" @click="handleExport">导出</el-button>
        </el-col>
      </el-row>
      <el-table v-loading="loading" :data="tableData">
        <el-table-column label="序号" prop="arrearageMonth" align="center"/>
        <el-table-column label="发票代码" prop="arrearageMonth" align="center"/>
        <el-table-column label="发票号码" prop="arrearageMonth" align="center"/>
        <el-table-column label="开票日期" prop="arrearageMonth" align="center"/>
        <el-table-column label="发票状态" prop="arrearageMonth" align="center"/>
        <el-table-column label="销售方纳税号" prop="arrearageMonth" align="center"/>
        <el-table-column label="销售方名称" prop="arrearageMonth" align="center"/>
        <el-table-column label="购买方税号" prop="arrearageMonth" align="center"/>
        <el-table-column label="购买方名称" prop="arrearageMonth" align="center"/>
        <el-table-column label="金额" prop="arrearageMonth" align="center"/>
        <el-table-column label="税号" prop="arrearageMonth" align="center"/>
        <el-table-column label="价格合计" prop="arrearageMonth" align="center"/>
        <el-table-column label="校验码" prop="arrearageMonth" align="center"/>
        <el-table-column label="销售方地址、电话" prop="arrearageMonth" align="center"/>
        <el-table-column label="销售方开户行及账号" prop="arrearageMonth" align="center"/>
        <el-table-column label="购买方地址、电话" prop="arrearageMonth" align="center"/>
        <el-table-column label="购买方开户行及账号" prop="arrearageMonth" align="center"/>
        <el-table-column label="备注" prop="arrearageMonth" align="center"/>
        <el-table-column label="开票人" prop="arrearageMonth" align="center"/>
        <el-table-column label="收款人" prop="arrearageMonth" align="center"/>
        <el-table-column label="复合人" prop="arrearageMonth" align="center"/>
        <el-table-column label="货物或应税劳务名称" prop="arrearageMonth" align="center"/>
        <el-table-column label="规格型号" prop="arrearageMonth" align="center"/>
        <el-table-column label="数据" prop="arrearageMonth" align="center"/>
        <el-table-column label="单位" prop="arrearageMonth" align="center"/>
        <el-table-column label="单价" prop="arrearageMonth" align="center"/>
        <el-table-column label="税率" prop="arrearageMonth" align="center"/>
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
    data(){
      return {
        queryParams:{},
        loading:false,
        tableData:[],
        total:undefined,
      }
    },
    methods:{
      getList(){},
    }
  }
</script>

<style lang="scss" scoped>
  .containers{
    width: 95%;
    margin:15px auto;
    .search-box{
      .search-input{
        width:240px;
      }
    }
  }
</style>
