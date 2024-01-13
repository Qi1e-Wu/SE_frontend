<template>
    <div class="container">
      <h1> &nbsp&nbsp&nbsp&nbsp&nbsp&nbspPython文件上传运行
      </h1>
      <div class="space2"></div>
      <el-upload
        class="upload-demo"
        action="http://43.142.90.238:28080/api/upload"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
        :on-error="handleError"
        :headers="uploadHeaders"
      >
        <el-button type="primary" class="titlebutton">点击上传</el-button>
      </el-upload>
      <div class="space1"></div>
        <el-table ref="filterTable"
                  :data="tableData"
                  style="width: 100%; text-align: center">
          <el-table-column prop="title" label="名称">
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间">
          </el-table-column>
          <el-table-column prop="active_time" label="上次运行时间">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="do_exec(scope.$index)">运行</el-button>
              <el-button type="text" size="small" @click="do_remove(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="space3"></div>
    <div>
      <span class="resulttitle">———————————————————————————————————执行结果———————————————————————————————————</span>
      <div class="line"></div>
      <el-input type="textarea" v-model="result" rows="6" readonly></el-input>
    </div>
    </div>
  </template>
  
  <script>
  import { CLInterface } from "@/api/cmdline"
  import { getFileRec } from "@/api/file"
  import { updateFileRec } from "@/api/file"
  import { removeFileRec } from "@/api/file"
  import { isDuplicatedFileName } from "@/util/timeconvert"
  export default {
    data() {
      return {
        tableData:[],
        uploadUrl: '/your-upload-url',
        command: '',
        result: '',
        uploadHeaders: {
        Authorization: localStorage.getItem('ACCESS_TOKEN')
      }
      }
    },
    mounted() {
      getFileRec('python').then((_)=>{
        this.tableData=_.data
      })
    },
    methods: {
      beforeUpload(file) {
        const validExtensions = ['.py']
        const extension = file.name.slice(file.name.lastIndexOf('.'))
        if (!validExtensions.includes(extension)) {
          this.$message.error('只能上传.py 文件')
          return false
        }
        
        // 如果需要限制文件大小，可以添加以下代码
         const maxSize = 2 * 1024 * 1024; // 2MB
         if (file.size > maxSize) {
           this.$message.error('文件大小不能超过 2MB')
           return false
         }
        return true
      },
      handleSuccess(response, file) {
        this.$message.success('文件上传成功')
        location.reload()
      },
      handleError(err, file) {
        this.$message.error('文件上传失败')
      },
      do_exec(data){
        updateFileRec(this.tableData[data]).then((_)=>{
          console.log(_)
        })
        CLInterface("python3 "+this.tableData[data].directory).then((res)=>{
          this.result=res
        })
        
      },
      do_remove(data){
        removeFileRec(this.tableData[data]).then((_)=>{
          console.log(_)
        })
        CLInterface("rm "+this.tableData[data].directory).then((res)=>{
          this.result=res
          location.reload()
        })
      }
    }
  }
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
  .titlebutton{
    margin-left: 1000px;
  }

  .space1{
    height: 35px;
  }
  .space2{
    height: 5px;
  }
  .space3{
    height: 50px;
  }

  .line {
  width: calc(100% - 5px);
  height: 2px;
  background-color: #f2f2f2;
  margin-top: 10px;
  margin-bottom: 10px;
}

.resulttitle{
  color: #378ee6;
  
  font-weight: 550;
}
</style>