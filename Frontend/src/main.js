import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import globalComponents from "./global-components";
import utils from "./utils";
import "./assets/css/app.css";
import './assets/css/_tailwind.css'
import './assets/css/_colors.css'
import { library } from '@fortawesome/fontawesome-svg-core'


import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret)
const app = createApp(App).use(router)
 .use(createPinia());

globalComponents(app);
utils(app);

app.mount("#app");
