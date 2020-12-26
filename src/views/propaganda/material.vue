<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="归属部门" prop="unitId">
        <treeselect
          v-model="queryParams.unitId"
          :options="deptOptions"
          placeholder="请选择归属部门"
          style="width: 240px"
        />
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          @click="handleUpdate"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="OpenSetVisible"
          >相关设定</el-button
        >
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <!--部门数据-->
      <el-col :span="10" :xs="24">
        <div class="head-container">
          <el-tree
            :data="LibraryTree"
            :props="defaultProps"
            :expand-on-click-node="false"
            ref="tree"
            default-expand-all
            @node-click="handleNodeClick"
            highlight-current
            draggable
            v-loading="loading"
          >
            <span slot-scope="{ node, data }">
              <span :class="!data.state ? 'colorRed' : ''">{{
                node.label
              }}</span>
            </span>
          </el-tree>
        </div>
      </el-col>
      <!--用户数据-->
      <el-col :span="14" :xs="24" class="materialDetail">
        <el-form label-width="120px" width="500px" :model="publicityForm">
          <el-form-item label="类别名称">
            <div>{{ publicityForm.goodsName }}</div>
          </el-form-item>
          <!-- <el-form-item label="类别代码">
            <div>{{ publicityForm.goodsNum }}</div>
          </el-form-item> -->
          <el-form-item label="物料审核人">
            <div>{{ publicityForm.checkerName }}</div>
          </el-form-item>
          <el-form-item label="计量单位">
            <div>{{ publicityForm.unit }}</div>
          </el-form-item>
          <el-form-item label="尺寸">
            <div>{{ publicityForm.size }}</div>
          </el-form-item>
          <el-form-item label="纸张">
            <div>{{ publicityForm.paper }}</div>
          </el-form-item>
          <el-form-item label="联次">
            <div>{{ publicityForm.attribute }}</div>
          </el-form-item>
          <el-form-item label="是否加盖杭州分公司合同章">
            <div>{{ publicityForm.hasSealLable }}</div>
          </el-form-item>
          <el-form-item label="是否有编号">
            <div>{{ publicityForm.hasNumLable }}</div>
          </el-form-item>
          <el-form-item label="版面关联人">
            <div>{{ publicityForm.updateName }}</div>
          </el-form-item>
          <el-form-item label="是否使用">
            <div>{{ publicityForm.stateLable }}</div>
          </el-form-item>
          <el-form-item label="编辑时间">
            <div>{{ publicityForm.updateTime }}</div>
          </el-form-item>
          <el-form-item label="备注">
            <div>{{ publicityForm.remark }}</div>
          </el-form-item>
          <el-form-item label="图片" class="picItem">
            <el-image style="width: 30%" :src="src"></el-image>
            <el-image style="width: 30%" :src="src"></el-image>
            <el-image style="width: 30%" :src="src"></el-image>
            <el-image style="width: 30%" :src="src"></el-image>
          </el-form-item>
        </el-form>
        <!-- <div  style="padding-left:50px">
                <el-button type="danger" size="mini" @click="Isdisable =!Isdisable">编辑</el-button>
                <el-button type="primary" size="mini" :disabled="Isdisable" @click="submit">保存</el-button>
              </div> -->
      </el-col>
    </el-row>
    <el-dialog title="相关设定" :visible.sync="SetVisible" width="600px">
      <el-form label-width="160px" :model="settingForm">
        <el-form-item
          :label="'第' + (index + 1) + '次申请截止时间'"
          v-for="(item, index) in applicationList"
          :key="index"
        >
          <el-date-picker
            v-model="item.deadline"
            type="datetime"
            size="mini"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH"
            format="dd日HH时"
          >
          </el-date-picker>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="DelLine(index)"
            >删除</el-button
          >
        </el-form-item>
      </el-form>
      <el-button type="success" class="addline" @click="addLine"
        >添加行数</el-button
      >
      <el-form label-width="160px" width="500px" :model="settingForm">
        <el-form-item label="添加页面提示内容">
          <el-input type="textarea" v-model="settingForm.contents"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitSettingForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改活动对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="归属部门" prop="unitId">
              <treeselect
                v-model="form.unitId"
                :options="deptOptions"
                placeholder="选择归属部门"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="类别" prop="parentId">
              <treeselect
                v-model="form.parentId"
                :options="LibraryTree"
                placeholder="选择类别"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="isMold == 1">
            <el-form-item label="类别名称" prop="goodsName">
              <el-input
                v-model="form.goodsName"
                placeholder="请输入类别名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="isMold != 1">
            <el-form-item label="物料名称" prop="goodsName">
              <el-input
                v-model="form.goodsName"
                placeholder="请输入物料名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否为类别 " prop="mold">
              <el-switch v-model="form.mold" @change="changeMold"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="isMold != 1">
            <el-form-item label="物料属性" prop="type">
              <el-select
                v-model="form.type"
                placeholder="请选择物料属性"
                style="width: 100%"
              >
                <el-option key="1" label="宣传单页" :value="1"></el-option>
                <el-option key="0" label="业务单式" :value="0"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12" v-if="isMold != 1">
            <el-form-item label="类别代码" prop="goodsNum">
              <el-input
                v-model="form.goodsNum"
                placeholder="请输入类别代码"
              ></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="12" v-if="isMold != 1">
            <el-form-item label="物料审核人" prop="checker">
              <el-input
                v-model="form.checker"
                placeholder="请输入物料审核人"
                type="number"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="isMold != 1">
            <el-form-item label="计量单位" prop="unit">
              <el-input
                v-model="form.unit"
                placeholder="请输入计量单位"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="isMold != 1">
            <el-form-item label="尺寸" prop="size">
              <el-input v-model="form.size" placeholder="请输入尺寸"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="isMold != 1">
            <el-form-item label="纸张" prop="paper">
              <el-input
                v-model="form.paper"
                placeholder="请输入纸张"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="isMold != 1">
            <el-form-item label="联次" prop="attribute">
              <el-input
                v-model="form.attribute"
                placeholder="请输入联次"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12" v-if="isMold != 1">
            <el-form-item label="是否有编号" prop="state">
              <el-switch v-model="form.hasNum"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="isMold != 1">
            <el-form-item label="版面关联人" prop="updateBy">
              <el-input
                v-model="form.updateBy"
                placeholder="请输入版面关联人"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否使用" prop="state">
              <el-switch v-model="form.state"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="isMold != 1">
            <el-form-item
              label="是否加盖杭州分公司合同章"
              label-width="200px"
              prop="hasSeal"
            >
              <el-switch v-model="form.hasSeal"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="isMold != 1">
            <el-form-item label="备注" prop="remark">
              <el-input
                type="textarea"
                v-model="form.remark"
                placeholder="请输入备注"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="isMold != 1" style="height: 150px">
            <el-form-item label="上传照片" prop="pic">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
              <!-- <el-input v-model="form.email" :disabled="Isdisable"></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addLibrary,
  putLibrary,
  getLibraryDetail,
  getLibraryTree,
  addSetting,
  getSetting,
} from "@/api/propaganda/material";
import { resourceTreeByUN } from "@/api/system/unit";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "User",
  components: { Treeselect },
  data() {
    return {
      loading: false,
      LibraryTree: [],
      settingForm: {},
      publicityForm: {},
      src:
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      title: "",
      value1: undefined,
      defaultProps: {
        children: "children",
        label: "label",
      },
      //截止日期列表
      applicationList: [],
      dialogImageUrl: "",
      //查看大图弹窗
      dialogVisible: false,
      //相关设定弹窗
      SetVisible: false,
      Isdisable: true,
      isMold: 1,
      form: {
        mold: true,
        state: false,
        hasNum: false,
        hasSeal: false,
      },
      // 部门树选项
      deptOptions: undefined,
      // 状态数据字典
      statusOptions: [
        { dictValue: 1, dictLabel: "正常" },
        { dictValue: 0, dictLabel: "停用" },
      ],
      // 查询参数
      queryParams: {},
      open: false,
      libraryId: undefined,
      parentId: undefined,
      // 表单校验
      rules: {
        goodsName: [
          { required: true, message: "类别名称不能为空", trigger: "blur" },
        ],
        goodsNum: [
          { required: true, message: "类别代码不能为空", trigger: "blur" },
        ],
        unitId: [
          { required: true, message: "归属单位不能为空", trigger: "blur" },
        ],
        type: [
          { required: true, message: "物料属性不能为空", trigger: "blur" },
        ],
        checker: [
          { required: true, message: "物料审核人不能为空", trigger: "blur" },
        ],
        unit: [
          { required: true, message: "计量单位不能为空", trigger: "blur" },
        ],
        size: [{ required: true, message: "尺寸不能为空", trigger: "blur" }],
        paper: [{ required: true, message: "纸张不能为空", trigger: "blur" }],
        updateBy: [
          { required: true, message: "版面关联人不能为空", trigger: "blur" },
        ],
        // updateBy: [
        //   { required: true, message: "手机号码不能为空", trigger: "blur" },
        // ],
      },
    };
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    },
    "form.mold"() {
      this.$nextTick(() => {
        this.isMold = this.form.mold;
      });
    },
  },
  created() {
    this.getTreeselect();
    this.getList();
  },
  methods: {
    // 删除行
    DelLine(index) {
      this.applicationList.splice(index, 1);
    },
    // 打开设置弹出框
    OpenSetVisible() {
      this.settingForm = {};
      this.applicationList = [];
      getSetting().then((res) => {
        console.log("getSetting", res);
        // this.settingForm = res;
        this.settingForm.contents = res[0].contents;
        res.map((item, index) => {
          let deadObj = {
            deadline: item.deadline,
          };
          this.applicationList.push(deadObj);
        });
        this.SetVisible = true;
      });
    },
    changeMold(val) {
      if (typeof this.form.mold != undefined) {
        this.$nextTick(() => {
          this.isMold = val;
        });
      }
    },
    submitSettingForm() {
      this.settingForm.deadlineList = [];
      this.applicationList.map((item) => {
        this.settingForm.deadlineList.push(item.deadline);
      });
      addSetting(this.settingForm).then((res) => {
        console.log("addSetting", res);
        this.msgSuccess("添加成功");
        this.SetVisible = false;
      });
    },
    getList() {
      this.loading = true;
      getLibraryTree(this.queryParams).then((response) => {
        this.loading = false;
        this.LibraryTree = response;
      });
    },
    // 筛选节点
    // filterNode(value, data) {
    //   if (!value) return true;
    //   return data.label.indexOf(value) !== -1;
    // },
    // 节点单击事件
    handleNodeClick(data) {
      this.libraryId = data.id;
      this.parentId = data.id;
      this.getListDetail(data);
    },
    getListDetail(data) {
      if (data.mold) {
        this.publicityForm = {};
        // this.$message.error("请点击活动");
      } else {
        getLibraryDetail(data.id).then((res) => {
          console.log("res", res);
          this.publicityForm = res;
        });
      }
    },
    // 表单重置
    reset() {
      this.form = {
        mold: true,
        state: false,
        hasNum: false,
        hasSeal: false,
      };
      this.resetForm("form");
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "新增";
      this.form.parentId = this.parentId;
    },
    cancel() {
      this.SetVisible = false;
      this.open = false;
      this.reset();
    },
    /** 修改按钮操作 */
    handleUpdate() {
      this.reset();
      // this.getTreeselect();
      const libraryId = this.libraryId;
      getLibraryDetail(libraryId).then((response) => {
        this.form = response;
        this.open = true;
        this.title = "修改";
      });
    },
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != undefined) {
            putLibrary(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
            // .catch((err) => {
            //   this.msgError(err.message);
            // });
          } else {
            addLibrary(this.form).then((response) => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
            // .catch((err) => {
            //   this.msgError(err.message);
            // });
          }
        }
      });
    },
    // 添加行
    addLine() {
      var list = {
        title: `第${this.applicationList.length + 1}次申请截止时间`,
      };
      this.applicationList.push(list);
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      resourceTreeByUN().then((response) => {
        this.deptOptions = response.list;
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>

<style scoped>
.addline {
  margin-left: 25px;
  margin-bottom: 20px;
}
.el-form-item {
  height: 37px;
}
.materialDetail .el-form-item--medium /deep/ .el-form-item__label {
  line-height: 20px;
  font-size: 12px;
}
.materialDetail .el-form-item {
  display: flex;
  align-items: center;
}
.materialDetail .el-form-item--medium /deep/ .el-form-item__content {
  margin-left: 0 !important;
  width: 240px;
}
.picItem {
  align-items: flex-start !important;
}
.picItem /deep/ .el-form-item__content {
  width: 440px !important;
}
.colorRed {
  color: red;
}
</style>
