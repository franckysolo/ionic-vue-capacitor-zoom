import Vue from 'vue'
import App from './App.vue'
import router from './router'
import IonicVue from '@ionic/vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/fr.json'
import { defineCustomElements } from '@ionic/pwa-elements/loader'
import Translator from '@/classes/translator'
import '@ionic/core/css/core.css'
import '@ionic/core/css/ionic.bundle.css'

Vue.use(IonicVue)
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false
Vue.config.ignoredElements.push(/^ion-/)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule] // assign message
  });
})

Vue.prototype.$trans = (string) => {
  return (new Translator('fr')).translate(string)
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

defineCustomElements(window)
