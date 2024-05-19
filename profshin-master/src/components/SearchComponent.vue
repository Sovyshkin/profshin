<template>
  <div class="wrapper">
    <div v-if="uiStore.smAndDown" class="container flex flex-column">
      <DataDropdown
        title="Подобрать шины"
        :active="tyres.active.value"
        class="mb-3"
      >
        <div class="w-full flex-column flex gap-3 mt-4">
          <CustomSelect
            placeholder="Диаметр"
            :options="[{ id: 1, label: 'Шина' }]"
            v-model="tyres.diameter.value"
          />
          <CustomSelect
            placeholder="Производитель"
            :options="[{ id: 1, label: 'Шина' }]"
            v-model="tyres.manufacturer.value"
          />
          <CustomSelect
            placeholder="Ширина"
            :options="[{ id: 1, label: 'Шина' }]"
            v-model="tyres.width.value"
          />
          <CustomSelect
            placeholder="Высота"
            :options="[{ id: 1, label: 'Шина' }]"
            v-model="tyres.height.value"
          />
          <div class="w-full flex justify-space-between">
            <CustomTabs
              :tabs="[
                { label: 'Лето', id: 1 },
                { label: 'Зима', id: 2 },
              ]"
              @update="tyres.tab.value = $event"
              v-model="tyres.tab.value"
            />
            <CustomCheckbox
              v-model="tyres.isSale.value"
              placeholder="Акция/Распродажа"
            />
          </div>
        </div>
      </DataDropdown>
      <DataDropdown title="Подобрать диски" :active="disks.active.value">
        <div class="w-full flex-column flex gap-3 mt-4">
          <CustomSelect
            placeholder="Диаметр"
            :options="[{ id: 1, label: 'Шина' }]"
            v-model="disks.diameter.value"
          />
          <CustomSelect
            placeholder="Производитель"
            :options="[{ id: 1, label: 'Шина' }]"
            v-model="disks.manufacturer.value"
          />
          <CustomSelect
            placeholder="Ширина"
            :options="[{ id: 1, label: 'Шина' }]"
            v-model="disks.width.value"
          />
          <CustomSelect
            placeholder="Высота"
            :options="[{ id: 1, label: 'Шина' }]"
            v-model="disks.height.value"
          />
          <div class="w-full flex">
            <CustomTabs
              :tabs="[
                { label: 'Лето', id: 1 },
                { label: 'Зима', id: 2 },
              ]"
              @update="disks.tab.value = $event"
              v-model="disks.tab.value"
            />
            <CustomCheckbox
              v-model="disks.isSale.value"
              placeholder="Акция/Распродажа"
            />
          </div>
        </div>
      </DataDropdown>

      <div
        @click="goToCatalog"
        class="f-16 fw-600 flex align-center justify-center"
        style="
          background: black;
          border-radius: 10px;
          padding: 10px;
          color: white;
          margin-top: 20px;
          max-height: 40px;
        "
      >
        Подобрать
      </div>
    </div>
    <div v-else class="container">
      <div class="box-toggler">
        <div
          @click="toggleDisks(1)"
          class="disks"
          :class="{ enabled: target == 1, disable: target == 2 }"
        >
          Грузовые шины/диски
        </div>
        <div
          @click="toggleDisks(2)"
          class="disks"
          :class="{ enabled: target == 2, disable: target == 1 }"
        >
          Легковые шины/диски
        </div>
      </div>
      <div class="box" style="position: relative">
        <div class="fw-600 f-30 mb-5">Шины</div>
        <div class="filter">
          <CustomSelect
            class="w-20"
            placeholder="Ширина"
            :options="arrWidth"
            v-model="tyres.width.value"
          />
          <CustomSelect
            class="w-20"
            placeholder="Высота"
            :options="arrHeight"
            v-model="tyres.height.value"
          />
          <CustomSelect
            class="w-20"
            placeholder="Диаметр"
            :options="arrDiametr"
            v-model="tyres.diameter.value"
          />
          <CustomSelect
            class="w-20"
            placeholder="Ось"
            :options="arrAxis"
            v-model="tyres.axis.value"
          />
          <CustomSelect
            class="w-20"
            placeholder="Индекс нагрузки"
            :options="[{ id: 1, label: 'Шина' }]"
            v-model="tyres.diameter.value"
          />
          <CustomSelect
            class="w-20"
            placeholder="Индекс скорости"
            :options="[{ id: 1, label: 'Шина' }]"
            v-model="tyres.diameter.value"
          />
          <CustomSelect
            class="w-20"
            placeholder="Производитель"
            :options="arrCargoBrendTire"
            v-model="tyres.manufacturer.value"
          />
        </div>
        <div class="flex gap-4 mt-5">
          <CustomTabs
            :tabs="[
              { label: 'Лето', id: 1 },
              { label: 'Зима', id: 2 },
            ]"
            @update="tyres.tab.value = $event"
            v-model="tyres.tab.value"
          />
          <!--          <CustomCheckbox v-model="tyres.isSale.value" placeholder="Акция/Распродажа"/>-->
        </div>
        <div class="fw-600 f-30 mb-5 mt-6">Диски</div>
        <div class="filter" v-if="getdata">
          <CustomSelect
            class="w-20"
            placeholder="Ширина"
            :options="arrCargoWidth"
            v-model="disks.width.value"
          />
          <CustomSelect
            class="w-20"
            placeholder="Диаметр"
            :options="arrCargoDiametr"
            v-model="disks.diameter.value"
          />
          <CustomSelect
            class="w-20"
            placeholder="Разболтовка"
            :options="arrCargoLoosening"
            v-model="disks.loosening.value"
          />
          <CustomSelect
            class="w-20"
            placeholder="Вылет (ET)"
            :options="arrCargoDeparture"
            v-model="disks.departure.value"
          />
          <CustomSelect
            class="w-20"
            placeholder="Ступица (DIA)"
            :options="arrCargoHub"
            v-model="disks.hub.value"
          />
          <CustomSelect
            class="w-20"
            placeholder="Производитель"
            :options="arrCargoBrend"
            v-model="disks.brend.value"
          />
        </div>
        <div class="flex gap-4 mt-5">
          <CustomCheckbox
            v-model="disks.isSale.value"
            placeholder="Акция/Распродажа"
          />
        </div>
        <div @click="goToCatalog" class="submit-btn">ПОДОБРАТЬ</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCatalogStore } from "@/store/catalog";
