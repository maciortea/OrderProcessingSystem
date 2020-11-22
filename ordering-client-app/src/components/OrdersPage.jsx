import React from 'react'
import Alert from './common/Alert'
import { getStatusText } from '../utils'
import constants from '../constants'

const { ORDER_STATUS } = constants

const OrdersPage = ({ orders = [] }) => {
  const renderOrderRow = (order, index) => {
    const orderNo = index + 1
    const addressLine = order.address
      ? order.address.addressLine
      : order.addressLine
    const city = order.address ? order.address.city : order.city
    const rowClass =
      order.status === ORDER_STATUS.NEW
        ? 'table-light'
        : order.status === ORDER_STATUS.COMPLETE
        ? 'table-success'
        : 'table-secondary'

    return (
      <tr key={order.id} className={rowClass}>
        <th scope='row'>{orderNo}</th>
        <td>{order.productName}</td>
        <td>{order.quantity}</td>
        <td>{`${addressLine}, ${city}`}</td>
        <td>{getStatusText(order.status)}</td>
      </tr>
    )
  }

  return (
    <>
      <h4>Your orders</h4>
      {orders.length <= 0 ? (
        <Alert message='You have no orders' />
      ) : (
        <table className='table'>
          <thead className='thead-dark'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Product</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Delivery address</th>
              <th scope='col'>Status</th>
            </tr>
          </thead>
          <tbody>{orders.map(renderOrderRow)}</tbody>
        </table>
      )}
    </>
  )
}

export default OrdersPage
