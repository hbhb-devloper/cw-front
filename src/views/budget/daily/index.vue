<template>
  <div class="containers">
    <!--顶部搜索-->
    <section class="search-box">
      <el-row :span="24">
        <el-form ref="queryForm" :model="obj" :inline="true" label-width="100px">
          <el-form-item label="单位"  prop="unitId">
            <treeselect
              v-model="obj.unitId"
              :options="deptOptions"
              style="width: 200px"
              placeholder="请选择归属部门"
            />
          </el-form-item>
          <el-form-item style="margin-left: 30px">
            <el-radio-group v-model="radio">
              <el-radio :label="3">项目年度</el-radio>
              <el-radio :label="6">创建时间</el-radio>
            </el-radio-group>
            <el-date-picker
              v-show="radio == 3"
              v-model="obj.date"
              type="year"
              format="yyyy"
              value-format="yyyy"
              placeholder="请选择"
              style="width: 200px"
            >
            </el-date-picker>
            <el-date-picker
              v-show="radio == 6"
              v-model="obj.date"
              type="month"
              format="yyyy-MM"
              value-format="yyyy-MM"
              placeholder="请选择"
              style="width: 200px"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item> </el-form-item>
          <el-form-item label="类型" prop="budgetType">
            <el-select
              v-model="obj.budgetType"
              filterable
              placeholder="请选择"
              style="width: 200px"
            >
              <el-option :value="undefined" label="---全部类型---"></el-option>
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="编号" prop="projectNum">
            <el-input
              placeholder="请输入关键词"
              v-model="obj.projectNum"
              clearable
              name="invoiceCode"
              size="small"
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="不含税金额" prop="cost">
            <el-input
              placeholder="请输入关键词"
              v-model="obj.cost"
              clearable
              name="invoiceCode"
              size="small"
              type="number"
              :min="0"
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
      </el-row>
      <el-row>
        <el-button type="primary" size="mini" @click="handleAdd"
          >添加申报</el-button
        >
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          >导出数据</el-button
        >
      </el-row>
    </section>
    <!--    表格-->
    <section class="table-box">
      <el-table v-loading="loading" :data="tableData">
        <el-table-column
          prop="lineNumber"
          label="序号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="projectNum"
          label="编号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="projectName"
          label="名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="unitName"
          label="单位"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="budgetName"
          label="项目类型"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="cost"
          label="不含税金额(万元)"
          align="center"
        ></el-table-column>
        <el-table-column prop="vatRate" label="税率" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.vatRate | filterVat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="taxIncludeAmount"
          label="价税合计(万元)"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createBy"
          label="申报人"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleInfo(scope.row)"
              >详情
            </el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              >删除
            </el-button>
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
    </section>
    <!--    弹窗-->
    <section class="data-box">
      <el-dialog :title="title" :visible.sync="open">
        <el-form :inline="true" label-width="130px">
          <el-form-item label="类型" required>
            <el-select
              v-model="obj2.budgetType"
              filterable
              placeholder="请选择"
              style="width: 200px"
            >
              <el-option :value="undefined" label="---全部类型---"></el-option>
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称" required>
            <el-input
              placeholder="请输入名称"
              v-model="obj2.projectName"
              clearable
              name="invoiceCode"
              size="small"
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="不含税金额(万元)" required>
            <el-input
              placeholder="请输入不含税金额"
              v-model="obj2.cost"
              clearable
              name="invoiceCode"
              size="small"
              type="number"
              :min="0"
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="税率" required>
            <el-select
              v-model="obj2.vatRate"
              @change="handleVatRate"
              filterable
              placeholder="请选择税率"
              style="width: 200px"
            >
              <el-option
                v-for="(item, index) in VatRateOption"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="价税合计" required>
            <el-input
              placeholder="请输入价税合计"
              v-model="obj2.taxIncludeAmount"
              clearable
              name="invoiceCode"
              size="small"
              type="number"
              :min="0"
              style="width: 200px"
            />
          </el-form-item>
          <el-row>
            <el-form-item label="附件">
              <el-upload
                class="upload-demo"
                :show-file-list="false"
                multiple
                action="#"
                :http-request="imageUpload"
                :file-list="fileList"
              >
                <el-button slot="trigger" size="small" class="uploadImgBtn"
                  >选取文件</el-button
                >
              </el-upload>
              <div class="file-box">
                <div v-for="(item, index) in fileList" v-if="item.type == 0">
                  <i class="el-icon-folder"></i
                  ><span class="fileName">{{ item.name }}</span
                  ><span
                    @click="beforeRemove(item)"
                    class="el-icon-circle-close"
                  ></span>
                </div>
              </div>
            </el-form-item>
          </el-row>
          <el-button
            type="primary"
            style="margin-left: 40%"
            :disabled="formState"
            @click="submitForm"
            >确 定</el-button
          >
          <el-button @click="cancel">取 消</el-button>
        </el-form>
      </el-dialog>
      <el-dialog title="申报详情" :visible.sync="open2" width="900px">
        <el-col :span="12" class="diaBorder">
          <el-col :span="8" class="info-title">编号</el-col
          ><el-col :span="12">{{ info.projectNum }}</el-col>
        </el-col>
        <el-col :span="12" class="diaBorder">
          <el-col :span="7" class="info-title">名称</el-col
          ><el-col :span="12">{{ info.projectName }}</el-col>
        </el-col>
        <el-col :span="12" class="diaBorder">
          <el-col :span="8" class="info-title">单位</el-col
          ><el-col :span="12">{{ info.unitName }}</el-col>
        </el-col>
        <el-col :span="12" class="diaBorder">
          <el-col :span="7" class="info-title">项目类型</el-col
          ><el-col :span="12">{{ info.budgetName }}</el-col>
        </el-col>
        <el-col :span="12" class="diaBorder">
          <el-col :span="8" class="info-title">不含税金额(万元)</el-col
          ><el-col :span="12">￥{{ info.cost }}</el-col>
        </el-col>
        <el-col :span="12" class="diaBorder">
          <el-col :span="7" class="info-title">税率</el-col
          ><el-col :span="12">{{ info.vatRate | filterVat }}</el-col>
        </el-col>
        <el-col :span="12" class="diaBorder">
          <el-col :span="8" class="info-title">价税合计</el-col
          ><el-col :span="12">{{ info.taxIncludeAmount }}</el-col>
        </el-col>
        <el-col :span="12" class="diaBorder">
          <el-col :span="7" class="info-title">申报人</el-col
          ><el-col :span="12">{{ info.createBy }}</el-col>
        </el-col>
        <el-row class="diaBorder">
          <el-col class="info-title">附件</el-col>
          <el-col>
            <el-table :data="Filetable">
              <el-table-column prop="fileName" align="center" label="标题">
                <template slot-scope="scope">
                  <a
                    :download="scope.row.fileName"
                    :href="scope.row.filePath"
                    >{{ scope.row.fileName }}</a
                  >
                </template>
              </el-table-column>
              <el-table-column
                prop="author"
                align="center"
                label="作者"
              ></el-table-column>
              <el-table-column
                prop="createTime"
                align="center"
                label="时间"
              ></el-table-column>
              <el-table-column
                prop="fileSize"
                align="center"
                label="大小"
              ></el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="exportWord()">导出Word</el-button>
          <el-button @click="open2 = false">关闭</el-button>
        </span>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import {
  getDataList,
  addDate,
  getTypeList,
  getInfoDate,
  deleteDate,
  DeleteFile,
} from "@/api/budget/daily/index";
import { getVatRate } from "@/api/budget/report/report.js";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { getToken } from "@/utils/auth";
import {resourceTreeByUN} from "@/api/system/unit";
import { exportData, exportWord } from "@/utils/export.js";
import axios from "axios";

