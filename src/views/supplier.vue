<template>
    <div class='supplier'>
        <div class="searchbox">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="formInline.name" placeholder="供应商名称" size="mini"></el-input>
                </el-form-item> <el-form-item>
                    <el-input v-model="formInline.linkman" placeholder="联系人" size="mini"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="formInline.mobile" placeholder="联系电话" size="mini"></el-input>
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
                <el-table-column prop="name" label="供应商名称">
                </el-table-column>
                <el-table-column prop="linkman" label="联系人">
                </el-table-column>
                <el-table-column prop="mobile" label="联系电话">
                </el-table-column>
                <el-table-column prop="remark" label="备注">
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
        <el-dialog :title="ruleForm.id ? '供应商编辑' : '新增供应商'" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="供应商名称" prop="name">
                    <el-input v-model="ruleForm.name" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="linkman">
                    <el-input v-model="ruleForm.linkman" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="ruleForm.mobile" size="mini">
                    </el-input>
                </el-form-item>

                <el-form-item label="备注">
                    <el-input type="textarea" v-model="ruleForm.remark" size="mini"></el-input>
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
import { supplierApi, addsupplierApi, editsupplierinfoApi, supplierinfoApi, delsupplierApi } from "@/request/api"
export default {
    data() {
        return {
            formInline: {

            },
            tableData: [],
            total: 0,
            pageSize: 10,
            pageNum: 1,
            dialogFormVisible: false,
            ruleForm: {

            },
            rules: {
                name: [
                    { required: true, message: '请输入供应商名称', trigger: 'blur' },
                ], linkman: [
                    { required: true, message: '请输入联系人', trigger: 'blur' },
                ],
            }

        }

    },
    methods: {
        getlist() {
            supplierApi(this.pageNum, this.pageSize, this.formInline).then(res => {
                console.log(res.data.data);
                this.total = res.data.data.total
                this.tableData = res.data.data.rows
            })
        },
        //搜索
        searchHandle() {
            this.getlist()
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.ruleForm.id) {
                        editsupplierinfoApi(this.ruleForm.id, this.ruleForm).then(res => {
                            // console.log(res);
                            this.$message.success("更新成功！")
                            this.getlist()
                            this.dialogFormVisible = false
                            this.ruleForm = {}
                        })
                    } else {
                        addsupplierApi(this.ruleForm).then(res => {
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
            this.ruleForm = {}
        },
        //编辑
        editHandle(ele) {
            // console.log(ele.id);
            supplierinfoApi(ele.id).then(res => {
                this.ruleForm = res.data.data
                // console.log(this.ruleForm);
                this.dialogFormVisible = true

            })


        },
        //新增
        addHandle() {
            this.dialogFormVisible = true
        },
        //重置
        onSubmit() {
            this.formInline = {}
        },
        //删除
        delHandle(id) {

            this.$confirm('亲，真的要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delsupplierApi(id).then(res => {
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
    },
    created() {
        this.getlist()
    }
}
</script>
<style lang='scss' scoped></style>
