import { createApp } from 'vue'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// VueSignature
import Vue3Signature from "vue3-signature"

// Vue Router
import router from './router'

import App from './App.vue'

const vuetify = createVuetify({
    components,
    directives,
})
const MyApp = createApp(App)
MyApp.use(vuetify)
MyApp.use(Vue3Signature)
MyApp.use(router)
MyApp.mount('#app')
