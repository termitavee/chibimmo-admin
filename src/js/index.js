/* import Vue from 'vue'*/
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
 


import login from './logIn.vue'
import index from './logged'
import newsEditor from './feed-editor'



Vue.use(VueRouter)
Vue.use(Vuelidate)

const routes = [
  { path: '/login', component: login },
  { path: '/index', component: index },
  { path: '/newsEditor', component: newsEditor }
]


const router = new VueRouter({
  routes
})

console.log(router)
const app = new Vue({
  router
}).$mount('#indexApp')

console.log(app)
router.push('login')
