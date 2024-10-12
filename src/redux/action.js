// action.js

const addToCart = (payload) => {
  return {
    type: 'ADD_TO_CART',
    payload: payload
  }
}

const removeFromCart = (payload) => {
    return {
      type: 'REMOVE_FROM_CART',
      payload: payload
    }
  }

const updateQuantity = (payload) => {
  return {
    type: 'UPDATE_QUANTITY',
      payload: payload
  }
}

const addToWishList = (payload) => {
return {
    type: 'ADD_TO_WISH_LIST',
    payload: payload
}
}

const removeFromWishList = (payload) => {
    return {
    type: 'REMOVE_FROM_WISH_LIST',
    payload: payload
    }
}

export {addToCart, addToWishList, removeFromCart, removeFromWishList, updateQuantity}
