<script>
export default {
  components: {},
  data() {
    return {
      tel: "",
      email: "",
    };
  },
  methods: {},
  mounted() {},
};
</script>
<template>
  <div class="banner">
    <div class="banner-name">Получайте выгодные предложения</div>
    <div class="banner-form">
      <input type="tel" placeholder="Номер телефона" v-model="tel" />
      <input type="email" placeholder="Электронная почта" v-model="email" />
      <button class="banner-btn">ЗАРЕГИСТРИРОВАТЬСЯ</button>
    </div>
  </div>
</template>

<style scoped>
.banner {
  width: 90%;
  margin: 0 auto;
  background-color: black;
  padding: 30px 58px;
  display: flex;
  border-radius: 20px;
  align-items: center;
}

.banner-name {
  flex: 70%;
  color: #ffffff;
  font-size: 30px;
  font-weight: 700;
  line-height: 35px;
}

.banner-form {
  flex: 30%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.banner-form input {
  background: transparent;
  border: none;
  outline: none;
  border-bottom: 1px solid #fff;
  padding: 5px;
  color: #fff;
  font-weight: 400;
}

.banner-form button {
  border: none;
  border-radius: 25px;
  color: #fff;
  padding: 12px 32px;
  background-color: #fb9633;
  font-weight: 700;
  letter-spacing: 4%;
  line-height: 23px;
  font-size: 17px;
}

.banner-form input::placeholder {
  color: #fff;
  font-size: 15px;
}

@media (max-width: 960px) {
    .banner {
        width: 80%;
    }
}

@media (max-width: 720px) {
    .banner {
        padding: 25px;
    }

    .banner-name {
        font-size: 23px;
    }
}

@media (max-width: 650px) {
    .banner {
        width: 80%;
        padding: 25px;
    }

    .banner-form button {
        font-size: 13px;
        padding: 8px 20px;
    }
}

@media (max-width: 454px) {
    .banner {
        width: 80%;
        padding: 15px;
    }

    .banner-name {
        font-size: 20px;
    }

    .banner-form button {
        padding: 8px;
        font-size: 11px;
    }
}

@media (max-width: 385px) {
    .banner {
        width: 90%;
    }

    .banner-name {
        font-size: 16px;
    }

    .banner-input {
        font-size: small;
    }
}
</style>
