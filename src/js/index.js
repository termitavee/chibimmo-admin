const login = require('./js/login')
const index = require('./js/index')
const admin = require('./js/admin')
const news = require('./js/news')
const newsEditor = require('./js/news-editor')


const routes = [
  { path: '/login', component: login },
  { path: '/index', component: index },
  { path: '/admin', component: admin },
  { path: '/news', component: news },
  { path: '/newsEditor', component: newsEditor }
]


const router = new VueRouter({
  routes
})


const app = new Vue({
  router
}).$mount('#indexApp')
router.push('login')
