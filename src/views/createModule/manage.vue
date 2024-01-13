<template>
  <div class="container">
    <h1>管理实验</h1>
    <div class="space1"></div>
    <div class="button-group">
      <el-button type="primary" class="manage-button" @click="openQuickDistribution" >一键分发</el-button>
      <el-button type="primary" class="manage-button" :disabled="runningExp" @click="startExperiment">开始实验</el-button>
      <el-button type="primary" class="manage-button" @click="openAddParticipantDialog">新增被试</el-button>
      <el-button type="primary" class="manage-button" @click="openImportParticipantsDialog">导入被试</el-button>
<!--       <el-button type="primary" class="manage-button" @click="openAddObserverDialog">添加观察者</el-button> -->
      <el-button type="warning" class="manage-button" :disabled="stoppingExp" @click="StopExperiment">停止实验</el-button>
      <el-button type="danger" class="manage-button" @click="openDeleteExperimentConfirmation">删除实验</el-button>
    </div>
    <div class="space"></div>
    <div class="line"></div>
    <div class="space1"></div>
    <h2>实验运行中：{{ experimentLink }}</h2>
    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" class="experiment-dialog">
      <template v-if="dialogType === 'startExperiment'">
        <span v-if="experimentLink">
          实验链接: <a :href="experimentLink" target="_blank">{{ experimentLink }}</a>
        </span>
        <span v-else>实验正在启动中，请稍后...</span>
      </template>
      <template v-if="dialogType === 'addParticipant'">
        <label for="participant-id">请填写新增被试ID:&nbsp</label>
        <input type="text" id="participant-id" v-model="newParticipantId" />
      </template>
      <template v-if="dialogType === 'importParticipants'">
        <span>仅支持上传.xlsx, .xls文件。请将参试者的用户名放在表格的第一列。</span>
        <div class="space2"></div>
        <el-upload
            ref="upload"
            :action="uploadUrl"
            :before-upload="beforeUpload"
            :on-success="handleUploadSuccess"
            :headers="{
               Authorization: tokenForUpload,
            }"
            :data="uploadData"
        >
          <el-button size="small" type="primary" @click="uploadFile">导入被试者表格</el-button>
        </el-upload>
      </template>
      <template v-if="dialogType === 'addObserver'">
        <label for="observer-id">请填写新增观察者ID: &nbsp</label>
        <input type="text" id="observer-id" v-model="newObserverId" />
      </template>
      <template v-if="dialogType === 'deleteExperimentConfirmation'">
        确定要删除实验吗？此操作将删除所有文件。
      </template>
      <template v-if="dialogType === 'quickDistribution'" class="distribution">
        <label for="exp-url">请输入实验url:&nbsp</label>
        <input type="text" id="exp-url" v-model="expURL" />
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="dialogType === 'deleteExperimentConfirmation'" type="danger" @click="deleteExperiment">确认</el-button>
        <el-button @click="closeDialog">关闭</el-button>
        <el-button v-if="dialogType === 'notification'" type="primary" @click="sendNotification">发送</el-button>
        <el-button v-if="dialogType === 'addParticipant'" type="primary" @click="addParticipant">添加</el-button>
        <el-button v-if="dialogType === 'addObserver'" type="primary" @click="addObserver">添加</el-button>
        <el-button v-if="dialogType === 'quickDistribution'" type="primary" @click="quickDistribution">分发</el-button>
      </span>
    </el-dialog>
    <el-table v-if="participantList.length > 0" :data="participantList"
              :header-cell-style="{'text-align': 'center'}"
              :cell-style="{'text-align': 'center'}"
              style="width: 30%; margin-top: 20px; margin-left: 33%;">
      <el-table-column label="序号">
        <template slot-scope="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="被试名单">
        <template slot-scope="{ $index }">
          {{ participantList[$index] }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ $index }">
          <el-button type="danger" size="small" @click="deleteParticipant(participantList[$index])" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-else>
      <p>暂无被试名单</p>
    </div>


  </div>
  </template>

<script>
function timestampToTime(times) {
    let time = times[1]
    let mdy = times[0]
    mdy = mdy.split('/')
    let month = parseInt(mdy[0]);
    let day = parseInt(mdy[1]);
    let year = parseInt(mdy[2])
    return year + '-' + month + '-' + day + ' ' + time
}