import { useUiStore } from "@/store";
import CustomSelect from "@/components/CustomSelect";
import { computed, ref, onMounted } from "vue";
import CustomTabs from "@/components/CustomTabs";
import CustomCheckbox from "@/components/CustomCheckbox";
import DataDropdown from "@/components/DataDropdown";
import router from "@/router";
import axios from "axios";

const uiStore = useUiStore();
const goToCatalog = async () => {
  let widthCargoDisk,
    diameterCargoDisk,
    looseningCargoDisk,
    hubCargoDisk,
    departureCargoDisk,
    brendCargoDisk,
    widthCargoTire,
    heightCargoTire,
    diameterCargoTire,
    axisCargoTire,
    brendCargoTire;
  let tires = false;
  let disk = false;
  const store = useCatalogStore();

  if (disks.value.width) {
    widthCargoDisk = disks.value.width.value;
  } else {
    widthCargoDisk = "None";
  }
  if (disks.value.diameter) {
    diameterCargoDisk = disks.value.diameter.value;
  } else {
    diameterCargoDisk = "None";
  }
  if (disks.value.loosening) {
    looseningCargoDisk = disks.value.loosening.value;
  } else {
    looseningCargoDisk = "None";
  }
  if (disks.value.hub) {
    hubCargoDisk = disks.value.hub.value;
  } else {
    hubCargoDisk = "None";
  }
  if (disks.value.departure) {
    departureCargoDisk = disks.value.departure.value;
  } else {
    departureCargoDisk = "None";
  }
  if (disks.value.brend) {
    brendCargoDisk = disks.value.brend.value;
  } else {
    brendCargoDisk = "None";
  }
  if (tyres.value.width) {
    widthCargoTire = tyres.value.width.value;
  } else {
    widthCargoTire = "None";
  }
  if (tyres.value.height) {
    heightCargoTire = tyres.value.height.value;
  } else {
    heightCargoTire = "None";
  }
  if (tyres.value.diameter) {
    diameterCargoTire = tyres.value.diameter.value;
  } else {
    diameterCargoTire = "None";
  }
  if (tyres.value.axis) {
    axisCargoTire = tyres.value.axis.value;
  } else {
    axisCargoTire = "None";
  }
  if (tyres.value.brend) {
    brendCargoTire = tyres.value.brend.value;
  } else {
    brendCargoTire = "None";
  }
  if (
    widthCargoTire ||
    heightCargoTire ||
    diameterCargoTire ||
    axisCargoTire ||
    brendCargoTire
  ) {
    tires = true;
  }
  if (
    widthCargoDisk ||
    diameterCargoDisk ||
    looseningCargoDisk ||
    hubCargoDisk ||
    departureCargoDisk ||
    brendCargoDisk
  ) {
    disk = true;
  }
  let cargo = [];
  let passenger = [];
  if (target.value == 1) {
    let response = await axios.post(`/catalog`, {
      params: {
        tires: tires,
        disk: disk,
        typeCar: "cargo",
        widthCargoDisk: widthCargoDisk,
        diameterCargoDisk: diameterCargoDisk,
        looseningCargoDisk: looseningCargoDisk,
        hubCargoDisk: hubCargoDisk,
        departureCargoDisk: departureCargoDisk,
        brendCargoDisk: brendCargoDisk,
      },
    });
    for (let i = 0; i < response.data.DataFilters.length; i++) {
      let item = response.data.DataFilters[i];
      cargo.push(JSON.parse(item));
    }
    console.log(cargo);
  } else {
    let response = await axios.post(`/catalog`, {
      params: {
        tires: tires,
        disk: disk,
        typeCar: "passenger",
        widthCargoDisk: widthCargoDisk,
        diameterCargoDisk: diameterCargoDisk,
        looseningCargoDisk: looseningCargoDisk,
        hubCargoDisk: hubCargoDisk,
        departureCargoDisk: departureCargoDisk,
        brendCargoDisk: brendCargoDisk,
      },
    });
    console.log(response.data);
  }
  store.goods = cargo;
  router.push({ name: "Goods", query: { getcatalog: true } });
};

