const express = require('express')
const ordersRouter = express.Router()
const { getAllOrders, getOrdersWithoutItems, createOrder } = require('../db/orders');
const { requireUser } = require('./utils')

ordersRouter.get('/', async (req, res, next) => {
  try {
    const orders = await getOrdersWithoutItems();
    res.send(orders);
  } catch (error) {
    next(error)
  }
})

ordersRouter.post('/', requireUser, async (req, res, next) => { //should have requireUser as parameter later on
  const { order_total, items } = req.body;

  const orderData = {};
  
  try {
    console.log('posting new order...')

    orderData.userId = req.user.id;
    orderData.order_total = order_total;
    orderData.items = items;

    const order = await createOrder(orderData)

    if (order) {
      res.send(order)
    } else {
      next({
        name: 'OrderCreationError',
        message: 'There was an error in creating your order. Please try again.'
      })
    }

    console.log('posting new order completed!')

  } catch ({name, message}){
    next (name, message)
  }
})

module.exports = ordersRouter;