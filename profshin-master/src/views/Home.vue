<template>
  <div class="w-full">
    <Carousel
      class="carousel"
      :items-to-show="1"
      :autoplay="4000"
      :wrap-around="true"
      v-model="currentSlide"
    >
      <Slide v-for="(image, index) in images" :key="index">
        <img class="carousel-item" :src="'/assets/' + image" />
      </Slide>
    </Carousel>
    <SearchComponent />
    <Manufacturers />
    <Tyres />
  </div>
</template>

<script setup>
import Manufacturers from "@/components/Manufacturers";
import Tyres from "@/components/Tyres";
import SearchComponent from "@/components/SearchComponent";
import WipOverlay from "@/components/WipOverlay";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const images = ["1.png", "2.png", "4.png"];

let currentSlide = 0;
</script>
<style scoped>
.carousel {
  height: 20vh;
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
}

.carousel-item {
  height: 20vh;
  width: 100%;
  object-fit: cover;
  border-radius: 20px;
  background-size: 100%;
}
</style>
