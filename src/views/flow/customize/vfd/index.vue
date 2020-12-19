<!--
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-07-20 18:22:09
 * @LastEditors: CYZ
 * @LastEditTime: 2020-12-19 18:12:06
--> 
<template>
  <div class="app-container">
    <div>
      <flow-panel
        :flowId="Number(flowId)"
        :infodata="projectdata"
        @clickItem="clickitem"
        class="panel"
        @saveFlow="saveFlow"
      ></flow-panel>
      <!-- @clickLine="clickline" -->
      <el-dialog
        title="修改节点"
        :visible.sync="ItemVisible"
        width="50%"
        :before-close="handleClose"
      >
        <el-radio-group v-model="FormType" style="margin-bottom: 30px">
          <el-radio-button label="jbxx">基本信息</el-radio-button>
          <el-radio-button label="xgtx">相关提醒</el-radio-button>
        </el-radio-group>
        <el-form
          ref="dataForm"
          :model="node"
          label-width="80px"
          v-if="FormType == 'jbxx'"
        >
          <!-- <el-form-item label="类型">
            <el-input v-model="node.type"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="node.name"></el-input>
          </el-form-item>-->
          <el-form-item label="用户角色">
            <el-select
              v-model="node.flowRoleId"
              placeholder="请选择角色"
              clearable
              size="medium"
              @change="changeuser"
            >
              <el-option
                v-for="dict in roleOptions"
                :key="dict.id"
                :label="dict.label"
                :value="dict.id"
              />
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="用户描述">
            <el-input v-model="node.roleDescription"></el-input>
          </el-form-item>-->
          <el-form-item label="角色范围">
            <treeselect
              v-model="node.unitId"
              :options="deptOptions"
              :show-count="true"
              placeholder="请选择角色范围"
              @select="changeuser1"
            />
          </el-form-item>
          <el-form-item label="默认用户">
            <el-select
              v-model="node.userId"
              :disabled="node.unitId == 0"
              placeholder="请选择默认用户"
              clearable
              size="medium"
              :loading="loading"
              @change="choseUser"
            >
              <el-option
                v-for="dict in uesrOptions"
                :key="dict.id"
                :label="dict.label"
                :value="dict.id"
              />
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="环节">
            <el-input v-model="node.linkId"></el-input>
          </el-form-item>-->
          <el-form-item label="分配者">
            <el-select
              v-model="node.assigner"
              placeholder="请选择分配者"
              clearable
              size="medium"
            >
              <el-option
                v-for="dict in flowRoleLidOptions"
                :key="dict.id"
                :label="dict.label"
                :value="dict.id"
              />
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="标准时限">
            <el-input v-model="node.name"></el-input>
          </el-form-item>-->
          <!-- <el-form-item label="是否具有否决权">
            <el-checkbox v-model="checked"></el-checkbox>
          </el-form-item>-->
          <el-form-item label="是否能够自定义流程">
            <el-checkbox
              v-model="node.controlAccess"
              :true-label="Istrue"
              :false-label="Isfalse"
            ></el-checkbox>
          </el-form-item>
          <!-- <el-form-item label="是否允许添加提醒">
            <el-checkbox v-model="checked"></el-checkbox>
          </el-form-item>-->
          <el-form-item label="是否允许被不参与流程">
            <el-checkbox
              v-model="node.isJoin"
              :true-label="Istrue"
              :false-label="Isfalse"
            ></el-checkbox>
          </el-form-item>
          <el-form-item label="启用条件">
            <div style="width: 70px">项目金额</div>
            <el-select
              v-model="node.enableCond"
              placeholder="关系"
              clearable
              size="medium"
              style="width: 150px"
            >
              <el-option
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
            <el-input
              v-model="node.amount"
              type="number"
              style="width: 150px; margin-left: 10px"
            ></el-input>
          </el-form-item>
        </el-form>

        <el-table
          :data="tableData"
          style="width: 100%"
          v-if="FormType == 'xgtx'"
        >
          <el-table-column label="提醒流程" width="180" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.noticeNodeId" placeholder="请选择">
                <el-option
                  v-for="dict in flowOptions"
                  :key="dict.id"
                  :label="dict.name"
                  :value="dict.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="提醒状态" width="180" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.state" placeholder="请选择">
                <el-option
                  v-for="dict in remindOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="提醒信息" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.inform" placeholder="请选择">
                <el-option
                  v-for="dict in noticeOptions"
                  :key="dict.id"
                  :label="dict.content"
                  :value="dict.content"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="delLine(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-button class="addline" v-if="FormType == 'xgtx'" @click="addLine"
          >添加行数</el-button
        >
        <!-- <el-button
          class="addline"
          v-if="FormType=='xgtx'"
          @click="delLine"
          :disabled="ischose"
        >删除选择行</el-button>-->
        <span slot="footer" class="dialog-footer">
          <el-button @click="ItemVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="submitForm"
            :loading="submitLoading"
          >
            <span v-if="!submitLoading">确 定</span>
            <span v-else>保存中</span>
          </el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="修改条件"
        :visible.sync="LineVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form ref="dataForm" :model="line" label-width="80px">
          <el-form-item label="条件" prop="roleName">
            <el-input v-model="line.label" placeholder="请输入条件" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="LineVisible = false">取 消</el-button>
          <el-button type="primary" @click="LineVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import FlowPanel from "@/components/ef/panel";
