import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import VueSweetalert2 from 'vue-sweetalert2';
import './styles/global.scss'
// import 'sweetalert2/dist/sweetalert2.min.css';
import vueDebounce from 'vue-debounce'
import VueParticles from 'vue-particles'

createApp(App)
  .use(store)
  .use(router)
  .use(vueDebounce)
  .use(VueParticles)
  // .use(VueSweetalert2)
  .mount('#app')
