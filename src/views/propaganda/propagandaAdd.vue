<!--
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-12-22 10:05:30
 * @LastEditors: CYZ
 * @LastEditTime: 2020-12-22 16:56:02
-->
<template>
  <div class="app-container">
    <div class="proTitle">中国移动通信集团印刷品申请单</div>
    <div style="width: 80%; margin: 0 auto">
      <el-row style="margin-bottom: 25px">
        <el-col v-for="i in 3" :key="i" :span="8">
          <div class="flowItem">
            <el-form>
              <el-form-item label="印刷品申请人" label-width="110px">
                <el-select
                  v-model="queryParams.state"
                  placeholder="请选择审批状态"
                  clearable
                >
                  <el-option
                    v-for="dict in statusOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="意见" label-width="110px">
                <el-select
                  v-model="queryParams.state"
                  placeholder="请选择审批状态"
                  clearable
                >
                  <el-option
                    v-for="dict in statusOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <div class="flowItemDown">
                <div>李华 2020/4/28 14:05:11</div>
                <i class="el-icon-success" v-if="true"></i>
                <i class="el-icon-error" v-if="false"></i>
              </div>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请单名称" prop="printName">
              <el-input
                v-model="form.printName"
                placeholder="请输入申请单名称"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请部门" prop="unitId">
              <el-input
                v-model="form.unitId"
                placeholder="请输入申请部门"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请人" prop="unitId">
              <el-input
                v-model="form.unitId"
                placeholder="请输入申请人"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请时间" prop="applyTime">
              <el-input
                v-model="form.applyTime"
                placeholder="请输入申请时间"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="材料类型" prop="materialType">
              <el-select
                v-model="form.materialType"
                placeholder="请选择材料类型"
                style="width: 100%"
                clearable
              >
                <el-option
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="市场部审核员" prop="roleUserId">
              <el-select
                v-model="form.roleUserId"
                placeholder="请选择市场部审核员"
                style="width: 100%"
                clearable
              >
                <el-option
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预估金额" prop="predictAmount">
              <el-input
                v-model="form.predictAmount"
                type="number"
                placeholder="请输入预估金额"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="remark">
              <el-input
                type="textarea"
                v-model="form.remark"
                placeholder="请输入备注"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="附件" prop="files">
              <el-upload
                class="upload-demo"
                :action="ActionUrl"
                :file-list="fileList"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-exceed="handleExceed"
                :headers="headers"
                :on-success="handleSuccess"
                :on-progress="handleupload"
                :on-error="handleFail"
                :multiple="false"
              >
                <el-button type="primary" icon="el-icon-plus" size="mini"
                  >添加附件</el-button
                >
              </el-upload>
              <el-table :data="form.files" style="width: 100%">
                <el-table-column
                  prop="fileName"
                  label="标题"
                  width="180"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="author"
                  label="作者"
                  width="180"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  label="时间"
                  width="180"
                  align="center"
                >
                </el-table-column>
                <el-table-column prop="fileSize" label="大小" align="center">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="text"
                      icon="el-icon-edit"
                      @click="deleteFile(scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <el-upload
                class="upload-demo"
                :action="ActionUrl1"
                :file-list="fileList1"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :limit="1"
                :on-exceed="handleExceed"
                :headers="headers"
                :on-success="handleSuccess"
                :on-progress="handleupload"
                :on-error="handleFail"
                :data="importObj"
                :multiple="false"
              >
                <el-select
                v-model="type"
                placeholder="请选择类型"
                style="width: 150px"
                clearable
              >
                <el-option
                  v-for="dict in typrOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
                </el-select>
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
              <el-button size="small" type="text" @click="publicitydown"
                >业务单式模板下载</el-button
              >
              <el-button size="small" type="text" @click="businessdown"
                >宣传单页模板下载</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog-footer" style="float: right">
        <el-button type="primary" @click="submitSettingForm">保 存</el-button>
        <!-- <el-button @click="cancel">取 消</el-button> -->
      </div>
    </div>
  </div>
