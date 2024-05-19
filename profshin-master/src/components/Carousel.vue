<template>
  <div class="good-carousel flex flex-column" :class="uiStore.mdAndDown?'w-full':''">
    <div class="relative good-current-src" :class="uiStore.mdAndDown?'w-full':''">
      <img alt="" :src="currentImage"/>
      <TagsDrawer class="good-tags" :tags="tags"/>
    </div>
    <div class="good-all-src w-full align-center">
      <div v-for="(image,id) in props.src" class="relative" @click="currentImageId=id">
        <img alt="" :key="id" :src="image"/>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" fill="none" v-if="id===currentImageId" :class="id===currentImageId?'active':''">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3414 1.35596C10.5716 0.022623 8.64712 0.0226245 7.87732 1.35596L6.64353 3.49293L1.7321 11.9998L5.17368e-05 14.9998H3.45635C3.45895 14.9998 3.46155 14.9998 3.46416 14.9998H15.7546C15.7572 14.9998 15.7598 14.9998 15.7624 14.9998H19.2187L17.4866 11.9998L12.5752 3.49293L11.3414 1.35596Z" fill="white"/>
        </svg>

      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {goodsTagsSrc} from "@/enums/good-types";
import TagsDrawer from "@/components/TagsDrawer";
import {useUiStore} from "@/store";
const uiStore = useUiStore()
const props = defineProps({
  src: {
    type: Array,
  },
  tags: {
    type: Array,
  }
})

const currentImageId = ref(0)
const currentImage = computed(() => {
  return props.src[currentImageId.value]
})


</script>

<style lang="stylus" scoped>
.relative > img
  max-width 150px
  @media (min-width 720px)
    max-width 420px


.good-tags
  position absolute
  width 30px
  height 30px
  left 16px
  top 16px

.good-all-src
  margin-top 26px
  display flex
  justify-content space-around
  max-width 100%

.good-all-src img
  width 84px
  cursor pointer
  border-radius 12px

.good-all-src div
  width 84px
  height 84px
  display flex
  align-items center
  justify-content center
  background white
  border-radius 12px

.active
  position absolute
  left 50%
  transform translate(-50%, -100%)
  top 0

.good-current-src
  display flex
  align-items center
  justify-content center
  background white
  border-radius 20px
  overflow hidden
  height 150px
  width 100%
  @media (min-width 720px)
    height 420px
    width 420px
</style>