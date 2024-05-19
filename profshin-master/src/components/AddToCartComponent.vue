<template>
  <div>
    <div class="flex gap-2" v-if="props.isSmall">
      <div
        class="count flex white-color gap-3 align-center"
        style="user-select: none"
      >
        <div class="fw-800 pointer f-20" @click.stop="add(-1)">-</div>
        <div class="f-16" style="min-width: 10px">{{ count }}</div>
        <div class="fw-800 pointer f-20" @click.stop="add(1)">+</div>
      </div>
      <button v-if="showCart" @click.stop="toCart()" class="cart">
        <CartIcon />
      </button>
    </div>
    <div class="good-purchase-wrapper" v-else>
      <div class="good-purchase">
        <div class="fw-700 f-32">{{ good.price }} руб.</div>
        <div class="flex justify-space-around align-center mt-4">
          <div
            class="fw-800 pointer f-20 add-button"
            style="user-select: none"
            @click.stop="add(-1)"
          >
            -
          </div>
          <div class="f-20" style="min-width: 10px">{{ count }}</div>
          <div
            class="fw-800 pointer f-20 add-button"
            style="user-select: none"
            @click.stop="add(1)"
          >
            +
          </div>
        </div>
        <div class="relative mt-5 flex justify-end" v-if="showCount">
          <div
            class="flex gap-2 underline fw-400 f-12 pb-2 w-full text-align-center"
            style="width: fit-content !important"
          >
            <span class="primary-color fw-700">В наличии</span
            >{{ good.count }} шт.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCatalogStore } from "@/store";
import { computed } from "vue";
import CartIcon from "@/components/Icons/CartIcon";
import router from "@/router";
import { numberWithSpaces } from "@/utils/number_no_spaces";
const props = defineProps({
  good: {
    type: Object,
    required: true,
  },
  isSmall: {
    type: Boolean,
    default: () => true,
  },
  showCart: {
    type: Boolean,
    default: () => true,
  },
  showCount: {
    type: Boolean,
    default: () => true,
  },
});
const store = useCatalogStore();

const toCart = () => {
  router.push({ name: "Cart" });
};

const count = computed(() => {
  return store.cart.filter((x) => x.id === props.good.id).length;
});

const add = (val) => {
  console.log(val);
  if (count.value + val >= 0 && count.value + val <= props.good.count) {
    if (val > 0) {
      console.log("add " + props.good);
      store.cart.push(props.good);
    } else {
      console.log("remove " + props.good);
      let index = store.cart.indexOf(props.good);
      if (index > -1) {
        store.cart.splice(index, 1);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "../styles/variables.styl"
.count
  background $primary
  padding 4px
  border-radius 8px

.cart
  background $primary
  padding 4px 8px
  border-radius 8px
  display flex
  justify-content center
  align-items center

.underline
  border-bottom 1px $primary solid

.good-purchase-wrapper
  padding 10px

.good-purchase
  position relative
  background white
  border-radius 20px
  padding 20px

.good-purchase div
  text-wrap nowrap

.add-button
  background $primary
  border-radius 50%
  height 30px
  width 30px
  display flex
  justify-content center
  align-items center
  color white
  font-size 20px
</style>
