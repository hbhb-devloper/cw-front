<template>
  <div class="containers">
    <div class="page1">
      <el-col :span="20" :xs="24">
        <el-form ref="queryForm" :inline="true">
          <el-col :span="24">
            <!--            <el-col :span="5">-->
            <!--              <div style="display: flex;flex-direction: row;">-->
            <!--                <div style="width:50px;line-height: 35px">单位</div>-->
            <!--                <treeselect v-model="companyId" :options="companyArr" style="width: 80%" placeholder="请选择归属部门"/>-->
            <!--              </div>-->
            <!--            </el-col>-->
            <el-form-item label="项目年份" style="margin-left: 15px;">
              <el-date-picker
                v-model="year"
                type="year"
                @change="handleYear"
                style="width: 180px"
                placeholder="选择年">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
      <el-col>
        <div class="main">
          <div class="tree-box">
            <div style="display: flex;flex-direction: row;width: 80%;margin:0 auto;">
              <span style="display: inline-block;width: 30%;line-height: 40px;font-size:12px">搜索：</span>
              <el-input
                placeholder="请输入科目名称"
                @input="handleYear"
                v-model="text">
              </el-input>
            </div>

            <el-tree
              class="trees"
              :data="treeArr"
              :props="defaultProps"
              :expand-on-click-node="false"
              :highlight-current="true"
              :filter-node-method="filterNode"
              ref="tree"
              default-expand-all
              @node-click="handleNodeClick"
            />
          </div>
          <div class="checkbox-box">
            <div style="display: flex;flex-direction: row;margin:0 0 15px 0;width: 75%;">
              <div style="width:70px;line-height: 35px">归口单位</div>
              <treeselect v-model="companyId" :options="companyArr" style="width:45%" placeholder="请选择归口单位"/>
              <div style="margin-left:1%;line-height: 35px">该单位归口于：<span v-if="checkboxArr[0]">{{checkboxArr[0].underUnitName}}</span></div>
            </div>
            <el-form>
              <el-checkbox-group v-model="checkList" class="checkbox-big-box">
                <el-form-item class="check_input" v-for="(item,index) in checkboxArr" :key="index">
                  <label class="checkbox_name">
                    <el-checkbox :label="item.label" :disabled="item.flag==undefined"></el-checkbox>
                  </label><label>
                  <el-input v-model="item.input" :disabled="item.flag==undefined" type="number" min="0"
                            class="checkbox-input" placeholder="请输入预算金额（万元）"></el-input>
                </label>
                </el-form-item>
                <div style="clear: both;"></div>

              </el-checkbox-group>

            </el-form>
            <div>
              <el-button type="primary" @click="handleSubmit">提交</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </div>
  </div>
</template>

