<template>
  <div class="containers">
    <!--  流程详情    -->
    <section class="approval-box">
      <div class="node-box" v-for="item in approvalData">
        <div class="approval-people">
          <i class="el-icon-success"></i>
          <span>{{item.approvalName}}</span>
          <el-select placeholder="请选择" v-model="item.defaultName" disabled>
            <el-option v-for="items in item.selectName" :value="items.lable" :label="items.lable"></el-option>
          </el-select>
        </div>
        <div style="display: flex;flex-direction: row">
          <span style="width:60px;line-height: 38px;">意见</span>

          <el-input disabled v-model="item.opinion" placeholder="请输入审批意见"></el-input>
        </div>
        <div style="text-align: center;"><span>{{item.defaultName}}</span><span>({{item.time}})</span></div>
      </div>
    </section>
    <!--  记录详情    -->
    <section class="info-box">
      <div class="info-title"><label>客户资金基本信息</label></div>
      <div class="form-box">
        <el-form :inline="true" label-width="160px">
          <el-form-item label="编号" :required="true">
            <el-input v-model="info.fcCode" placeholder="请输入编号" disabled style="width: 200px"/>
          </el-form-item>
          <el-form-item label="部门" :required="true">
            <el-input v-model="info.dptId" placeholder="请输入部门" disabled style="width: 120px"/>
            <el-checkbox disabled v-model="info.directSelling">是否核销</el-checkbox>
          </el-form-item>
          <el-form-item label="金额(元)"  :required="true">
            <el-input v-model="info.amount" placeholder="请输入金额(元)" disabled style="width: 200px"/>
          </el-form-item>
          <el-form-item label="款项类型" :required="true">
            <el-select v-model="info.amountType" disabled style="width: 200px" placeholder="请选择">
              <el-option label="现金" value="1"></el-option>
              <el-option label="支票" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="办理业务" :required="true">
<!--            <el-input v-model="info.busType" disabled style="width: 200px"/>-->
            <el-select disabled
              v-model="info.busType"
              placeholder="请选择办理业务内容"
              clearable
              size="medium"
              style="width: 100%"
            >
              <el-option
                v-for="dict in typeList"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="集团信息" :required="true">
            <el-input v-model="info.groupName" disabled style="width: 200px"/>
          </el-form-item>
          <el-form-item label="资金流向" :required="true">
<!--            <el-input v-model="info.fundFlows" disabled style="width: 200px"/>-->
            <el-select v-model="info.fundFlows" disabled style="width: 200px" placeholder="请选择">
              <el-option label="使用" value="1"></el-option>
              <el-option label="收款" value="2"></el-option>
              <el-option label="退款" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="资金到账时间" :required="true">
            <el-input v-model="info.intoAccountDate" disabled style="width: 200px"/>
          </el-form-item>
          <el-form-item label="是否已开具发票" :required="true">
            <el-input v-model="info.hasInvoice" disabled style="width: 200px"/>
          </el-form-item>
          <el-form-item label="已开票金额(元)" :required="true">
            <el-input v-model="info.preInvoiceAmount" disabled style="width: 200px"/>
          </el-form-item>
          <el-form-item label="开票编号" :required="true">
            <el-tooltip content="审批通过后由收账员填写" placement="bottom" effect="light">
              <el-input v-model="info.invoiceCode" disabled style="width: 200px"/>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="开票金额(元)" :required="true">
            <el-tooltip content="审批通过后由收账员填写" placement="bottom" effect="light">
              <el-input v-model="info.invoiceAmount" disabled style="width: 200px"/>
            </el-tooltip>
          </el-form-item>

          <br>
          <el-form-item label="备注" :form-class="formClass" :content-class="contentClass">
            <el-input
              type="textarea"
              v-model="info.customerNote"
              placeholder="请输入备注信息"
              show-word-limit
              disabled
            >
            </el-input>
          </el-form-item>
          <el-form-item label="附件" :form-class="formClass" :content-class="contentClass">
            <el-table :data="Filetable">
              <el-table-column prop="fileName" align="center" label="标题"></el-table-column>
              <el-table-column prop="auther" align="center" label="作者"></el-table-column>
              <el-table-column prop="uploadTime" align="center" label="时间"></el-table-column>
              <el-table-column prop="fileSize" align="center" label="大小"></el-table-column>
