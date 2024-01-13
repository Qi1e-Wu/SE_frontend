<template>
  <div class="feedback-container">
    <h2>建议与反馈</h2>
    <form @submit.prevent="submitFeedback">

      <div class="input-group">
        <textarea id="建议与反馈" v-model="feedback.message" placeholder="Your Message" required></textarea>
      </div>
      
      <div class="button-group">
          <button type="submit" class="btn feedback-btn">提交</button>
        </div>
    </form>
  </div>
</template>

<script>
import { getInfo } from "@/api/user";
import { addFeedback } from "@/api/feedback"
export default {
  name: 'Feedback',
  data() {
    return {
      feedback: {
        userid: '',
        username: '',
        email: '',
        message: ''
      }
    }
  },
  methods: {
    submitFeedback() {
        console.log(this.feedback.message)
        addFeedback(this.feedback.message)
            this.$message({
                message: '反馈提交成功',
                type: 'success'
              })
    }
  }
}
</script>

<style scoped>
.feedback-container {
  max-width: 700px; /* Match the width of the login and register containers */
  margin: auto;
  padding: 40px;
  border: 5px solid #eaeaea;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  background-color: #fff;
}

.input-group {
  margin-bottom: 20px;
}

.input-group input,
.input-group textarea {
  width: calc(100% - 20px); /* Adjust width to have blank space on sides */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}

.button-group {
  display: flex;
  justify-content: center; /* Center the button */
}

.btn.feedback-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: rgb(149, 20, 17);
  color: white;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  width: 100%; /* Make the button full-width within the container */
}

button:hover {
  opacity: 0.8;
}
</style>