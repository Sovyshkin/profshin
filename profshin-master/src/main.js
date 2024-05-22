import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import * as yup from "yup";
import { ErrorMessage, Field, Form } from "vee-validate";
import { validateEmail, validatePhone } from "@/utils";

import { configure } from "vee-validate";

import axios from "axios";
// при пустом url запросы автоматически идут на исходный сервер,
// поэтому коренной рут по сути не нужен
axios.defaults.baseURL = "http://localhost:5010";

const app = createApp(App);

yup.addMethod(yup.string, "phoneValidate", function (errorMessage) {
  return this.test(`phoneValidate`, errorMessage, validatePhone);
});
yup.addMethod(yup.string, "emailValidate", function (errorMessage) {
  return this.test(`emailValidate`, errorMessage, validateEmail);
});

configure({
  validateOnBlur: false, // controls if blur events should trigger validation with handleChange handler
  validateOnChange: false, // controls if change events should trigger validation with handleChange handler
  validateOnInput: true, // controls if input events should trigger validation with handleChange handler
  validateOnModelUpdate: false, // controls if update:modelValue events should trigger validation with handleChange handler
});

app.component("Form", Form);
app.component("Field", Field);
app.use(createPinia()).use(router).mount("#app");
