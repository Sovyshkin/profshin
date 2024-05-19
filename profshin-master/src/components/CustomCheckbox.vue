<template>
  <div class="flex">
<input class="checkbox" type="checkbox" :checked="value"/>
    <div class="ml-2 flex align-center  fw-400" :class="uiStore.isXs?'f-14':'f-20'">{{placeholder}}</div>
  </div>
</template>

<script setup>
import {computed} from "vue";
import {useUiStore} from "@/store";

const props = defineProps({
  placeholder:{
    type:String,
    default:()=>''
  },
  modelValue:{
    type:Boolean,
    required:true
  }
})
const uiStore = useUiStore()
const emits = defineEmits(['modelValue:update'])
const value = computed({
  get(){
    return props.modelValue
  },
  set(val){
    emits('modelValue:update',val)
  }
})
</script>

<style lang="stylus" scoped>
@import "../styles/variables.styl"
input[type="checkbox"]
  accent-color $primary
</style>