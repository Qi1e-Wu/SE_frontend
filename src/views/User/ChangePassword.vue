<template>
  <div class="container">
    <div class="add-user">
      <div class="space1"></div>
      <h1>修改密码</h1>
      <div class="space3"></div>
      <el-form ref="form" :model="user" :rules="rules" label-width="150px">
        <el-form-item label="请输入新密码" prop="password">
          <el-input v-model="user.password"></el-input>
        </el-form-item>
        <div class="space3"></div>
        <el-form-item>
          <div class="button-container">
              <el-button type="primary" @click="submitForm" class="submit">提交</el-button>
          <el-button @click="resetForm" class="renew">重置</el-button>
        </div>
        </el-form-item>
      </el-form>
    </div>
    </div>
  </template>
  
  <script>
  import { ChangePassword } from "@/api/login";
  import { getInfo } from "@/api/user";
  export default {
    name: "ChangePassword",
    data() {
      return {
        user: {
          password: "",
          name: ""
        },
        rules: {
          password: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        },
      };
    },
    methods: {
      submitForm() {
        this.$refs.form.validate(valid => {
          if (valid) {
            getInfo().then((res) => {
            this.user.name = res.data.username;
            ChangePassword(this.user.name,this.user.password)
            this.$message({
                message: '密码修改成功',
                type: 'success'
              })
            });
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
  
  <style>
  .add-user {
    padding: 20px;
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
  .submit {
    margin-right: 70px;
  }
  .renew {
    margin-right: 150px;
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