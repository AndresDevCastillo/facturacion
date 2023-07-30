import { createApp } from 'vue'
import App from './App.vue'
// Vuetify
import 'vuetify/styles'
import createVuetify from './plugins/vuetify'



createApp(App).use(createVuetify).mount('#app')
