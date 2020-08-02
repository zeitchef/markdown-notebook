import Vue from 'vue'
import App from './App.vue'
import VueFuse from 'vue-fuse'

Vue.config.productionTip = false

Vue.use(VueFuse)

new Vue({
  render: h => h(App)
}).$mount('#app')
