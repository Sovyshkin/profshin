<script>
import Banner from "@/components/Banner.vue";
import axios from 'axios'

export default {
  components: {
    Banner,
  },
  data() {
    return {
      tractorCount: 2,
      trailerCount: 1,
      tractorInd: 2,
      trailerInd: 1,
      tractor: [
        { id: 1, isChecked: false },
        { id: 2, isChecked: true },
      ],
      trailer: [{ id: 1, isChecked: true }],
      summ: 0,
      tel: "",
      email: "",
    };
  },
  methods: {
    plus(s) {
      if (s == "tractor") {
        if (this.tractorCount < 4) {
          this.tractorCount += 1;
          this.tractorInd += 1;
          this.tractor.push({ id: this.tractorInd, isChecked: true });
        }
      } else {
        if (this.trailerCount < 26) {
          this.trailerInd += 1;
          this.trailerCount += 1;
          this.trailer.push({ id: this.trailerInd, isChecked: true });
        }
      }
    },
    minus(s) {
      if (s == "tractor") {
        if (this.tractorCount > 2) {
          this.tractorInd -= 1;
          this.tractorCount -= 1;
          this.tractor.pop();
        }
      } else {
        if (this.trailerCount > 1) {
          this.trailerInd -= 1;
          this.trailerCount -= 1;
          this.trailer.pop();
        }
      }
    },

    async test () {
      let response = await axios.post(`/filter`)
      console.log(response.data)
    },

    updateCheckbox(i, s) {
      if (s == "tractor") {
        this.tractor[i - 1].isChecked = !this.tractor[i - 1].isChecked;
      } else {
        this.trailer[i - 1].isChecked = !this.trailer[i - 1].isChecked;
      }
    },
  },
  mounted() {
    this.test()
  },
};
</script>
<template>
  <div class="wrapper">
    <div class="title">Система EVA PRO</div>
    <div class="group">
      <div class="group-name">Выберите тип автомобиля</div>
      <ul class="list-group">
        <li class="group-item">
          <input
            type="radio"
            name="typeCar"
            id="trawlTrailer"
            class="radio-hidden"
          />
          <label class="radio-label" for="noIntegration"></label>
          <label for="trawlTrailer">Тягач с тральным прицепом</label>
        </li>
        <li class="group-item">
          <input
            type="radio"
            name="typeCar"
            id="seatTractor"
            class="radio-hidden"
          />
          <label class="radio-label" for="noIntegration"></label>
          <label for="seatTractor">Сидельный тягач с прицепом</label>
        </li>
        <li class="group-item">
          <input
            type="radio"
            name="typeCar"
            id="roadTrain"
            class="radio-hidden"
          />
          <label class="radio-label" for="noIntegration"></label>
          <label for="roadTrain">Автопоезд</label>
        </li>
        <li class="group-item">
          <input
            type="radio"
            name="typeCar"
            id="dumpTrack"
            class="radio-hidden"
          />
          <label class="radio-label" for="noIntegration"></label>
          <label for="dumpTrack">Самосвал до 30 тонн</label>
        </li>
      </ul>
    </div>
    <div class="contructor">
      <div class="group-name">Выберите конфигурацию колесной схемы</div>
      <div class="constructor-name">
        <span>Тягач</span>
        <span>Спаренная ошиновка</span>
      </div>
      <div class="group-counter">
        <div class="name-count">Осей:</div>
        <div class="counter">
          <img
            @click="minus('tractor')"
            class="plmn"
            src="@/assets/minus.jpeg"
            alt="minus"
          />
          <span class="count font-for-count">{{ tractorCount }}</span>
          <img
            @click="plus('tractor')"
            class="plmn"
            src="@/assets/plus.jpeg"
            alt="plus"
          />
        </div>
      </div>
      <div class="tractor">
        <div class="wrapper-for-axis" v-for="i in tractorCount">
          <div class="emp"></div>
          <div class="axis-1" :class="{ 'd-none': tractor[i - 1].isChecked }">
            <div class="tire"></div>
            <div class="connection">
              <div class="circle"></div>
            </div>
            <div class="tire"></div>
          </div>
          <div class="axis-2" :class="{ 'd-none': !tractor[i - 1].isChecked }">
            <div class="tire"></div>
            <div class="tire"></div>
            <div class="connection">
              <div class="circle"></div>
            </div>
            <div class="tire"></div>
            <div class="tire"></div>
          </div>
          <input
            type="checkbox"
            :checked="tractor[i - 1].isChecked"
            @change="updateCheckbox(i, 'tractor')"
          />
        </div>
      </div>
    </div>
    <div class="contructor">
      <div class="constructor-name">
        <span>Прицеп</span>
        <span></span>
      </div>
      <div class="group-counter">
        <div class="name-count">Осей:</div>
        <div class="counter">
          <img
            @click="minus('trailer')"
            class="plmn"
            src="@/assets/minus.jpeg"
            alt="minus"
          />
          <span class="count font-for-count">{{ trailerCount }}</span>
          <img
            @click="plus('trailer')"
            class="plmn"
            src="@/assets/plus.jpeg"
            alt="plus"
          />
        </div>
      </div>
      <div class="tractor">
        <div class="wrapper-for-axis" v-for="i in trailerCount">
          <div class="emp"></div>
          <div class="axis-1" :class="{ 'd-none': trailer[i - 1].isChecked }">
            <div class="tire"></div>
            <div class="connection">
              <div class="circle"></div>
            </div>
            <div class="tire"></div>
          </div>
          <div class="axis-2" :class="{ 'd-none': !trailer[i - 1].isChecked }">
            <div class="tire"></div>
            <div class="tire"></div>
            <div class="connection">
              <div class="circle"></div>
            </div>
            <div class="tire"></div>
            <div class="tire"></div>
          </div>
          <input
            type="checkbox"
            :checked="trailer[i - 1].isChecked"
            @change="updateCheckbox(i, 'trailer')"
          />
        </div>
      </div>
    </div>
    <div class="group">
      <div class="group-name">Выберите тип датчиков</div>
      <ul>
        <li class="group-item">
          <input
            type="radio"
            name="typeSensor"
            id="externalSensor"
            class="radio-hidden"
          />
          <label class="radio-label" for="noIntegration"></label>
          <label for="externalSensor"
            >Наружный датчик давления EVA PRO SO₁ на вентиль V8</label
          >
        </li>
        <li class="group-item">
          <input
            type="radio"
            name="typeSensor"
            id="internalModule"
            class="radio-hidden"
          />
          <label class="radio-label" for="noIntegration"></label>
          <label for="internalModule"
            >Внутренний колесный модуль EVA PRO S₂ с хомутом</label
          >
        </li>
      </ul>
    </div>
    <div class="group">
      <div class="group-name">Интеграция в системе мониторинга</div>
      <ul>
        <li class="group-item">
          <input
            type="radio"
            name="intergration"
            id="canTire"
            class="radio-hidden"
          />
          <label class="radio-label" for="canTire"></label>
          <label for="canTire">Подключение к CAN шине</label>
        </li>
        <li class="group-item">
          <input
            type="radio"
            name="intergration"
            id="troughInterface"
            class="radio-hidden"
          />
          <label class="radio-label" for="troughInterface"></label>
          <label for="troughInterface"
            >Интеграция через интерфейс
            <span class="font-for-count">485</span></label
          >
        </li>
        <li class="group-item">
          <input
            type="radio"
            name="intergration"
            id="noIntegration"
            class="radio-hidden"
          />
          <label class="radio-label" for="noIntegration"></label>
          <label for="noIntegration">Без интеграции</label>
        </li>
      </ul>
    </div>
    <div class="cart">
      <span class="font-for-count sum-itog">Итого: {{ summ }} руб.</span>
      <ul class="group-cart">
        <li class="item-group-cart">
          <img src="" alt="" class="cart-img" />
          <div class="desc">
            <span class="desc-name"></span>
            <span class="price">{{ price }} ₽ / шт.</span>
          </div>
          <div class="price-count">
            <span class="price"></span>
            <div class="counter">
              <img
                @click="minus('trailer')"
                class="plmn"
                src="@/assets/minus.jpeg"
                alt="minus"
              />
              <span class="count font-for-count">{{ trailerCount }}</span>
              <img
                @click="plus('trailer')"
                class="plmn"
                src="@/assets/plus.jpeg"
                alt="plus"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
    <Banner></Banner>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 50px 150px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.title {
  font-size: 64px;
  font-weight: 700;
  line-height: 75.14px;
}

