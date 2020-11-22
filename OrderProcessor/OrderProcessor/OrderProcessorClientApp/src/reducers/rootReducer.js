import constants from '../constants'

const { ACTIONS } = constants

export const initialState = {
  orders: [],
}

const RootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.ADD_ORDER:
      return {
        orders: [...state.orders, action.order],
      }
    case ACTIONS.UPDATE_ORDER_STATUS: {
      const orders = [...state.orders]
      const order = orders.find((o) => o.id === action.orderId)
      order.status = action.status
      return {
        orders,
      }
    }
    case ACTIONS.RECEIVED_ORDERS:
      return {
        ...state,
        orders: action.orders,
      }
    default:
      return {
        ...state,
      }
  }
}

export default RootReducer
