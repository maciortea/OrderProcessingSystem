import React from 'react'
import Alert from './common/Alert'
import constants from '../constants'

const { ORDER_STATUSES, STATUS_COMPLETE } = constants

const OrdersPage = ({ orders = [], updateOrderStatus }) => {
  const renderOrderRow = (order, index) => {
    const orderNo = index + 1

    return (
      <tr key={order.id}>
        <th scope='row'>{orderNo}</th>
        <td>{order.productName}</td>
        <td>{order.quantity}</td>
        <td>{`${order.address.addressLine}, ${order.address.city}`}</td>
        <td>
          {order.status === STATUS_COMPLETE ? (
            <span>{ORDER_STATUSES[order.status]}</span>
          ) : (
            <button
              className='btn btn-primary'
              onClick={() => updateOrderStatus(order.id)}
            >
              {ORDER_STATUSES[order.status]}
            </button>
          )}
        </td>
      </tr>
    )
  }

  return (
    <>
      <h4>Incoming orders</h4>
      {orders.length <= 0 ? (
        <Alert message='There are no incoming orders' />
      ) : (
        <table className='table table-bordered'>
          <thead className='thead-dark'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Product</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Delivery address</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>{orders.map(renderOrderRow)}</tbody>
        </table>
      )}
    </>
  )
}

export default OrdersPage
