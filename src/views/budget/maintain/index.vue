<template>
  <div class="containers">
    <div class="top-control">
      <el-col :span="24">
        <el-form ref="queryForm" :model="obj" :inline="true" label-width="100px">
          <el-form-item label="项目编号：" prop="projectNum">
            <el-input
              placeholder="请输入关键词"
              v-model="obj.projectNum"
              clearable
              name="invoiceCode"
              size="small"
              style="width: 200px"
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
            <el-button icon="el-icon-refresh" size="mini" @click="handleRest"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </div>
    <div class="table-btn-box">
      <div style="overflow: auto; margin-top: 20px">
        <el-table v-loading="loading" ref="multipleTable" :data="tableData">
          <el-table-column
            prop="projectNum"
            label="项目编号"
            align="center"
            width="180px"
          ></el-table-column>
          <el-table-column
            prop="projectName"
            style="color: #409eff"
            label="项目名称"
            align="center"
            width="180px"
          >
            <template style="color: #409eff" slot-scope="scope">
              <router-link
                style="color: #409eff"
                :to="'/budget/info/' + scope.row.id"
                >{{ scope.row.projectName }}</router-link
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="projectTypeName"
            label="项目类型"
            align="center"
            width="200px"
          ></el-table-column>
          <el-table-column
            prop="amount"
            label="金额（万元）"
            align="center"
            width="120px"
          ></el-table-column>
          <el-table-column
            prop="cost"
            label="项目成本"
            align="center"
            width="120px"
          ></el-table-column>
          <el-table-column
            prop="vatAmount"
            label="增值税金额"
            align="center"
            width="120px"
          ></el-table-column>
          <el-table-column
            prop="unitName"
            label="单位"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="createBy"
            align="center"
            label="创建人"
          ></el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            align="center"
            width="180px"
          ></el-table-column>
          <el-table-column
            prop="origin"
            label="项目来源"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="stateLabel"
            align="center"
            width="120px"
            label="流程状态"
          >
            <template slot-scope="scope">
              <router-link
                style="color: #409eff"
                :to="'/budget/info/' + scope.row.id"
                >{{ scope.row.stateLabel }}</router-link
              >
            </template>
          </el-table-column>
          <el-table-column label="删除"  align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="obj.pageNum"
          :limit.sync="obj.pageSize"
          @pagination="handleGetList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  maintainList,
  maintainDelete,
} from "@/api/budget/maintain";
export default {
  name: "maintain",
  data() {
    return {
        obj: {
        pageNum: 1, //页码
        pageSize: 20,
      },
      tableData:[],
      total: 0,
      loading: true, //表格加载
    };
  },
  created() {
   this.handleGetList();
  },
  methods: {
      //获取列表
    handleGetList() {
      this.loading = true;
      maintainList(this.obj).then((res) => {
        this.total = res.count;
        this.tableData = res.list;
        this.loading = false;
      });
    },
/** 搜索按钮操作 */
    handleQuery() {
      this.obj.pageNum = 1;
      this.handleGetList();
    },
    /** 重置按钮操作 */
    handleRest() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    //删除方法
    handleDelete(row) {
        this.$confirm("此操作将永久删除该条记录, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
        .then(() => {
            maintainDelete(row.id).then((res) => {
                this.handleGetList();
                this.$message.success("删除成功！");
            });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.containers {
  width: 95%;
  margin: 20px auto 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;

  .top-control {
    margin-bottom: 20px;

    label {
      margin-right: 30px;
    }
  }

  .textareas {
    display: flex;
    flex-direction: row;
    line-height: 40px;

    label {
      display: inline-block;
      width: 175px;
      text-align: right;
      padding-right: 15px;
    }
  }

  .upload-demo {
    margin: 15px 0 0 16.2%;
  }

  .btn_box {
    text-align: right;
  }
}

.table-btn-box {
  position: relative;
  background: #fff;
  padding: 30px 20px;
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

.table-btn-box /deep/ .is-hidden {
  display: table-cell !important;
}
</style>
