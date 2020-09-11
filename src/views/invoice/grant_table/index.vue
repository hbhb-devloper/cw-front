<template>
  <div class="app-container">
    <section class="import-box">
      <ul>
        <li class="import-title">酬金发放表模板下载</li>
        <li>
          <el-upload
            class="upload-demo"
            :show-file-list="false"
            multiple
            action="#"
            :http-request="imageUpload1"
          >
            <el-button type="primary" round>酬金发放表导入</el-button>
          </el-upload>
        </li>
      </ul>
      <ul>
        <li class="import-title">综合补贴模板下载</li>
        <li>
          <el-upload
            class="upload-demo"
            :show-file-list="false"
            multiple
            action="#"
            :http-request="imageUpload2"
          >
            <el-button type="primary" round>综合补贴导入</el-button>
          </el-upload>
        </li>
      </ul>
      <ul>
        <li class="import-title">往来账模板下载</li>
        <li>
          <el-upload
            class="upload-demo"
            :show-file-list="false"
            multiple
            action="#"
            :http-request="imageUpload3"
          >
            <el-button type="primary" round>往来账导入</el-button>
          </el-upload>
        </li>
      </ul>
    </section>
    <section class="search-table">
      <div class="search-box">
        <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
          <el-form-item label="报账流水" prop="noticeTitle">
            <el-input
              v-model="queryParams.noticeTitle"
              placeholder="请输入报账流水"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="税率" prop="noticeType">
            <el-select v-model="queryParams.noticeType" placeholder="请选择税率" clearable size="small">
              <el-option
                v-for="dict in typeOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">查询</el-button>
            <el-button icon="" size="mini" @click="resetQuery">删除</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table v-loading="loading" :data="tableData">
        <el-table-column label="报账流水" prop="arrearageMonth" align="center"/>
        <el-table-column label="酬金月份" prop="arrearageMonth" align="center"/>
        <el-table-column label="渠道编号" prop="arrearageMonth" align="center"/>
        <el-table-column label="渠道名称" prop="arrearageMonth" align="center"/>
        <el-table-column label="营业执照对公账号名称" prop="arrearageMonth" align="center"/>
        <el-table-column label="开户支行" prop="arrearageMonth" align="center"/>
        <el-table-column label="银行账号" prop="arrearageMonth" align="center"/>
        <el-table-column label="酬金金额(元)" prop="arrearageMonth" align="center"/>
        <el-table-column label="应付金额(元)" prop="arrearageMonth" align="center"/>
        <el-table-column label="本次支付(元)" prop="arrearageMonth" align="center"/>
        <el-table-column label="本次实付(元)" prop="arrearageMonth" align="center"/>
        <el-table-column label="代缴税费(元)" prop="arrearageMonth" align="center"/>
        <el-table-column label="发票编号(元)" prop="arrearageMonth" align="center"/>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </section>
  </div>
</template>

<script>
    import axios from "axios";
    import {getToken} from '@/utils/auth'

    export default {
      data(){
        return {
          typeOptions:[],
          queryParams:{},
          total:undefined,
          loading:false,
          ActionUrl: process.env.VUE_APP_BASE_API
        }
      },
      methods:{
        getList(){},
        imageUpload1(param){
          const _file = param.file;
          let params = new FormData();
          params.append('files', _file);
          axios({
            url: this.ActionUrl,
            method: 'post',
            data: params,
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': getToken()
            }
          }).then(res => {
            this.$message.success('附件上传成功！');
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
  .import-box{
    width: 100%;
    border-radius: 15px;
    background: #fff;
    color:#0d8efd;
    padding:20px;
    display: flex;
    flex-direction: row;
    border:1px solid #0d8efd;
    ul{
      width: 15%;
      text-align: center;
      margin:0 20px;
      li{
        line-height: 45px;
      }
      /*li:nth-last-child(1){*/
      /*  border:1.5px solid #00afff;*/
      /*  border-radius: 30px;*/
      /*}*/
    }
  }
  .search-table{
    width: 100%;
    border-radius: 15px;
    background: #fff;
    border:1px solid #0d8efd;
    padding:20px;
  }
</style>
