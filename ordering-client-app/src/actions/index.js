import constants from '../constants'

const { ACTIONS } = constants

export const addOrder = (order = {}) => ({
  type: ACTIONS.ADD_ORDER,
  order,
})

export const updateOrderStatus = (orderId, status) => ({
  type: ACTIONS.UPDATE_ORDER_STATUS,
  orderId,
  status,
})

export const receivedOrders = (orders = []) => ({
  type: ACTIONS.RECEIVED_ORDERS,
  orders,
})
