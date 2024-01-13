<template>
    <div class="user-list">
      <el-table :data="users" style="width: 100%">
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="chara" label="角色"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="org" label="组织"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column fixed="right" label="操作">
          </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  import { getAllUsers } from '@/api/user';
  export default {
    name: "UserList",
    data() {
      return {
        users: [
        ],
      };
    },
    mounted(){
      getAllUsers().then((_)=>{
        console.log(_)
        if(_.code === 114514){
          this.$message.error('没有权限查看')
        }
        else{
          this.users=_.data
        }
      })
    }
  };
  </script>
  
  <style>
  .user-list {
    padding: 20px;
  }
  </style>
  