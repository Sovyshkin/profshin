<template>
  <div class="w-full">
    <input :placeholder="placeholder" class="primary-outline input" style="box-sizing: border-box; width:100%; height:48px" v-model="value"/>
    <small class="error">{{ errorMessage }}</small>
  </div>
</template>

<script setup>
import {computed, toRef} from "vue";
import {useField} from 'vee-validate'

const props = defineProps({
  modelValue: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  name: {
    type: String,
    default: () => ''
  }
})

const emits = defineEmits(['update:modelValue'])

const local = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})


const nameRef = toRef(props, 'name');
const {errorMessage, value} = useField(nameRef)
</script>

<style lang="stylus" scoped>
@import "../styles/variables.styl"
.input
  border-radius 10px
  border 2px $primary solid
  height 12px
  font-size 16px
  padding 12px
  @media (min-width 720px)
    font-size 20px
    height 24px

</style>