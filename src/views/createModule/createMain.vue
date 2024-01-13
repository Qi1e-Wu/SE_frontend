<template>
  <div class="container">
    <div >
      <h1>我创建的实验</h1>
      <div class="space1"></div>
      <el-table ref="filterTable" :data="experiments" 
        :header-cell-style="{textAlign: 'center'}" 
        :cell-style="{ textAlign: 'center' }" 
        style="width: 100%; 
        text-align: center"
      >
        <el-table-column prop="description" label="实验概述"></el-table-column>
        <el-table-column prop="title" label="实验名称"></el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column prop="active_time" label="上次运行时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="manageExperiment(scope.row)">管理实验</el-button>
            <el-button type="text" @click=openDialog(scope.$index)>修改名称与概述</el-button>
          </template>
        </el-table-column>        
      </el-table>
          <el-dialog title="修改实验信息" :visible.sync="showDialog" class="thisblack-bgc">
                <el-input class="subInput" placeholder="请输入新名称" v-model="newTitle" clearable>
                </el-input>
                <el-input class="subInput" placeholder="请输入新描述" v-model="newDescription" clearable>
                </el-input>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="showDialog = false">返回</el-button>
                    <el-button @click="updateInfo" type="primary">确定</el-button>
                </div>
            </el-dialog>
            <div class="space2"></div>
      <el-button class="create-experiment-btn" type="primary" @click="goToCreateExperiment">创建实验</el-button>

    </div>
    <div class="space3"></div>
  </div>
  </template>
  
  <script>
  import { getExpRec } from '@/api/Exp';
  import { updateExpRec } from '@/api/Exp';
  import { formatTimestamps } from '@/util/timeconvert';
  export default {
    data() {
      return {
        showDialog: false,
        newTitle: '',
        newDescription: '',
        currentIndex: null,
        experiments: []
      };
    },
    mounted(){
      getExpRec().then((_)=>{
        this.experiments=_.data
      })
    },
    methods: {
      openDialog(index) {
          this.currentIndex=index;
          this.newTitle=this.experiments[this.currentIndex].title;
          this.newDescription=this.experiments[this.currentIndex].description;
          this.showDialog = true;
      },
      updateInfo() {
        if (this.currentIndex !== null) {
          this.experiments[this.currentIndex].title = this.newTitle;
          this.experiments[this.currentIndex].description = this.newDescription;
          updateExpRec(this.experiments[this.currentIndex]).then(res=>{
              if(res.code === 200){
                this.$message.success("修改信息成功")
              }
              else{
                this.$message.error(res)
              }
          }).catch()
          this.showDialog = false;
        }
      },
      manageExperiment(experiment) {
        console.log(experiment)
        // 导航到 manage.vue，并传递实验ID
        this.$router.push({ name: 'manage', query: experiment});
      },
      goToCreateExperiment() {
        // 导航到 createExp.vue
        this.$router.push('/experiment/createModule/createExp');
      }
    }
  };
  </script>
  
  <style scoped>
  .create-container {
    max-width: 80%;
    margin: auto;

  }
  
  .create-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .experiment-table {
    margin-bottom: 20px;
  }
  
  .create-experiment-btn {
    margin-left: 10px;
    margin-top: 10px;
  }
  .subInput {
    margin: 3px;
  }

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

  .space1{
    height: 20px;
  }
  .space2{
    height: 30px;
  }
  .space3{
    height: 15px;
  }
  
  </style>
  