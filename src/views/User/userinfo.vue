<template>
  
    <div class="container">
        <div class="space1"></div>
       <h1> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp修改个人信息</h1>
      <div class="space1"></div>
      <el-form ref="form" :model="user" :rules="rules" label-width="150px" >
  
            <el-form-item label="请输入新的邮箱" prop="email"  >
              <el-input v-model="user.email" ></el-input>
            </el-form-item>
            <div class="space2"></div>
            <el-form-item label="请选择性别" prop="gender">
              <el-radio-group v-model="user.gender">
                <el-radio label="男" class="boy">男</el-radio>
                <el-radio label="女" class="girl">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="space2"></div>
            <el-form-item label="请输入新的手机号" prop="phone">
              <el-input v-model="user.phone"></el-input>
            </el-form-item>
            <div class="space2"></div>
            <el-form-item label="请输入新的组织名" prop="org">
              <el-input v-model="user.org"></el-input>
            </el-form-item>
            <div class="space3"></div>
            <el-form-item >
              <div class="button-container">
              <el-button type="primary" @click="submitForm" class="submit">提交</el-button>
              <el-button @click="resetForm" class="renew">重置</el-button>
              </div>
            </el-form-item>
  
      </el-form>
    </div>
  
  
  </template>
  
  <script>
  import { ChangeInfo } from "@/api/user";
  import { getAccessToken } from "@/util/auth";
  import { getInfo } from "@/api/user";
  export default {
    name: "ChangePassword",
    data() {
      return {
        user: {
          gender: "",
          chara: "",
          email: "",
          phone: "",
          org: ""
        },
        rules: {
          chara: [{ required: true, message: "请选择身份", trigger: "blur" }],
          email: [{ required: true, message: "请输入新邮箱", trigger: "blur" }],
          phone: [{ required: true, message: "请输入新手机号", trigger: "blur" }],
          org: [{ required: true, message: "请输入新组织", trigger: "blur" }],
        },
      };
    },
    mounted() {
      getInfo().then((res) => {
        console.log(res)
        this.user.gender = res.data.gender
        this.user.chara = res.data.chara
        this.user.email = res.data.email
        this.user.phone = res.data.phone
        this.user.org = res.data.org
      });
    },
    methods: {
      submitForm() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.user.token = getAccessToken()
            console.log(this.user)
            ChangeInfo(this.user).then(_ => {
              if (_) {
                // 请求成功
                this.$message({
                  message: '修改信息成功',
                  type: 'success'
                })
              } else {
                this.msg = response.data.msg
                this.open_err()
              }
            })
            // TODO: send user data to backend
          } else {
            console.log("form validation failed");
          }
        });
      },
      resetForm() {
        this.$refs.form.resetFields();
      },
    },
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
  .submit {
    margin-right: 80px;
  }
  .renew {
    margin-right: 80px;
  }
  .boy {
    margin-right: 320px;
  }
  .girl {
    margin-right: 60px;
  }
  .space1{
    height: 20px;
  }
  .space2{
    height: 8px;
  }
  .space3{
    height: 30px;
  }
  
  </style>
  