<!--              <el-table-column align="center" label="删除"></el-table-column>-->
            </el-table>
          </el-form-item>
        </el-form>
      </div>
    </section>
    <!--  统计表    -->
    <section class="statistics-box">
      <el-table :data="tableData" v-loading="loading">
        <el-table-column align="center" type="index" label="序号"></el-table-column>
        <el-table-column prop="dptName" align="center" label="部门"></el-table-column>
        <el-table-column prop="groupName" width="180" align="center" label="集团信息"></el-table-column>
        <el-table-column prop="beginAmount" width="120" align="center" label="初期余额(元)"></el-table-column>
        <el-table-column prop="addAmount" width="120" align="center" label="本期增加(元)"></el-table-column>
        <el-table-column prop="verifyAmount" width="120" align="center" label="核销收款(元)"></el-table-column>
        <el-table-column prop="reduceAmount" width="120" align="center" label="本期减少(元)"></el-table-column>
        <el-table-column prop="collectionFrozen" width="140" align="center" label="本期收款冻结(元)"></el-table-column>
        <el-table-column prop="useFrozen" width="140" align="center" label="本期使用冻结(元)"></el-table-column>
        <el-table-column prop="refundFrozen" width="140" align="center" label="本期退款冻结(元)"></el-table-column>
        <el-table-column prop="refund" width="120" align="center" label="本期退款(元)"></el-table-column>
        <el-table-column prop="balance" width="120" align="center" label="本期余额(元)"></el-table-column>
        <el-table-column prop="totalInvoiceAmount" width="140" align="center" label="累积开票金额(元)"></el-table-column>
        <el-table-column prop="totalEnterAmount" width="140" align="center" label="累积入账金额(元)"></el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
  import ElFormItem from '@/components/customize/ElFormItem';
  import {getInfo,getStateDetail,getBusiness} from '@/api/fund/fundSelect/info'


  export default {
    components: {
      ElFormItem
    },
    data() {
      return {
        approvalData: [
          {
            approvalName: '客户经理',
            defaultName: '陈燕',
            selectName: [
              {id: 1, lable: '陈燕'},
              {id: 1, lable: '陈燕'},
            ],
            opinion: '同意',
            time: '2020-08-27 15:25:47'
          },
          {
            approvalName: '客户经理',
            defaultName: '陈燕',
            selectName: [
              {id: 1, lable: '陈燕'},
              {id: 1, lable: '陈燕'},
            ],
            opinion: '同意',
            time: '2020-08-27 15:25:47'
          },
          {
            approvalName: '客户经理',
            defaultName: '陈燕',
            selectName: [
              {id: 1, lable: '陈燕'},
              {id: 1, lable: '陈燕'},
            ],
            opinion: '同意',
            time: '2020-08-27 15:25:47'
          },
          {
            approvalName: '客户经理',
            defaultName: '陈燕',
            selectName: [
              {id: 1, lable: '陈燕'},
              {id: 1, lable: '陈燕'},
            ],
            opinion: '同意',
            time: '2020-08-27 15:25:47'
          },
          {
            approvalName: '客户经理',
            defaultName: '陈燕',
            selectName: [
              {id: 1, lable: '陈燕'},
              {id: 1, lable: '陈燕'},
            ],
            opinion: '同意',
            time: '2020-08-27 15:25:47'
          },
          {
            approvalName: '客户经理',
            defaultName: '陈燕',
            selectName: [
              {id: 1, lable: '陈燕'},
              {id: 1, lable: '陈燕'},
            ],
            opinion: '同意',
            time: '2020-08-27 15:25:47'
          }
        ],
        info:{},
        checked:true,
        formClass: 'column is-12 no-padding',
        contentClass: 'column is-9 no-padding',
        tableData:[],
        Filetable:[],
        loading:false,
        typeList:[],
      }
    },
    created() {
      this.handleGetStatistics(this.$route.params.id);
      this.getStateDetails(this.$route.params.id);
      this.handleGetBusiness();
    },
    methods: {
      handleGetStatistics(id){
        getInfo(parseInt(id)).then(res=>{
          this.info=res;
          this.Filetable=[];
          this.Filetable.push(res.sysFile);
        })
      },
      handleGetBusiness() {
        getBusiness().then(res => {
          this.typeList = res;
        })
      },
      getStateDetails(id){
        this.loading=true;
        this.tableData=[];
        getStateDetail(id).then(res=>{
          this.tableData.push(res);
          this.loading=false;
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .containers {
    width: 90%;
    margin: 20px auto 0 auto;
    display: flex;
    flex-direction: column;

    .approval-box {
      background: #fff;
      padding: 10px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .node-box {
        width: 30%;
        margin-right: 3%;

        .el-icon-success {
          color: #67c23a;
        }

        div {
          line-height: 45px;
        }
      }
    }

    .info-box,.statistics-box {
      width: 100%;
      padding: 2%;
      margin-top: 30px;
      background: #fff;
      .form-box{
        margin-top: 15px;
      }
    }
    .statistics-box{
      margin-bottom: 30px;
    }
  }

  @media screen and (max-width: 700px) {
    .approval-box {
      display: flex;
      flex-direction: column;
      .node-box {
        width: 100%;
      }
    }
  }
</style>
