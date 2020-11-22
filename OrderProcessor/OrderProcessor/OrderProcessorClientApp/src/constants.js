const constants = {
  ORDER_HUB_URL: 'https://localhost:44311/orderhub',
  ACTIONS: {
    ADD_ORDER: 'ADD_ORDER',
    UPDATE_ORDER_STATUS: 'UPDATE_ORDER_STATUS',
    RECEIVED_ORDERS: 'RECEIVED_ORDERS',
  },
  ORDER_STATUSES: [
    'Acknowledge',
    'Start processing',
    'Finish processing',
    'Complete',
    'Order is complete',
  ],
  STATUS_COMPLETE: 4,
}

export default constants
