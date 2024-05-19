<template>
<textarea v-bind="$attrs" v-model="localValue"/>
</template>

<script setup>
import {computed} from "vue";

const props = {
  modelValue:{
    type:String,
  }
}

const emits = defineEmits(['update:modelValue'])

const localValue = computed({
  get(){
    return props.modelValue
  },
  set(val){
    emits('update:modelValue',val)
  }
})
</script>

<style lang="stylus" scoped>
@import "../styles/variables.styl"

</style>