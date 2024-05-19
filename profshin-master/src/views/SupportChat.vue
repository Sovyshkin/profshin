<script>
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/ru";

export default {
  components: {},
  data() {
    return {
      message: "",
      status: "",
      ticket: "",
      messages: [],
    };
  },
  methods: {
    async setMessage() {
      if (this.message) {
        let response = await axios.post(`/send_message`, {
          params: {
            message: this.message,
            ticket: this.getCookieValue("ticket") || "False",
            time: dayjs().format("D MMM, H:mm"),
          },
        });
        this.status = response.data.status;
        this.ticket = response.data.ticket;
        if (this.status == "200") {
          this.message = "";
          this.load_info();
          if (this.ticket) {
            document.cookie = `ticket=${this.ticket}; max-age=${45 * 86400}`;
          }
        }
      }
    },

    async load_info() {
      this.ticket = this.getCookieValue("ticket");
      if (this.ticket) {
        let response = await axios.post(`/get_messages`, {
          params: {
            ticket: this.ticket,
          },
        });
        this.messages = response.data;
      }
    },

    getCookieValue(name) {
      const cookies = document.cookie.split("; ");
      let res;
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        if (cookie.slice(0, 6) == name) {
          res = cookie.replace(name + "=", "");
        }
      }
      return res;
    },
  },
  async mounted() {
    await this.load_info();
  },
};
</script>

<template>
  <div class="wrapper">
    <div class="chat">
      <div class="wrap_title"></div>
      <div class="cont">
        <div class="wrap_msg" :class="{ ans: msg.ans }" v-for="msg in messages">
          <div class="message">
            <span class="text">{{ msg.message }}</span>
            <div class="time font-for-count">{{ msg.time }}</div>
          </div>
        </div>
      </div>
      <form @submit.prevent="setMessage" class="wrap_send">
        <textarea
          v-model="message"
          cols="30"
          rows="10"
          placeholder="Введите сообщение..."
        ></textarea>
        <button type="submit">
          <img src="../assets/send.png" alt="" />
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
}

.ans {
  display: flex;
  justify-content: start !important;
}

.cont {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-left: 7px;
  min-height: 60vh;
  gap: 12px;
  overflow-x: hidden;
  overflow-y: scroll;
}

.wrap_msg {
  width: 95%;
  display: flex;
  justify-content: end;
}

.chat {
  display: flex;
  flex-direction: column;
  width: 80%;
  min-height: 60vh;
  margin-top: 15px;
  border: 1px solid black;
  border-radius: 15px;
}

.wrap_send {
  display: flex;
  align-items: center;
  gap: 10px;
}

.wrap_send img {
  height: 30px !important;
  width: auto !important;
  cursor: pointer;

  transition: all 400ms ease;
}

.wrap_send img:hover {
  transform: translateY(-5px);
}

.wrap_send textarea {
  border: none;
  border-top: 1px solid black;
  border-right: 1px solid black;
  border-radius: 15px;
  padding: 10px 20px;
  max-height: 50px;
  min-height: 50px;
  min-width: 90%;
  width: 90%;
}

.message {
  position: relative;
  border: 1px solid black;
  border-radius: 15px;
  min-height: 35px;
  padding: 5px 8px 15px 8px;
  width: auto;
  min-width: 180px;
  max-width: 80%;
}

.time {
  position: absolute;
  bottom: 3%;
  right: 3%;
  font-size: 0.7rem;
}

.text {
  word-wrap: break-word;
}
</style>
