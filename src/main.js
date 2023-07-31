import { createApp } from 'vue'
import App from './App.vue'
// Vuetify
import 'vuetify/styles'
import createVuetify from './plugins/vuetify'
import router from './router/index'



createApp(App).use(createVuetify).use(router).mount('#app')