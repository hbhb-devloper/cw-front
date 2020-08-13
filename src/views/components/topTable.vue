<template>
    <div class="container">
<!--      <header class="header">-->
<!--        <div>-->
<!--          <label>项目类型：<span v-if="projectItem[0]">{{projectItem[0].budgetNum}}_{{projectItem[0].label}}</span></label>-->
<!--        </div>-->
<!--        <div>-->
<!--          <label @click="handleGetProject(31)">项目列表统计：<span class="click">已审批：{{headinfo.declared}}({{headinfo.declaredPer?headinfo.declaredPer:0}}%)</span></label>-->
<!--          <label @click="handleGetProject(20)" class="click">申报中：{{headinfo.declaring}}({{headinfo.declaringPer?headinfo.declaringPer:0}}%)</label>-->
<!--          <label @click="handleGetProject(10)" class="click">未申报：{{headinfo.declaration}}({{headinfo.declarationPer?headinfo.declarationPer:0}}%)</label>-->
<!--        </div>-->
<!--      </header>-->
<!--      <el-table-->
<!--        :data="tableData"-->
<!--        border-->
<!--        style="width: 100%">-->
<!--        <el-table-column-->
<!--          type="index"-->
<!--          label="序号"-->
<!--          align="center"-->
<!--          width="50px">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="itemName"-->
<!--          label="科目名称"-->
<!--          width="200px"-->
<!--          align="center">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="company"-->
<!--          label="计量单位"-->
<!--          align="center">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="budgetBalance"-->
<!--          label="本单位预算额"-->
<!--          width="120px"-->
<!--          align="center"-->
<!--        >-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="unitName"-->
<!--          label="预算单位"-->
<!--          width="120px"-->
<!--          align="center">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="budgetBalance"-->
<!--          label="科目总预算"-->
<!--          width="120px"-->
<!--          align="center">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="declared"-->
<!--          align="center"-->
<!--          label="已审批">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="declaring"-->
<!--          align="center"-->
<!--          label="申报中">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="surplus"-->
<!--          align="center"-->
<!--          label="剩余预算">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="address"-->
<!--          align="center"-->
<!--          label="备注">-->
<!--        </el-table-column>-->
<!--      </el-table>-->
    </div>
</template>

<script>
  export default {
    name: 'topTable'
  }
</script>

<style scoped>

</style>
