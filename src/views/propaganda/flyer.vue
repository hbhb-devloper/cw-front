<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="单位" prop="unitId">
         <treeselect
                v-model="queryParams.unitId"
                :options="deptOptions"
                placeholder="选择分公司"
                style="width:200px"
              />
      </el-form-item>
      <el-form-item label="营业厅" prop="roleName">
        <el-input
          v-model="queryParams.roleName"
          placeholder="请输入营业厅"
          clearable
          size="small"
          style="width: 200px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="日期" prop="time">
        <el-date-picker
          v-model="queryParams.time"
          type="datetime"
          placeholder="选择日期时间"
          size="small"
          style="width: 200px"
        >
        </el-date-picker>
        <el-select
          v-model="queryParams.goodsIndex"
          placeholder="请选择归属部门"
          clearable
          size="small"
          style="width: 200px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
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
          >保存</el-button
        >
      </el-form-item>
    </el-form>
    <el-row>
      <el-col
        :span="5"
        v-for="(o, index) in 6"
        :key="index"
        style="margin-bottom: 10px"
        :offset="1"
      >
        <el-card :body-style="{ padding: '0px' }">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
            @click="showPic"
          />
          <div style="padding: 14px">
            <div>移动铅笔套盒（含笔盒）</div>
            <div>计量单位：套</div>
            <div class="bottom clearfix">
              申请数量：<el-input
                v-model="input"
                type="number"
                style="width: 100px"
              ></el-input>
              <el-button type="text" class="button">√</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { goodsList } from "@/api/propaganda/flyer";
import { resourceTreeByUN } from "@/api/system/unit";
import Treeselect from "@riophae/vue-treeselect";

import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "Role",
  components: { Treeselect },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      input: 0,
      currentDate: new Date(),
      // 状态数据字典
      statusOptions: [
        { dictValue: 1, dictLabel: "正常" },
        { dictValue: 2, dictLabel: "停用" },
      ],
// 部门树选项
      deptOptions: undefined,
      // 查询参数
      queryParams: {},
      // 表单参数
      form: {},
    };
  },
  created() {
    this.getTreeselect();

    this.getList();
    // this.getMenuTreeselect();
  },
  methods: {
     /** 查询部门下拉树结构 */
    getTreeselect() {
      resourceTreeByUN().then((response) => {
        this.deptOptions = response.list;
      });
    },
    showPic() {
      this.dialogImageUrl =
        "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png";
      this.dialogVisible = true;
    },
    /** 查询角色列表 */
    getList() {
      goodsList(this.queryParams).then((response) => {
        this.roleList = response.list;
        this.total = response.count;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
  },
};
</script>
<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  line-height: 36px;
  display: flex;
  flex-direction: row;
  position: relative;
}

.button {
  padding: 0;
  float: right;
  margin-left: 10px;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.flyerList {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>