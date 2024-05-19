import { defineStore } from "pinia";
import {
  CarTypes,
  carTypesReadable,
  GoodTags,
  GoodTypes,
} from "@/enums/good-types";
import { cloneDeep } from "lodash";
import { computed } from "vue";

const filtersByCarDefault = {
  manufacturer: null,
  model: null,
  year: null,
  engine: null,
};

const filtersParams = {
  costAfter: null,
  costBefore: null,
  height: null,
  width: null,
  diameter: null,
  types: [GoodTypes.RIMS, GoodTypes.TIRES],
};

const testGoods = computed(() => {
  let goods = [];
  for (let i = 0; i < 10; i++) {
    goods.push({
      id: i,
      name: "Cordiant Comfort 2 205/55R16 94V",
      src: [
        "https://koleso.ru/themes/tireshop2/images/product/cache/800_800/91541_81843.jpg",
        "https://nug.delta-servis.com/wp-content/uploads/2020/03/%D0%9F%D0%B5%D1%80%D0%B5%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0-%D1%88%D0%B8%D0%BD.png",
        "https://koleso.ru/themes/tireshop2/images/product/cache/800_800/91541_81843.jpg",
      ],
      cost: 4000 + Math.floor(Math.random() * 700),
      rating: 2 + Math.floor(Math.random() * 3),
      reviewsCount: 10,
      count: Math.floor(Math.random() * 50),
      tags: [GoodTags.SUMMER],
      isFavorite: false,
      type: GoodTypes.TIRES,
      data: {
        article: Math.floor(Math.random() * 10000),
        season: GoodTags.SUMMER,
        car_type: CarTypes.PASSENGER,
        profile_width: 150,
        profile_height: 60,
      },
    });
  }
  return goods;
});

export const useCatalogStore = defineStore("catalog", {
  state: () => ({
    cart: [],
    goods: [],
    filtersByCar: cloneDeep(filtersByCarDefault),
    filtersParams: cloneDeep(filtersParams),
  }),
  getters: {
    catalogGoods() {
      return this.goods.map((x) => {
        return {
          ...x,
          name: x.name.length > 30 ? x.name.slice(0, 30) + "..." : x.name,
        };
      });
    },
  },
  persist: {
    storage: localStorage,
    paths: ["cart"],
    beforeRestore: (ctx) => {
      console.log(`about to restore '${ctx.store.$id}'`);
    },
    afterRestore(context) {
      console.log(context);
      const { store } = context;
      store.cart = cloneDeep(store.cart);
    },
    debug: true,
  },
  actions: {
    clearCart() {
      this.cart = [];
    },
  },
  paginator: {},
});
