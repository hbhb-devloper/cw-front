<template>
  <div class="container">
    <el-col>
      <div class="table-btn-box">
        <el-button
          type="primary"
          size="mini"
          @click="centerDialogVisible=true"
          v-hasPermi="['budget:map:export']"
        >导入</el-button>
        <el-table
          v-loading="loading"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%;margin-top:20px;text-align: center"
        >
          <el-table-column prop="underUnitId" label="归口部门" align="center"></el-table-column>
          <el-table-column prop="budgetItem" label="预算科目" align="center"></el-table-column>
          <el-table-column prop="oldName" label="旧项目名称（2018版）" width="160px" align="center"></el-table-column>
          <el-table-column prop="newName" label="新项目名称（2020版）" width="160px" align="center"></el-table-column>
          <el-table-column prop="budgetNum" label="预算编号" align="center"></el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col>
      <el-dialog :visible.sync="centerDialogVisible" width="500px">
        <el-button type="primary" style="margin-bottom:10px;">
          <a download="预算业务活动映射模板示例" :href="downPath+'预算业务活动映射模板示例.xlsx'">
            <i class="el-icon-download"></i>下载导入模板
          </a>
        </el-button>
        <el-upload
          class="upload-demo"
          ref="upload"
          action="doUpload"
          :limit="1"
          :file-list="fileList"
          :before-upload="beforeUpload"
        >
          <el-button slot="trigger" type="primary" plain>选取文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传xlsx/xls文件</div>
        </el-upload>
        <div class="btn-box">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="submitUpload()">确 定</el-button>
        </div>
      </el-dialog>
    </el-col>
  </div>
</template>

<script>
import { getTable, uploadEmployee } from "@/api/budget/mapping";

export default {
  name: "mapping",
  data() {
    return {
      tableData: [],
      centerDialogVisible: false,
      fileList: [],
      fileName: "",
      files: null,
      loading: true, //表格加载
    };
  },
  created() {
    this.handleLoad();
  },
  methods: {
    handleLoad() {
      this.loading = true; //表格加载
      getTable().then((res) => {
        this.tableData = res;
        this.loading = false;
      });
    },
    handleImport() {
      this.centerDialogVisible = true;
    },

    beforeUpload(file) {
      this.files = file;
      const extension = file.name.split(".")[1] === "xls";
      const extension2 = file.name.split(".")[1] === "xlsx";
      // const isLt2M = file.size / 1024 / 1024 < 2
      if (!extension && !extension2) {
        this.$message.warning("上传文件只能是 xls、xlsx格式!");
        return;
      }
      this.fileName = file.name;
      return false;
    },
    // 确认上传
    submitUpload() {
      if (this.fileName == "") {
        this.$message({
          message: "请选择要上传的文件！",
          type: "warning",
          showClose: true,
        });
        return false;
      }

      let fileFormData = new FormData();
      fileFormData.append("file", this.files, this.fileName); // 上传的文件
      uploadEmployee(fileFormData)
        .then((res) => {
          // 上传请求
          this.fileName = "";
          this.files = "";
          this.$message.success("上传成功！");
          this.centerDialogVisible = false;
          this.handleLoad();
        })
        .catch((err) => {
          this.fileName = "";
        });
    },
    handleClose() {
      this.fileName = this.files = "";
      this.centerDialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 90%;
  margin: 30px auto 0 auto;
  .table-btn-box {
    padding: 30px 20px;
    background: #fff;
  }
  .btn-box {
    text-align: right;
    padding: 20px 0;
  }
}
</style>
