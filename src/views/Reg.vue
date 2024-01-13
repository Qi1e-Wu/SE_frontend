<template>
  <div class="rg_layout">
    <div class="rg_left">
      <img src="../assets/logo.png" alt="logo">
      <p id="chinese">新用户注册</p>
      <p>USER REGISTER</p>
      
    </div>
    <div class="rg_center">
      <div class="rg_form">
        <div style="margin: 50px 0;"></div>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="email" prop="email">
            <el-col :span="15">
              <el-input placeholder="请输入邮箱号" v-model="form.email"></el-input>
            </el-col>
            <!-- <el-col :span="9">
              <el-button type="success" plain >发送邮件验证</el-button>
            </el-col> -->
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-col :span="20">
              <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input placeholder="请输入密码" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-col :span="5">
              <el-radio v-model="form.gender" label="1">男</el-radio>
            </el-col>
            <el-col :span="3">
              <el-radio v-model="form.gender" label="2">女</el-radio>
            </el-col>
          </el-form-item>
          <el-form-item label="身份" prop="chara">
            <el-col :span="6">
              <el-radio v-model="form.chara" label="普通用户">普通用户</el-radio>
            </el-col>
            <el-col :span="3">
              <el-radio v-model="form.chara" label="管理员">管理员</el-radio>
            </el-col>
          </el-form-item>
          <el-form-item label="组织名" prop="org">
            <el-col :span="20">
              <el-input placeholder="请输入组织名，若无则不用填写" v-model="form.org"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-col :span="20">
              <el-input placeholder="请输入手机号" v-model="form.phone"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="20">
              <el-button type="primary" @click="onSubmit">立即注册</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="rg_right">
      <p>已有账号?
        <el-link icon="el-icon-user-solid" type="primary" @click="login_asd">立刻登录</el-link>
      </p>
    </div>

  </div>

</template>

<script>
import axios from "axios";
import {register} from '@/api/login'
export default {
  mounted() {
    this.$store.state.yesOrNo = false
  },
  name: "signUp",
  data: function () {
    return {
      form: {
        username: "",
        org:"",
        password: "",
        phone:"",
        email: '',
        gender: '男', 
        chara: '普通用户', 
        // text: ''
      },
      rules: {
        email: [{required: true, message: '请输入邮箱', trigger: 'blur'}],
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        phone: [{required: true, message: '请输入电话', trigger: 'blur'}],
        org: [{required: false, message: '请输入组织', trigger: 'blur'}],
        chara: [{required: true, message: '请选择身份', trigger: 'blur'}],
        gender: [{required: true, message: '请选择性别', trigger: 'blur'}],
      },
      msg: ''
    }
  },
  methods: {
    login_asd(){
      this.$router.replace({path: '/login'});
    },
    open_warning() {
      this.$message({
        showClose: true,
        message: this.msg,
        type: 'warning'
      });
    },
    open_suc() {
      this.$message({
        showClose: true,
        message: this.msg,
        type: 'success'
      });
    },
    open_err() {
      this.$message({
        showClose: true,
        message: this.msg,
        type: 'error'
      });
    },
    
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let _this = this;
          let tmp;
          if(this.form.gender === "1"){
            tmp = '男'
          }else{
            tmp = '女'
          }
        
          this.loading = true
          // 请求
          register(this.form).then(_ => {
            if(_) {
              // 请求成功
              this.$message({
                message: '注册成功',
                type: 'success'
              })
              this.$router.replace({path: '/login'})//注册成功，重定向到登录页面
            } else {
                _this.msg = response.data.msg
                _this.open_err()
            }
          })
        }
      })
    },
  }
}
</script>


<style>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

.rg_layout {

  border-radius: 5px;
  box-shadow: 0px 0px 10px #ccc;
  width: 900px;
  height: 550px;
  opacity: 0.8;
  /*让div水平居中*/
  margin: auto;
  margin-top: 50px;
}

.rg_left {
  float:left;
  margin: 15px;
  width: 20%;
}

#chinese {
  color: #39334E;
  font-size: 20px;
}

.rg_left > p:last-child {
  color: #A6A6A6;
}

.rg_center {
  /*border: 1px solid red;*/
  float: left;
  width: 450px;
  /*margin: 15px;*/
}

.rg_right {
  float: right;
  margin: 15px;
}

.rg_right > p:first-child {
  font-size: 15px;
}

.rg_right p a {
  color: pink;
}

</style>

