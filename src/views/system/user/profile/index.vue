<!--
 * @Descripttion:
 * @version:
 * @Author: CYZ
 * @Date: 2020-07-20 18:22:09
 * @LastEditors: CYZ
 * @LastEditTime: 2020-12-02 13:59:18
-->
<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>个人中心</span>
      </div>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="基本资料" name="userinfo">
          <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-row>
              <el-col :span="7">
                <el-form-item v-if="form.userId == undefined" label="登录账号" prop="userName">
                  <el-input v-model="form.userName" placeholder="请输入登录账号" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="用户姓名" prop="nickName">
                  <el-input v-model="form.nickName" placeholder="请输入用户姓名" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="归属单位" prop="unitId">
                  <treeselect v-model="form.unitId" :options="deptOptions" placeholder="请选择归属部门" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="默认数据单位" prop="defaultUnitId">
                  <treeselect
                    v-model="form.defaultUnitId"
                    :options="deptOptions"
                    :disable-branch-nodes="true"
                    :show-count="true"
                    placeholder="请选择数据部门"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="手机号码" prop="phone">
                  <el-input v-model="form.phone" placeholder="请输入手机号码" maxlength="11" :disabled="Isdisable"/>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" :disabled="Isdisable"/>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="工号" prop="jobNum">
                  <el-input v-model="form.jobNum" placeholder="请输入工号" :disabled="Isdisable"/>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="职务" prop="jobName">
                  <el-input v-model="form.jobName" placeholder="请输入职务" :disabled="Isdisable"/>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注">
                  <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" :disabled="Isdisable"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <div style="padding-left:50px">
                <el-button type="danger" size="mini" @click="Isdisable =!Isdisable">编辑</el-button>
                <el-button type="primary" size="mini" :disabled="Isdisable" @click="submit">保存</el-button>
              </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="resetPwd">
          <resetPwd :user="user" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import userAvatar from "./userAvatar";
import userInfo from "./userInfo";
import resetPwd from "./resetPwd";
import { getUserProfile , updateUserProfile} from "@/api/system/user";
import { listUnit } from "@/api/system/unit";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "Profile",
  components: { userAvatar, userInfo, resetPwd, Treeselect },
  data() {
    return {
      form: {},
      user: {},
      activeTab: "userinfo",
      // 部门树选项
      deptOptions: undefined,
      Isdisable:true,
      // 表单校验
      rules: {
        userName: [
          { required: true, message: "登录账号不能为空", trigger: "blur" }
        ],
        nickName: [
          { required: true, message: "用户姓名不能为空", trigger: "blur" }
        ],
        unitId: [
          { required: true, message: "归属单位不能为空", trigger: "blur" }
        ],
        defaultUnitId: [
          { required: true, message: "默认数据单位不能为空", trigger: "blur" }
        ],
        // pwd: [{ required: true, message: "用户密码不能为空", trigger: "blur" }],
        // CheckPassword: [
        //   { required: true, validator: validatePass2, trigger: "blur" }
        // ],
        jobNum: [{ required: true, message: "工号不能为空", trigger: "blur" }],
        email: [
          { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getUser();
    this.getTreeselect();
  },
  methods: {
    /** 查询部门下拉树结构 */
    getTreeselect() {
      listUnit().then((response) => {
        this.deptOptions = response;
      });
    },
    getUser() {
      getUserProfile().then((response) => {
        this.form = response;
      });
    },
    submit(){
      updateUserProfile(this.form).then((res) => {
        this.Isdisable=true
        this.$message.success("修改信息成功");
        this.getUser()
      });
    }
  },
};
</script>
<style scoped>
.el-col-7{
  height: 60px ;
}
</style>
