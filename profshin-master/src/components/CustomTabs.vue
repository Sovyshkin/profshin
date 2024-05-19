<template>
<div class="flex">
  <div v-for="tab in tabs" class="tab" :class="tab.id===modelValue?'active':''" :key="tab.id" @click="setActive(tab.id)">{{tab.label}}</div>
</div>
</template>

<script setup>
const props = defineProps({
  tabs:{
    type:Array,
    required:true
  },
  modelValue:{
    type:Number,
    required:true,
  }
})
const emits = defineEmits(['update:modelValue'])
const setActive = (id) => {
  emits('update:modelValue', id)
}
</script>

<style lang="stylus" scoped>
@import "../styles/variables.styl"
.tab
  cursor pointer
  padding 8px 12px
  border-top 2px $primary solid
  border-bottom 2px $primary solid
  border-left 1px $primary solid
  border-right 1px $primary solid
  background transparent
  font-weight 400px
  font-size 14px
  @media (min-width 720px)
    font-size 20px
    padding 12px

.tab:first-child
  border-top-left-radius 10px
  border-bottom-left-radius 10px

.tab:last-child
  border-top-right-radius 10px
  border-bottom-right-radius 10px

.active
  background $primary !important
  color white !important
  font-weight 600 !important
</style>