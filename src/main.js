// VUE 3.
import { createApp } from 'vue'
import App from './App.vue'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'
import '@mdi/font/css/materialdesignicons.min.css'
import "bootstrap/dist/css/bootstrap.css"

const app = createApp(App)

new WaveUI(app, {
  // Some Wave UI options.
})

app.mount('#app')

import "bootstrap/dist/js/bootstrap.js"