import { getProject } from "@/api/flow/project";
import { getremindList } from "@/api/flow/remind";
import {
  getFlowProp,
  getFlowRoleUser,
  addFlowProp,
  putFlowProp,
  addFlowPropNotice,
  getFlowPropNotice,
  getFlowPropNodeRole,
  delPropNotice,
} from "@/api/flow/vfd";
import { listUnit } from "@/api/system/unit";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { listFlowRoles } from "@/api/flow/flowrole";
export default {
  components: {
    FlowPanel,
    Treeselect,
  },

  data() {
    return {
      submitLoading: false,
      loading: false,
      Istrue: 1,
      Isfalse: 2,
      value: "",
      ItemVisible: false,
      LineVisible: false,
      FormType: "jbxx",
      line: {},
      node: {},
      statusOptions: [
        { dictValue: 10, dictLabel: "小于" },
        { dictValue: 20, dictLabel: "小于等于" },
        { dictValue: 30, dictLabel: "等于" },
        { dictValue: 40, dictLabel: "大于" },
        { dictValue: 50, dictLabel: "大于等于" },
      ],
      remindOptions: [
        { dictValue: 10, dictLabel: "默认提醒" },
        { dictValue: 20, dictLabel: "不同意时" },
        { dictValue: 30, dictLabel: "流程完成时" },
      ],
      flowId: "",
      projectdata: {},
      tableData: [],
      // 部门树选项
      deptOptions: undefined,
      roleOptions: [],
      uesrOptions: [],
      noticeOptions: [],
      flowRoleLidOptions: [],
      tablelength: 0,
      nodeId: undefined,
      RoleUserParams: {},
      ischose: true,
      // unitId:undefined,
      // flowRoleId:undefined
    };
  },
  computed: {
    flowOptions() {
      return this.projectdata.nodeList;
    },
    // flowRoleId() {
    //   return this.node.assigner;
    // },
    // unitId() {
    //   return this.node.unitId;
    // },
  },
  async created() {
    this.flowId = this.$route.params.flowId;
    await this.showinfo();
    this.getTreeselect();
    this.getRoleList();
    this.getRemindList();
  },
  methods: {
    saveFlow() {
      this.showinfo();
    },
    choseUser(select) {
      console.log("select", select);
      console.log(this.node.userId);
      this.$forceUpdate();
    },
    getRemindList() {
      getremindList().then((res) => {
        this.noticeOptions = res;
      });
    },
    submitForm() {
      this.submitLoading = true;
      if (this.FormType == "jbxx") {
        if (this.node.flowNodeId) {
          addFlowProp(this.node).then((res) => {
            this.$message.success("修改属性成功");
            this.ItemVisible = false;
            this.submitLoading = false;
          }).catch(err=>{
            this.$message.error("修改属性失败");
            this.submitLoading = false;
          });
        } else {
          this.node.flowNodeId = this.nodeId;
          addFlowProp(this.node).then((res) => {
            this.$message.success("修改属性成功");
            this.ItemVisible = false;
            this.submitLoading = false;
          }).catch(err=>{
            this.$message.error("修改属性失败");
            this.submitLoading = false;
          });
        }
      } else if (this.FormType == "xgtx") {
        // if (this.tablelength != 0) {
        //   putFlowProp(this.tableData).then((res) => {
        //     console.log("putFlowProp", res);
        //     this.ItemVisible = false;
        //   });
        // } else {
        if (this.tableData == "") {
          this.$message.success("修改提醒成功");
          this.ItemVisible = false;
          this.submitLoading = false;
        } else {
          addFlowPropNotice(this.tableData)
            .then((res) => {
              console.log("addFlowPropNotice", res);
              this.$message.success("修改提醒成功");
              this.ItemVisible = false;
              this.submitLoading = false;
            })
            .catch((err) => {
              this.$message.err("修改提醒失败");
              this.ItemVisible = false;
              this.submitLoading = false;
            });
        }
      }
      // }
    },
    select(selection, row) {
      console.log("selection", selection);
      console.log("row", row);
    },
    // 选中行
    choseRow(row, index) {
      console.log("row", row);
      console.log("index", index);
      this.noticeId = row.id;
      this.ischose = false;
    },
    // 删除行
    delLine(index, row) {
      console.log("index", index);
      console.log("row", row);
      let that = this;
      if (row.id) {
        delPropNotice(row.id).then((res) => {
          console.log("delPropNotice", res);
          this.$message.success("删除行成功");
          getFlowPropNotice(this.nodeId).then((response) => {
            if (response) {
              that.tableData = response;
            } else {
              that.tableData = [];
            }
          });
        });
      } else {
        this.tableData.splice(index, 1);
        this.$message.success("删除行成功");
      }
    },
    // 添加行
    addLine() {
      var list = {
        flowNodeId: this.nodeId,
      };
      this.tableData.push(list);
    },
    changeuser(select) {
      this.uesrOptions = [];
      if (select && this.node.unitId) {
        this.loading = true;
        this.flowRoleId = select;
        this.node.userId = undefined;
        getFlowRoleUser(this.flowRoleId, this.node.unitId).then((res) => {
          this.uesrOptions = res;
          this.loading = false;
        });
      }
    },
    changeuser1(select) {
      this.uesrOptions = [];
      if (select && this.node.flowRoleId) {
        this.loading = true;
        this.unitId = select.id;
        this.node.userId = undefined;
        if (select.id != 0) {
          getFlowRoleUser(this.node.flowRoleId, this.unitId).then((res) => {
            this.uesrOptions = res;
            this.loading = false;
          });
        }
      }
    },
    getRoleList() {
      listFlowRoles().then((response) => {
        this.roleOptions = response;
      });
    },
    // 表单重置
    reset() {
      this.node = {
        type: undefined,
        name: undefined,
        flowRoleId: undefined,
        assigner: undefined,
        roleDescription: undefined,
        unitId: undefined,
        userId: undefined,
        linkId: undefined,
        flowRoleLid: undefined,
        controlAccess: 0,
        isJoin: 0,
        state: undefined,
        amount: undefined,
      };
      this.resetForm("dataForm");
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      listUnit().then((response) => {
        this.deptOptions = response;
        let morendept = {
          id: 0,
          label: "流程发起人所在部门",
        };
        this.deptOptions.push(morendept);
      });
    },
    showinfo() {
      return new Promise((resolve) => {
        const loading = this.$loading({
          lock: true,
          text: "正在加载图表",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        this.loadingoption = loading;
        getProject(this.flowId).then((response) => {
          this.projectdata = response;
          // this.$store.dispatch("app/setProject", this.projectdata);
          this.loadingoption.close();
          resolve();
        });
      });
    },
    clickitem(nodeId, nodeName) {
      this.nodeId = nodeId;
      console.log("nodeName", nodeName);
      this.reset();
      let that = this;

      getFlowProp(nodeId).then((response) => {
        if (response) {
          this.node = response;
          if (!this.node.userId) {
            this.node.userId = undefined;
          }
          if (this.node.unitId&&this.node.flowRoleId) {
            getFlowRoleUser(this.node.flowRoleId, this.node.unitId).then(
            (res) => {
              that.uesrOptions = res;
            }
          );
          }
          
        } else {
          // this.node.flowNodeId = nodeId;
        }
        this.ItemVisible = true;
      });
      this.node.roleDesc = nodeName;

      getFlowPropNotice(nodeId).then((response) => {
        if (response) {
          this.tableData = response;
          this.tablelength = response.length;
        } else {
          this.tableData = [];
        }
        this.ItemVisible = true;
      });
      getFlowPropNodeRole(this.flowId).then((response) => {
        for (let i = response.length - 1; i > 0; i--) {
          if (response[i] == null) {
            response.splice(i, 1);
          }
        }
        this.flowRoleLidOptions = response;
        this.ItemVisible = true;
      });
    },
    clickline(data) {
      this.LineVisible = true;
    },
    handleClose(done) {
      this.LineVisible = false;
      this.ItemVisible = false;
    },
  },
};
</script>

<style scoped>
.panel /deep/ [class^="el-icon-"],
[class*=" el-icon-"] {
  line-height: 32px !important;
}
/* .el-form-item--medium /deep/ .el-form-item__content {
  width: 230px;
} */
.el-dialog .el-form-item--medium /deep/ .el-form-item__label {
  width: 160px !important;
}
.el-dialog .el-form-item--medium /deep/ .el-form-item__content {
  margin-left: 160px !important;
  display: flex;
}
.el-dialog .el-form-item--medium /deep/ .el-select {
  width: 100%;
}
.addline {
  margin-top: 20px;
}
/* .el-node-state-success,.el-node-state-warning,.el-node-state-error,.el-node-state-running{
  line-height: 32px !important;
} */
</style>