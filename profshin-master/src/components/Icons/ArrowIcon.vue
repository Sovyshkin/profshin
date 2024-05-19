<template>
<div>

  <svg v-if="!active" xmlns="http://www.w3.org/2000/svg" width="20" height="12" viewBox="0 0 20 12" fill="none">
    <path d="M1.5 1.5L10 10L18.5 1.5" stroke="#A5A5A5" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
  <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="11" viewBox="0 0 20 11" fill="none">
    <path d="M1.5 10L10 1.5L18.5 10" stroke="#A5A5A5" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
</div>
</template>

<script setup>
const props = defineProps({
  active:{
    type:Boolean,
    default:()=>false
  }
})
</script>

<style scoped>

</style>