<template>
  <!-- \:style="{ backgroundImage: `url(${backgroundImage})` }" -->
  <div class="body" >
    <div class="title">
      <div class="titlestyle">
      行为科学在线实验平台
    </div>
    </div>
    <div class="title1" @mouseover="showExplanation = true" @mouseleave="showExplanation = false" >说明</div>
    <div v-if="showExplanation" class="explanation">2023-2024软件工程实践项目</div>

    <div class="title2" @click="showHelpModal">帮助</div>
    <div v-if="showModal" class="modal">
  <div class="modal-content">
    <span class="close" @click="closeModal">&times;</span>
    <p>有问题请联系otreeplat_service@163.com</p>
  </div>
</div>

    <!-- <div class="title3">帮助</div> -->

  <div class="container" :class="{ 'right-panel-active': isRightPanelActive }" >
    <!-- Sign Up -->
    <div class="container__form container--signup">

      <form class="form " id="form1">
        <div class="restyle">
        <div class="space1"></div>

        <h2 class="form__title" style="margin-left: 90px;">用户注册</h2>
        <el-form ref="form" :model="form" :rules="ruleregister" label-width="100px">
          <el-form-item label="email" prop="email" style="margin-bottom: 8px;margin-left: -5px; ">
            <el-col :span="15">
              <el-input placeholder="请输入邮箱号" v-model="form.email" style="width: 200%;"></el-input>
            </el-col>
            <!-- <el-col :span="9">
              <el-button type="success" plain >发送邮件验证</el-button>
            </el-col> -->
          </el-form-item>
          <el-form-item label="用户名" prop="username" style="margin-bottom: 8px;">
              <el-input placeholder="请输入用户名" v-model="form.username" style="width: 125%;"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="margin-bottom: 8px;">
            <el-input placeholder="请输入密码" v-model="form.password" style="width: 125%;"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender" :height="0.5" style="margin-bottom: 2px;">
            <el-col :span="8">
              <el-radio v-model="form.gender" label="男">男</el-radio>
            </el-col>
            <el-col :span="16" >
              <el-radio v-model="form.gender" label="女">女</el-radio>
            </el-col>
          </el-form-item>
          <el-form-item label="身份" prop="chara"  :height="0.5" style="margin-bottom: 2px;">
            <el-col :span="14">
              <el-radio v-model="form.chara" label="普通用户">普通用户</el-radio>
            </el-col>
            <el-col :span="6.5">
              <el-radio v-model="form.chara" label="管理员">管理员</el-radio>
            </el-col>
          </el-form-item>
          <el-form-item label="组织名" prop="org" style="margin-bottom: 8px;">
              <el-input placeholder="请输入组织名，若无不用填写" v-model="form.org" style="width: 125%;"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone" style="margin-bottom: 8px;">
              <el-input placeholder="请输入手机号" v-model="form.phone" style="width: 125%;"></el-input>
          </el-form-item>
          <div class="space3"></div>
          <el-form-item>
              <el-button  class="btn" type="primary" @click="onSubmit">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
      </form>

    </div>

    <!-- Sign In -->
    <div class="container__form container--signin">
      <form class="form" id="form2">
        <div class="loginstyle">
        <h2 class="form__title" style="margin-left: 60px;" >用户登录</h2>
        <div class="space2"></div>
        <el-form ref="form" :model="loginForm" :rules="ruleslogin" label-width="100px">
          <el-form-item   label="用户名" prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名" style="width: 125%;"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" style="width: 125%;"></el-input>
          </el-form-item>
          <div class="space2"></div>
          <el-button class="btn" type="primary" @click="do_login" :loading="loading" style="margin-left: 60px;">登录</el-button>
        </el-form>
      </div>
      </form>
    </div>

    <!-- Overlay -->
    <div class="container__overlay" >
      <div class="overlay">
        <div class="overlay__panel overlay--left">
          <button class="btn" @click="togglePanel(false)">登录</button>
        </div>
        <div class="overlay__panel overlay--right">
          <button class="btn" @click="togglePanel(true)">注册</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import backgroundImage from '../assets/login1.jpg';
import { login } from '@/api/login'
import { setToken } from '@/util/auth'
import { register } from '@/api/login';

