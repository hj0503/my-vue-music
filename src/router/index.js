import Vue from 'vue'
import Router from 'vue-router'
import MyMusic from '../components/MyMusic/MyMusic.vue'
import RankingList from '../components/RankingList/RankingList.vue'
import No from '../components/No/No.vue'
import Search from '../components/Search/Search.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: '/',
      component: MyMusic
    },
    {
      path: '/my-music',
      name: 'MyMusic',
      component: MyMusic
    },
    {
      path: '/ranking-list',
      name: 'RankingList',
      component: RankingList
    },
    {
      path: '/no',
      name: 'No',
      component: No
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
})