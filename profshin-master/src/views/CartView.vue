<template>
  <div class="flex flex-column align-center">


    <div v-if="catalogStore.cart.length===0" class="mt-4 f-30 fw-700">
      Корзина пуста
    </div>
    <div class="flex mt-6 container justify-center" v-else>
      <div class="flex flex-column w-full">
        <div class="flex flex-column underline-3 ">
          <div class="flex justify-space-between " v-for="item in cart">
            <div class="flex gap-3 py-4 pr-4">
              <img height="84" width="84" class="item-src" alt="" :src="item.src[0]"/>
              <div class="flex flex-column py-2">
                <router-link :to="{name:'Good', params:{id:item.id}}">
                  <div class="f-20 underline-1">{{ item.name }}</div>
                </router-link>
                <div class="h-full flex align-center f-20">
                  <span class="fw-700">{{ numberWithSpaces(item.cost) }} ₽</span>
                  / шт
                </div>
              </div>
            </div>
            <div class="flex flex-column">
              <AddToCartComponent :good="item" :is-small="false" :show-cart="false"
                                  :show-count="false"/>
            </div>
          </div>

        </div>
        <div class="flex w-full justify-end mt-4">
          <div class="f-32 fw-700">ИТОГО: {{ numberWithSpaces(cartCostSummary) }} ₽</div>
        </div>
        <div class="mt-4 flex-column flex">
          <div class="f-32 fw-600">Комментарий к заказу</div>
          <textarea placeholder="На что нам стоит обратить внимание?" class="mt-4"
                    v-model="comment" style="max-width: 500px; height: 62px"/>
        </div>
      </div>
      <div class="contacts flex flex-column" style="position: sticky; top: 40px; min-width: 320px"
           :class="uiStore.mdAndUp?'ml-4':''">
        <div class="f-32 fw-600" style="word-break: keep-all">Контактные данные</div>
        <form mode="lazy">
          <div class="flex flex-column mt-4">
            <label class="f-20 fw-600 mb-2">Имя Фамилия</label>
            <CustomInput name="name"/>
          </div>
          <div class="flex flex-column mt-3">
            <label class="f-20 fw-600 mb-2">Почта</label>
            <CustomInput name="email"/>
          </div>
          <div class="flex flex-column mt-3">
            <label class="f-20 fw-600 mb-2">Телефон</label>
            <CustomInput name="phone"/>
          </div>

        </form>
        <div class="btn-wrapper mt-4" :class="loading?'loading':''">
          <button @click="sendCart" class="black f-20 w-full py-3">Оформить</button>
          <div class="loading-component" v-if="loading">
            <div class="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useCatalogStore, useUiStore} from "@/store";
import {numberWithSpaces} from "@/utils/number_no_spaces";
import AddToCartComponent from "@/components/AddToCartComponent";
import CustomInput from "@/components/CustomInput";
import {useForm} from 'vee-validate'
import * as yup from "yup";
import axios from 'axios'

const catalogStore = useCatalogStore()
const uiStore = useUiStore()
const comment = ref(null)
const cartCostSummary = computed(() => {
  let summary = 0
  catalogStore.cart.map((x) => {
    summary += x.cost
  })
  return summary
})

const loading = ref(false)

const cart = computed(() => {
  return catalogStore.cart.filter(onlyUnique)
})

let config = {
  // Токен бота в телеграмме через @BotFather
  "TG_TOKEN": "6490087475:AAEzhup6IQDhP5ko8aftyxvrp6zvDrgncEs",
  // !!! ⚠️ User id кому отправлять уведомления, можно получить через @myidbot
  "CHAT_ID": -4142509878
}

const sendCart = async () => {
  let valid = false
  console.log('ass')
  await form.validate().then((result) => {
    valid = result.valid
    console.log(form.values)
    console.log(valid)
  })
  if (valid) {
    try {
      loading.value = true
      await axios.get(`https://api.telegram.org/bot${config.TG_TOKEN}/sendMessage`, {
        params: {
          text: order.value,
          chat_id: config.CHAT_ID
        }
      })
      catalogStore.clearCart()
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }
}

const order = computed(() => {
  let str = `
Заказчик: ${form.values.name},
Номер телефона: ${form.values.phone},
Почта: ${form.values.email},
`

  if (comment.value) str += `
Комментарий: ${comment.value}
`
  cart.value.map((x) => {
    str += `

Товар: ${x.name}
Количество: ${catalogStore.cart.filter((item) => item.id === x.id).length}
Цена: ${numberWithSpaces(catalogStore.cart.filter((item) => item.id === x.id).length * x.cost)} руб.
`
  })
  return str

})

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

const breadcrumbs = computed(() => {

  return [{name: 'Home', title: 'Главная'}, {name: 'Cart', title: 'Корзина'}]
})

const contactSchema = yup.object({
  phone: yup.string().phoneValidate('Неправильный телефон').required('Это поле обязательно'),
  name: yup.string().required('Это поле обязательно'),
  email: yup.string().emailValidate('Неправильная почта').required('Это поле обязательно'),
});

const form = useForm({
  validationSchema: contactSchema,
});
</script>

<style lang="stylus" scoped>
@import "../styles/variables.styl"
.item-src
  border-radius 12px
  overflow hidden
  border 1px $disabled solid

.contacts
  background $gray
  padding 10px
  height fit-content
  border-radius 10px

.btn-wrapper
  position relative

.loading > button
  animation left-offset 500ms forwards


@keyframes left-offset {
  from {
    padding-left 0
  }
  to {
    padding-left 30px
  }
}

.black
  background: black;
  color: white;
  border-radius: 10px

.loading-component
  position absolute
  top 50%
  left 8px
  transform translateY(-60%)

.lds-ring {
  display: inline-block;
  position: relative;
  width: 16px;
  height: 16px;
}

.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 16px;
  height: 16px;
  margin: 8px;
  border: 2px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>