const arrWidth = [
  { id: 1, label: "Все" },
  { id: 2, label: 6 },
  { id: 3, label: 7 },
  { id: 4, label: 7.5 },
  { id: 5, label: 8.25 },
  { id: 6, label: 8.3 },
  { id: 7, label: 9 },
  { id: 8, label: 9.5 },
  { id: 9, label: 10 },
  { id: 10, label: 11 },
  { id: 11, label: 11.2 },
  { id: 12, label: 12 },
  { id: 13, label: 12.4 },
  { id: 14, label: 12.5 },
  { id: 15, label: 13 },
  { id: 16, label: 13.6 },
  { id: 17, label: 14 },
  { id: 18, label: 15.5 },
  { id: 19, label: 16 },
  { id: 20, label: 16.5 },
  { id: 21, label: 16.9 },
  { id: 22, label: 17.5 },
  { id: 23, label: 18.4 },
  { id: 24, label: 21.3 },
  { id: 25, label: 23.1 },
  { id: 26, label: 215 },
  { id: 27, label: 225 },
  { id: 28, label: 235 },
  { id: 29, label: 245 },
  { id: 30, label: 265 },
  { id: 31, label: 275 },
  { id: 32, label: 285 },
  { id: 33, label: 295 },
  { id: 34, label: 315 },
  { id: 35, label: 325 },
  { id: 36, label: 360 },
  { id: 37, label: 385 },
  { id: 38, label: 390 },
  { id: 39, label: 395 },
  { id: 40, label: 400 },
  { id: 41, label: 405 },
  { id: 42, label: 425 },
  { id: 43, label: 445 },
  { id: 44, label: 500 },
  { id: 45, label: 530 },
  { id: 46, label: 1100 },
  { id: 47, label: 1220 },
  { id: 48, label: 1300 },
];
const arrHeight = [
  { id: 1, label: "Все" },
  { id: 2, label: 0 },
  { id: 3, label: 45 },
  { id: 4, label: 55 },
  { id: 5, label: 60 },
  { id: 6, label: 65 },
  { id: 7, label: 70 },
  { id: 8, label: 75 },
  { id: 9, label: 80 },
  { id: 10, label: 85 },
  { id: 11, label: 95 },
  { id: 12, label: 400 },
  { id: 13, label: 530 },
];
const arrDiametr = [
  { id: 1, label: "Все" },
  { id: 2, label: 16 },
  { id: 3, label: 17.5 },
  { id: 4, label: 18 },
  { id: 5, label: 19.5 },
  { id: 6, label: 20 },
  { id: 7, label: 21 },
  { id: 8, label: 22.5 },
  { id: 9, label: 24 },
  { id: 10, label: 25 },
  { id: 11, label: 26 },
  { id: 12, label: 28 },
  { id: 13, label: 32 },
  { id: 14, label: 34 },
  { id: 15, label: 38 },
  { id: 16, label: 42 },
  { id: 17, label: 533 },
];

