<!--
 * @Descripttion:
 * @version:
 * @Author: CYZ
 * @Date: 2020-07-20 18:22:09
 * @LastEditors: CYZ
 * @LastEditTime: 2020-08-14 18:19:45
-->
<template>
  <div class="dashboard-editor-container">
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="23">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>重点看点待办事宜</span>
            <el-button @click="opendialog" style="float: right; padding: 3px 0" type="text">更多</el-button>
          </div>
          <el-table :data="NoticetableData" v-loading='loading' style="width: 100%;font-size: 13px;" height="250">
            <el-table-column prop="content" label="待办内容" align="center">
              <!--  class-name="ellipsis2" -->
              <template style="color:#409EFF" slot-scope="scope">
                <router-link
                  style="color:#409EFF;"
                  :to="'/budget/info/'+scope.row.projectId"
                >{{scope.row.content}}</router-link>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="日期" align="center">
              <template slot-scope="scope">{{scope.row.createTime | dataFormat}}</template>
            </el-table-column>
            <el-table-column prop="userName" label="签报人" align="center"></el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  @click.stop="handleUpdate(scope.row)"
                >设为已读</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="11">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>通告提醒</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
          </div>
          <div class="noticelist">
            <div class="noticeitem" v-for="(item,index) in noticelists" :key="index">
              <div class="title">{{item.title}}</div>
              <div class="date">{{item.date}}</div>
            </div>
          </div>
        </el-card>
        
      </el-col>
      <el-col :span="11">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>文档下载专区</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="centerDialogVisible=true"
            >上传</el-button>
          </div>
          <el-table :data="FiletableData" v-loading='loading2' style="width: 100%;font-size: 13px;" height="250">
            <el-table-column prop="fileName" label="文件名称" align="center"></el-table-column>
              <!--  class-name="ellipsis2" -->
            <el-table-column prop="uploadTime" label="日期" align="center">
              <template slot-scope="scope">{{scope.row.uploadTime | dataFormat}}</template>
            </el-table-column>
            <el-table-column prop="name" label="操作" align="center">
              <template slot-scope="scope">
                <a :download="scope.row.fileName" style="color:#409EFF;" :href="scope.row.filePath">
                  <i class="el-icon-download"></i>下载
                </a>
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    
    <!-- 添加或修改角色配置对话框 -->
    <el-dialog title="待办事宜" :visible.sync="open" width="1200px">
      <el-form :model="queryParams" ref="queryForm" :inline="true">
        <el-form-item label="编码查询" prop="projectNum">
          <el-input
            v-model="queryParams.projectNum"
            placeholder="请输入编码"
            clearable
            size="small"
            style="width: 240px"
          />
        </el-form-item>
        <el-form-item label="金额介于" prop="firstNum">
          <el-input
            v-model="queryParams.firstNum"
            placeholder="请输入金额"
            clearable
            size="small"
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item label="和" prop="twoNum">
          <el-input
            v-model="queryParams.twoNum"
            placeholder="请输入金额"
            clearable
            size="small"
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="NoticeMoreData" style="width: 100%" v-loading='loading1'>
        <el-table-column prop="id" label="序号" align="center"></el-table-column>
        <el-table-column prop="content" label="待办内容" align="center">
          <template style="color:#409EFF" slot-scope="scope">
            <router-link
              style="color:#409EFF;"
              :to="'/budget/info/'+scope.row.projectId"
            >{{scope.row.content}}</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="流程发起时金额(万元)" width="200" align="center"></el-table-column>
        <el-table-column prop="flowType" label="流程类型" align="center"></el-table-column>
        <el-table-column prop="userName" label="发起人" align="center"></el-table-column>
        <el-table-column prop="unitName" label="发起单位" align="center"></el-table-column>
        <el-table-column prop="createTime" label="发起时间" align="center"></el-table-column>
        <el-table-column prop="stateLabel" label="流程状态" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注信息" align="center"></el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList1"
      />
    </el-dialog>
    <el-dialog title="上传文件" :visible.sync="centerDialogVisible" width="500px">
      <el-upload
        class="upload-demo"
        :headers="headers"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :on-success="handleSuccess"
        :on-progress="handleupload"
        :on-error="handleFail"
        multiple
        :limit="1"
        :on-exceed="handleExceed"
        :action="ActionUrl"
        :data="uploadData"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
      <!-- <div class="btn-box">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitUpload()">确 定</el-button>
      </div>-->
    </el-dialog>
  </div>
</template>

