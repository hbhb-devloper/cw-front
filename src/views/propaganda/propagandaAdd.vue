<!--
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-12-22 10:05:30
 * @LastEditors: CYZ
 * @LastEditTime: 2021-01-15 10:52:36
-->
<template>
  <div class="app-container">
    <el-button
      icon="el-icon-back"
      type="primary"
      size="mini"
      style="margin-bottom: 20px"
      @click="handleBack"
      >返回</el-button
    >
    <div class="proTitle">中国移动通信集团{{ title }}申请单</div>
    <div style="width: 80%; margin: 0 auto">
      <div style="text-align: center">{{ nodeName }}</div>
      <!-- 流程列表 -->
      <el-row style="margin-bottom: 25px" v-if="flowList">
        <el-col
          v-for="(item, index) in flowList"
          :key="index"
          style="width:300px;margin:10px;height: 190px; border: 2px solid red; border-radius: 10px"
        >
          <div class="flowItem">
            <el-form label-width="auto"  label-position="left">
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
              <el-form-item label-width="40px">
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
                <div>{{ item.nickName }} ({{ item.approveTime }})</div>
                <i class="el-icon-success" v-if="item.operation.value == 1"></i>
                <i class="el-icon-error" v-if="item.operation.value == 0"></i>
              </div>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <el-table
        :data="BudgetList"
        v-if="BudgetList.length >= 1"
        style="margin-bottom: 20px"
      >
        <!-- <el-table-column
          align="center"
          label="序号"
          prop="materialsName"
          width="180"
        /> -->
        <el-table-column label="序号" type="index"> </el-table-column>
        <el-table-column
          align="center"
          label="单位名称"
          prop="unitName"
          width="180"
        />
        <el-table-column
          align="center"
          label="年初预算（元）"
          prop="budget"
          width="120"
        />
        <el-table-column
          align="center"
          label="已通过"
          prop="amountPaid"
          width="120"
        />
        <el-table-column
          align="center"
          label="申报中"
          prop="declaration"
          width="120"
        />
        <el-table-column
          align="center"
          label="余额"
          prop="balance"
          width="120"
        />
        <el-table-column align="center" label="使用进度" prop="proportion">
          <template slot-scope="scope">
            <el-progress
              :percentage="scope.row.proportion"
              v-if="scope.row.proportion || scope.row.proportion===0"
            ></el-progress>
          </template>
        </el-table-column>
      </el-table>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12" v-if="type == 'printed'">
            <el-form-item label="申请单名称" prop="printName">
              <el-input
                v-model="form.printName"
                placeholder="请输入申请单名称"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="type == 'design'">
            <el-form-item label="申请单名称" prop="pictureName">
              <el-input
                v-model="form.pictureName"
                placeholder="请输入申请单名称"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="type == 'poster'">
            <el-form-item label="申请单名称" prop="materialsName">
              <el-input
                v-model="form.materialsName"
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
          <el-col :span="12" v-if="type != 'printed'">
            <el-form-item label="是否为宽带" prop="wideBand">
              <el-radio v-model="form.wideBand" :disabled="editAble" :label="0"
                >否</el-radio
              >
              <el-radio v-model="form.wideBand" :disabled="editAble" :label="1"
                >是</el-radio
              >
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="type != 'printed'">
            <el-form-item label="制作商" prop="producers">
              <el-input
                v-model="form.producers"
                placeholder="请输入制作商"
                :disabled="editAble"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="type == 'printed'">
            <el-form-item label="材料类型" prop="materialType">
              <el-select
                v-model="form.materialType"
                placeholder="请选择材料类型"
                style="width: 100%"
                clearable
                :disabled="editAble"
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
          <el-col :span="12" v-if="type == 'printed'">
            <el-form-item label="市场部审核员" prop="roleUserId">
              <el-select
                v-model="form.roleUserId"
                placeholder="请选择市场部审核员"
                style="width: 100%"
                clearable
                :disabled="editAble"
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
                :disabled="editAble"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="remark">
              <el-input
                type="textarea"
                v-model="form.remark"
                placeholder="请输入备注"
                :disabled="editAble"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="type == 'design'">
            <el-form-item label="原因" prop="reason">
              <el-input
                v-model="form.reason"
                placeholder="请输入原因"
                :disabled="editAble"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="附件" prop="files">
              <el-upload
                class="upload-demo"
                :action="UploadUrl()"
                :file-list="fileList"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-exceed="handleExceed"
                :limit="1"
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
                  v-if="!editAble"
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
                      :disabled="scope.row.fileseditAble"
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
                :action="UploadUrl1()"
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
                  v-if="type == 'printed'"
                >
                  <el-option
                    v-for="dict in typrOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
                <el-button size="small" type="primary" v-if="!editAble"
                  >点击上传</el-button
                >
              </el-upload>
              <el-button
                size="small"
                type="text"
                @click="publicitydown"
                v-if="type == 'printed'"
                >宣传单页模板下载</el-button
              >
              <el-button
                size="small"
                type="text"
                @click="businessdown"
                v-if="type == 'printed'"
                >业务单式模板下载</el-button
              >
              <el-button
                size="small"
                type="text"
                @click="picturedown"
                v-if="type == 'design'"
                >宣传画面设计模板下载</el-button
              >
              <el-button
                size="small"
                type="text"
                @click="posterdown"
                v-if="type == 'poster'"
                >宣传物料设计模板下载</el-button
              >
            </el-form-item>
            <el-button
              icon="el-icon-delete"
              size="small"
              type="danger"
              v-if="importantList.length >= 1"
              @click="deleteMaterials"
              >删除导入数据</el-button
            >
            <el-table :data="importantList" v-if="importantList.length >= 1">
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
                v-if="type == 'printed'"
              />
              <el-table-column
                align="center"
                label="是否加盖分公司合同印章"
                prop="isSeal"
                width="120"
                v-if="type == 'printed'"
              />
              <el-table-column
                align="center"
                label="备注"
                prop="remark"
                width="120"
              />
            </el-table>
            <el-table
              :data="pictureFileList"
              v-if="pictureFileList.length >= 1"
            >
              <el-table-column
                align="center"
                label="文件名称"
                prop="fileName"
              />
              <el-table-column
                label="操作"
                align="center"
                width=""
                class-name="small-padding fixed-width"
              >
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    @click="viewattachment(scope.row)"
                    >查看附件</el-button
                  >

                  <el-button
                    size="mini"
                    type="text"
                    @click="handleDownload(scope.row)"
                    >下载附件</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog-footer" style="float: right" v-if="!editAble">
        <el-button type="primary" @click="submitSettingForm">保 存</el-button>
        <!-- <el-button @click="cancel">取 消</el-button> -->
      </div>
    </div>
  </div>
