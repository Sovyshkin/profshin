<template>
  <div class="flex gap-1">
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
    <path d="M1 5.32L3.43478 10L9 1" stroke="#FB9633"/>
  </svg>
    <div class="primary-color fw-700 f-12">{{count}} шт.</div>
  </div>
</template>

<script setup>
const props = defineProps({
  count:{
    type:Number,
    default:()=>0
  }
})
</script>

<style scoped>

</style>