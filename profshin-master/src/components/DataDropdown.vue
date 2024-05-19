<template>
<div class="data-dropdown-wrapper flex-column" :class="localActive?'active':''">
  <div class="flex justify-space-between">
    <div class="title fw-600">{{title}}</div>
    <ArrowIcon @click="localActive=!localActive" :active="localActive"/>
  </div>
  <div v-if="localActive">
  <slot></slot>
  </div>
</div>
</template>

<script setup>
import {ref} from "vue";
import ArrowIcon from "@/components/Icons/ArrowIcon";

const props = defineProps({
  active:{
    type:Boolean,
    default:()=>false
  },
  title:{
    type:String,
    default:()=>''
  }
})

const localActive = ref(props.active)
</script>

<style lang="stylus" scoped>
@import "../styles/variables.styl"
.title
  font-size 14px
  @media (min-width 720px)
    font-size 20px

.data-dropdown-wrapper
  padding 12px
  border-radius 8px
  background $primary

.active
  background $gray !important
</style>