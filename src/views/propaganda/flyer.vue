<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="单位" prop="unitId">
        <treeselect
          v-model="queryParams.unitId"
          :options="deptOptions"
          placeholder="选择分公司"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="营业厅" prop="hallId">
        <el-input
          v-model="queryParams.hallId"
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
          type="month"
          placeholder="选择日期时间"
          size="small"
          style="width: 200px"
          value-format="yyyy-MM"
          format="yyyy-MM"
          @change="changeTime"
        >
        </el-date-picker>
        <el-select
          v-model="queryParams.goodsIndex"
          placeholder="请选择第几次"
          clearable
          size="small"
          style="width: 200px"
        >
          <el-option
            v-for="(dict,index) in timeOption"
            :key="index"
            :label="'第'+dict+'次'"
            :value="dict"
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
        <el-button icon="el-icon-refresh" size="mini" @click="save"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
    <el-row>
      <el-col
        :span="5"
        v-for="(item, index) in goodsList"
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
            <div>{{item.goodsName}}</div>
            <div>计量单位：{{item.unit}}</div>
            <div class="bottom clearfix">
              申请数量：<el-input
                v-model="item.applyAmount"
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
import { goodsList,goodsTime,goodsApply } from "@/api/propaganda/flyer";
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
      // 商品列表
      goodsList:[],
      // 部门树选项
      deptOptions: undefined,
      // 查询参数
      queryParams: {
        hallId: 1,
      },
      // 表单参数
      form: {},
      // 次序选项
      timeOption:[]
    };
  },
  created() {
    this.getTreeselect();

    // this.getMenuTreeselect();
  },
  methods: {
    // 保存所有物料数据
    save(){
      let applyObj=this.deepClone(this.queryParams)
      applyObj.list=this.goodsList
      goodsApply(applyObj).then(res=>{
        console.log('goodsApply',res);
      })
    },
    // 根据时间获取一共有几次
    changeTime() {
      goodsTime(this.queryParams.time).then(res=>{
        console.log('goodsTime',res);
        this.timeOption=res.goodsIndexList
      })
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      resourceTreeByUN().then((response) => {
        this.deptOptions = response.list;
        this.queryParams.unitId = response.checked[0];
        this.getList();
      });
    },
    showPic() {
      this.dialogImageUrl =
        "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png";
      this.dialogVisible = true;
    },
    /** 查询商品列表 */
    getList() {
      goodsList(this.queryParams).then((response) => {
        this.goodsList = response.list;
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