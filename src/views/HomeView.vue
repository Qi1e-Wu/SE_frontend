<template>
  <div>
  <div class="container">
        <div class="welcome-message">
          <h1>行为科学在线实验平台</h1>
          <h2> {{ username }}，欢迎您!</h2>
        </div>
        <div class="line"></div>
        <div class="space"></div>
        <div class="image-container">
        <div class="image-wrapper">
          <img class="compressed-image" src="../assets/plus.png" alt="Your Image">
        </div>
      </div>
  </div>
  </div>
</template>

<script>
import { getInfo } from "@/api/user";
export default {
  name: "SuccessPage",
  data() {
    return {
      username: "",
    };
  },
  mounted() {
    getInfo().then((res) => {
      this.username = res.data.username;
    });
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  padding: 10px;
}

.welcome-message {
  text-align: center;
  font-size: 18px;
  color: #378ee6;
  margin-top: 30px;
}



.line {
  width: calc(100% - 20px);
  height: 2px;
  background-color: #f2f2f2;
  margin-top: 10px;
  margin-bottom: 10px;
}

.image-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.space1{
  height: 27px;
}

.space2{
  height: 200px;
}

.image-wrapper {
  width: 100%; /* 图片宽度与页面相同 */
  max-width: 1200px;
  margin-right: 10px;
  overflow: hidden;
}

.compressed-image {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.space{
  height: 180px;
}

</style>
