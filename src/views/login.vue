<template>
    <div class='login'>
        <div class="box">
            <h2 style="text-align: center;margin-bottom: 20px;">梦学谷会员管理系统</h2>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" type="password" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {loginApi} from "../request/api"
export default {
    data() {
        return {
            ruleForm: {
                username: 'admin',
                password: '123456',

            },
            rules: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],

                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },

                ],
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    loginApi(this.ruleForm).then(res=>{
                        console.log(res)
                        localStorage.setItem('token',res.data.data.token)
                        this.$message.success(res.data.message)
                        this.$router.push('/')
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
      
    }
}
</script>
<style lang='scss' scoped>
.login {
    width: 100%;
    height: 100vh;
    background-image: url(../assets/bgimg.jpg);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  overflow: hidden;
    .box{
        width: 500px;
        height: 300px;
        padding: 50px;
        box-sizing: border-box;
        background-color: rgba(214, 214, 220,.9);
        border-radius: 10px;
        margin:150px auto;
    }
}
</style>
