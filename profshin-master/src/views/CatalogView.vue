<template>
  <div
    class="w-full flex justify-center mt-5"
    :class="uiStore.smAndDown ? 'flex flex-column align-center' : ''"
  >
    <div v-if="uiStore.smAndDown" class="w-80 flex justify-end mb-3">
      <Button @click="toggleFilters" class="f-12 outlined">Фильтр</Button>
      <div class="mobile-filters-wrapper" v-if="showFilters">
        <div class="flex flex-column px-4 pt-5">
          <div class="w-full flex justify-space-between">
            <div class="f-20 fw-600" style="padding-left: 6px">Фильтры</div>
            <Button @click="toggleFilters">
              <CloseIcon />
            </Button>
          </div>
          <div class="mobile-filters mt-4">
            <BurgerDropdown :active="true" border="top">
              <template #header>
                <div class="fw-700 f-16">Фильтр по автомобилю</div>
              </template>
              <template #body>
                <div class="flex flex-column gap-4">
                  <CustomSelect
                    placeholder="Марка"
                    :options="[{ label: '1', id: 1 }]"
                    v-model="store.filtersByCar.manufacturer"
                  />
                  <CustomSelect
                    placeholder="Модель"
                    :options="[{ label: '1', id: 1 }]"
                    v-model="store.filtersByCar.model"
                  />
                  <CustomSelect
                    placeholder="Год"
                    :options="[{ label: '1', id: 1 }]"
                    v-model="store.filtersByCar.year"
                  />
                  <CustomSelect
                    placeholder="Двигатель"
                    :options="[{ label: '1', id: 1 }]"
                    v-model="store.filtersByCar.engine"
                  />
                </div>
              </template>
            </BurgerDropdown>
            <BurgerDropdown :active="true">
              <template #header>
                <div class="fw-700 f-16">Цена</div>
              </template>
              <template #body>
                <div class="flex justify-space-between">
                  <CustomInput
                    placeholder="От"
                    style="max-width: 45%"
                    v-model="store.filtersParams.costAfter"
                  />

                  <CustomInput
                    placeholder="До"
                    style="max-width: 45%"
                    v-model="store.filtersParams.costBefore"
                  />
                </div>
              </template>
            </BurgerDropdown>
            <BurgerDropdown :active="true" border="bottom">
              <template #header>
                <div class="fw-700 f-16">Размер</div>
              </template>
              <template #body>
                <div class="flex flex-column gap-4">
                  <CustomSelect
                    placeholder="Высота"
                    :options="[{ label: '1', id: 1 }]"
                    v-model="store.filtersParams.height"
                  />
                  <CustomSelect
                    placeholder="Ширина"
                    :options="[{ label: '1', id: 1 }]"
                    v-model="store.filtersParams.width"
                  />
                  <CustomSelect
                    placeholder="Диаметр"
                    :options="[{ label: '1', id: 1 }]"
                    v-model="store.filtersParams.diameter"
                  />
                </div>
              </template>
            </BurgerDropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="goods" v-if="store.goods.length">
      <GoodMiniCard
        v-for="good in store.goods"
        :good="good"
        @update="updateGood($event)"
        :key="good.code"
      >
        {{ good.name }}
      </GoodMiniCard>
    </div>

    <div class="filters ml-5" v-if="uiStore.mdAndUp">
      <BurgerDropdown :active="true" border="top">
        <template #header>
          <div class="fw-700 f-16">Фильтр по автомобилю</div>
        </template>
        <template #body>
          <div class="flex flex-column gap-4">
            <CustomSelect
              placeholder="Марка"
              :options="[{ label: '1', id: 1 }]"
              v-model="store.filtersByCar.manufacturer"
            />
            <CustomSelect
              placeholder="Модель"
              :options="[{ label: '1', id: 1 }]"
              v-model="store.filtersByCar.model"
            />
            <CustomSelect
              placeholder="Год"
              :options="[{ label: '1', id: 1 }]"
              v-model="store.filtersByCar.year"
            />
            <CustomSelect
              placeholder="Двигатель"
              :options="[{ label: '1', id: 1 }]"
              v-model="store.filtersByCar.engine"
            />
          </div>
        </template>
      </BurgerDropdown>
      <BurgerDropdown :active="true">
        <template #header>
          <div class="fw-700 f-16">Цена</div>
        </template>
        <template #body>
          <div class="flex flex-column">
            <CustomInput
              placeholder="От"
              v-model="store.filtersParams.costAfter"
            />

            <CustomInput
              placeholder="До"
              class="mt-3"
              v-model="store.filtersParams.costBefore"
            />
          </div>
        </template>
      </BurgerDropdown>
      <BurgerDropdown :active="true" border="bottom">
        <template #header>
          <div class="fw-700 f-16">Размер</div>
        </template>
        <template #body>
          <div class="flex flex-column gap-4">
            <CustomSelect
              placeholder="Высота"
              :options="[{ label: '1', id: 1 }]"
              v-model="store.filtersParams.height"
            />
            <CustomSelect
              placeholder="Ширина"
              :options="[{ label: '1', id: 1 }]"
              v-model="store.filtersParams.width"
            />
            <CustomSelect
              placeholder="Диаметр"
              :options="[{ label: '1', id: 1 }]"
              v-model="store.filtersParams.diameter"
            />
          </div>
        </template>
      </BurgerDropdown>
    </div>
  </div>
</template>

<script setup>
import { useCatalogStore } from "@/store/catalog";
import GoodMiniCard from "@/components/GoodMiniCard";
import BurgerDropdown from "@/components/BurgerDropdown";
import CustomSelect from "@/components/CustomSelect";
import CustomInput from "@/components/CustomInput";
import { useUiStore } from "@/store";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import CloseIcon from "@/components/Icons/CloseIcon";

const store = useCatalogStore();
const uiStore = useUiStore();

const showFilters = ref(false);

const route = useRoute();
const cargo = ref([]);
const passenger = ref([]);

const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

const updateGood = (good) => {
  // store.goods = store.goods.map((x) => {
  //   if (x.id === good.id) {
  //     return good
  //   }
  //   return x
  // })
};
</script>

<style lang="stylus" scoped>
@import "../styles/variables.styl"
gap = 8
.goods
  display flex
  justify-content center
  flex-wrap wrap
  max-width ($miniCardWidth* 4 + gap* 4) px
  gap (gap) px

.filters
  border-radius 18px
  min-width 230px
  width 230px
  height fit-content
  border-collapse: separate;




.mobile-filters
  border-radius 18px
  height fit-content

.mobile-filters-wrapper
  position absolute
  width 100vw
  height 100vh
  left 0
  top 0
  background white
  z-index 3
</style>
