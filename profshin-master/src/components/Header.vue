<template>
  <div class="w-full">
    <div
      class="w-full flex flex-column align-center justify-center mt-4"
      v-if="uiStore.smAndDown"
    >
      <div class="container flex justify-space-between">
        <router-link :to="{ name: 'Home' }" class="flex align-center link">
          <MobileLogo />
        </router-link>
        <div class="flex gap-4 align-center">
          <!--          <PersonIcon/>-->
          <Button @click="toggleSearch">
            <SearchIcon />
          </Button>
          <Button @click="toggleHeader">
            <MenuIcon />
          </Button>
        </div>
        <div class="mobile-header-wrapper" v-if="mobileHeaderDialog">
          <div class="flex flex-column px-4 pt-5">
            <div class="w-full flex justify-space-between">
              <div class="f-20 fw-600" style="padding-left: 6px">Меню</div>
              <Button @click="toggleHeader">
                <CloseIcon />
              </Button>
            </div>
            <router-link :to="{ name: 'Goods' }">
              <Button
                @click="toggleHeader"
                class="f-20 fw-600 text-align-start py-3 mt-4"
                >Каталог
              </Button>
            </router-link>
            <router-link :to="{ name: 'Eva' }">
              <Button
                @click="toggleHeader"
                class="f-20 fw-600 text-align-start py-3 mt-4"
                >Система EVA PRO
              </Button>
            </router-link>
            <router-link :to="{ name: 'About' }">
              <Button class="f-20 fw-600 text-align-start py-3 mt-4"
                >Контакты</Button
              >
            </router-link>
            <router-link :to="{ name: 'Customers' }">
              <Button class="f-20 fw-600 text-align-start py-3 mt-4"
                >Доставка</Button
              >
            </router-link>
            <router-link :to="{ name: 'About' }">
              <Button class="f-20 fw-600 text-align-start py-3 mt-4"
                >Поддержка</Button
              >
            </router-link>
          </div>
        </div>
      </div>
      <div
        v-if="showMobileSearch"
        class="w-full search flex justify-center mt-4"
      >
        <div class="flex my-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 27 27"
            fill="none"
          >
            <circle
              cx="10.575"
              cy="10.2078"
              r="8.70784"
              stroke="#FFFFFF"
              stroke-width="3"
            />
            <rect
              x="15.2579"
              y="17.604"
              width="2.91388"
              height="12.1726"
              rx="1.45694"
              transform="rotate(-45 15.2579 17.604)"
              fill="#FFFFFF"
              stroke="#FFFFFF"
            />
          </svg>
          <input placeholder="Поиск" class="ml-3 fw-600 f-16" />
        </div>
      </div>
    </div>

    <div v-else class="w-full flex flex-column align-center justify-center">
      <div class="container">
        <div class="flex justify-space-between align-center my-4">
          <router-link :to="{ name: 'Home' }" class="flex link">
            <img :src="require('@/assets/logo.svg')" alt="" />
            <div class="flex flex-column align-center justify-center ml-3">
              <div class="fw-700 f-30 raleway">ПрофШина</div>
              <div class="fw-300 f-15 raleway">Санкт-Петербург</div>
            </div>
          </router-link>
          <div class="contact">
            <button class="font-for-count">8 (812) 922-44-40</button>
            <div class="flex gap-4 justify-end icons">
              <img
                height="24"
                width="24"
                :src="require('@/assets/tg.svg')"
                alt=""
              />
              <img
                height="24"
                width="24"
                :src="require('@/assets/wa.svg')"
                alt=""
              />
            </div>
          </div>
          <div class="menu">
            <router-link
              class="px-2 py-3 fw-400 f-20 link"
              :to="{ name: 'Eva' }"
              >Система EVA PRO
            </router-link>
            <router-link
              :to="{ name: 'Goods' }"
              class="px-2 py-3 fw-400 f-20 link"
              >Каталог
            </router-link>
            <router-link
              class="px-2 py-3 fw-400 f-20 link"
              :to="{ name: 'Customers' }"
              >Покупателю
            </router-link>
            <router-link
              class="px-2 py-3 fw-400 f-20 link"
              :to="{ name: 'Customers' }"
              >Доставка
            </router-link>
            <router-link
              class="px-2 py-3 fw-400 f-20 link"
              :to="{ name: 'About' }"
              >Контакты
            </router-link>
          </div>
        </div>
      </div>
      <div class="w-full search flex justify-center">
        <div class="flex my-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
          >
            <circle
              cx="10.575"
              cy="10.2078"
              r="8.70784"
              stroke="#FFFFFF"
              stroke-width="3"
            />
            <rect
              x="15.2579"
              y="17.604"
              width="2.91388"
              height="12.1726"
              rx="1.45694"
              transform="rotate(-45 15.2579 17.604)"
              fill="#FFFFFF"
              stroke="#FFFFFF"
            />
          </svg>
          <input placeholder="Поиск" class="ml-3 fw-600 f-20" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUiStore } from "@/store";
import MenuIcon from "@/components/Icons/MenuIcon";
import PersonIcon from "@/components/Icons/PersonIcon";
import SearchIcon from "@/components/Icons/SearchIcon";
import MobileLogo from "@/components/MobileLogo";
import { ref } from "vue";
import CloseIcon from "@/components/Icons/CloseIcon";

const mobileHeaderDialog = ref(false);
const toggleHeader = () => {
  mobileHeaderDialog.value = !mobileHeaderDialog.value;
};

const toggleSearch = () => {
  showMobileSearch.value = !showMobileSearch.value;
};

const showMobileSearch = ref(false);

const uiStore = useUiStore();
</script>

<style lang="stylus" scoped>
@import "../styles/variables.styl"
.search
  background $primary

input
  all unset
  width 120px

input::placeholder
  color white
  font-size 20px

input:placeholder-shown
  width 60px !important

.mobile-header-wrapper
  position absolute
  width 100vw
  height 100vh
  left 0
  top 0
  background white
  z-index 3



.menu a
  transition all 400ms ease
.menu a:hover
  color #fb9633

.contact
  display flex
  flex-direction column
  justify-content flex-start
  align-items center
  gap 5px
</style>