// Диски
let arrCargoBrend = ["бренд"];
let arrCargoDeparture = [];
let arrCargoDiametr = [];
let arrCargoHub = [];
let arrCargoLoosening = [];
let arrCargoPrice = [];
let arrCargoWidth = [];
// Диски

// Шины
let arrCargoBrendTire = [];

// Шины

const arrAxis = [
  { id: 1, label: "Все" },
  { id: 2, label: "Ведущая" },
  { id: 3, label: "Прицеп" },
  { id: 4, label: "Рулевая" },
  { id: 5, label: "Рулевая/прицепная" },
  { id: 6, label: "Универсальная" },
];

const target = ref(1);
const getdata = ref(false);
const toggleDisks = (n) => {
  target.value = n;
};

const tyres = computed(() => {
  const active = ref(true);
  const diameter = ref(null);
  const manufacturer = ref(null);
  const width = ref(null);
  const height = ref(null);
  const isSale = ref(false);
  const tab = ref(1);
  const axis = ref(null);
  return { diameter, manufacturer, width, height, tab, isSale, active, axis };
});

const disks = computed(() => {
  const active = ref(false);
  const diameter = ref(null);
  const brend = ref(null);
  const width = ref(null);
  const height = ref(null);
  const isSale = ref(false);
  const tab = ref(1);
  const hub = ref(null);
  const loosening = ref(null);
  const departure = ref(null);
  return {
    diameter,
    brend,
    width,
    height,
    tab,
    isSale,
    active,
    hub,
    loosening,
    departure,
  };
});

const f = (lst) => {
  let arr = [];
  if (lst) {
    for (let i = 0; i < lst.length; i++) {
      arr.push({ id: i + 1, label: lst[i] });
    }
  }
  console.log(arr);
  return arr;
};

const getdataDisk = async () => {
  let response = await axios.post(`/filter`);
  arrCargoBrend = f(response.data.brendCargoDisk);
  arrCargoDeparture = f(response.data.departureCargoDisk);
  arrCargoDiametr = f(response.data.diameterCargoDisk);
  arrCargoHub = f(response.data.hubCargoDisk);
  arrCargoLoosening = f(response.data.looseningCargoDisk);
  arrCargoPrice = f(response.data.priceCargoDisk);
  arrCargoWidth = f(response.data.widthCargoDisk);
  arrCargoBrendTire = f(response.data.brend_CargoTires);
  if (
    arrCargoBrend ||
    arrCargoDeparture ||
    arrCargoDiametr ||
    arrCargoHub ||
    arrCargoLoosening ||
    arrCargoPrice ||
    arrCargoWidth
  ) {
    getdata.value = true;
    console.log(getdata);
  }
};

onMounted(getdataDisk);
</script>

<style lang="stylus" scoped>
@import "../styles/variables.styl"
.wrapper
  width 100%
  display flex
  justify-content center
  margin 16px 0
  @media (min-width 720px)
    margin-bottom 120px

.submit-btn
  background black
  color white
  font-weight 800
  font-size 20px
  display flex
  align-items center
  justify-content center
  border-radius 50%
  cursor pointer
  position absolute
  width 158px
  height 158px
  bottom 0
  right 0
  transform translate(10%,50%)

.box
  background $gray
  display flex
  padding 12px
  flex-direction column
  border-radius 0 30px 30px 30px
  @media (min-width 720px)
    padding 51px 66px

.box-toggler
  display flex
  justify-content justify-space-between
  gap 20px


.disks
  padding 16px 32px 45px 32px
  background #ebebeb
  transform translateY(30px)
  border-radius 14px
  font-weight 600
  font-size 20px
  cursor pointer

  transition all 400ms ease

.passenger-tires, .disable
  background black
  color #fff
  font-weight 400


.enabled
  background #ebebeb
  font-weight 600

.filter
  display flex
  flex-wrap wrap
  gap 25px
</style>
