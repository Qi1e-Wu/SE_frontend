<template>
  <div id="app">

    <router-view/>

  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

}


.content {
  width: auto;
  height: 100%;
  padding: 10px;
  overflow-y: scroll;
  box-sizing: border-box;
}

.container {
  padding: 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}

nav {
  a {
    font-weight: bold;
    color: #19813f;

    &:hover {
      color: #42b983;
    }
  }
}

.el-table th {
  background-color: #f5f7fa !important;
}

.pagination {
  margin: 20px 0;
  text-align: right;
}

.plugins-tips {
  padding: 20px 10px;
  margin-bottom: 20px;
}

.el-button + .el-tooltip {
  margin-left: 10px;
}

.el-table tr:hover {
  background: #f6faff;
}

.mgb20 {
  margin-bottom: 20px;
}

.move-enter-active,
.move-leave-active {
  transition: opacity 0.1s ease;
}

.move-enter-from,
.move-leave-to {
  opacity: 0;
}

.form-box {
  width: 650px;
}

.form-box .line {
  text-align: center;
}

.el-time-panel__content::after,
.el-time-panel__content::before {
  margin-top: -7px;
}

.el-time-spinner__wrapper .el-scrollbar__wrap:not(.el-scrollbar__wrap--hidden-default) {
  padding-bottom: 0;
}

.el-sub-menu [class^=el-icon-] {
  vertical-align: middle;
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
}

[hidden] {
  display: none !important;
}
</style>
