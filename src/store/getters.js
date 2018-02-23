export const viewDirection = state => state.viewDirection

export const classify = state => state.classify

export const good = state => state.good

export const time = state => state.time

export const pickItems = state => state.pickItems

export const buyNum = state => state.buyNum

export const checkoutStatus = state => state.checkoutStatus

export const checked = state => state.checked

export const checkboxModel = state => state.checkboxModel

export const allProducts = state => state.all

export const pendingList = state => state.pendingList

export const cartProducts = state => {
  return state.added.map(({ nid, price, quantity }) => {
    const product = state.all.find(p => p.nid === nid)
    return {
      nid: product.nid,
      name: product.name,
      picUrl: product.picUrl,
      weight: product.weight,
      features: product.pickList,
      inventory: product.inventory,
      price,
      quantity
    }
  })
}
