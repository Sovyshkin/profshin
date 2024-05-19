<script>
import axios from "axios";
import FavoriteCheckbox from "@/components/Icons/FavoriteCheckbox";
import RatingComponent from "@/components/RatingComponent";
import AvailableCount from "@/components/AvailableCount";
import AddToCartComponent from "@/components/AddToCartComponent";
import TagsDrawer from "@/components/TagsDrawer";
import GoodPage from "../views/CardPage.vue";

export default {
  components: {
    FavoriteCheckbox,
    RatingComponent,
    AvailableCount,
    AddToCartComponent,
    TagsDrawer,
  },
  props: {
    good: Object,
  },
  data() {
    return {};
  },
  methods: {
    goToGood() {
      this.$router.push({
        name: "Good",
        params: { id: this.good.code },
        query: { good: JSON.stringify(this.good) },
      });
    },
  },
  mounted() {},
};
</script>
<template>
  <div class="good" @click="goToGood(good)">
    <div class="good-media">
      <img class="good-image" alt="" :src="good.href" />

      <TagsDrawer class="good-tags" />
    </div>
    <div class="mt-2 flex justify-space-between">
      <div class="f-16 fw-300 font-for-count">{{ good.tmc }}</div>
      <FavoriteCheckbox @update="emits('update', $event)" />
    </div>
    <div class="flex mt-2 align-center">
      <RatingComponent :rating="4" />
      <div class="f-12 ml-3">4 отзыва</div>
    </div>
    <!-- <AvailableCount class="mt-2" :count="localGood.count" /> -->
    <div class="flex justify-space-between mt-3">
      <div class="f-20 fw-700 raleway">{{ good.price }} ₽</div>
      <AddToCartComponent :good="good" class="flex gap-2" />
    </div>
  </div>
</template>

<style scoped>
.good {
  background: #ebebeb;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 80%;
  max-width: 190px;
  cursor: pointer;
  @media (min-width: 720px) {
    width: fit-content;
  }
}

.good-media {
  position: relative;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.good-tags {
  position: absolute;
  left: 10px;
  bottom: 10px;
}

.good-image {
  object-fit: cover;
  height: 200px;
  width: 176px;
}
</style>
