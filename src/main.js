import Vue from 'vue'
import Vuetify from 'vuetify'

import App from './App.vue'
import DaySpanVuetify from 'dayspan-vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'dayspan-vuetify/dist/lib/dayspan-vuetify.min.css'

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

Vue.config.productionTip = false
//
// Vue.use(Vuetify);
//
// Vue.use( DaySpanVuetify, {
//   // // options is vue definition, the resulting reactive component is stored in components as this.$dayspan or Vue.$dayspan
//   // data: {
//   //   // data or computed to override
//   // },
//   // computed: {
//   //   // data or computed to override
//   // },
//   // methods: {
//   //   // methods to override
//   // }
// });

new Vue({
  render: h => h(App),
}).$mount('#app')
