<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="归属部门" prop="state">
        <el-select
          v-model="queryParams.state"
          placeholder="请选择归属部门"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
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
          @click="SetVisible = true"
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
            :filter-node-method="filterNode"
            ref="tree"
            default-expand-all
            @node-click="handleNodeClick"
            draggable
          />
        </div>
      </el-col>
      <!--用户数据-->
      <el-col :span="14" :xs="24">
        <el-form label-width="120px" width="500px" :model="publicityForm">
          <el-form-item label="类别名称">
            <div>{{publicityForm.goodsName}}</div>
          </el-form-item>
          <el-form-item label="类别代码">
            <div>{{publicityForm.goodsNum}}</div>
          </el-form-item>
          <el-form-item label="物料审核人">
            <div>{{publicityForm.checker}}</div>
          </el-form-item>
          <el-form-item label="计量单位">
            <div>{{publicityForm.unit}}</div>
          </el-form-item>
          <el-form-item label="尺寸">
            <div>{{publicityForm.size}}</div>
          </el-form-item>
          <el-form-item label="纸张">
            <div>{{publicityForm.paper}}</div>
          </el-form-item>
          <el-form-item label="联次">
            <div>{{publicityForm.attribute}}</div>
          </el-form-item>
          <el-form-item label="是否加盖杭州分公司合同章">
            <div>{{publicityForm.hasSeal}}</div>
          </el-form-item>
          <el-form-item label="是否有编号">
            <div>{{publicityForm.hasNum}}</div>
          </el-form-item>
          <el-form-item label="版面关联人">
            <div>{{publicityForm.updateBy}}</div>
          </el-form-item>
          <el-form-item label="是否使用">
            <div>{{publicityForm.state}}</div>
          </el-form-item>
          <el-form-item label="编辑时间">
            <div>{{publicityForm.updateTime}}</div>
          </el-form-item>
          <el-form-item label="备注">
            <div>{{publicityForm.remark}}</div>
          </el-form-item>
          <el-form-item label="图片">
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
          :label="item.title"
          v-for="(item, index) in applicationList"
          :key="index"
        >
          <el-date-picker
            v-model="settingForm.deadline"
            type="datetime"
            size="mini"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="DelLine(item.id)"
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
          <el-col :span="24" v-if="form.parentId !== 0">
            <el-form-item label="分公司" prop="unitId">
              <treeselect
                v-model="form.unitId"
                :options="deptOptions"
                placeholder="选择分公司"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="form.parentId !== 0">
            <el-form-item label="类别" prop="parentId">
              <treeselect
                v-model="form.parentId"
                :options="LibraryTree"
                placeholder="选择类别"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.flag">
            <el-form-item label="类别名称" prop="goodsName">
              <el-input v-model="form.goodsName" placeholder="请输入类别名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="!form.flag">
            <el-form-item label="物料名称" prop="goodsName">
              <el-input v-model="form.goodsName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否为类别 " prop="flag">
              <el-switch v-model="form.flag"></el-switch>
            </el-form-item>
          </el-col>
          
          <el-col :span="12" v-if="!form.flag">
            <el-form-item label="类别代码" prop="goodsNum">
              <el-input v-model="form.goodsNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="!form.flag">
            <el-form-item label="物料审核人" prop="checker">
              <el-input v-model="form.checker"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="!form.flag">
            <el-form-item label="计量单位" prop="unit">
              <el-input v-model="form.unit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="!form.flag">
            <el-form-item label="尺寸" prop="size">
              <el-input v-model="form.size"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="!form.flag">
            <el-form-item label="纸张" prop="paper">
              <el-input v-model="form.paper"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="!form.flag">
            <el-form-item label="联次" prop="attribute">
              <el-input v-model="form.attribute"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12" v-if="!form.flag">
            <el-form-item label="是否有编号" >
              <el-switch v-model="form.hasNum"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="!form.flag">
            <el-form-item label="版面关联人" prop="updateBy">
              <el-input v-model="form.updateBy"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="!form.flag">
            <el-form-item label="是否使用" >
              <el-switch v-model="form.state"></el-switch>
              <el-input v-model="form.state"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="!form.flag">
            <el-form-item
              label="是否加盖杭州分公司合同章"
              label-width="200px"
              
            >
              <el-switch v-model="form.hasSeal"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="!form.flag">
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="!form.flag">
            <el-form-item label="上传照片" prop="parentId">
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
import { addLibrary , putLibrary , getLibraryDetail , getLibraryTree} from "@/api/propaganda/material";
import { DeptList } from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";


import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "User",
  components: { Treeselect },
  data() {
    return {
      settingForm:{},
      publicityForm:{},
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
      form: {
        flag: true,
        state:true,
        hasNum:true,
        hasSeal:true
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
      // 表单校验
      rules: {
        userName: [
          { required: true, message: "登录账号不能为空", trigger: "blur" },
        ],
        nickName: [
          { required: true, message: "用户姓名不能为空", trigger: "blur" },
        ],
        unitId: [
          { required: true, message: "归属单位不能为空", trigger: "blur" },
        ],
        defaultUnitId: [
          { required: true, message: "默认数据单位不能为空", trigger: "blur" },
        ],
        jobNum: [{ required: true, message: "工号不能为空", trigger: "blur" }],
        email: [
          { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        phone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    this.getTreeselect();
    this.getList()
  },
  methods: {
    getList(){
      getLibraryTree(this.queryParams).then(response => {
        console.log('getLibraryTree',response);
        this.LibraryTree = response.list;
      });
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      this.queryParams.unitId = data.id;
      this.getList();
    },
    // 表单重置
    reset() {
      this.form = {
         flag:true
      };
      this.resetForm("form");
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "新增";
    },
    cancel() {
      this.SetVisible = false;
      this.open = false;
      this.reset();
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.getTreeselect();
      const userId = row.id || this.ids;

      getUser(userId).then((response) => {
        this.form = response;
        this.checkedRsRoleIds = this.form.checkedRsRoleIds;
        this.checkedUnRoleIds = this.form.checkedUnRoleIds;
        // this.postOptions = response.posts;
        // this.roleOptions = response.roles;
        // this.form.postIds = response.postIds;
        // this.form.roleIds = response.roleIds;
        this.open = true;
        this.title = "修改用户";
        this.form.pwd = "";
      });
    },
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            putLibrary(this.form)
              .then(response => {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              })
              .catch(err => {
                this.msgError(err.message);
              });
          } else {
            addLibrary(this.form)
              .then(response => {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              })
              .catch(err => {
                this.msgError(err.message);
              });
          }
        }
      });
    },
    // 添加行
    addLine() {
      console.log("this.applicationList.length", this.applicationList.length);
      var list = {
        title: `第${this.applicationList.length + 1}次申请截止时间`,
      };
      this.applicationList.push(list);
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      DeptList().then((response) => {
        this.deptOptions = response;
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
</style>
