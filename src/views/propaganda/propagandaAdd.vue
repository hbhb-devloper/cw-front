<!--
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-12-22 10:05:30
 * @LastEditors: CYZ
 * @LastEditTime: 2020-12-29 17:53:45
-->
<template>
  <div class="app-container">
    <div class="proTitle">中国移动通信集团印刷品申请单</div>
    <div style="width: 80%; margin: 0 auto">
      <div style="text-align: center">{{ nodeName }}</div>
      <el-row style="margin-bottom: 25px" v-if="flowList">
        <el-col
          v-for="(item, index) in flowList"
          :key="index"
          :span="8"
          style="height: 190px; border: 1px solid red; border-radius: 10px"
        >
          <div class="flowItem">
            <el-form label-width="140px">
              <el-form-item :label="item.approverRole">
                <el-select
                  v-model="item.approver.value"
                  placeholder="请选择审批人"
                  clearable
                  v-if="!item.approver.readOnly"
                  filterable
                  style="width: 100%"
                >
                  <el-option
                    v-for="dict in item.approverSelect"
                    :key="dict.id"
                    :label="dict.label"
                    :value="dict.id"
                  />
                </el-select>
                <el-input
                  v-else
                  disabled
                  v-model="item.nickName"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  size="small"
                  v-if="item.controlAccess == true"
                  :disabled="
                    item.operation.value == 1 || info.state == 0 ? true : false
                  "
                  @click="handleGetDel"
                  >自定义流程</el-button
                >
                <el-button
                  size="small"
                  v-if="!item.operation.hidden"
                  @click="handleApprove(item, 1)"
                  >同意</el-button
                >
                <el-button
                  size="small"
                  v-if="!item.operation.hidden"
                  @click="handleApprove(item, 0)"
                  >拒绝</el-button
                >
              </el-form-item>
              <el-form-item label="意见">
                <el-input
                  v-if="item.suggestion.readOnly"
                  :disabled="item.suggestion.readOnly"
                  v-model="item.suggestion.value"
                  placeholder="请输入审批意见"
                ></el-input>
                <el-select
                  v-else
                  v-model="item.suggestion.value"
                  placeholder="请选择审批意见"
                  filterable
                  allow-create
                  default-first-option
                  clearable
                >
                  <el-option
                    v-for="dict in opinionList"
                    :key="dict.id"
                    :label="dict.suggestion"
                    :value="dict.suggestion"
                  />
                </el-select>
              </el-form-item>
              <div class="flowItemDown" v-if="item.operation.value != 2">
                <div>
                  {{ item.nickName }} ({{ item.approveTime | filterTime }})
                </div>
                <i class="el-icon-success" v-if="item.operation.value == 1"></i>
                <i class="el-icon-error" v-if="item.operation.value == 0"></i>
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
            <el-form-item label="申请部门" prop="unitName">
              <el-input
                v-model="form.unitName"
                placeholder="请输入申请部门"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请人" prop="nickName">
              <el-input
                v-model="form.nickName"
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
                :disabled="form.state != 10"
              >
                <el-option
                  v-for="dict in typrOptions"
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
                :disabled="form.state != 10"
              >
                <el-option
                  v-for="dict in roleOptions"
                  :key="dict.id"
                  :label="dict.label"
                  :value="dict.id"
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
                :disabled="form.state != 10"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="remark">
              <el-input
                type="textarea"
                v-model="form.remark"
                placeholder="请输入备注"
                :disabled="form.state != 10"
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
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  size="mini"
                  v-if="form.state == 10"
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
            <el-form-item v-if="importantList.length < 1">
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
                :on-success="handleSuccess1"
                :on-progress="handleupload"
                :on-error="handleFail"
                :data="importObj"
                :multiple="false"
              >
                <el-select
                  v-model="importObj.type"
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
                <el-button size="small" type="primary" v-if="form.state == 10"
                  >点击上传</el-button
                >
              </el-upload>
              <el-button size="small" type="text" @click="publicitydown"
                >业务单式模板下载</el-button
              >
              <el-button size="small" type="text" @click="businessdown"
                >宣传单页模板下载</el-button
              >
            </el-form-item>
            <el-table :data="importantList" v-else>
              <el-table-column
                align="center"
                label="物料名称"
                prop="materialsName"
                width="180"
              />
              <el-table-column
                align="center"
                label="单位数量"
                prop="applyCount"
                width="180"
              />
              <el-table-column align="center" label="计量单位" prop="units" />
              <!-- <el-table-column align="center" label="尺寸" prop="applyTime"  width="180"/> -->
              <el-table-column
                align="center"
                label="工艺"
                prop="craft"
                width="120"
              />
              <el-table-column
                align="center"
                label="纸张样式"
                prop="style"
                width="120"
              />
              <el-table-column
                align="center"
                label="部门"
                prop="unitName"
                width="120"
              />
              <el-table-column
                align="center"
                label="地址"
                prop="address"
                width="120"
              />
              <el-table-column
                align="center"
                label="联系人/电话"
                prop="receivedBy"
                width="120"
              />
              <el-table-column
                align="center"
                label="需送到日期"
                prop="deliveryDate"
                width="120"
              >
                <template slot-scope="scope">{{
                  scope.row.deliveryDate | dataFormat
                }}</template>
              </el-table-column>
              <el-table-column
                align="center"
                label="是否有合同编号"
                prop="isNum"
                width="120"
              />
              <el-table-column
                align="center"
                label="是否加盖分公司合同印章"
                prop="isSeal"
                width="120"
              />
              <el-table-column
                align="center"
                label="备注"
                prop="remark"
                width="120"
              />
            </el-table>
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
import { getList } from "@/api/flow/opinion.js";
import { prefix } from "@/api/propaganda/propaganda";
import {
  printAdd,
  printUpdate,
  printDetail,
  printFileDelete,
  printMaterials,
  printFlowList,
  printFlowApprove,
  printRoleUser,
} from "@/api/propaganda/propagandaAdd";
export default {
  name: "Role",
  data() {
    return {
      // 业务类型
      type: undefined,
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
      // 业务类型字典
      typrOptions: [
        { dictValue: 1, dictLabel: "业务单式" },
        { dictValue: 2, dictLabel: "宣传单页" },
      ],
      // 市场部审核员
      roleOptions: [],
      form: {
        files: [],
      },
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
      importantList: [],
      importDateId: undefined,
      //流程列表
      flowList: [],
      // 意见下拉框
      opinionList: [],
      // 流程名称
      nodeName: undefined,
    };
  },
  //定义私用局部过滤器。只能在当前 vue 对象中使用
  filters: {
    dataFormat(msg) {
      return msg.substring(0, 10);
    },
  },
  created() {
    this.printId = this.$route.query.id;
    if (this.printId) {
      this.showinfo();
    }
    this.getRoleList();
  },
  methods: {
    // 获取市场审核员下拉框
    getRoleList() {
      printRoleUser().then((res) => {
        this.roleOptions = res;
      });
    },
    //提交审批
    handleApprove(item, type) {
      if (!item.suggestion.value) {
        this.$message.warning("请输入你的审批意见");
        return;
      }
      let programObj = {};
      programObj.approvers = [];
      for (let key of this.flowList) {
        programObj.approvers.push({
          flowNodeId: key.flowNodeId,
          id: key.id,
          userId: key.approver.value,
        });
      }
      programObj.suggestion = item.suggestion.value;
      programObj.operation = type;
      programObj.id = item.id;
      printFlowApprove(programObj).then((res) => {
        this.$message.success("提交成功");
        printFlowList(this.printId).then((res) => {
          console.log("printFlowList", res);
          this.nodeName = res.name;
          this.flowList = res.nodes;
        });
      });
    },
    //   删除上传文件
    deleteFile(row) {
      printFileDelete(row.id).then((res) => {
        console.log("printFileDelete", res);
        this.showinfo();
      });
    },
    showinfo() {
      printDetail(this.printId).then((res) => {
        if (!res.files) {
          res.files = [];
        }
        if (res.printMaterials) {
          this.importantList = res.printMaterials;
        }
        this.form = res;
        if (res.state != 10) {
          // 获取意见下拉框
          getList().then((opinionRes) => {
            this.opinionList = opinionRes;
            printFlowList(this.printId).then((FlowRes) => {
              console.log("printFlowList", FlowRes);
              this.nodeName = res.name;
              this.flowList = res.nodes;
            });
          });
        }
      });
    },
    submitSettingForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.importDateId) {
            this.form.importDateId = this.importDateId;
          }
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
      // this.importObj.type=this.type
    },
    handleFail() {
      this.loadingoption.close();
      this.$message.error("上传失败");
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    handleSuccess(res) {
      this.fileList = [];
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
        this.fileList.push({ id: res.data.id, name: res.data.fileName });
      } else {
        this.$message({
          message: res.message,
          type: "error",
        });
      }
    },
    handleSuccess1(res) {
      //   this.fileList = [];
      this.loadingoption.close();
      if (res.code == "00000") {
        this.$message.success("导入成功");
        this.importDateId = res.data;
        printMaterials(res.data).then((response) => {
          this.importantList = response;
        });
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
  margin: 10px;
  padding-right: 10px;
  // border-right: 1px solid #e6e6e6;
  height: 100%;
  padding-bottom: 10px;
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