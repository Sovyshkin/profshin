<script>
import axios from "axios";
import AddToCartComponent from "@/components/AddToCartComponent";
import AvailableCount from "@/components/AvailableCount";
import DataDropdown from "@/components/DataDropdown";

export default {
  components: {
    AddToCartComponent,
    AvailableCount,
    DataDropdown,
  },
  data() {
    return {
      good: {},
      characteristic: [],
    };
  },
  methods: {
    widthHeight(s) {
      s = s.split(" ");
      console.log("функция", s[s.length - 4]);
      return s[s.length - 4];
    },

    getCard() {
      this.good = JSON.parse(this.$route.query.good);
      let sezon, typeCar;
      if (this.good.cargo) {
        typeCar = "Грузовой";
      } else {
        typeCar = "Легковой";
      }

      if (this.good) {
        sezon = "Летнняя";
      } else {
        sezon = "Зимняя";
      }
      this.characteristic = [
        { title: "Артикул", value: this.good.code },
        { title: "Сезонность", value: sezon },
        { title: "Тип автомобиля", value: typeCar },
        {
          title: "Ширина",
          value: this.widthHeight(this.good.tmc).split("x")[0],
        },
        {
          title: "Высота",
          value: this.widthHeight(this.good.tmc).split("x")[1],
        },
      ];
    },
  },
  mounted() {
    this.getCard();
  },
};
</script>
<template>
  <div class="flex-column flex align-center mb-4 mt-2">
    <div class="flex flex-column container baza">
      <div class="good">
        <!-- <Carousel /> -->
        <div class="image">
          <img :src="good.href" alt="" />
        </div>
        <div class="good-data w-full ml-5">
          <div class="title underline pb-3 f-32 fw-400 font-for-count">
            {{ good.tmc }}
          </div>
          <div class="flex mt-2 align-center mt-3">
            <RatingComponent :rating="4" />
            <div class="f-12 ml-3">4 отзыва</div>
          </div>
          <div class="flex gap-3 mt-4">
            <div class="item-info flex flex-column w-full gap-4">
              <div class="fw-600 f-20">Характеристики:</div>
              <div
                class="w-full flex justify-space-between"
                v-for="(i, id) in characteristic"
              >
                <div class="fw-400 f-16">{{ i.title }}:</div>
                <div class="fw-700 f-16 font-for-count">{{ i.value }}</div>
              </div>
            </div>
            <!-- <AddToCartComponent :max="999" :is-small="false" /> -->
          </div>
        </div>
        <!-- <div v-else class="flex flex-column">
          <div class="flex justify-space-between align-end">
            <div class="f-12 fw-400">Цена за одну шт.:</div>
            <div class="f-20 fw-700 primary-color">
              {{ good.price + " ₽" }}
            </div>
          </div>
          <div class="flex justify-space-between align-end mt-3">
            <div v-if="goodsInCart" class="f-12 fw-400">Итого:</div>
            <div v-if="goodsInCart" class="f-14 fw-400">
              {{ numberWithSpaces(good.cost * goodsInCart) + " ₽" }}
            </div>
          </div>

          <AddToCartComponent class="mt-3" :good="good" />
          <AvailableCount class="mt-3" :count="good.count" />
        </div> -->
      </div>
    </div>
    <!-- <DataDropdown
      title="Характеристики"
      class="mt-3 container dataDropdown"
      style="padding: 25px !important; box-sizing: border-box"
      :active="true"
    >
      <div class="flex flex-column w-full gap-4 mt-4">
        <div
          v-for="(i, id) in charactetistic"
          class="w-full flex justify-space-between"
        >
          <div class="fw-400 f-16">{{ i.title }}:</div>
          <div class="fw-700 f-16">{{ i.value }}</div>
        </div>
      </div>
    </DataDropdown> -->
  </div>
</template>

<style scoped>
.good {
  display: flex;
  border-radius: 20px;
  background: #ebebeb;
  padding: 25px;
}

.image img {
  height: 40vh;
  border-radius: 20px;
}

.good-data {
  display: flex;
  flex-direction: column;
}

.dataDropdown {
  display: none;
}

@media (max-width: 770px) {
  .image img {
    height: 25vh;
  }
  .title {
    font-size: 24px !important;
  }

  .good-data {
    margin-left: 10px !important;
  }
}

@media (max-width: 520px) {
  .good {
    flex-direction: column;
    gap: 10px;
  }

  .image {
    margin: 0 auto;
  }

  .good-data {
    margin-left: 0 !important;
  }
}

@media (max-width: 340px) {
  .image img {
    height: 20vh;
  }

  .title {
    font-size: 20px !important;
  }

  .item-info div {
    font-size: 0.8rem !important;
  }
}
</style>
