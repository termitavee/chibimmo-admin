const login = require('./logIn.vue')
const index = require('./logged')
const newsEditor = require('./feed-editor')

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