.group-name {
  font-size: 24px;
  font-weight: 600;
  line-height: 28.18px;
}

.group-item {
  margin-top: 5px;
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1 1 48%;
}

.list-group {
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.group-item label {
  font-size: 20px;
  font-weight: 600;
  line-height: 23.48px;
}

.radio-hidden {
  display: none;
}

.radio-label {
  display: inline-block;
  padding: 3px;
  width: 5px;
  height: 5px;
  background-color: #ffffff;
  border: 2px solid #000000;
  border-radius: 50%;
}

.radio-hidden:checked + .radio-label {
  background-color: #fb9633;
}

input[type="checkbox"] {
  padding: 10px;
  transform: scale(1.5);
  accent-color: #fb9633;
  color: #ffffff;
}

.tire {
  width: 45.46px;
  height: 121.78px;
  border-radius: 10px;
  background-color: #a5a5a5;
}

.connection {
  width: 136.39px;
  height: 13.54px;
  background-color: #a5a5a5;
  border-radius: 10px;
  display: flex;
  justify-content: center;
}

.plmn {
  height: 17px;
  cursor: pointer;
  transition: all 400ms ease;
}

.plmn:hover,
.plmn:active,
.plmn:focus {
  transform: scale(1.1);
}

.group-counter {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
}

.counter {
  display: flex;
  align-items: center;
  gap: 10px;
}

.count {
  font-size: 24px;
  font-weight: 400;
  line-height: 28px;
}

.constructor-name {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.constructor-name span {
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
}

.wrapper-for-axis {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.axis-1,
.axis-2 {
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
}

.circle {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: #a5a5a5;
  transform: translateY(-9px);
}

.d-none {
  display: none;
}

.tractor {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.group-cart {
  width: 80%;
}

.item-group-cart {
  width: 100%;
  border-bottom: 2px solid #fb9633;
  display: flex;
  gap: 10px;
}

.cart-img {
  height: 84px;
  width: 84px;
  border: 1px solid #a5a5a5;
  border-radius: 12px;
}

.desc {
  flex: 60%;
}

.price-count {
}

.sum-itog {
  font-size: 26px;
  font-weight: 700;
  line-height: 35px;
}

@media (max-width: 960px) {
  .wrapper {
    padding: 50px 80px;
  }

  .list-group {
    width: 100%;
  }
}

@media (max-width: 700px) {
  .title {
    font-size: 50px;
  }

  .wrapper {
    padding: 30px 50px;
  }

  .group-item label {
    font-size: 18px;
  }

  .tire {
    width: 32px;
    height: 86px;
  }
}

@media (max-width: 600px) {
  .list-group {
    flex-direction: column;
  }
}

@media (max-width: 500px) {
  .wrapper {
    padding: 20px;
  }
}
</style>
