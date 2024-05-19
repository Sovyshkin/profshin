<template>
  <div class="w-full">
    <div class="w-full flex justify-center ">
    <div class="flex justify-space-between container">
      <div class="title fw-700 ">Производители</div>
      <div v-if="uiStore.isXs" class="flex align-end pb-4 primary-color">Посмотреть всех</div>
    </div>
    </div>
    <div class="manufacturers-wrapper ">


      <div class="flex gap-4 wrapper container" :class="uiStore.isXs?'w-full':''">
        <div class="flex justify-space-between sub-wrapper">


          <div class="primary-outline image-wrapper">
            <img alt="" :src="require(`../assets/manufacturers/(1).png`)"/>
          </div>
          <div class="primary-outline image-wrapper">
            <img alt="" :src="require(`../assets/manufacturers/(2).png`)"/>
          </div>
          <div class="primary-outline image-wrapper">
            <img alt="" :src="require(`../assets/manufacturers/(3).png`)"/>
          </div>
          <div class="primary-outline image-wrapper">
            <img alt="" :src="require(`../assets/manufacturers/(4).png`)"/>
          </div>

        </div>
        <div class="flex justify-space-between sub-wrapper">


          <div class="primary-outline image-wrapper">
            <img alt="" :src="require(`../assets/manufacturers/(5).png`)"/>
          </div>
          <div class="primary-outline image-wrapper">
            <img alt="" :src="require(`../assets/manufacturers/(6).png`)"/>
          </div>

          <div class="primary-outline image-wrapper">
            <img alt="" :src="require(`../assets/manufacturers/(7).png`)"/>
          </div>
          <div v-if="!uiStore.isXs" class="view-all-btn">
            <div class="underline">Посмотреть всех</div>


          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {useUiStore} from "@/store";

const uiStore = useUiStore()
</script>

<style lang="stylus" scoped>
@import "../styles/variables.styl"
.manufacturers-wrapper
  width 100%
  display flex
  justify-content center

.image-wrapper
  height 87px
  width 133px
  display flex
  justify-content center
  align-items center
  @media (min-width: 1000px)
    height 168px
    width 255px

img
  scale 0.5
  @media (min-width: 1000px)
    scale 1

.sub-wrapper:first-child .image-wrapper:first-child
  margin 0 0 0 16px
  @media (min-width: 680px)
    margin 0

.sub-wrapper:last-child .image-wrapper:last-child
  margin 0 16px 0 0
  @media (min-width: 680px)
    margin 0



.view-all-btn
  height 87px
  width 133px
  display flex
  justify-content center
  align-items center
  @media (min-width: 1000px)
    height 168px
    width 255px

.title
  font-size 26px
  margin-top 20px
  margin-bottom 12px
  @media (min-width: 900px)
    font-size 72px
    margin-top 80px
    margin-bottom 80px

.underline
  padding-bottom 8px
  border-bottom 9px $primary solid

.wrapper
  overflow-x scroll
  padding-bottom 8px
  @media (min-width: 780px)
    overflow-x hidden
    flex-direction column


.sub-wrapper
  gap 16px
  @media (min-width: 780px)
    gap 0

//flex-wrap nowrap !important
</style>