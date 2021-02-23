<template>
<div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
        <!-- 杭州移动 -->
        <h3 class="title">重设您的密码</h3>
        <el-form-item prop="email">
            <el-input v-model="loginForm.email" type="text" auto-complete="off" placeholder="请输入您登陆的邮箱">
                <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
            </el-input>
        </el-form-item>
        <el-form-item prop="newPwd">
            <el-input v-model="loginForm.newPwd" type="password" auto-complete="off" placeholder="密码">
                <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
            </el-input>
        </el-form-item>
        <el-form-item prop="checkPwd">
            <el-input v-model="loginForm.checkPwd" type="password" auto-complete="off" placeholder="确认密码">
                <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
            </el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
            <el-button :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="handleEdit">
                <span v-if="!loading">更改密码</span>
                <span v-else>更 改 中...</span>
            </el-button>
        </el-form-item>
    </el-form>
    <!--  底部  -->
    <!-- <div class="el-login-footer">
      <span>Copyright © 2018-2019 ruoyi.vip All Rights Reserved.</span>
    </div> -->
</div>
</template>

<script>
import {
    pwdEdit
} from '@/api/login'
export default {
    name: 'Login',
    data() {
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.loginForm.newPwd) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            loginForm: {},
            loginRules: {
                email: [{
                        required: true,
                        message: "邮箱地址不能为空",
                        trigger: "blur"
                    },
                    {
                        type: "email",
                        message: "'请输入正确的邮箱地址",
                        trigger: ["blur", "change"],
                    },
                ],
                newPwd: [{
                    required: true,
                    message: "用户密码不能为空",
                    trigger: "blur"
                }],
                checkPwd: [{
                    required: true,
                    validator: validatePass2,
                    trigger: "blur"
                }, ],
            },
            loading: false,
        }
    },
    created() {
        this.loginForm.key = encodeURIComponent(this.$route.query.key)
    },
    methods: {
        handleEdit() {
            this.$refs["loginForm"].validate((valid) => {
                if (valid) {
                    pwdEdit(this.loginForm).then(res => {
                        console.log('pwdEdit', res);

                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url("../assets/image/login-background.jpg");
    background-size: cover;
}

.title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #707070;
    font-size: 23px;
}

.login-form {
    border-radius: 6px;
    background: #ffffff;
    width: 400px;
    padding: 25px 25px 5px 25px;

    .el-input {
        height: 38px;

        input {
            height: 38px;
        }
    }

    .input-icon {
        height: 39px;
        width: 14px;
        margin-left: 2px;
    }
}

.login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
}

.login-code {
    width: 33%;
    height: 38px;
    float: right;

    img {
        cursor: pointer;
        vertical-align: middle;
    }
}

.el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
}

.login-code-img {
    height: 40px;
}
</style>
