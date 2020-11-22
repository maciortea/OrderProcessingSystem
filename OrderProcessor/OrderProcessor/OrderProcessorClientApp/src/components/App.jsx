import React, { useEffect, useState, useReducer } from 'react'
import { HubConnectionBuilder } from '@microsoft/signalr'
import Spinner from './common/Spinner'
import Alert, { AlertType } from './common/Alert'
import OrdersPage from './OrdersPage'
import RootReducer, { initialState } from '../reducers/rootReducer'
import { addOrder, updateOrderStatus, receivedOrders } from '../actions'
import constants from '../constants'

const { ORDER_HUB_URL } = constants

const App = () => {
  const [connection, setConnection] = useState(null)
  const [isConnectionError, setIsConnectionError] = useState(null)
  const [state, dispatch] = useReducer(RootReducer, initialState)

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(ORDER_HUB_URL)
      .withAutomaticReconnect()
      .build()

    setConnection(newConnection)
  }, [])

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          setIsConnectionError(false)

          connection.send('GetAllOrders')

          connection.on('OrdersReceived', (orders) =>
            dispatch(receivedOrders(orders))
          )

          connection.on('OrderReceived', (order) => dispatch(addOrder(order)))

          connection.on('OrderStatusUpdated', (orderId, newStatus) =>
            dispatch(updateOrderStatus(orderId, newStatus))
          )
        })
        .catch(() => setIsConnectionError(true))
    }

    return () => {
      if (connection) {
        connection.off('OrdersReceived')
        connection.off('OrderReceived')
        connection.off('OrderStatusUpdated')
      }
    }
  }, [connection])

  const updateOrder = (orderId) => {
    connection.send('UpdateOrderStatus', orderId)
  }

  return (
    <div className='container py-3'>
      {isConnectionError === null && <Spinner />}
      {isConnectionError === true && (
        <Alert
          type={AlertType.Error}
          title='Error connecting to the hub'
          message='Make sure the server is running and try refreshing the page.'
        />
      )}
      {isConnectionError === false && (
        <OrdersPage orders={state.orders} updateOrderStatus={updateOrder} />
      )}
    </div>
  )
}

export default App
