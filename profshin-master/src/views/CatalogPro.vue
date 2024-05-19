<script>
import axios from "axios";
import GoodMiniCard from "@/components/MiniCard";
import BurgerDropdown from "@/components/BurgerDropdown";
import CustomSelect from "@/components/CustomSelect";
import CustomInput from "@/components/CustomInput";
import CloseIcon from "@/components/Icons/CloseIcon";
import { useCatalogStore } from "@/store/catalog";

export default {
  components: {
    GoodMiniCard,
    BurgerDropdown,
    CustomSelect,
    CustomInput,
    CloseIcon,
  },
  data() {
    return {
      goods: [],
      width: 0,
      height: 0,
      diameter: 0,
      getcatalog: false,
      currentGoods: [],
      ind: 20,
    };
  },
  methods: {
    async getGoods() {
      this.getcatalog = this.$route.query.getcatalog;
      if (!this.getcatalog) {
        let response = await axios.post(`/getcatalog`, {
          params: {
            getcatalog: this.getcatalog,
          },
        });
        for (let i = 0; i < response.data.DataFilters.length; i++) {
          if (i != 0) {
            let item = response.data.DataFilters[i];
            this.goods.push(JSON.parse(item));
          }
        }
      }
    },

    loadGoods() {
      this.currentGoods = [];
      for (let i = this.ind - 20; i < this.ind; i++) {
        if (i < this.goods.length) {
          this.currentGoods.push(this.goods[i]);
        }
      }
    },

    updateInd(n) {
      this.ind = 20 * n;
      this.loadGoods();
    },
  },
  async mounted() {
    await this.getGoods();
    this.loadGoods();
  },

  setup() {
    const store = useCatalogStore();
    console.log("goods", store.goods);
    return {
      store,
    };
  },
};
</script>
<template>
  <div class="wrapper">
    <div class="goods" v-if="!getcatalog">
      <GoodMiniCard v-for="good in currentGoods" :good="good" :key="good.code">
        {{ good.tmc }}
      </GoodMiniCard>
      <div class="pagination">
        <div
          class="item-pag font-for-count"
          :class="{ active: Math.ceil(ind / 20) == i }"
          v-for="i in Math.ceil(goods.length / 20)"
          @click="updateInd(i)"
        >
          {{ i }}
        </div>
      </div>
    </div>
    <div class="goods" v-else>
      <GoodMiniCard v-for="good in store.goods" :good="good" :key="good.code">
        {{ good.tmc }}
      </GoodMiniCard>
    </div>

    <div class="filters ml-5">
      <!-- <BurgerDropdown :active="true" border="top">
        <template #header>
          <div class="fw-700 f-16">Фильтр по автомобилю</div>
        </template>
        <template #body>
          <div class="flex flex-column gap-4">
            <CustomSelect
              placeholder="Марка"
              :options="[{ label: '1', id: 1 }]"
              v-model=""
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
      </BurgerDropdown> -->
      <BurgerDropdown :active="true">
        <template #header>
          <div class="fw-700 f-16">Цена</div>
        </template>
        <template #body>
          <div class="flex flex-column">
            <CustomInput placeholder="От" v-model="priceFrom" />

            <CustomInput placeholder="До" class="mt-3" v-model="priceTo" />
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
              v-model="height"
            />
            <CustomSelect
              placeholder="Ширина"
              :options="[{ label: '1', id: 1 }]"
              v-model="width"
            />
            <CustomSelect
              placeholder="Диаметр"
              :options="[{ label: '1', id: 1 }]"
              v-model="diameter"
            />
          </div>
        </template>
      </BurgerDropdown>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 85%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}
.goods {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
}

.filters {
  border-radius: 18px;
  min-width: 230px;
  width: 230px;
  height: fit-content;
  border-collapse: separate;
}

.mobile-filters {
  border-radius: 18px;
  height: fit-content;
}

.mobile-filters-wrapper {
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background: white;
  z-index: 3;
}

.pagination {
  width: 100%;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  flex-wrap: wrap;
  overflow-x: hidden;
  overflow-y: scroll;
}

.item-pag {
  color: #fb9633;
  border: 1px solid #fb9633;
  padding: 5px 8px;
  border-radius: 20px;
  cursor: pointer;
}

.active {
  background-color: #fb9633;
  color: white;
}
</style>