export default {
  mounted() {
    this.$store.state.yesOrNo = false
  },

  data() {
    return {
      isRightPanelActive: false,
      showModal: false,
      showExplanation: false ,
      loginForm: {
        username: '',
        password: ''
      },
      ruleslogin: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      loading: false,
      ruleregister: {
        email: [{required: true, message: '请输入邮箱', trigger: 'blur'}],
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        phone: [{required: true, message: '请输入电话', trigger: 'blur'}],
        org: [{required: false, message: '请输入组织', trigger: 'blur'}],
        chara: [{required: true, message: '请选择身份', trigger: 'blur'}],
        gender: [{required: true, message: '请选择性别', trigger: 'blur'}],
      },
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
      msg: ''


    };
  },
  
  methods: {
/*     togglePanel(isRightPanelActive) {
      this.isRightPanelActive = isRightPanelActive;
    }, */
    togglePanel(isRightPanelActive) {
      this.isRightPanelActive = isRightPanelActive;

      // If the user is switching to the registration panel, make username and password optional
      if (isRightPanelActive) {
        this.ruleslogin = {
          username: [{ required: false, message: '请输入用户名', trigger: 'blur' }],
          password: [{ required: false, message: '请输入密码', trigger: 'blur' }]
        };
      } else {
        // If the user is switching back to the login panel, make username and password required again
        this.ruleslogin = {
          username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
        };
      }
    },
    showHelpModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    do_login() {
      this.$refs.form.validate(valid => {
        if (valid) {
            this.loading = true
            login(this.loginForm.username,this.loginForm.password).then(res =>{
              console.log(res.data.accessToken)
              setToken(res.data.accessToken,this.loginForm.username)
              this.$router.push({ path: '/' })
            }).catch(() => {
              // 登录失败，显示错误提示
              this.$message.error('用户名或密码错误')
              this.loading = false
            })
          }
      })
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
/*           if(this.form.gender === "1"){
            tmp = '男'
          }else{
            tmp = '女'
          } */
        
          this.loading = true
          // 请求
          register(this.form).then(_ => {
            if(_) {
              // 请求成功
              this.$message({
                message: '注册成功',
                type: 'success',               
              })
              location.reload()
              
            } else {
                _this.msg = response.data.msg
                _this.open_err()
            }
          })
        }
      })
    },


  },
};
</script>

<style scoped>

 .body {
 align-items: center;
 background-color: var(--white);
  background: url("https://res.cloudinary.com/dci1eujqw/image/upload/v1616769558/Codepen/waldemar-brandt-aThdSdgx0YM-unsplash_cnq4sb.jpg");
 background-attachment: fixed;
 background-position: center;
 background-repeat: no-repeat;
 background-size: cover;
 display: grid;
 height: 98vh;
 place-items: center;
  position: relative;
} 
/* 
.body {
  align-items: center;
  background-color: var(--white);
  background-image: url("../assets/1.png");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  display: grid;
  height: 98vh;
  place-items: center;
  position: relative;
} */
.title {
  position: absolute;
  top: 1.7cm;

  font-weight: bold;

  font-size: 39px;
  padding-bottom: 10cm;
color: #fff;
font-family: Verdana, Geneva, sans-serif;

}


/* .titlestyle {
    background: linear-gradient(120deg, #f9f9f9, #45eaf5,#f9fcfc); 

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}  */

.title1{
  position: absolute;
  top: 2.8cm;
  right: 1cm;
  font-weight: 500;
  color: white;
  font-size: 20px;
  font-style: italic;

}

.space1{
height: 30px;
}

.space2{
height: 20px;
}

.space3{
height: 10px;
}
.title2{
  position: absolute;
  top: 2.8cm;
  right: 2.6cm;
  font-weight: 500;
  color: white;
  font-size: 20px;
  font-style: italic;

}
.title1:hover, .title1:active {
  text-decoration: underline;
}

.title2:hover, .title2:active {
  text-decoration: underline;
}

.restyle{
  margin-left: 6px;
}

.loginstyle{
  margin-right: 40px;
  margin-left: -20px;
}
.modal {
  display: block;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}




.form__title {
 font-weight: 300;
 margin: 0;
 margin-bottom: 1.25rem;
  font-weight: bold;
}

