<template>
  <div class="btn-wrapper" :class="loading?'loading':''" >
    <Button :class="severity" class="f-20 w-full py-3">{{label}}</Button>
    <div class="loading-component" v-if="loading">
    <div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
  </div>
</template>

<script setup>
// const emits = defineEmits(['cclick'])
const props = defineProps({
  loading:{
    type:Boolean,
    default:()=>false
  },
  label:{
    type:String
  },
  severity:{
    type:String
  }
})
</script>

<style lang="stylus" scoped>
.btn-wrapper
  position relative

.loading>button
  animation left-offset 500ms forwards


@keyframes left-offset {
  from {
    padding-left 0
  }
  to {
    padding-left 30px
  }
}

.black
  background: black;
  color: white;
  border-radius: 10px

.loading-component
  position absolute
  top 50%
  left 8px
  transform translateY(-60%)

.lds-ring {
  display: inline-block;
  position: relative;
  width: 16px;
  height: 16px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 16px;
  height: 16px;
  margin: 8px;
  border: 2px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>