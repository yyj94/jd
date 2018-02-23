import shop from '../api/shop'
import * as types from './mutation-types'

export const getAllProducts = ({ commit }) => {
  shop.getProducts((products) => {
    // 获得商品列表
    commit(types.RECEIVE_PRODUCTS, { products })
  })
}

export const addToCart = ({ commit }, product) => {
  if (product.inventory > 0) {
    /*
      添加购物车
      如果该商品的库存大于0，库存减一
      如果该商品已在购物车则数量加一
      不在，则将商品id和数量1添加到购物车列表
    */
    commit(types.ADD_TO_CART, {
      nid: product.nid
    })
  }
}

export const checkout = ({ commit, state }, products) => {
  // 保存当前购物车快照
  const savedCartItems = [...state.added]
  // 提交
  commit(types.CHECKOUT_REQUEST)
  shop.buyProducts(
    products,
    () => commit(types.CHECKOUT_SUCCESS),
    () => commit(types.CHECKOUT_FAILURE, { savedCartItems })
  )
}

export const clearAll = ({ commit, state }) => {
  commit(types.SET_CHECKBOXMODEL)
  commit(types.CLEAR_PENDINGLIST)
  commit(types.SET_CHECKED, false)
}

export const selectAll = ({ commit, state }) => {
  commit(types.SET_CHECKBOXMODEL)
  commit(types.SELECT_ALL_PENDINGLIST)
  commit(types.SET_CHECKED, true)
}

export const toggleItem = ({ commit, state }, product) => {
  commit(types.TOGGLE_PENDINGLIST, product)
  commit(types.TOGGLE_CHECKBOXMODEL, product)
}