export default {
  components: {
    Treeselect,
  },
  filters: {
    filterVat(e) {
      if (e) {
        return parseFloat(e) * 100 + "%";
      }
    },
  },
  data() {
    return {
      ActionUrl: process.env.VUE_APP_GATEWAY_API + `${prefix}/file/upload?bizType=20`, // 上传的图片服务器地址
      radio: 3, //单选项
      obj: {
        date: undefined,
        pageNum: 1,
        pageSize: 20,
      },
      options: [],
      total: 0,
      deptOptions: [], //单位列表
      loading: false,
      tableData: [],
      open: false, //弹窗1
      open2: false, //弹窗2
      title: "添加申报",
      obj2: {},
      fileList: [],
      VatRateOption: [],
      Filetable: [],
      formState: false,
      info: {},
      dowFile: process.env.FILE_DOWNLOAD_PATH,
      infoDetail: undefined,
      morenUnit:undefined
    };
  },
  created() {
    let times = new Date();
    if (this.radio == 3) {
      this.obj.date = times.getFullYear().toString();
    }
    this.getUnitList();
    this.handleGetList();
  },
  computed: {
    cost() {
      return this.obj2.cost;
    },
  },

  watch: {
    cost(newVal) {
      this.handleVatRate();
    },
    radio(newVal) {
      let dates = new Date();
      if (newVal == 3) {
        this.obj.date = dates.getFullYear().toString();
      } else {
        this.obj.date =
          dates.getFullYear().toString() +
          "-" +
          (dates.getMonth() + 1 < 10
            ? "0" + (dates.getMonth() + 1).toString()
            : dates.getMonth() + 1
          ).toString();
      }
    },
  },
  methods: {
    //获取单位
    getUnitList() {
      resourceTreeByUN().then((res) => {
        this.obj.unitId = res.checked[0];
        this.morenUnit= res.checked[0];
        this.deptOptions = res.list;
      });
      //获取增值税下拉
      // getVatRate().then((res) => {
      this.getDicts("budget", "project_vat_rate").then((response) => {
        this.VatRateOption = response;
      });

      this.getDicts("budget", "budget_type").then((response) => {
        this.options = response;
      });
    },
    //获取列表
    handleGetList() {
      getDataList(this.obj).then((res) => {
        this.total = res.count;
        this.tableData = res.list;
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
      this.obj.unitId=this.morenUnit
      let times = new Date();
      this.obj.date = times.getFullYear().toString();
      this.radio = 3;
      this.handleQuery();
    },
    
    //新增
    handleAdd() {
      this.open = true;
      this.obj2 = {
        files: [],
      };
      this.fileList = [];
    },
    handleVatRate() {
      if (parseFloat(this.obj2.cost)) {
        let vatRate = parseFloat(this.obj2.vatRate) + 1;
        this.obj2.taxIncludeAmount = (
          parseFloat(this.obj2.cost) * vatRate
        ).toFixed(6);
      }
    },
    exportWord() {
      // let queryForm=this.infoDetail
      // queryForm.id = this.infoId
      // console.log('queryForm',queryForm);
      this.$confirm(`是否确认导出${this.info.projectName}的数据?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        exportWord(
          getToken(),
          this.info,
          "/budget/agile/info/export",
          `${this.info.projectName}`
        );
      });
    },
    //导出
    handleExport() {
      let queryForm = JSON.parse(JSON.stringify(this.obj));
      delete queryForm.pageNum;
      delete queryForm.pageSize;
      this.$confirm("是否确认导出日常性费用申报的数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        exportData(
          getToken(),
          queryForm,
          "/budget/agile/export/subsidy",
          "日常性费用申报"
        );
      });
    },
    //详情
    handleInfo(row) {
      this.infoDetail = row;
      getInfoDate(row.id).then((res) => {
        console.log(res);
        this.Filetable = res.files;
        this.info = res;
        this.open2 = true;
        this.info.lineNumber = row.lineNumber;
      });
    },
    //删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除该申报, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteDate(row.id).then((res) => {
          this.msgSuccess("删除成功！");
          this.handleGetList();
        });
      });
    },
    //文件上传
    imageUpload(param) {
      let list = { isApproved: 0 };
      const _file = param.file;
      let params = new FormData();
      params.append("files", _file);
      axios({
        url: this.ActionUrl,
        method: "post",
        data: params,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: getToken(),
        },
      }).then((res) => {
        list.fileId = res.data.data[0].id;
        this.$message.success("附件上传成功！");
        list.required = 0; //非必传
        this.fileList.push({
          name: res.data.data[0].fileName,
          id: res.data.data[0].id,
          type: list.required,
        });
        this.obj2.files.push(list);
        console.log(this.fileList, this.obj2.files);
      });
    },
    //文件删除
    beforeRemove(item) {
      this.$confirm(`确定移除 ${item.name}？`).then((res) => {
        if (!item.id) return;
        DeleteFile(item.id).then((res1) => {
          this.$message.success("文件删除成功！");
          this.fileList = this.fileList.filter((items) => {
            return items.id != item.id;
          });
          this.obj2.files = this.obj2.files.filter((items) => {
            return items.fileId != item.id;
          });
        });
      });
    },
    //数据提交
    submitForm() {
      if (
        !this.obj2.cost ||
        !this.obj2.budgetType ||
        !this.obj2.projectName ||
        !this.obj2.taxIncludeAmount ||
        !this.obj2.vatRate
      ) {
        this.msgError("必填项不能为空");
        return;
      }
      let data = JSON.parse(JSON.stringify(this.obj2));
      console.log(data);
      data.cost = parseFloat(data.cost).toFixed(6);
      this.formState = true;
      addDate(data)
        .then((res) => {
          this.msgSuccess("添加成功");
          this.formState = false;
          this.open = false;
          this.handleGetList();
        })
        .catch((err) => {
          this.formState = false;
        });
    },
    //取消
    cancel() {
      this.open = false;
      this.obj2 = {};
    },
  },
};
</script>

<style lang="scss" scoped>
.containers {
  margin: 20px auto;
  width: 95%;
  .data-box {
    .file-box {
      .fileName {
        margin: 8px 30px;
      }
      .el-icon-circle-close {
        cursor: pointer;
      }
    }
    .info-row {
      line-height: 45px;
      .info-title {
        font-weight: 600;
      }
    }
    .info-title {
      font-weight: 600;
    }
  }
}
.diaBorder {
  border: 1px solid;
  padding-left: 10px;
  padding-right: 10px;
  // border-radius: 10px;
}
.el-col-12 {
  height: 47px;
}
</style>