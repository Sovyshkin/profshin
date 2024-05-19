<template>
<div class="w-full" >
  <div @click="active=!active" :class="active?`active ${border==='top'?border:''}`:`${border==='top'?border:''}`" class="header pointer" >
    <div class="flex justify-space-between">
    <slot name="header" ></slot>
      <ArrowIcon class="ml-2" :active="active"/>
    </div>
  </div>
  <div v-if="active" class="gray-background" :class="border==='bottom'?border:''" style="padding: 12px">
    <slot name="body"></slot>
  </div>
</div>
</template>

<script setup>
import {ref} from "vue";
const props = defineProps({
  active:{
    type:Boolean,
    default:()=>false
  },
  border:{
    type:String
  }
})
import ArrowIcon from "@/components/Icons/ArrowIcon";


const active = ref(props.active)
</script>

<style lang="stylus" scoped>
@import "../styles/variables.styl"
.header
  border-bottom 1px $primary solid
  background $primary
  padding 12px

.active
  background $gray !important

.top
  border-top-left-radius 18px
  border-top-right-radius 18px


.bottom
  border-bottom-left-radius 18px
  border-bottom-right-radius 18px
</style>