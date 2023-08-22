<template>
    <div class='member'>
        <div class="searchbox">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="formInline.cardNum" placeholder="会员卡号" size="mini"></el-input>
                </el-form-item> <el-form-item>
                    <el-input v-model="formInline.name" placeholder="会员名字" size="mini"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-date-picker v-model="formInline.birthday" type="date" size="mini" placeholder="出生日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="formInline.payType" placeholder="支付类型" size="mini">
                        <el-option label="现金" :value="1"></el-option>
                        <el-option label="微信" :value="2"></el-option>
                        <el-option label="支付宝" :value="3"></el-option>
                        <el-option label="银行卡" :value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchHandle">查询</el-button>
                    <el-button type="primary" @click="addHandle">新增</el-button>
                    <el-button @click="onSubmit">重置</el-button>
                </el-form-item>
            </el-form>

        </div>
        <div class="tabbox">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index" label="序号" width="50">
                </el-table-column>
                <el-table-column prop="cardNum" label="会员卡号">
                </el-table-column>
                <el-table-column prop="name" label="会员姓名">
                </el-table-column>
                <el-table-column prop="birthday" label="会员生日">
                </el-table-column>
                <el-table-column prop="phone" label="手机号码">
                </el-table-column>
                <el-table-column prop="integral" label="可用积分">
                </el-table-column>
                <el-table-column prop="money" label="开卡金额">
                </el-table-column>
                <el-table-column prop="payType" label="支付类型">
                    <template slot-scope="scope">
                        {{ ['现金', "微信", "支付宝", "银行卡"][scope.row.payType] }}

                    </template>
                </el-table-column>
                <el-table-column prop="address" label="会员地址">
                </el-table-column>
                <el-table-column label="操作" width="160">
                    <template slot-scope="scope">
                        <el-button size="small" @click="editHandle(scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="delHandle(scope.row.id)">删除</el-button>

                    </template>
                </el-table-column>

            </el-table>
        </div>
        <div class="pagebox">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
                :page-sizes="[10, 20, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>

        <!-- 弹框 -->
        <el-dialog :title="ruleForm.id ? '会员编辑' : '新增会员'" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="会员卡号" prop="cardNum">
                    <el-input v-model="ruleForm.cardNum" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="会员姓名" prop="name">
                    <el-input v-model="ruleForm.name" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="会员生日" prop="birthday">
                    <el-date-picker v-model="ruleForm.birthday" type="date" size="mini" >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="ruleForm.phone" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="开卡金额" prop="money">
                    <el-input v-model.number="ruleForm.money" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="可用积分" prop="integral">
                    <el-input v-model.number="ruleForm.integral" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="支付类型" prop="payType">
                    <el-select v-model="ruleForm.payType" placeholder="支付类型" size="mini">
                        <el-option label="现金" :value="1"></el-option>
                        <el-option label="微信" :value="2"></el-option>
                        <el-option label="支付宝" :value="3"></el-option>
                        <el-option label="银行卡" :value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="会员地址" prop="address">
                    <el-input type="textarea" v-model="ruleForm.address" size="mini"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>
    </div>
</template>

<script>
import { memberApi, addmemberApi, memberinfoApi, editmemberinfoApi, delmemberinfoApi } from "@/request/api"
export default {
    data() {
        return {
            formInline: {
                birthday: '',
                cardNum: "",
                name: "",
                payType: ''
            },
            tableData: [],
            total: 0,
            pageSize: 10,
            pageNum: 1,
            dialogFormVisible: false,
            ruleForm: {

            },
            rules: {
                cardNum: [
                    { required: true, message: '请输入会员卡号', trigger: 'blur' },
                ], name: [
                    { required: true, message: '请输入会员姓名', trigger: 'blur' },
                ], payType: [
                    { required: true, message: '请输入支付类型', trigger: 'chenge' },
                ],
            }

        }
    },
    created() {
        this.getlist()
    },
    methods: {
        //获取数据
        getlist() {
            memberApi(this.pageNum, this.pageSize, this.formInline).then(res => {
                // console.log(res.data.data);
                this.total = res.data.data.total
                this.tableData = res.data.data.rows
            })
        },
        //搜索
        searchHandle() {
            this.getlist()
        },
        //重置
        onSubmit() {
            this.formInline = {}
        },
        // 分页
        handleSizeChange(val) {
            if (this.pageNum != 1) {
                this.pageNum = 1
            }

            this.pageSize = val
            this.getlist()
        },
        handleCurrentChange(val) {
            this.pageNum = val
            this.getlist()
        },
        //添加
        addHandle() {
            this.dialogFormVisible = true
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.ruleForm.id) {
                        editmemberinfoApi(this.ruleForm.id, this.ruleForm).then(res => {
                            // console.log(res);
                            this.$message.success("更新成功！")
                            this.getlist()
                            this.dialogFormVisible = false
                            this.ruleForm = {}
                        })
                    } else {
                        addmemberApi(this.ruleForm).then(res => {
                            // console.log(res);
                            this.$message.success("新增成功！")
                            this.getlist()
                            this.dialogFormVisible = false
                            this.ruleForm = {}
                        })
                    }

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.dialogFormVisible = false
            this.ruleForm={}

        },
        //编辑
        editHandle(ele) {
            // console.log(ele.id);
            memberinfoApi(ele.id).then(res => {
                this.ruleForm = res.data.data
                // console.log(this.ruleForm);
                this.dialogFormVisible = true

            })


        },
        //删除
        delHandle(id) {

            this.$confirm('亲，真的要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delmemberinfoApi(id).then(res => {
                    console.log(res);
                    this.$message.success('删除成功')
                    this.getlist()
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }





    }




}
</script>
<style lang='scss' scoped></style>
