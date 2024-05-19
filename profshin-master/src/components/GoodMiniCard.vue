<template>
  <div class="good" @click.stop="goToGood(localGood.id)">
    <div class="good-media">
      <img class="good-image" alt="" :src="localGood.src[0]" />

      <TagsDrawer class="good-tags" :tags="localGood.tags" />
    </div>
    <div class="mt-2 flex justify-space-between">
      <div class="f-16 fw-300">{{ localGood.name }}</div>
      <FavoriteCheckbox
        v-model="localGood.isFavorite"
        @update="emits('update', $event)"
      />
    </div>
    <div class="flex mt-2 align-center">
      <RatingComponent :rating="localGood.rating" />
      <div class="f-12 ml-3">
        {{
          numberWithSpaces(localGood.reviewsCount) +
          " " +
          num_word(localGood.reviewsCount, ["отзыв", "отзыва", "отзывов"])
        }}
      </div>
    </div>
    <AvailableCount class="mt-2" :count="localGood.count" />
    <div class="flex justify-space-between mt-3">
      <div class="f-20 fw-700 raleway">
        {{ numberWithSpaces(localGood.cost) }} ₽
      </div>
      <AddToCartComponent :good="localGood" class="flex gap-2" />
    </div>
  </div>
</template>

<script setup>
import { goodsTagsSrc } from "@/enums/good-types";
import { computed, ref } from "vue";
import { num_word } from "@/utils/num_word";
import { numberWithSpaces } from "@/utils/number_no_spaces";
import FavoriteCheckbox from "@/components/Icons/FavoriteCheckbox";
import RatingComponent from "@/components/RatingComponent";
import AvailableCount from "@/components/AvailableCount";
import AddToCartComponent from "@/components/AddToCartComponent";
import TagsDrawer from "@/components/TagsDrawer";
import router from "@/router";

const props = defineProps({
  good: {
    type: Object,
    required: true,
  },
});

const count = ref(0);

const emits = defineEmits(["update"]);

const goToGood = (code) => {
  console.log(code);
  router.push({
    name: "Good",
    params: { code },
    query: { title: props.good.name },
  });
};

const localGood = computed({
  get() {
    return props.good;
  },
  set(val) {
    console.log(val);
    emits("update", val);
  },
});
</script>

<style lang="stylus" scoped>
@import "../styles/variables.styl"
padding = 16

.good
  background $gray
  border-radius 20px
  display flex
  flex-direction column
  padding (padding) px
  width 80%
  @media(min-width 720px)
    max-width ($miniCardWidth - (padding * 2)) px
    width fit-content

.good-media
  position relative
  background white
  border-radius 20px
  overflow hidden
  display flex
  justify-content center


.good-tags
  position absolute
  left 10px
  bottom 10px


.good-image
  object-fit cover
  height 200px
  width 176px
</style>
