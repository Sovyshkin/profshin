<template>
  <div class="cart-button" v-if="router.currentRoute.value.name!=='Cart'">
    <router-link :to="{name:'Cart'}">
    <div class="relative">

      <div class="chip">{{ catalogStore.cart.length }}</div>

        <CartIcon fill="white"/>
    </div>

    </router-link>
  </div>
</template>

<script setup>
import CartIcon from "@/components/Icons/CartIcon";
import {useCatalogStore} from "@/store";
import router from "@/router";

const catalogStore = useCatalogStore()

</script>

<style lang="stylus" scoped>
@import "../styles/variables.styl"
.cart-button
  position fixed
  right 30px
  bottom 30px
  z-index 9999
  background $primary
  border-radius 50%
  width 50px
  height 50px
  display flex
  justify-content center
  align-items center
</style>