import React, { useEffect, useState, useReducer } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { HubConnectionBuilder } from '@microsoft/signalr'
import Spinner from './common/Spinner'
import Alert, { AlertType } from './common/Alert'
import NavMenu from './NavMenu'
import HomePage from './HomePage'
import CreateOrderPage from './CreateOrderPage'
import OrdersPage from './OrdersPage'
import RootReducer, { initialState } from '../reducers/rootReducer'
import { addOrder, updateOrderStatus, receivedOrders } from '../actions'
import constants from '../constants'

const { ORDER_HUB_URL, ORDER_STATUS } = constants

const App = () => {
  const history = useHistory()
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

          connection.on('OrderStatusUpdated', (orderId, newStatus) =>
            dispatch(updateOrderStatus(orderId, newStatus))
          )
        })
        .catch(() => setIsConnectionError(true))
    }

    return () => {
      if (connection) {
        connection.off('OrdersReceived')
        connection.off('OrderStatusUpdated')
      }
    }
  }, [connection])

  const placeOrder = (order) => {
    connection.send('CreateOrder', order).then(() => {
      dispatch(
        addOrder({
          ...order,
          status: ORDER_STATUS.NEW,
        })
      )
      history.push('/orders')
    })
  }

  return (
    <div className='container py-3'>
      <header>
        <NavMenu />
      </header>
      <main className='pt-3'>
        {isConnectionError === null && <Spinner />}
        {isConnectionError === true && (
          <Alert
            type={AlertType.Error}
            title='Error connecting to the hub'
            message='Make sure the server is running and try refreshing the page.'
          />
        )}
        {isConnectionError === false && (
          <Switch>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route path='/new'>
              <CreateOrderPage placeOrder={placeOrder} />
            </Route>
            <Route path='/orders'>
              <OrdersPage orders={state.orders} />
            </Route>
          </Switch>
        )}
      </main>
    </div>
  )
}

export default App
