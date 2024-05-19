<template>
  <div class="w-full">
    <div class="w-full flex justify-center ">
      <div class="flex justify-end container">
        <div class="title fw-700 ">Хиты продаж</div>
      </div>
    </div>
    <div class="tyres-wrapper ">


      <div class="flex gap-5 wrapper container " :class="uiStore.isXs?'w-full ':''">
        <div class="flex justify-space-between align-end sub-wrapper">


          <div class="primary-outline image-wrapper">
            <img alt="" src="https://koleso.ru/themes/tireshop2/images/product/cache/800_800/91541_81843.jpg"/>
          </div>
          <div class="primary-outline image-wrapper">
            <img alt="" src="https://koleso.ru/themes/tireshop2/images/product/cache/800_800/91541_81843.jpg"/>
          </div>
          <div class="primary-outline image-wrapper">
            <img alt="" src="https://koleso.ru/themes/tireshop2/images/product/cache/800_800/91541_81843.jpg"/>
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
.tyres-wrapper
  width 100%
  display flex
  justify-content center

.image-wrapper
  height 200px
  width 150px
  display flex
  justify-content center
  align-items center
  transition 500ms
  position relative
  background white
  @media (min-width: 1000px)
    height 400px
    width 300px

.sub-wrapper:first-child .image-wrapper:first-child
  margin 0 0 0 16px
  @media (min-width: 680px)
    margin 0

.sub-wrapper:last-child .image-wrapper:last-child
  margin 0 16px 0 0
  @media (min-width: 680px)
    margin 0


img
  width 150px
  @media (min-width: 1000px)
    width 300px
.wrapper
  overflow-x scroll
  height 290px
  padding-bottom 8px
  @media (min-width: 1000px)
    height 520px

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
  justify-content none
  @media (min-width: 550px)
    overflow-x hidden
    flex-direction column
    justify-content end


.sub-wrapper
  gap 24px
  @media (min-width: 780px)
    gap 0

.image-wrapper:hover
  margin-bottom 57px
  z-index 2
  scale 1.22

.image-wrapper:hover:last-child
  margin-right 51px !important
  margin-bottom 57px !important
  scale 1.22

.image-wrapper:hover:first-child
  margin-bottom 57px !important
  margin-left 51px !important
  scale 1.22


.image-wrapper:hover:after
  content ''
  height 100%
  width 100%
  position absolute
  top 0
  border-radius 20px
  right 0
  animation fadeIn ease 1s
  background linear-gradient(186.66deg, rgba(0, 0, 0, 0) 25.74%, rgba(251, 150, 51, 0.7) 95.77%);

@keyframes fadeIn
  0%
    opacity 0
  100%
    opacity 1
</style>