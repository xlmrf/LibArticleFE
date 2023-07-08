import { createApp } from 'vue'
import router from "./router";
import App from './App.vue'
import store from './store/index'
import email from "./mixins/email";
import translate from "./mixins/translate";
import truncate from "./mixins/truncate";
import dateConverter from "./mixins/dateConverter";
import messages from "@/mixins/messages";
// import '../style/theme.css';
require('./bootstrap');

const app = createApp(App);
app
    .mixin(truncate)
    .mixin(email)
    .mixin(translate)
    .mixin(dateConverter)
    .mixin(messages)
    .use(store)
    .use(router)
    .mount('#app');