import {getParticipantByExpId} from '@/api/Exp'
import { removeExpRec } from '@/api/Exp';
import { CLInterface } from '@/api/cmdline';
import { updateExpRec } from '@/api/Exp';
import {deleteParticipant} from "@/api/Exp";
import {getAccessToken} from "@/util/auth";
import  {BASEURL} from "@/util/request";
import {execAddParticipant} from "@/api/Exp";
import {execQuickDistribution} from "@/api/Exp";
import {execImportFile} from "@/api/Exp";
  export default {
    data() {
      return {
        tokenForUpload: 'Bearer ' + getAccessToken(),
        uploadUrl: BASEURL + '/experiment/uploadParticipant',

        participantList: [],
        runningExp: false,
        stoppingExp: true,
        experiment: [],
        dialogVisible: false,
        dialogTitle: "",
        dialogType: "",
        experimentLink: "",
        notificationText: "",
        newParticipantId: "",
        participantFile: null,
        newObserverId: "",
        port: "",
        expURL: "",
      };
    },
    computed: {
      uploadData() {
        return {
          expId: this.experiment.id,
        };
      },
    },
    created() {
      this.experiment = this.$route.query
      getParticipantByExpId(this.experiment.id).then((_) => {
        console.log(_)
        if (_.code === 114514) {
          this.$message.error('没有权限查看')
        } else {
          this.participantList = _.data
        }
      })
    },
    mounted() {
      this.runningExp = JSON.parse(localStorage.getItem('runningExp'));
      this.port = localStorage.getItem("runningPort")
      this.stoppingExp = JSON.parse(localStorage.getItem('stoppingExp'));
      this.experimentLink = localStorage.getItem("runningURL")
    },
    methods: {
      startExperiment() {
        CLInterface("./test.sh start " + this.experiment.directory).then((_) => {
          if (_ === "启动服务失败") {
            this.$message.error(_)
          } else {
            this.experimentLink = _
            this.port = _.split(":")[2]
            this.stoppingExp = false
            this.runningExp = true
            localStorage.setItem("runningURL", _)
            localStorage.setItem('stoppingExp', JSON.stringify(this.stoppingExp));
            localStorage.setItem('runningExp', JSON.stringify(this.runningExp));
            localStorage.setItem("runningPort", this.port)
            let time = new Date()
            this.experiment.active_time = timestampToTime(time.toLocaleString('en-US', {hour12: false}).split(" "))
            updateExpRec(this.experiment)
            /* this.experimentLink="https://www.baidu.com" */
            setTimeout(() => {
              this.dialogVisible = true;
              this.dialogType = "startExperiment";
              this.dialogTitle = "开始实验";
            }, 500);
          }
        })
        // Call the backend to start the experiment
        // You can replace the placeholder with the actual backend API call
        // Update the experimentLink variable with the returned experiment link
        // For example:
        // axios.post("/api/start-experiment")
        //   .then(response => {
        //     this.experimentLink = response.data.experimentLink;
        //     this.dialogVisible = true;
        //     this.dialogType = "startExperiment";
        //     this.dialogTitle = "开始实验";
        //   })
        //   .catch(error => {
        //     console.error("Failed to start experiment:", error);
        //   });

        // Placeholder code for demonstration
        // Simulate a delay before obtaining the experiment link

      },
      StopExperiment() {
        CLInterface("./test.sh stop " + this.experiment.directory + " " + this.port).then((_) => {
          if (_ === "启动服务失败") {
            this.$message.error(_)
          } else {
            this.port = "";
            this.experimentLink = "";
            this.stoppingExp = true;
            this.runningExp = false;
            localStorage.setItem('stoppingExp', JSON.stringify(this.stoppingExp));
            localStorage.setItem('runningExp', JSON.stringify(this.runningExp));
            localStorage.setItem("runningPort", this.port);
            localStorage.setItem("runningURL", "");
          }
        })
      },
      openNotificationDialog() {
        this.dialogVisible = true;
        this.dialogType = "notification";
        this.dialogTitle = "群发通知";
        this.notificationText = "";
      },
      sendNotification() {
        // Send the notification using the this.notificationText value
        console.log("Sending notification:", this.notificationText);
        this.closeDialog();
      },
      openAddParticipantDialog() {
        this.dialogVisible = true;
        this.dialogType = "addParticipant";
        this.dialogTitle = "新增被试";
        this.newParticipantId = "";
      },
      addParticipant() {
        // Add the new participant using the this.newParticipantId value
        execAddParticipant(this.experiment.id, this.newParticipantId).then(res=>{
          console.log("Adding participant:", this.newParticipantId);
          if (res.code===200){
            console.log("success!")
            this.$message.success('添加成功');
          }else{
            console.log("wrong")
            this.$message.error(res.msg)
            this.loading = false
          };
          this.refresh();
        })
        this.closeDialog();
      },
      uploadFile() {
        console.log('上传中......')
        this.$refs.upload.submit();
      },
      beforeUpload(file) {
        // Validate the file before uploading
        const allowedFileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        let isallowed = allowedFileTypes.includes(file.type);
        const isLessThan2MB = file.size / 1024 / 1024 < 2;

        if (!isallowed) {
          this.$message.error('Only xls/xlsx files are allowed.');
        }

        if (!isLessThan2MB) {
          this.$message.error('File size should be less than 2MB.');
        }

        return isallowed && isLessThan2MB;
      },
      handleUploadSuccess(response) {
        // Handle the response from the server after successful upload
        if (response.code === 200) {
          this.$message.success('成功导入被试者。');
          getParticipantByExpId(this.experiment.id).then((_) => {
            console.log(_)
            if (_.code === 114514) {
              this.$message.error('没有权限查看')
            } else {
              this.participantList = _.data
            }
          })
        } else {
          this.$message.error(response.message);
          console.log(response.message);
          return Promise.reject(response.message);
        }
      },
      openImportParticipantsDialog() {
        this.dialogVisible = true;
        this.dialogType = "importParticipants";
        this.dialogTitle = "导入被试";
        this.participantFile = null;
      },
      handleParticipantFileChange(event) {
        this.participantFile = event.target.files[0];

        const formData = new FormData();
        formData.append('expId', this.experiment.id);
        formData.append('file', this.participantFile);

        execImportFile(formData).then(res=>{
          console.log("Selected participant file:", this.participantFile);
          if (res.code===200){
            console.log("success!")
            this.$message.success('添加成功');
          }else{
            console.log("wrong")
            this.$message.error(res.message)
            this.loading = false
          };
          this.refresh();
        })
      },
      openAddObserverDialog() {
        this.dialogVisible = true;
        this.dialogType = "addObserver";
        this.dialogTitle = "添加观察者";
        this.newObserverId = "";
      },
      addObserver() {
        // Add the new observer using the this.newObserverId value
        console.log("Adding observer:", this.newObserverId);
        this.closeDialog();
      },
      openDeleteExperimentConfirmation() {

        this.dialogVisible = true;
        this.dialogType = "deleteExperimentConfirmation";
        this.dialogTitle = "删除实验";
      },
      deleteExperiment() {
        CLInterface("rm -r " + this.experiment.directory)
        console.log(this.experiment)
        removeExpRec(this.experiment).then((_) => {
          if (_.code === 200) {
            this.$message.success("删除成功")
            this.closeDialog();
            this.$router.push("/experiment/createModule/createMain")
          }
        })

      },
      deleteParticipant(username) {
        deleteParticipant(this.experiment.id, username).then(res => {
          console.log(res)
          if (res.code == 200) {
            window.location.reload();
          } else {
            alert("删除失败")
          }
        })
      },
      closeDialog() {
        this.dialogVisible = false;
        this.dialogType = "";
        this.dialogTitle = "";
      },
      openQuickDistribution(){
        this.dialogVisible = true;
        this.dialogType = "quickDistribution";
        this.dialogTitle = "一键分发";
      },
      quickDistribution(){
        execQuickDistribution(this.experiment.id, this.expURL).then(res=>{
          console.log("Adding url:", this.expURL);
          if (res.code===200){
            console.log("success!")
            this.$message.success('分发成功');
          }else{
            console.log("wrong")
            this.$message.error(res.message)
            this.loading = false
          }
        })
        this.closeDialog();
      },
      refresh(){
        getParticipantByExpId(this.experiment.id).then((_)=>{
          console.log(_)
          if(_.code === 114514){
            this.$message.error('没有权限查看')
          }
          else{
            this.participantList=_.data
          }
        })
      }
    }
  }
</script>


<style scoped>
.create-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.create-form {
  max-width: 400px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  padding: 10px;
}

.container h1 {
    text-align: center;
    color: #378ee6;
  }

  .line {
  width: calc(100% - 20px);
  height: 2px;
  background-color: #f2f2f2;
  margin-top: 10px;
  margin-bottom: 10px;
}
.space{
  height: 30px;
}

.space1{
  height: 10px;
}

.space2{
  height: 5px;
}
</style>
