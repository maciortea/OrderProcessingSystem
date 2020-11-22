import constants from '../constants'

const { ORDER_STATUS } = constants

export const getStatusText = (status) => {
  switch (status) {
    case ORDER_STATUS.NEW:
      return 'Order has been placed'
    case ORDER_STATUS.ACKNOWLEDGED:
      return 'Order has been acknowledged'
    case ORDER_STATUS.PROCESSING_STARTED:
      return 'Order is being processed'
    case ORDER_STATUS.PROCESSING_FINISHED:
      return 'Order is finished'
    case ORDER_STATUS.COMPLETE:
      return 'Order is complete'
    default:
      return ''
  }
}
