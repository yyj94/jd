import * as types from './mutation-types'

const mutations = {
  [types.SET_CLASSIFY](state, classify) {
    state.classify = classify
  },
  [types.SET_GOOD](state, good) {
    state.good = good
  },
  [types.SET_TIME](state, time) {
    state.time = time
  },
  [types.SET_PICKITEMS](state, pickItems) {
    state.pickItems = pickItems
  },
  [types.SET_BUYNUM](state, buyNum) {
    state.buyNum = buyNum
  },
  [types.RECEIVE_PRODUCTS](state, { products }) {
    state.all = products
  },
  [types.TOGGLE_PENDINGLIST](state, { nid }) {
    const record = state.added.find(p => p.nid === nid)
    const newRecord = state.pendingList.find(p => p.nid === nid)
    if (!newRecord) {
      state.pendingList.unshift({
        nid: record.nid,
        price: record.price,
        quantity: record.quantity
      })
    } else {
      let index = state.pendingList.indexOf(newRecord)
      state.pendingList.splice(index, 1)
    }
  },
  [types.CLEAR_PENDINGLIST](state) {
    state.pendingList = []
  },
  [types.SELECT_ALL_PENDINGLIST](state) {
    state.pendingList = []
    state.added.forEach((p) => {
      state.pendingList.unshift({
        nid: p.nid,
        price: p.price,
        quantity: p.quantity
      })
    })
  },
  [types.ADD_TO_CART](state, { nid }) {
    state.all.find(p => p.nid === nid).inventory -= state.buyNum
    state.checkoutStatus = null
    const record = state.added.find(p => p.nid === nid)
    if (!record) {
      state.added.unshift({
        nid,
        quantity: state.buyNum,
        price: state.all.find(p => p.nid === nid).price
      })
    } else {
      record.quantity += state.buyNum
    }
  },
  [types.CHANGE_NUM_CART](state, { nid }) {
    state.checkoutCheckout = null
    const record = state.added.find(p => p.nid === nid)
    const newRecord = state.pendingList.find(p => p.nid === nid)
    state.all.find(p => p.nid === nid).inventory += record.quantity
    record.quantity = state.buyNum
    state.all.find(p => p.nid === nid).inventory -= state.buyNum
    if (newRecord) {
      state.pendingList.find(p => p.nid === nid).quantity = state.buyNum
    }
  },
  [types.TOGGLE_CHECKBOXMODEL](state, { nid }) {
    const record = state.checkboxModel.find(p => p === nid)
    if (!record) {
      state.checkboxModel.push(nid)
      if (state.checkboxModel.length === state.added.length) {
        state.checked = true
      } else {
        state.checked = false
      }
    } else {
      let index = state.checkboxModel.indexOf(record)
      state.checked = false
      state.checkboxModel.splice(index, 1)
    }
  },
  [types.SET_CHECKBOXMODEL](state) {
    if (state.checkboxModel.length < state.added.length) {
      state.checkboxModel = []
      state.added.forEach(p => {
        state.checkboxModel.push(p.nid)
      })
      state.checked = true
    } else {
      state.checked = false
      state.checkboxModel = []
    }
  },
  [types.SET_CHECKED](state, flag) {
    state.checked = flag
  },
  [types.CHECKOUT_REQUEST](state) {
    state.pendingList.forEach(p => {
      let record = state.added.find(y => y.nid === p.nid)
      let index = state.added.indexOf(record)
      state.added.splice(index, 1)
    })
    state.pendingList = []
    state.checkboxModel = []
    state.checked = ''
    state.checkoutStatus = null
  },
  [types.CHECKOUT_SUCCESS](state) {
    state.checkoutStatus = 'successful'
  },
  [types.CHECKOUT_FAILURE](state, { savedCartItems }) {
    // 回滚到发送请求之前保存的购物车快照
    state.added = savedCartItems
    state.checkoutStatus = 'failed'
  }
}

export default mutations
