<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="单位" prop="roleName">
        <el-input
          v-model="queryParams.roleName"
          placeholder="请输入单位"
          clearable
          size="small"
          style="width: 200px"
          @keyup.enter.native="handleQuery"
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
      <el-form-item label="日期" prop="roleName">
        <el-date-picker
          v-model="queryParams.value1"
          type="datetime"
          placeholder="选择日期时间"
          style="width: 200px"
        >
        </el-date-picker>
        <el-select
          v-model="queryParams.state"
          placeholder="请选择归属部门"
          clearable
          size="medium"
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
    <el-row  >
      <el-col
        :span="5"
        v-for="(o, index) in 6"
        :key="index"
        style="margin-bottom:10px;"
        :offset="1"
      >
        <el-card :body-style="{ padding: '0px' }">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px">
            <div>移动铅笔套盒（含笔盒）</div>
            <div>计量单位：套</div>
            <div class="bottom clearfix">
              申请数量：<el-input v-model="input" type="number" style="width:100px"></el-input>
              <el-button type="text" class="button">√</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Role",
  data() {
    return {
      input:0,
      currentDate: new Date(),
      // 状态数据字典
      statusOptions: [
        { dictValue: 1, dictLabel: "正常" },
        { dictValue: 2, dictLabel: "停用" },
      ],

      // 查询参数
      queryParams: {},
      // 表单参数
      form: {},
    };
  },
  created() {
    // this.getList();
    // this.getMenuTreeselect();
  },
  methods: {
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      pageRole(this.queryParams).then((response) => {
        this.roleList = response.list;
        this.total = response.count;
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
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
      clear: both
  }
  .flyerList{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>