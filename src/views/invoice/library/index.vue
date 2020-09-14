<template>
  <div class="containers">
    <section class="notice-box">
      <span>提示：</span><span>2020年8月13数据已更新</span>
    </section>
    <section class="import-box">
      <span class="title-blue">增值税发票信息导入模板</span><br/>
      <div class="title-red">注意：导入单位模块后，请认真查看返回信息，若没有提示导入成功，则需要重新编辑模板导入。</div>
      <div class="title-import">新增导入</div>
      <div class="import">
        <el-upload
          class="upload-demo"
          :show-file-list="false"
          multiple
          :accept="'.xls,.xlsx'"
          action="#"
          :http-request="UploadFile"
          :file-list="fileList"
        >
          <el-button size="small" type="primary" class="uploadImgBtn">导入</el-button>
        </el-upload>
      </div>
      <el-table :data="tableData" style="width: 100%;margin-top:15px;">
        <el-table-column prop="date" label="数据导入检查结果"></el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fileList: [],
        tableData:[]
      }
    },
    methods: {
      UploadFile(){}
    }
  }
</script>

<style lang="scss" scoped>
  .containers {
    width: 95%;
    margin: 15px auto;

    .notice-box {
      width: 100%;
      height: 45px;
      line-height: 45px;
      padding-left: 20px;
      color: red;
      background: #fff;
      border: 1px solid #0d8efd;
      border-radius: 15px;
    }

    .import-box {
      width: 100%;
      margin-top: 30px;
      padding: 20px;
      background: #fff;
      border: 1px solid #0d8efd;
      border-radius: 15px;

      .title-blue {
        color: #0d8efd;
      }

      .title-red {
        color: red;
        margin: 15px 0 15px 15px;
      }

      .title-import {
        border-left: #333333 6px solid;
        padding-left: 15px;
      }
      .import{
        margin: 15px 0 15px 15px;
      }
    }
  }
</style>
