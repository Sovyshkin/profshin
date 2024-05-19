<script>
import { defineComponent } from "vue";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      currentSlide: 0,
      images: [
        require("./assets/img/1.png"),
        require("./assets/img/2.png"),
        require("./assets/img/3.png"),
        require("./assets/img/4.png"),
      ],
    };
  },
});
</script>
<template>
  <Carousel
    class="carousel"
    :items-to-show="1"
    :wrap-around="true"
    v-model="currentSlide"
  >
    <Slide v-for="(image, index) in images" :key="index">
      <img :src="image" />
    </Slide>
  </Carousel>
</template>
<style scoped>
.carousel {
  height: 20vh;
}
</style>
