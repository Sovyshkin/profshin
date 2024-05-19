<template>
  <div class="flex-column flex align-center mb-4">
    <div class="flex flex-column container">
      <div
        class="good flex"
        :class="uiStore.mdAndDown ? 'flex-column gap-4 mt-2' : 'mt-5'"
      >
        <Carousel :src="good.src" :tags="good.tags" />
        <div class="good-data w-full ml-5" v-if="uiStore.mdAndUp">
          <div class="title underline pb-3 f-32 fw-400">{{ good.name }}</div>
          <div class="flex mt-2 align-center mt-3">
            <RatingComponent :rating="good.rating" />
            <div class="f-12 ml-3">
              {{
                numberWithSpaces(good.reviewsCount) +
                " " +
                num_word(good.reviewsCount, ["отзыв", "отзыва", "отзывов"])
              }}
            </div>
          </div>
          <div class="flex gap-3 mt-4">
            <div class="flex flex-column w-full gap-4">
              <div class="fw-600 f-20">Характеристики:</div>
              <div
                v-for="(characteristic, id) in charactetistics"
                :key="id"
                class="w-full flex justify-space-between"
              >
                <div class="fw-400 f-16">{{ characteristic.title }}:</div>
                <div class="fw-700 f-16">{{ characteristic.value }}</div>
              </div>
            </div>
            <AddToCartComponent :max="999" :good="good" :is-small="false" />
          </div>
        </div>
        <div v-else class="flex flex-column">
          <div class="flex justify-space-between align-end">
            <div class="f-12 fw-400">Цена за одну шт.:</div>
            <div class="f-20 fw-700 primary-color">
              {{ numberWithSpaces(good.cost) + " ₽" }}
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
        </div>
      </div>
    </div>
    <DataDropdown
      v-if="uiStore.mdAndDown"
      title="Характеристики"
      class="mt-3 container"
      style="padding: 25px !important; box-sizing: border-box"
      :active="true"
    >
      <div class="flex flex-column w-full gap-4 mt-4">
        <div
          v-for="(characteristic, id) in charactetistics"
          :key="id"
          class="w-full flex justify-space-between"
        >
          <div class="fw-400 f-16">{{ characteristic.title }}:</div>
          <div class="fw-700 f-16">{{ characteristic.value }}</div>
        </div>
      </div>
    </DataDropdown>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import router from "@/router";
import { useCatalogStore, useUiStore } from "@/store";
import {
  carTypesReadable,
  characteristicsReadable,
  goodsTagsReadable,
  goodsTagsSrc,
  GoodTypes,
  measuredReadable,
} from "@/enums/good-types";
import Carousel from "@/components/Carousel";
import RatingComponent from "@/components/RatingComponent";
import { num_word } from "@/utils/num_word";
import { numberWithSpaces } from "@/utils/number_no_spaces";
import AddToCartComponent from "@/components/AddToCartComponent";
import AvailableCount from "@/components/AvailableCount";
import DataDropdown from "@/components/DataDropdown";
import axios from "axios";

const store = useCatalogStore();
const uiStore = useUiStore();
const good = ref(Null);

const breadcrumbs = computed(() => {
  let array = [{ name: "Goods", title: "Каталог" }];
  if (good.value && good.value.type === GoodTypes.TIRES) {
    array.push({ name: "Tires", title: "Шины" });
  }
  if (good.value && good.value.type === GoodTypes.RIMS) {
    array.push({ name: "Rims", title: "Диски" });
  }
  return array;
});

const goodsInCart = computed(() => {
  return store.cart.filter((x) => x.code === good.value.code).length;
});

const charactetistics = computed(() => {
  return Object.keys(good.value.data).map((x) => {
    if (x === "season") {
      return {
        title: characteristicsReadable(x),
        value: goodsTagsReadable(good.value.data[x]),
      };
    }
    if (x === "car_type") {
      return {
        title: characteristicsReadable(x),
        value: carTypesReadable(good.value.data[x]),
      };
    } else {
      return {
        title: characteristicsReadable(x),
        value: good.value.data[x] + measuredReadable(x),
      };
    }
  });
});

const getCard = async () => {
  let response = await axios.post(`/set_card`, {
    params: {},
  });
};
onMounted();
</script>

<style lang="stylus" scoped>
@import '../styles/variables.styl'
.good
  border-radius 20px
  background $gray
  padding 25px

.good-data
  display flex
  flex-direction column
</style>
