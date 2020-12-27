<template>
  <div class="containers">
    <section class="search-box">
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true"
        label-width="100px"
      >
        <el-form-item label="单位" prop="unitId">
          <treeselect
            v-model="queryParams.unitId"
            :options="deptOptions"
            placeholder="请选择单位"
            style="width: 240px"
          />
        </el-form-item>
        <el-form-item label="账期" prop="importDate">
          <el-date-picker
            v-model="queryParams.importDate"
            type="month"
            class="search-input"
            format="yyyy-MM"
            value-format="yyyy-MM"
            placeholder="选择酬账期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开票日期" prop="invoiceDate">
          <el-date-picker
            v-model="queryParams.invoiceDate"
            type="date"
            class="search-input"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择酬开票日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="销售方税号" prop="sellerTax">
          <el-input
            v-model="queryParams.sellerTax"
            placeholder="请输入销售方税号"
            clearable
            class="search-input"
            size="small"
          />
        </el-form-item>
        <el-form-item label="销售方名称" prop="sellerName">
          <el-input
            v-model="queryParams.sellerName"
            placeholder="请输入销售方名称"
            clearable
            class="search-input"
            size="small"
          />
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
    </section>
    <section class="table-box">
      <el-row :gutter="10">
        <el-col :span="1.5">
          <el-button type="warning" size="mini" @click="handleExport"
            >导出</el-button
          >
        </el-col>
      </el-row>
      <el-table v-loading="loading" :data="tableData">
        <el-table-column label="序号" prop="lineNumber" align="center" />
        <el-table-column
          label="发票代码"
          prop="invoiceCode"
          width="150"
          align="center"
        />
        <el-table-column
          label="发票号码"
          prop="invoiceNumber"
          width="150"
          align="center"
        />
        <el-table-column
          label="开票日期"
          prop="invoiceDate"
          width="110"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.invoiceDate | filterTime }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="发票状态"
          prop="invoiceState"
          width="110"
          align="center"
        />
        <el-table-column
          label="销售方纳税号"
          prop="sellerTax"
          width="180"
          align="center"
        />
        <el-table-column
          label="销售方名称"
          prop="sellerName"
          width="180"
          align="center"
        />
        <el-table-column
          label="购买方税号"
          prop="buyerTax"
          width="180"
          align="center"
        />
        <el-table-column
          label="购买方名称"
          prop="buyerName"
          width="180"
          align="center"
        />
        <el-table-column label="金额" prop="amount" align="center" />
        <el-table-column label="税额" prop="taxAmount" align="center" />
        <el-table-column
          label="价格合计"
          prop="taxIncludeAmount"
          align="center"
        />
        <el-table-column
          label="校验码"
          prop="checkCode"
          width="180"
          align="center"
        />
        <el-table-column
          label="销售方地址、电话"
          prop="sellerContact"
          width="150"
          align="center"
        />
        <el-table-column
          label="销售方开户行及账号"
          prop="sellerAccount"
          width="150"
          align="center"
        />
        <el-table-column
          label="购买方地址、电话"
          prop="buyerContact"
          width="150"
          align="center"
        />
        <el-table-column
          label="购买方开户行及账号"
          prop="buyerAccount"
          width="150"
          align="center"
        />
        <el-table-column label="备注" prop="remark" align="center" />
        <el-table-column label="开票人" prop="drawer" align="center" />
        <el-table-column label="收款人" prop="payee" align="center" />
        <el-table-column label="复核人" prop="reviewer" align="center" />
        <el-table-column
          label="货物或应税劳务名称"
          prop="goodsName"
          width="150"
          align="center"
        />
        <el-table-column label="规格型号" prop="model" align="center" />
        <el-table-column label="数量" prop="quantity" align="center" />
        <el-table-column label="单位" prop="unit" align="center" />
        <el-table-column label="单价" prop="price" align="center" />
        <el-table-column label="税率" prop="taxRate" align="center" />
        <el-table-column label="校验情况" prop="check" align="center" />
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getLists"
      />
    </section>
  </div>
</template>

<script>
import { getList } from "@/api/invoice/check/index";
import { resourceTreeByUN } from "@/api/system/unit";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { exportData1 } from "@/utils/export.js";
import { getToken } from "@/utils/auth";
import { prefix } from "@/api/invoice/invoice";
export default {
  components: {
    Treeselect,
  },
  filters: {
    filterTime(e) {
      if (e.length > 10) {
        return e.substr(0, 10);
      } else {
        return e;
      }
    },
  },
  data() {
    return {
      queryParams: {
        pageNum: 1,
        pageSize: 20,
      },
      loading: false,
      tableData: [],
      total: undefined,
      deptOptions: [],
      morenUnit: undefined,
    };
  },
  created() {
    this.getUnitList();
  },
  methods: {
    getUnitList() {
      resourceTreeByUN().then((res) => {
        console.log(res);
        this.queryParams.unitId = res.checked;
        this.morenUnit = res.checked;
        this.deptOptions = res.list;
        this.getLists();
      });
    },
    getLists() {
      this.loading = true;
      getList(this.queryParams).then((res) => {
        console.log(res);
        this.total = res.total;
        this.tableData = res.list;
        this.loading = false;
      });
    },
    handleExport() {
      let data = JSON.parse(JSON.stringify(this.queryParams));
      delete data.pageNum;
      delete data.pageSize;
      this.$confirm("是否确认导出数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        exportData1(
          getToken(),
          data,
          `${prefix}/inspection/export`,
          "增值税发票查验"
        );
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.itime = [];
      this.getLists();
    },
    //充置搜索
    resetQuery() {
      this.resetForm("queryForm");
      this.queryParams.unitId = this.morenUnit;
      this.handleQuery();
    },
  },
};
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
