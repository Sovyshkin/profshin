<template>
  <div ref="target" class="select-wrapper pointer" @click="active=!active">
    <div  class="select flex justify-space-between" :class="active?'active':''">
      <div class="font-for-count" :class="!modelValue?'not-selected':''">{{ activeOption }}</div>
      <ArrowIcon class="ml-3" :active="active"/>
    </div>
    <div v-if="active" class="flex flex-column list" :class="{'listSmall': options.length < 8}">
      <div class="font-for-count" v-for="option in options" @click="emits('update:modelValue',option.label)" :key="option.label">{{option.label}}</div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref, onMounted} from "vue";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import { onClickOutside } from '@vueuse/core'
const props = defineProps({
  placeholder: {
    type: String,
    default: () => ""
  },
  options: {
    type: Array,
    required: true
  },
  modelValue: {
    type: [Number, null],
    required: true
  }
})

const target = ref(null)

// onClickOutside(target, event => {active.value=false})

const active = ref(false)
const emits = defineEmits(['update:modelValue'])
const activeOption = computed(() => {
  if (props.modelValue) return props.options.find((x) => x.label === props.modelValue).label
  return props.placeholder
})

onMounted(() => {
 onClickOutside(target, () => {
    active.value = false;
 });
 console.log(props.options)
});

</script>

<style lang="stylus" scoped>
@import "../styles/variables.styl"
.select-wrapper
  position relative
  border-radius 10px
  border 2px $primary solid
  font-weight 400
  font-size 14px
  background white
  padding 8px 12px
  max-height 32px
  @media (min-width 720px)
    padding 12px
    max-height 47px
    font-size 20px

.select-wrapper:has(.active)
  border-bottom-left-radius  0 !important
  border-bottom-right-radius  0 !important

.not-selected
  color $disabled

.list
  position absolute
  z-index 999
  width calc(100% + 4px)
  top calc(100% + 2px)
  left -2px
  background white
  border-bottom-left-radius 10px
  border-bottom-right-radius 10px
  height 300px
  overflow-x hidden
  overflow-y scroll

.listSmall
  height fit-content

.list > div
  padding 8px 12px
  border-left 2px $primary solid
  border-right 2px $primary solid
  border-bottom 2px $primary solid

.list > div:last-child
  border-bottom-left-radius 10px
  border-bottom-right-radius 10px

.list > div:hover
  background #f1f1f1

</style>