<script>
  import { getCompany, getTree, getProejctType, getCheckBox, SubmitData } from '@/api/budget/protypement/protypement.js'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import { dateTimes } from '../../../utils/date'

  export default {
    name: 'index',
    data() {
      return {
        year: '',
        options: [],
        types: null,
        company: '',
        companyId: null,
        companyArr: [],
        treeArr: [],
        defaultProps: {
          children: 'children',
          label: 'label',
          id: 'id'
        },
        checkList: [],
        checkboxArr: [],
        compay: null,//单位id
        treeid: null,//树形id
        text: '',
        arr: []
      }
    },
    components: {
      Treeselect
    },
    created() {
      this.handleLoad()
    },
    mounted() {
    },
    watch: {
      companyId: function(newVal, ss) {
        this.compay = parseInt(newVal)
        if (!newVal || !this.treeid.id) {
          return
        }
        this.checkboxArr.map(items => {
          items.flag=1;
          items.input=items.underUnitName =items.input = undefined;
        });
        this.checkList = [];
        getProejctType({ budgetId: this.treeid.id, deptId: parseInt(newVal) }).then(res => {

          console.log(res);
          this.checkboxArr.map(items => {
            items.input = undefined;
            res.map(item => {
              items.flag = item.flag;
              items.underUnitName = item.underUnitName;
              if (items.id == item.unitId) {
                items.input = item.balance;
                this.checkList.push(items.label);
              }
            })
          })
          this.checkList = [...new Set(this.checkList)];
        })
      },
      filterText(val) {
        this.$refs.tree.filter(val)
      },

    },
    methods: {
      // 筛选节点
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      handleLoad() {
        getCompany().then(res => {
          this.companyArr = res
        })
        getCheckBox().then(res => {
          this.checkboxArr = []
          for (let item of res) {
            item.flag=1;
            if (item.id) {
              this.checkboxArr.push(item)
            }
          }
        })
      },
      /** 转换菜单数据结构 */
      normalizer(node) {
        if (node.children && !node.children.length) {
          delete node.children
        }
        return {
          id: node.id,
          label: node.label,
          children: node.children
        }
      },
      //
      handleYear() {
        this.year = dateTimes(this.year).substr(0, 4)
        let data = { projectItem: this.text, importDate: this.year }
        getTree(data).then(res => {
          this.treeArr = res
          this.arr = res
        })
      },
      handleNodeClick(e) {
        this.checkboxArr.map(items => {
          items.flag=1;
          items.input = items.underUnitName =items.input = undefined;
        });
        this.checkList = [];
        this.treeid = e;
        if (!e.id || !this.companyId) {
          return
        } else {
          if (!e.isParent) {
            getProejctType({ budgetId: e.id, deptId: this.companyId }).then(res => {
              console.log(res);
              this.checkboxArr.map(items => {
                items.input = undefined;
                res.map(item => {
                  items.flag = item.flag;
                  items.underUnitName = item.underUnitName;
                  if (items.id == item.unitId) {
                    items.input = item.balance;
                    this.checkList.push(items.label);
                  }
                })
              })
              this.checkList = [...new Set(this.checkList)];
            })
          }
        }
      },
      handleSubmit() {
        this.$confirm('确定提交修改', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = []
          if (!this.companyId) {
            this.$message.warning('请选择归口单位！')
            return
          }
          this.checkboxArr.map(items => {
            this.checkList.map(item => {
              if (items.label == item) {
                data.push({ balance: items.input, budgetId: this.treeid.id, unitId: items.id, deptId: this.companyId })
              }

            })
          })
          let lengs = data.filter(item => {
            return item.balance == undefined
          }).length
          if (lengs != 0) {
            this.$message.warning('请输入金额！')
            return
          }
          if(data.length==0){
            data[0]={deptId: this.companyId,budgetId: this.treeid.id}
          }
          SubmitData(data).then(res => {
            this.$message.success('提交成功！')
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .containers {
    width: 95%;
    margin: 30px auto 0 auto;

    .main {
      display: flex;
      flex-direction: row;
      height: calc(100vh - 100px);

      .tree-box {
        width: 23%;
        background: #fff;
        padding-top: 20px;
        height: 100%;
        .trees{
          height:100%;
          overflow: auto;
        }
      }

      .checkbox-box {
        width: 80%;
        margin-left:2%;
        background: #fff;
        border-radius: 8px;
        box-sizing: border-box;
        padding: 30px;
        height: 100%;
        overflow: auto;
        .checkbox-big-box{
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          .checkbox_name {
            width: 80px;
          }

          .check_input {
            width: 40%;
            text-align: center;

            label {
              float: left;
            }

            label:nth-child(1) {
              margin-right: 15px;
            }

            .checkbox-input {
              width: 200px;
            }
          }
        }



      }
    }

  }

  @media screen and (max-width: 700px){
    .main {
      display: flex;
      flex-direction: column;
      .checkbox-box{
        width:100%;
        margin-left:0;
        .checkbox-big-box{
          display: flex;
          flex-direction: column;
        }

      }
      .tree-box {
        width: 100%;
      }
    }
  }
</style>
