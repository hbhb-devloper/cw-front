<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >添加</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="flowList">
      <el-table-column label="类型标识号" prop="id" width="100" align="center"/>
      <el-table-column label="审批意见"  prop="suggestion" align="center" />
      <el-table-column label="显示顺序" prop="orderNumber" :show-overflow-tooltip="true" align="center" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加或修改角色配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="审批意见" prop="roleName">
          <el-input v-model="form.suggestion" type="text"  placeholder="请输入流程角色名字" />
        </el-form-item>
        <el-form-item label="显示顺序">
          <el-input v-model="form.orderNumber" type="number" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getList,addData,upData,DeleteRecord,getInfo} from '@/api/flow/opinion'
  export default {
    data() {
      return {
        // 遮罩层
        loading: true,

        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 是否显示弹出层（数据权限）
        openDataScope: false,
        // table数据
        flowList:[],
        //弹窗表单
        form:{},
        //1新增2修改
        statics:1

      };
    },
    created() {
      this.handleLoad();
    },
    methods: {
      //页面初始化
      handleLoad(){
        getList().then(res=>{
          console.log(res);
          this.flowList=res;
          this.loading=false;
        })
      },
      //数据添加
      handleAdd(){
        this.statics=1;
        this.form={};
        this.open=true;
      },
      //表单修改
      handleEdit(row){
        getInfo(row.id).then(res=>{
          this.form=res;
          this.statics=2;
          this.open=true;
        })
      },
      //删除记录
      handleDelete(row){
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          DeleteRecord(row.id).then(res=>{
            this.$message.success('删除成功');
            this.handleLoad();
          });
        });

      },
      //关闭弹窗
      handleCancel(){
        this.open=false;
      },
      //信息提交
      handleSubmit(){
        if(!this.form.suggestion||!this.form.orderNumber){
          this.$message.warning('审批意见或显示顺序不能为空！');
          return;
        }
        if(this.statics==1){
          addData(this.form).then(res=>{
            this.$message.success('添加成功！');
            this.open=false;
            this.handleLoad();
          })
        }else if(this.statics==2){
          upData(this.form).then(res=>{
            this.$message.success('修改成功！');
            this.open=false;
            this.handleLoad();
          })
        }
      }
    },
  };
</script>