</template>
<script>
import { getToken } from "@/utils/auth";
import { exportData1, exportWord } from "@/utils/export";
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
  printDeleteMaterials,
} from "@/api/propaganda/printed";
import {
  pictureAdd,
  pictureUpdate,
  pictureDetail,
  pictureFileDelete,
  pictureFlowList,
  pictureFlowApprove,
} from "@/api/propaganda/design";
import {
  materialsAdd,
  materialsUpdate,
  materialsDetail,
  materialsFileDelete,
  materialsMaterials,
  materialsFlowList,
  materialsFlowApprove,
  materialsDeleteMaterials,
  materialsStatistics,
} from "@/api/propaganda/poster";
import { resourceTreeByUN } from "@/api/system/unit";
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
        reason: [
          { required: true, message: "申请原因不能为空", trigger: "blur" },
        ],
      },
      form: {
        wideBand: 0,
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
      ActionUrl: undefined,
      ActionUrl1: undefined,
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
      // 进入页面类型
      type: undefined,
      // 是否可修改
      editAble: false,
      // 文件id
      fileId: undefined,
      // 宣传画面文件列表
      pictureFileList: [],
      // 标题名称
      title: undefined,
      // 预算控制列表
      BudgetList: [],
      // 默认单位
      morenUnit: undefined,
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
    // if (!this.printId) {
    //   this.form.printName=
    // }
    this.type = this.$route.query.type;
    if (this.type == "printed") {
      this.title = "印刷品";
      this.getRoleList();
      if (this.printId) {
        this.showinfo();
      }
    } else if (this.type == "design") {
      this.title = "宣传画面";
      if (this.printId) {
        this.showinfo();
      }
    } else if (this.type == "poster") {
      this.title = "物料制作";
      if (this.printId) {
        this.showinfo();
      } else {
        this.getTreeselect();
      }
      // this.getBudgetList();
    }
  },
  methods: {
    //返回
    handleBack() {
      this.$router.go(-1);
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      resourceTreeByUN().then((response) => {
        this.morenUnit = response.checked;
        this.getBudgetList();
      });
    },
    // 物料制作预算控制列表
    getBudgetList() {
      materialsStatistics(this.morenUnit).then((res) => {
        console.log("materialsStatistics", res);
        if (res != "") {
          this.BudgetList = [];
          this.BudgetList.push(res);
        }
      });
    },
    // 下载预览文件
    handleDownload(row) {
      this.$confirm("是否下载" + row.fileName + "？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = row.filePath;
        link.download = row.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    },
    // 预览上传文件
    viewattachment(row) {
      if (/.(pdf|PDF)$/.test(row)) {
        window.open(row.filePath);
      } else if (/.(zip|ZIP)$/.test(row)) {
        this.$message({
          showClose: true,
          message: "该文件格式无法预览",
          type: "error",
        });
      } else {
        window.open(
          "https://view.officeapps.live.com/op/view.aspx?src=" + row.filePath
        );
      }
    },
    // 删除导入数据
    deleteMaterials() {
      if (typeof this.printId =='undefined') {
        this.importantList = [];
      } else {
        if (this.type == "print") {
          printDeleteMaterials(this.printId).then((res) => {
            this.showinfo();
          });
        } else {
          materialsDeleteMaterials(this.printId).then((res) => {
            this.showinfo();
          });
        }
      }
    },
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
      if (this.type == "printed") {
        printFlowApprove(programObj).then((res) => {
          this.$message.success("提交成功");
          printFlowList(this.printId).then((res) => {
            this.nodeName = res.name;
            this.flowList = res.nodes;
          });
        });
      } else if (this.type == "design") {
        pictureFlowApprove(programObj).then((res) => {
          this.$message.success("提交成功");
          pictureFlowList(this.printId)
            .then((res) => {
              this.nodeName = res.name;
              this.flowList = res.nodes;
            })
            .catch((err) => {
              console.log("err", err);
            });
        });
      } else if (this.type == "poster") {
        materialsFlowApprove(programObj).then((res) => {
          this.$message.success("提交成功");
          materialsFlowList(this.printId)
            .then((res) => {
              console.log("materialsFlowApprove", res);
              this.nodeName = res.name;
              this.flowList = res.nodes;
            })
            .catch((err) => {
              console.log("err", err);
            });
        });
      }
    },
    //   删除上传文件
    deleteFile(row) {
      if (this.type == "printed") {
        printFileDelete(row.id).then((res) => {
          this.msgSuccess("删除成功");
          this.showinfo();
        });
      } else if (this.type == "design") {
        pictureFileDelete(row.id).then((res) => {
          this.msgSuccess("删除成功");
          this.showinfo();
        });
      } else if (this.type == "poster") {
        materialsFileDelete(row.id).then((res) => {
          this.msgSuccess("删除成功");
          this.showinfo();
        });
      }
    },
    showinfo() {
      if (this.type == "printed") {
        printDetail(this.printId).then((res) => {
          if (!res.files) {
            res.files = [];
          }
          if (res.printMaterials) {
            this.importantList = res.printMaterials;
          }
          if (res.state != 10) {
            this.editAble = true;
            res.files.map((item) => {
              item.fileseditAble = true;
            });
          }
          this.form = res;

          if (res.state != 10) {
            // 获取意见下拉框
            getList().then((opinionRes) => {
              this.opinionList = opinionRes;
              printFlowList(this.printId).then((FlowRes) => {
                this.nodeName = FlowRes.name;
                this.flowList = FlowRes.nodes;
              });
            });
          }
        });
      } else if (this.type == "design") {
        pictureDetail(this.printId).then((res) => {
          if (!res.files) {
            res.files = [];
          }
          if (res.fileName) {
            this.pictureFileList = [
              {
                fileName: res.fileName,
                filePath: res.filePath,
                fileId: res.fileId,
              },
            ];
          }
          if (res.state != 10) {
            this.editAble = true;
            res.files.map((item) => {
              item.fileseditAble = true;
            });
          }
          this.form = res;

          if (res.state != 10) {
            // 获取意见下拉框
            getList().then((opinionRes) => {
              this.opinionList = opinionRes;
              pictureFlowList(this.printId).then((FlowRes) => {
                this.nodeName = FlowRes.name;
                this.flowList = FlowRes.nodes;
              });
            });
          }
        });
      } else if (this.type == "poster") {
        materialsDetail(this.printId).then((res) => {
          this.morenUnit = res.unitId;
          this.getBudgetList();
          if (!res.files) {
            res.files = [];
          }
          if (res.materialsInfo) {
            this.importantList = res.materialsInfo;
          }
          if (res.state != 10) {
            this.editAble = true;
            res.files.map((item) => {
              item.fileseditAble = true;
            });
          }
          this.form = res;
          if (res.state != 10) {
            // 获取意见下拉框
            getList().then((opinionRes) => {
              this.opinionList = opinionRes;
              materialsFlowList(this.printId).then((FlowRes) => {
                this.nodeName = FlowRes.name;
                this.flowList = FlowRes.nodes;
              });
            });
          }
        });
      }
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
          if (this.fileId) {
            this.form.fileId = this.fileId;
          }
          if (this.form.id != undefined) {
            if (this.type == "printed") {
              printUpdate(this.form).then((response) => {
                this.msgSuccess("修改成功");
                this.open = false;
                this.fileList = [];
                this.showinfo();
                this.$router.go(-1);
              });
            } else if (this.type == "design") {
              pictureUpdate(this.form).then((response) => {
                this.msgSuccess("修改成功");
                this.open = false;
                this.fileList = [];
                this.showinfo();
                this.$router.go(-1);
              });
            } else if (this.type == "poster") {
              materialsUpdate(this.form).then((response) => {
                this.msgSuccess("修改成功");
                this.open = false;
                this.fileList = [];
                this.showinfo();
                this.$router.go(-1);
              });
            }
          } else {
            if (this.type == "printed") {
              if (this.importantList.length < 1) {
                this.$message.error("请上传附件");
              } else {
                printAdd(this.form).then((response) => {
                  this.msgSuccess("新增成功");
                  this.open = false;
                  this.$router.go(-1);
                });
              }
            } else if (this.type == "design") {
              if (this.pictureFileList.length < 1) {
                this.$message.error("请上传附件");
              } else {
                pictureAdd(this.form).then((response) => {
                  this.msgSuccess("新增成功");
                  this.open = false;
                  this.$router.go(-1);
                });
              }
            } else if (this.type == "poster") {
              if (this.importantList.length < 1) {
                this.$message.error("请上传附件");
              } else {
                materialsAdd(this.form).then((response) => {
                  this.msgSuccess("新增成功");
                  this.open = false;
                  this.$router.go(-1);
                });
              }
            }
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
    handleFail(err, file, fileList) {
      console.log('fileList',fileList);
      fileList=[]
      this.loadingoption.close();
      this.$message.error("上传失败");
    },
    // 根据type判断上传文件路径
    UploadUrl: function () {
      if (this.type == "printed") {
        return process.env.VUE_APP_GATEWAY_API + `${prefix}/print/upload`;
      } else if (this.type == "design") {
        return process.env.VUE_APP_GATEWAY_API + `${prefix}/picture/upload`;
      } else if (this.type == "poster") {
        return process.env.VUE_APP_GATEWAY_API + `${prefix}/materials/upload`;
      }
    },
    UploadUrl1: function () {
      if (this.type == "printed") {
        return process.env.VUE_APP_GATEWAY_API + `${prefix}/print/import`;
      } else if (this.type == "design") {
        return process.env.VUE_APP_GATEWAY_API + `${prefix}/picture/import`;
      } else if (this.type == "poster") {
        return process.env.VUE_APP_GATEWAY_API + `${prefix}/materials/import`;
      }
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
        if (this.type == "printed") {
          this.importDateId = res.data;
          printMaterials(res.data).then((response) => {
            this.importantList = response;
          });
        } else if (this.type == "design") {
          this.fileId = res.data.id;
          this.pictureFileList = [
            {
              fileName: res.data.fileName,
            },
          ];
        } else if (this.type == "poster") {
          this.importDateId = res.data;
          materialsMaterials(res.data).then((response) => {
            this.importantList = response;
          });
        }
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
    picturedown() {
      exportWord(getToken(), "", `${prefix}/picture/export`, "宣传画面模板");
    },
    posterdown() {
      exportData1(getToken(), "", `${prefix}/materials/export`, "宣传物料模板");
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