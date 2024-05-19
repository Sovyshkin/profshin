<script>
import { RouterLink, RouterView } from "vue-router";

export default {
  components: {},
  data() {
    return {
      api: "cde7719e-c696-4fe0-b00d-0ec5e84eb457",
    };
  },
  methods: {
    async renderMap() {
      ymaps.ready(init); // когда апи готово, инициализируемя карту
      var customMap; // объявим переменную для карты
      async function init() {
        // функция инициализации
        customMap = new ymaps.Map("customMap", {
          // создадим карту выведем ее в див с id="customMap"
          center: [59.812966, 30.404172], // центра карты
          behaviors: ["default", "scrollZoom"], // скроллинг колесом
          zoom: 17, // масштаб карты
          controls: ["zoomControl", "fullscreenControl"], // элементы управления
        });

        // Добавление метки на карту
        const myPlacemark = new ymaps.Placemark([59.812966, 30.404172], {
          }, {
            preset: 'islands#orangeCircleDotIcon', // Иконка метки
          });

          customMap.geoObjects.add(myPlacemark); // Добавление метки на карту

        customMap.controls.remove("geolocationControl"); // удаляем геолокацию
        customMap.controls.remove("searchControl"); // удаляем поиск
        customMap.controls.remove("trafficControl"); // удаляем контроль трафика
        customMap.controls.remove("typeSelector"); // удаляем тип
        customMap.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
        customMap.controls.remove("zoomControl"); // удаляем контрол зуммирования
        customMap.controls.remove("rulerControl"); // удаляем контрол правил
      }
    },
  },
  mounted() {
    this.renderMap()
  },
};
</script>
<template>
  <div class="wrapper">
    <div class="subtitle">Главная/ <b>О компании</b></div>
    <div class="location">
      <div class="title">Расположение</div>
      <div class="street">
        <span class="font-for-count">196624</span>, Санкт-Петербург, Шушары, ул.
        Ленина, д. <span class="font-for-count">3А</span>
      </div>
      <div id="customMap" class="map"></div>
      <div class="description">
        <div class="contacts">
          <span class="font-for-count">+7 (931) 979-39-38</span>
          <span class="font-for-count">+7 (981) 901-45-55</span>
          <span>E: kuhar@proftire.ru</span>
        </div>
        <div class="name">
          <span>Кухар Андрей</span>
          <span>Генеральный директор</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 50px 150px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.location {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.description {
  width: 50%;
  display: flex;
  justify-content: space-between;
}

.contacts, .name {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.title {
  font-size: 64px;
  font-weight: 600;
  line-height: 75px;
}

.street, .name span, .contacts span, .subtitle {
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
}

.map {
  width: 70%;
  height: 400px;

}

@media (max-width: 1200px) {
  .description {
    width: 70%;
  }
}

@media (max-width: 1000px) {
  .map {
    width: 90%;
  }

  .description {
    width: 90%;
  }

  .wrapper {
    padding: 50px 100px;
  }
}

@media (max-width: 710px) {
  .wrapper {
    padding: 25px 50px;
  }

  .description, .map {
    width: 100%;
  }
}

@media (max-width: 540px) {
  .street, .name span, .contacts span, .subtitle {
    font-size: 15px;
  }

  .title {
    font-size: 48px;
  }
}

@media (max-width: 440px) {
  .wrapper {
    padding: 15px 25px;
  }

  .title {
    font-size: 44px;
  }
}

@media (max-width: 360px) {
  .street, .name span, .contacts span, .subtitle {
    font-size: 13px;
  }
}
</style>
