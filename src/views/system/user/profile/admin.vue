<!--
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-07-20 18:22:09
 * @LastEditors: CYZ
 * @LastEditTime: 2020-08-06 18:07:40
-->
<template>
  <div class="containers">
    <el-col>
      <div class="info">
        <div class="title-box">
          <div class="title-solid"></div>
          <div class="title1">管理员信息</div>
        </div>
        <el-form  label-width="100px" width="500px" :model="maintain">
          <el-form-item label="管理员姓名：">
            <el-input v-model="maintain.administrator" :disabled="Isdisable"></el-input>
          </el-form-item>
          <el-form-item label="联系方式：">
            <el-input v-model="maintain.phone" :disabled="Isdisable"></el-input>
          </el-form-item>
          <el-form-item label="管理员邮箱：">
            <el-input v-model="maintain.email" :disabled="Isdisable"></el-input>
          </el-form-item>
        </el-form>
        
        <div class="title-box" style="margin-top: 30px">
          <div class="title-solid"></div>
          <div class="title1">系统开发信息</div>
        </div>
        <el-form  label-width="100px" width="500px" :model="maintain">
          <el-form-item label="软件名称：">
            <el-input v-model="maintain.softwareName" :disabled="Isdisable"></el-input>
          </el-form-item>
          <el-form-item label="软件版本：">
            <el-input v-model="maintain.version" :disabled="Isdisable"></el-input>
          </el-form-item>
          <el-form-item label="开发语言：">
            <el-input v-model="maintain.devLanguage" :disabled="Isdisable"></el-input>
          </el-form-item>
        </el-form>
        
        <div class="button">
          <el-button type="danger" size="mini" @click="Isdisable =!Isdisable">编辑</el-button>
          <el-button type="primary" size="mini" :disabled="Isdisable" @click="submit">保存</el-button>
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>
import { getMaintain , PutMaintain } from "@/api/system/user";
export default {
  name: "admin",
  data() {
    return {
      maintain: {},
      Isdisable:true
    };
  },
  created() {
    this.showinfo();
  },
  methods: {
    showinfo() {
      getMaintain().then((res) => {
        console.log("getMaintain", res);
        this.maintain = res;
      });
    },
    submit(){
      PutMaintain(this.maintain).then((res) => {
        console.log("PutMaintain", res);
        this.Isdisable=true
        this.$message.success("修改信息成功");
        this.getMaintain()
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.el-form{
  width: 50%;
  margin-top: 20px;
}
.containers {
  width: 95%;
  margin: 30px auto 0 auto;

  .info {
    margin-top: 30px;
    padding: 50px 0 70px 50px;
    background: #fff;
    .title-box {
      display: flex;
      flex-direction: row;

      .title-solid {
        width: 6px;
        height: 22px;
        background: #409eff;
        border-radius: 12px;
      }

      .title1 {
        font-size: 20px;
        font-weight: bold;
        margin-left: 15px;
      }
    }
    .info-data {
      margin: 15px 0 0 2%;
      div {
        line-height: 40px;
        label:nth-child(1) {
          display: inline-block;
          width: 150px;
        }
      }
    }
  }
}
</style>
