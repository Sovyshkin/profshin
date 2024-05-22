<template>
  <div class="w-full h-100vh app flex-column flex">
    <Header />
    <div
      class="w-full flex justify-center mt-6"
      v-if="label && uiStore.mdAndUp"
    >
      <div class="container">
        <div class="f-64 fw-700">{{ label }}</div>
        <!--        <div class="bg-blue-800" v-if="breadcrumbs">-->

        <!--          <div :class="uiStore.mdAndDown?'mt-4':'mt-6'" class="container flex justify-start">-->
        <!--            <div v-for="(crumb,id) in breadcrumbs"-->
        <!--                 :key="id">-->
        <!--              <router-link :to="{name:crumb.name}" v-if="crumb.clickable"-->
        <!--                           :class="uiStore.mdAndDown?'fw-400 f-14 link':'fw-400 f-20 link'"-->
        <!--                           style="text-wrap: nowrap">-->
        <!--                {{ crumb.label + (id + 2 <= breadcrumbs.length ? ' / ' : ' ') }}-->
        <!--              </router-link>-->
        <!--              <div v-else class="fw-700" :class="uiStore.mdAndDown?'f-14':'f-20'">-->
        <!--                {{ crumb.label }}-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
    </div>
    <div class="dev">Сайт в разработке</div>
    <router-view style="flex-grow: 1" />
    <Footer />
    <SupportButton @click="openChat" />
    <SupportChat v-if="chat" />
    <CartButton />
    <WipOverlay />
  </div>
</template>

<style lang="stylus">
@import "styles/app.styl"
</style>

<script setup>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { computed, onMounted, ref } from "vue";
import { init } from "@/utils";
import WipOverlay from "@/components/WipOverlay";
import CartButton from "@/components/CartButton";
import SupportButton from "@/components/SupportButton";
import SupportChat from "@/views/SupportChat";
import router from "@/router";
import { useCatalogStore, useUiStore } from "@/store";
import { GoodTypes } from "@/enums/good-types";

onMounted(async () => {
  await init();
  console.log(router);
});

const catalogStore = useCatalogStore();
const uiStore = useUiStore();
const label = computed(() => {
  if ("label" in router.currentRoute.value.meta) {
    return router.currentRoute.value.meta.label;
  }

  return null;
});

const breadcrumbs = computed(() => {
  let crumbs = router.currentRoute.value.matched
    .map((x) => {
      if ("label" in x.meta || "title" in router.currentRoute.value.query) {
        if (x.name === router.currentRoute.value.name) {
          return {
            label:
              "title" in router.currentRoute.value.query
                ? router.currentRoute.value.query.title
                : x.meta.label,
            clickable: false,
            name: x.name,
          };
        } else {
          return {
            label: x.meta.label,
            clickable: true,
            name: x.name,
          };
        }
      } else return null;
    })
    .filter((x) => !!x);

  if (crumbs.length > 1) return crumbs;
  return null;
});

const chat = ref(false);
const openChat = () => {
  chat.value = !chat.value;
};
</script>

<style lang="stylus" scoped>
@import "./styles/variables.styl"
.app
  overflow-x hidden
  overflow-y scroll

.dev
  position absolute
  top 60px
  left 50%
  transform translateX(-50%)
  background $primary
  color white
  padding 16px
  font-weight 700
  border-radius 16px
  z-index 10
</style>
