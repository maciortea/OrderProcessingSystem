const constants = {
  ORDER_HUB_URL: 'https://localhost:44311/orderhub',
  ACTIONS: {
    ADD_ORDER: 'ADD_ORDER',
    UPDATE_ORDER_STATUS: 'UPDATE_ORDER_STATUS',
    RECEIVED_ORDERS: 'RECEIVED_ORDERS',
  },
  ORDER_STATUS: {
    NEW: 0,
    ACKNOWLEDGED: 1,
    PROCESSING_STARTED: 2,
    PROCESSING_FINISHED: 3,
    COMPLETE: 4,
  },
}

export default constants
