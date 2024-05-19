<template>
  <svg
    @click="update"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 16 15"
    :fill="color"
  >
    <path
      d="M8.47788 14.261L8.47754 14.2612C8.36712 14.3334 8.25364 14.3991 8.15293 14.4451C8.06042 14.4874 8.0123 14.4972 8.00163 14.4994C8.00092 14.4996 8.00038 14.4997 8 14.4997C7.99962 14.4997 7.99908 14.4996 7.99837 14.4994C7.9877 14.4972 7.93958 14.4874 7.84707 14.4451C7.74636 14.3991 7.63288 14.3334 7.52246 14.2612C3.13521 11.3953 0.5 8.14785 0.5 5.00267C0.5 2.29068 2.32529 0.5 4.54545 0.5C5.90099 0.5 6.93291 1.24736 7.5582 2.4273L7.99505 3.25163L8.43959 2.43142C9.08208 1.24598 10.1085 0.5 11.4625 0.5C13.6742 0.5 15.5 2.29009 15.5 5.00267C15.5 8.14808 12.8723 11.3955 8.47788 14.261Z"
      stroke="#FB9633"
    />
  </svg>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(["update:modelValue", "update"]);
const update = () => {
  emits("update:modelValue", !props.modelValue);
  emits("update", !props.modelValue);
};
const color = computed(() => {
  return props.modelValue ? "#FB9633" : "none";
});
</script>

<style scoped></style>
