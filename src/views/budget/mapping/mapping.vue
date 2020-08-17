<template>
  <div class="container">
    <!--    <el-col :span="20" :xs="24">-->
    <!--      <el-form ref="queryForm" :inline="true" label-width="50px">-->
    <!--        <el-form-item label="搜索">-->
    <!--          <el-input-->
    <!--            placeholder="请输入关键词"-->
    <!--            clearable-->
    <!--            name="invoiceCode"-->
    <!--            size="small"-->
    <!--            style="width: 240px"-->
    <!--          />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item>-->
    <!--          <el-button type="primary" size="mini" @click="handleSelect">查询</el-button>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="时间">-->
    <!--          <el-date-picker-->
    <!--            type="date"-->
    <!--            range-separator="-"-->
    <!--            start-placeholder="开始日期"-->
    <!--            end-placeholder="结束日期">-->
    <!--          </el-date-picker>-->
    <!--        </el-form-item>-->

    <!--      </el-form>-->
    <!--      <div>-->
    <!--        <el-button type="primary" size="mini" @click="handleSelect">新增</el-button>-->
    <!--        <el-button type="primary" size="mini" @click="handleSelect">修改</el-button>-->
    <!--        <el-button type="primary" size="mini" @click="handleSelect">删除</el-button>-->
    <!--        <el-button type="primary" size="mini" @click="handleSelect">导入</el-button>-->
    <!--        <el-button type="primary" size="mini" @click="handleSelect">导出</el-button>-->
    <!--      </div>-->
    <!--    </el-col>-->
    <el-col>
      <div class="table-btn-box">
        <el-button type="primary" size="mini" @click="centerDialogVisible=true">导入</el-button>
        <el-table
          v-loading="loading"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%;margin-top:20px;text-align: center">

          <el-table-column
            prop="underUnitId"
            label="归口部门"
            align="center">
          </el-table-column>
          <el-table-column
            prop="budgetItem"
            label="预算科目"
            align="center">
          </el-table-column>
          <el-table-column
            prop="oldName"
            label="旧项目名称（2018版）"
            width="160px"
            align="center">
          </el-table-column>
          <el-table-column
            prop="newName"
            label="新项目名称（2020版）"
            width="160px"
            align="center">
          </el-table-column>
          <el-table-column
            prop="budgetNum"
            label="预算编号"
            align="center">
          </el-table-column>
<!--          <el-table-column-->
<!--            prop="balance"-->
<!--            label="预算金额"-->
<!--            align="center">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="isBreak"-->
<!--            label="是否分解"-->
<!--            align="center">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="shicahng"-->
<!--            align="center"-->
<!--            label="市场"-->
<!--            width="170">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="wangluo"-->
<!--            label="网络"-->
<!--            align="center"-->
<!--            width="260">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="zonghe"-->
<!--            label="综合"-->
<!--            align="center"-->
<!--            width="100">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="anbao"-->
<!--            align="center"-->
<!--            label="安保">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="caigou"-->
<!--            align="center"-->
<!--            label="采购">-->
<!--          </el-table-column>-->

<!--          <el-table-column-->
<!--            prop="renli"-->
<!--            align="center"-->
<!--            label="人力">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="caiwu"-->
<!--            align="center"-->
<!--            label="财务">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="dangqun"-->
<!--            align="center"-->
<!--            label="党群">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="gongcheng"-->
<!--            align="center"-->
<!--            label="工程">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="zhengqi"-->
<!--            align="center"-->
<!--            label="政企">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="jijian"-->
<!--            align="center"-->
<!--            label="纪检">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="yahunhui"-->
<!--            align="center"-->
<!--            label="亚运会">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="wulin"-->
<!--            align="center"-->
<!--            label="武林">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="xihu"-->
<!--            align="center"-->
<!--            label="西湖">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="jianggan"-->
<!--            align="center"-->
<!--            label="江干">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="gongshu"-->
<!--            align="center"-->
<!--            label="拱墅">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="qiantang"-->
<!--            align="center"-->
<!--            label="钱塘">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="binjiang"-->
<!--            align="center"-->
<!--            label="滨江">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="xiaoshan"-->
<!--            align="center"-->
<!--            label="萧山">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="yuhang"-->
<!--            align="center"-->
<!--            label="余杭">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="fuyang"-->
<!--            align="center"-->
<!--            label="富阳">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="linan"-->
<!--            align="center"-->
<!--            label="临安">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="tonglu"-->
<!--            align="center"-->
<!--            label="桐庐">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="jiande"-->
<!--            align="center"-->
<!--            label="建德">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="chunan"-->
<!--            align="center"-->
<!--            label="chunan">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="publicItem"-->
<!--            align="center"-->
<!--            label="公共项">-->
<!--          </el-table-column>-->
        </el-table>
      </div>
    </el-col>
    <el-col>
      <el-dialog :visible.sync="centerDialogVisible" width="500px">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="doUpload"
          :limit="1"
          :file-list="fileList"
          :before-upload="beforeUpload"
        >
          <el-button slot="trigger" type="primary" plain>选取文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传xlsx/xls文件</div>
        </el-upload>
        <div class="btn-box">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary"
                     @click="submitUpload()">确 定
          </el-button>
        </div>
      </el-dialog>
    </el-col>
  </div>
</template>

<script>
  import { getTable, uploadEmployee } from '@/api/budget/mapping'

  export default {
    name: 'mapping',
    data() {
      return {
        tableData: [],
        centerDialogVisible: false,
        fileList: [],
        fileName: '',
        files: null,
        loading:true,//表格加载
      }
    },
    created() {
      this.handleLoad()
    },
    methods: {
      handleLoad() {
        this.loading=true;//表格加载
        getTable().then(res => {
          this.tableData = res;
          this.loading=false;
        })
      },
      handleImport() {
        this.centerDialogVisible = true
      },

      beforeUpload(file) {
        this.files = file
        const extension = file.name.split('.')[1] === 'xls'
        const extension2 = file.name.split('.')[1] === 'xlsx'
        // const isLt2M = file.size / 1024 / 1024 < 2
        if (!extension && !extension2) {
          this.$message.warning('上传文件只能是 xls、xlsx格式!')
          return
        }
        // if (!isLt2M) {
        //   this.$message.warning('上传文件大小不能超过 2MB!')
        //   return
        // }
        this.fileName = file.name
        return false
      },
      // 确认上传
      submitUpload() {
        if (this.fileName == '') {
          this.$message({
            message: '请选择要上传的文件！',
            type: 'warning',
            showClose: true
          })
          return false
        }

        let fileFormData = new FormData()
        fileFormData.append('file', this.files, this.fileName)  // 上传的文件
        uploadEmployee(fileFormData).then(res => { // 上传请求
          this.fileName = ''
          this.files = ''
          this.$message.success('上传成功！')
          this.centerDialogVisible =false;
          this.handleLoad();
        }).catch(err => {
          this.fileName = '';
        })
      },
      handleClose() {
        this.fileName =this.files= '';
        this.centerDialogVisible =false;
      }

    }
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 90%;
    margin: 30px auto 0 auto;
    .table-btn-box{
      padding:30px 20px;
      background: #fff;
    }
    .btn-box{
      text-align: right;
      padding:20px 0;
    }
  }

</style>
