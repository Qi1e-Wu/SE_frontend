<template>
  <div class="container">
    <h1 >创建新实验</h1>
    <div class="space"></div>
    <div class="line"></div>
    <div class="space1"></div>
    <el-form ref="form" :model="experiment" label-width="100px" class="button-row">
      <el-form-item>
        <el-button type="primary" @click="chooseFile">导入实验文件</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="openOtreeWebsites">手动创建实验</el-button>
      </el-form-item>
    </el-form>
    <input type="file" ref="fileInput" style="display: none" accept=".otreezip" @change="handleFileUpload">
    <el-dialog title="请选择otree文件" :visible.sync="dialogVisible">
      <el-button type="primary" @click="chooseFile">选择文件</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      experiment: {
        name: ''
      },
      dialogVisible: false
    };
  },
  methods: {
    chooseFile() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const axios = require('axios');
      const file = event.target.files[0];
      
      let formData = new FormData();
      formData.append('file', file);

      axios.post("http://43.142.90.238:28080/api/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': localStorage.getItem('ACCESS_TOKEN')
        }
      })
      .then((response) => {
        console.log(response.data);
        this.$message.success("上传成功")
      })
      .catch((error) => {
        this.$message.error(error)
        console.error(error);
      });

      console.log('上传的文件:', file);
      this.dialogVisible = false;
    },
    openOtreeWebsites() {
      window.open('https://www.otreehub.com/');
      setTimeout(() => {
        window.open('https://otree.readthedocs.io/en/latest/studio.html');
      }, 3000);
    }
  }
};
</script>

<style scoped>

.container {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  .container h1 {
    text-align: center;
    color: #378ee6;
  }

  .button-row {
  display: flex;
  justify-content: center; /* 居中对齐按钮 */
  margin-right: 80px;
}


.space1{
    height: 30px;
  }

.line {
  width: calc(100% - 5px);
  height: 2px;
  background-color: #f2f2f2;
  margin-top: 10px;
  margin-bottom: 10px;
}

.space{

}
</style>
