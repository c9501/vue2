const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:"http://vue.mengxuegu.com/pro-api/"
  }
})
