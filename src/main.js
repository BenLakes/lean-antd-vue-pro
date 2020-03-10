import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import 'ant-design-vue/dist/antd.less'
// 没在babel 按需 配置的时候的写法
// import Button from "ant-design-vue/lib/button";
// import 'ant-design-vue/lib/button/style';

import {Button} from "ant-design-vue";

// Vue.use(Antd);
Vue.use(Button);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