<script>
import Stomp from "stompjs";
import { getToken } from "@/utils/auth";
import {
  getNoticeList,
  updateNotice,
  getFileList,
  delFileList,
} from "@/api/workbench/workbench";
export default {
  name: "Index",
  components: {},
  computed:{},
  data() {
    return {
      centerDialogVisible:false,
      ActionUrl: process.env.VUE_APP_BASE_API + "/file/system", // 上传的图片服务器地址
      headers: {
        Authorization: getToken(),
      },
      fileList: [],
      uploadData: {},
      NoticetableData: [],
      // client: Stomp.client("ws://mq.yeexun.com.cn:15674/ws"),
      total: 1,
      open: false,
      loading1: false,
      loading2: false,
      loading: false,
      NoticeMoreData: [],
      FiletableData:[],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        projectNum: undefined,
        firstNum: undefined,
        twoNum: undefined,
      },
      tableData: [
        // {
        //   date: "2016-05-02",
        //   name: "朱丽丽",
        //   address: "移动财务系统用户指南PPT",
        // },
        // {
        //   date: "2016-05-04",
        //   name: "朱丽丽",
        //   address: "渠道发票小程序指南",
        // },
        // {
        //   date: "2016-05-01",
        //   name: "朱丽丽",
        //   address: "杭州移动财务系统流程图",
        // },
        // {
        //   date: "2016-05-03",
        //   name: "朱丽丽",
        //   address: "杭州移动财务系统流程图",
        // },
      ],
      noticelists: [
        // { title: "中国移动中国移动中国移动中国移动", date: "2020-12-12" },
        // { title: "中国移动中国移动中国移动中国移动", date: "2020-12-12" },
        // { title: "中国移动中国移动中国移动中国移动", date: "2020-12-12" },
      ],
    };
  },
  //定义私用局部过滤器。只能在当前 vue 对象中使用
  filters: {
    dataFormat(msg) {
      return msg.substring(0, 10);
    },
  },
  created() {
    this.getNoticeList();
    this.getFileList();
    // this.connect();
  },
  methods: {
    handleDelete(row) {
      const Filename = row.fileName;
      const FileId = row.id;
      this.$confirm(
        '是否确认删除文档名称为"' + Filename + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delFileList(FileId);
        })
        .then(() => {
          this.getFileList();
          this.msgSuccess("删除成功");
        })
        .catch(function () {});
    },
    handleupload() {
      const loading = this.$loading({
        lock: true,
        text: "正在上传文件",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      console.log("loading", loading);
      this.loadingoption = loading;
    },
    handleFail() {
      this.loadingoption.close();
      this.$message.error("上传失败");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    handleSuccess(res) {
      console.log("handleSuccess", res);
      this.fileList = [];
      this.loadingoption.close();
      this.centerDialogVisible = false;
      // this.getFileList()
      if (res.status == 90010) {
        this.$message.error(res.message);
      } else {
        this.$message({
          message: "上传成功",
          type: "success",
        });
        this.getFileList();
      }
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    opendialog() {
      this.open = true;
      this.getList1();
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      console.log("row", row);
      let that=this
      updateNotice(row.id).then((response) => {
        console.log("updateNotice", response);
        that.getNoticeList();
      });
    },
    // onConnected: function () {
    //   const dest = "/exchange/testDirectExchange/test";
    //   this.client.subscribe(dest, this.responseCallback, this.onFailed);
    // },
    // onFailed: function (frame) {
    //   console.log("MQ Failed: " + frame);
    // },
    // responseCallback: function (frame) {
    //   console.log("接收的消息为" + JSON.parse(frame.body));
    // },
    // connect: function () {
    //   const headers = {
    //     login: "root",
    //     passcode: "cw_2020",
    //   };
    //   this.client.connect(headers, this.onConnected, this.onFailed);
    // },
    /** 查询角色列表 */
    getList1() {
      this.loading1 = true;
      getNoticeList(this.queryParams).then((response) => {
        console.log("getNoticeList", getNoticeList);
        this.total= response.count;  //Math.ceil(response.count/this.queryParams.pageSize);
        this.NoticeMoreData = response.list;
        this.loading1 = false;
      });
    },
    getNoticeList() {
      this.loading = true;
      getNoticeList().then((response) => {
        console.log(response,222)
        // console.log("getNoticeList", response);
        // response=response.map(item=>{
        //   item.createTime=item.createTime.substring(0,10)
        // })
        this.NoticetableData = response.list;
        this.loading = false;
      });
    },
    getFileList() {
      this.loading2 = true;
      getFileList().then((response) => {
        this.FiletableData = response;
        this.loading2 = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList1();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin: 0;
}
.el-row {
  margin-top: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.noticelist {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .noticeitem {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px;
  }
}
/deep/ .ellipsis2 {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    
}
</style>
