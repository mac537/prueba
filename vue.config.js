module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/scss/global.scss";`
      }
    }
  },
  devServer: {
    proxy: 'http://localhost:3000/api'
  }
}