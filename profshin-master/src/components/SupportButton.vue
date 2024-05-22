<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
  async mounted() {},
};
</script>

<template>
  <div class="circle">
    <img src="../assets/support.png" alt="" />
  </div>
</template>

<style scoped>
.circle {
  position: fixed;
  right: 30px;
  bottom: 100px;
  z-index: 9999;
  background: #fb9633;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.circle img {
  width: auto;
  height: 25px;
}
</style>
