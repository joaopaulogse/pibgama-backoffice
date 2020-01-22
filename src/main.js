import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import Buefy from "buefy";
import "./assets/scss/app.scss";
import i18n from "./i18n";
import api from "./services/api";
import VeeValidate from "vee-validate";
import messagesEs from "./locales/validator/messages/es";
import messagesEn from "./locales/validator/messages/en";
import messagesPt from "./locales/validator/messages/pt";
import VueTheMask from "vue-the-mask";
import moment from "moment";
import "./plugins/vee-validate/custom-rules/cpf";

import lodash from "lodash";
import VueLodash from "vue-lodash";

Vue.use(VueLodash, lodash);

let token = localStorage.getItem("token");
if (token) {
  api.defaults.headers["Authorization"] = token;
}

Vue.use(Buefy, {
  // ... global Buefy config stuff ...
  defaultDateParser: date => moment(date).toDate()
});
Vue.use(VueTheMask);

Vue.use(require("vue-moment"), {
  moment
});

Vue.use(VeeValidate, {
  i18nRootKey: "validations",
  i18n,
  dictionary: {
    es: messagesEs,
    en: messagesEn,
    pt: messagesPt
  }
});

Vue.prototype.$api = api;

Vue.config.productionTip = false;

export default new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
