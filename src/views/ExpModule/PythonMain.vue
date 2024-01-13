<template>
    <div class="main" style="align:center">
      <el-button type="primary" @click="goToCompiler()">进入在线编辑模式</el-button>
      <el-button type="primary" @click="goToSelect()">进入上传运行模式</el-button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goToCompiler() {
        this.$router.push('/Exp/ExpModule/PythonCompiler');
      },
      goToSelect() {
        this.$router.push('/Exp/ExpModule/PythonSelect');
      },
    },
  };
  </script>
  