</template>
<script>
import { getToken } from "@/utils/auth";
import { exportData1 } from "@/utils/export";
import { prefix } from "@/api/propaganda/propaganda";
import {
  printAdd,
  printUpdate,
  printDetail,
  printFileDelete,
} from "@/api/propaganda/propagandaAdd";
export default {
  name: "Role",
  data() {
    return {
        // 业务类型
        type:undefined,
      rules: {
        predictAmount: [
          { required: true, message: "预估金额不能为空", trigger: "blur" },
        ],
        materialType: [
          { required: true, message: "材料类型不能为空", trigger: "blur" },
        ],
        roleUserId: [
          { required: true, message: "市场审核员不能为空", trigger: "blur" },
        ],
      },
      form: {
        files: [],
      },
      queryParams: {},
      // 状态数据字典
      statusOptions: [
        { dictValue: 1, dictLabel: "正常" },
        { dictValue: 2, dictLabel: "停用" },
      ],

      // 业务类型字典
      typrOptions: [
        { dictValue: 1, dictLabel: "业务单式" },
        { dictValue: 2, dictLabel: "宣传单页" },
      ],
      form: {},
      ActionUrl: process.env.VUE_APP_GATEWAY_API + `${prefix}/print/upload`, // 上传的图片服务器地址
      ActionUrl1: process.env.VUE_APP_GATEWAY_API + `${prefix}/print/import`, // 上传的图片服务器地址
      fileList: [],
      fileList1: [],
      importObj: {},
      headers: {
        Authorization: getToken(),
      },
      tableData: [],
      printId: undefined,
    };
  },
  created() {
    this.printId = this.$route.query.id;
    this.showinfo();
  },
  methods: {
    //   删除上传文件
    deleteFile(row) {
      printFileDelete(row.id).then((res) => {
        console.log("printFileDelete", res);
        this.showinfo();
      });
    },
    showinfo() {
      printDetail(this.printId).then((res) => {
        console.log("printDetail", res);
        if (!res.files) {
          res.files = [];
        }
        this.form = res;
      });
    },
    submitSettingForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.fileList.length > 0) {
            this.fileList.map((item) => {
              this.form.files.push({ fileId: item.id });
            });
          }
          if (this.form.id != undefined) {
            printUpdate(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.fileList = [];
              this.showinfo();
            });
          } else {
            printAdd(this.form).then((response) => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.$router.go(-1);
            });
          }
        }
      });
    },
    // 文件上传模块
    handleupload() {
      const loading = this.$loading({
        lock: true,
        text: "正在导入表格",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.loadingoption = loading;
      // this.importObj.printId=
    },
    handleFail() {
      this.loadingoption.close();
      this.$message.error("上传失败");
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    handleSuccess(res) {
      //   this.fileList = [];
      this.loadingoption.close();
      if (res.code == "00000") {
        this.$message.success("导入成功");
        // res.data.fileId=res.data.id
        // res.data.id=undefined
        // if (!this.form.files) {
        //     this.form.files=[]
        // }
        // console.log('this.form.files',this.form.files);
        // this.form.files.push({fileId:res.data.id})
        console.log("handleSuccess", res.data);
        this.fileList.push({ id: res.data.id, name: res.data.fileName });
      } else {
        this.$message({
          message: res.message,
          type: "error",
        });
      }
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}?`);
    },
    // 下载宣传单页模板
    publicitydown() {
      exportData1(
        getToken(),
        "",
        `${prefix}/print/export/publicity`,
        "宣传单页模板"
      );
    },
    // 下载业务单式模板
    businessdown() {
      exportData1(
        getToken(),
        "",
        `${prefix}/print/export/business`,
        "业务单式模板"
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.proTitle {
  font-size: 25px;
  font-weight: bolder;
  text-align: center;
  margin-bottom: 15px;
}
.flowItem {
  padding-right: 10px;
  border-right: 1px solid #e6e6e6;
  .flowItemDown {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .el-icon-success {
      color: #67c23a;
      font-size: 27px;
    }

    .el-icon-error {
      color: #f56c6c;
      font-size: 27px;
    }
  }
}
</style>