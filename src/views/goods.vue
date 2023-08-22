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
                <el-table-column prop="name" label="商品名称">
                </el-table-column>
                <el-table-column prop="code" label="商品编码">
                </el-table-column>
                <el-table-column prop="spec" label="商品规格">
                </el-table-column>
                <el-table-column prop="retailPrice" label="零售价">
                </el-table-column>
                <el-table-column prop="purchasePrice" label="进货价">
                </el-table-column> <el-table-column prop="storageNum" label="库存数量">
                </el-table-column> <el-table-column prop="supplierName" label="供应商">
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
        <!-- <el-dialog :title="ruleForm.id ? '商品编辑' : '新增商品'" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="ruleForm.name" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="商品编码" prop="code">
                    <el-input v-model="ruleForm.code" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="商品规格">
                    <el-input v-model="ruleForm.spec" size="mini">
                    </el-input>
                </el-form-item>
                <el-form-item label="零售价" prop="retailPrice">
                    <el-input v-model="ruleForm.retailPrice" size="mini">
                    </el-input>
                </el-form-item>
                <el-form-item label="进货价">
                    <el-input v-modelr="ruleForm.purchasePrice" size="mini">
                    </el-input>
                </el-form-item> <el-form-item label="库存数量">
                    <el-input v-model="ruleForm.storageNum" size="mini">
                    </el-input>
                </el-form-item> <el-form-item label="供应商">
                    <el-input v-model="ruleForm.supplierName" size="mini" placeholder="请选择供应商">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog> -->
        <el-dialog :title="ruleForm.id ? '员工编辑' : '新增员工'" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="ruleForm.name" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="商品编码" prop="code">
                    <el-input v-model="ruleForm.code" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="商品规格">
                    <el-input v-model="ruleForm.spec" size="mini">
                    </el-input>
                </el-form-item>
                <el-form-item label="零售价" prop="retailPrice">
                    <el-input v-model="ruleForm.retailPrice" size="mini">
                    </el-input>
                </el-form-item>
                <el-form-item label="进货价">
                    <el-input v-model="ruleForm.purchasePrice" size="mini">
                    </el-input>
                </el-form-item> <el-form-item label="库存数量">
                    <el-input v-model="ruleForm.storageNum" size="mini">
                    </el-input>
                </el-form-item> <el-form-item label="供应商">
                    <el-input v-model="ruleForm.supplierName" size="mini" placeholder="请选择供应商">
                    </el-input>
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
import { goodsApi, addgoodsApi, editgoodsinfoApi, goodsinfoApi, delgoodsApi } from "@/request/api"
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
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ], retailPrice: [
                    { required: true, message: '请输入价格', trigger: 'blur' },
                ], code: [
                    { required: true, message: '请输入编码', trigger: 'blur' },
                ],
            }

        }

    },
    methods: {
        getlist() {
            goodsApi(this.pageNum, this.pageSize, this.formInline).then(res => {
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
                        editgoodsinfoApi(this.ruleForm.id, this.ruleForm).then(res => {
                            // console.log(res);
                            this.$message.success("更新成功！")
                            this.getlist()
                            this.dialogFormVisible = false
                            this.ruleForm = {}
                        })
                    } else {
                        addgoodsApi(this.ruleForm).then(res => {
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
            goodsinfoApi(ele.id).then(res => {
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
                delgoodsApi(id).then(res => {
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
