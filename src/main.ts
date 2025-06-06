import "./assets/main.css"

import { createApp } from "vue"
import { createPinia } from "pinia"

import vuetify from "@/utils/vuetify"

import App from "./App.vue"

const app = createApp(App)

app.use(createPinia()).use(vuetify)

app.mount("#app")
