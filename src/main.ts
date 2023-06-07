import 'virtual:svg-icons-register';

import { createApp } from 'vue';
import store from './stores';
import '@/styles/index.css';
import 'uno.css';
import App from './App.vue';
import router from './router';

//解决ui 样式被tailwind覆盖的问题
const meta = document.createElement('meta');
meta.name = 'naive-ui-style';
document.head.appendChild(meta);
const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');
