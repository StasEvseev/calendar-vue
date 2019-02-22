import Vue from 'vue'
import Vuetify from 'vuetify'

import App from './App.vue'
import DaySpanVuetify from 'dayspan-vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'dayspan-vuetify/dist/lib/dayspan-vuetify.min.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import BootstrapVue from 'bootstrap-vue'
// import Datepicker from 'vuejs-datepicker';

Vue.use(BootstrapVue)

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')
