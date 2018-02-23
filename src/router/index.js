import Vue from 'vue'
import Router from 'vue-router'

// 引用模板
import Classify from 'components/classify/classify'
import Explore from 'components/explore/explore'
import Home from 'components/home/home'
import Shoppingcart from 'components/shoppingcart/shoppingcart'
import User from 'components/user/user'

import Blank from 'base/blank/blank'

// 引用子路由
import GoodList from 'components/good-list/good-list'
import GoodDetail from 'components/good-detail/good-detail'
import CartList from 'components/shoppingcart/cart-list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/classify',
      name: 'classify',
      component: Classify
    },
    {
      path: '/good/:id',
      name: 'goodList',
      component: GoodList
    },
    {
      path: '/good/:id/:nid',
      name: 'goodDetail',
      component: GoodDetail
    },
    {
      path: '/good/:id/:nid/cartlist',
      name: 'cartList',
      component: CartList
    },
    {
      path: '/explore',
      name: 'explore',
      component: Explore
    },
    {
      path: '/shoppingcart',
      name: 'shoppingcart',
      component: Shoppingcart
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/blank',
      name: 'blank',
      component: Blank
    }
  ]
})
