import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import 'ant-design-vue/dist/antd.less'
// 没在babel 按需 配置的时候的写法
// import Button from "ant-design-vue/lib/button";
// import 'ant-design-vue/lib/button/style';

import Authorized from "./components/Authorized";
import Auth from "./directives/auth";
import VueI18n from "vue-i18n";
import enUS from "./locale/enUS";
import zhCN from "./locale/zhCN";
import queryString from "query-string";

import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Input,
  Select,
  LocaleProvider,
  Dropdown,
  DatePicker
} from "ant-design-vue";

// Vue.use(Antd);
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Auth);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.use(LocaleProvider);
Vue.use(Dropdown);
Vue.use(DatePicker);
Vue.use(VueI18n);
Vue.component("Authorized", Authorized);
Vue.config.productionTip = false;

const i18n = new VueI18n({
  locale: queryString.parse(location.search).locale || "zhCN",
  messages: {
    zhCN: {
      message: zhCN
    },
    enUS: {
      message: enUS
    }
  }
});

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