.link {

 color: var(--gray);
 font-size: 0.9rem;
 margin: 1.5rem 0;
 text-decoration: none;
}

.explanation {
  position: absolute;
  top: 3.5cm;
  right: 1cm;
  font-weight: 500;
  color: white;
  font-size: 16px;
  font-style: italic;
}

.container {
  margin-top: 2.4cm;
 background-color: var(--white);
 border-radius: var(--button-radius);
 box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
  0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
 height: var(--max-height);
 max-width: var(--max-width);
 overflow: hidden;
 position: relative;
 width: 100%;
  --white: #e9e9e9;
 --gray: #333;
 --blue: #0367a6;
 --lightblue: #008997;


 /* RADII */
 --button-radius: 0.7rem;

 /* SIZES */
 --max-width: 758px;
 --max-height: 420px;

 font-size: 16px;
 font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
  Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

}

.container__form {
 height: 100%;
 position: absolute;
 top: 0;
 transition: all 0.6s ease-in-out;

}

.container--signin {
 left: 0;
 width: 50%;
 z-index: 2;
}

.container.right-panel-active .container--signin {
 transform: translateX(100%);

}

.container--signup {
 left: 0;
 opacity: 0;
 width: 50%;
 z-index: 1;
margin-left: -40px;

}

.container.right-panel-active .container--signup {
 -webkit-animation: show 0.6s;
         animation: show 0.6s;
 opacity: 1;
 transform: translateX(100%);
 z-index: 5;
}

.container__overlay {
 height: 100%;
 left: 50%;
 overflow: hidden;
 position: absolute;
 top: 0;
 transition: transform 0.6s ease-in-out;
 width: 50%;
 z-index: 100;

}

.container.right-panel-active .container__overlay {
 transform: translateX(-100%);
}

.overlay {

 background-color: var(--lightblue);
 background: url("https://res.cloudinary.com/dci1eujqw/image/upload/v1616769558/Codepen/waldemar-brandt-aThdSdgx0YM-unsplash_cnq4sb.jpg");
 background-attachment: fixed;
 background-position: center;
 background-repeat: no-repeat;
 background-size: cover;
 height: 100%;
 left: -100%;
 position: relative;
 transform: translateX(0);
 transition: transform 0.6s ease-in-out;
 width: 200%;

}

.container.right-panel-active .overlay {
 transform: translateX(50%);

}

.overlay__panel {
 align-items: center;
 display: flex;
 flex-direction: column;
 height: 100%;
 justify-content: center;
 position: absolute;
 text-align: center;
 top: 0;
 transform: translateX(0);
 transition: transform 0.6s ease-in-out;
 width: 50%;

}

.overlay--left {
 transform: translateX(-20%);
}

.container.right-panel-active .overlay--left {
 transform: translateX(0);
}

.overlay--right {
 right: 0;
 transform: translateX(0);
}

.container.right-panel-active .overlay--right {
 transform: translateX(20%);
}

.btn {
 background-color: var(--blue);
 background-image: linear-gradient(90deg, var(--blue) 0%, var(--lightblue) 74%);
 border-radius: 20px;
 border: 1px solid var(--blue);
 color: var(--white);
 cursor: pointer;
 font-size: 0.8rem;
 font-weight: bold;
 letter-spacing: 0.1rem;
 padding: 0.9rem 4rem;
 text-transform: uppercase;
 transition: transform 80ms ease-in;

}

.form > .btn {
 margin-top: 1.5rem;
}

.btn:active {
 transform: scale(0.95);
}

.btn:focus {
 outline: none;
}

.form {

 background-color: var(--white);
 display: flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 padding: 0 3rem;
 height: 100%;
 text-align: center;

}

.input {
 background-color: #fff;
 border: none;
 padding: 0.9rem 0.9rem;
 margin: 0.5rem 0;
 width: 100%;
}



@-webkit-keyframes show {
 0%,
 49.99% {
  opacity: 0;
  z-index: 1;
 }

 50%,
 100% {
  opacity: 1;
  z-index: 5;
 }
}

@keyframes show {
 0%,
 49.99% {
  opacity: 0;
  z-index: 1;
 }

 50%,
 100% {
  opacity: 1;
  z-index: 5;
 }
}
</style>