<template>
  <div class="home">
    <el-container>
      <el-header>
        <h3>梦学谷会员管理系统</h3>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ userinfo.name }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item command="out">退出系统</el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>

      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router
            background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
         
            <el-menu-item index="/index">       
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/member">       
              <span slot="title">会员管理</span>
            </el-menu-item>
            <el-menu-item index="/supplier">       
              <span slot="title">供应商管理</span>
            </el-menu-item>
            <el-menu-item index="/goods">       
              <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="/staff">       
              <span slot="title">员工管理</span>
            </el-menu-item>
          </el-menu>

        </el-aside>
        <el-main>   <div class="titbox" v-if="$route.meta.title">
        {{ $route.meta.title }}
    </div>  <router-view/></el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import { userinfoApi, loginoutApi } from "@/request/api"
export default {
  name: 'home',
  data() {
    return {
      userinfo: {},
      token: localStorage.getItem('token')

    }
  },
  created() {


    userinfoApi().then(res => {
      // console.log(res.data.flag);
      this.userinfo = res.data.data

    })
  },
  methods: {
    handleCommand(val) {
      // console.log(val);
      if (val == 'out') {
        loginoutApi({ token: this.token }).then(res => {
          // console.log(res);
          localStorage.removeItem('token')
          this.$router.push('/login')
        })
      }
    }
  }



}
</script>
<style lang="scss" scoped>
.el-header {
  width: 100%;
  background-color: #2d3a4b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  color: #f3f3f9;

  .el-dropdown-link {
    cursor: pointer;
    color: #f3f3f9;

  }

  .el-icon-arrow-down {
    font-size: 12px;
  }
}

.el-aside{
  min-height: calc(100vh - 60px);
  background-color: #545c64;
}
.titbox{
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    border-left:3px solid green;
}
</style>
