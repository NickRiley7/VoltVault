const express = require('express')
const ordersRouter = express.Router()
const { getAllOrders, getOrdersWithoutItems, getOrdersByUserId, createOrder, getOrderById, updateOrder, destroyOrder } = require('../db/orders');
const { getUserById } = require ('../db/users')
const { requireUser, requiredNotSent, requireAdmin } = require('./utils')

ordersRouter.get('/', requireAdmin, async (req, res, next) => { //admin
  try {
    const orders = await getOrdersWithoutItems();
    res.send(orders);
    console.log ('this is the user:', req.user.isadmin )
  } catch (error) {
    next(error)
  }
})

// somewhat similar to me users endpoint

ordersRouter.get('/:userId/myorders', requireUser, async (req, res, next) => {
  try{
    const {userId} = req.params;
    console.log(userId)
    const orders = await getOrdersByUserId (userId)
    console.log(orders)
  }
  catch(error) {
    console.error(error)
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

ordersRouter.patch(
  '/:orderId',
  requireUser,
  requiredNotSent({requiredParams: ['order_status', 'order_total', 'items'], atLeastOne: true}),
  async (req,res,next) => {
    try {
      const{order_status, order_total, items} = req.body;
      const {orderId} =req.params;
      const orderToUpdate = await getOrderById(orderId);
      console.log ('THIS IS ORDER ID ', orderId)
      if(!orderToUpdate) {
        next({
          name: 'NotFound',
          message: `No order by ID ${orderId}`
        })
      } else if (req.user.id !== orderToUpdate.userId) {
        res.status(403);
        // console.log ('THIS IS LOGGED-IN USER: ', req.user.id)
        // console.log ('THIS IS ORDER'S USER: ', orderToUpdate.userId)
        next ({
          name: "WrongUserError",
          message: "You must be the same user who created this routine to perform this action"
        });
      } else {
        const updatedOrder = await updateOrder({
          id: orderId, order_status, order_total, items
        });
        if(updatedOrder){
          res.send(updatedOrder)
        } else {
          next({
            name: 'FailedToUpdate',
            message: 'There was an error updating your routine'
          })
        }
      }
    }
    catch (error){
      console.error ('Error in Patching orders')
      next (error)
    }
  }
)

ordersRouter.delete('/:orderId', requireUser, async (req, res, next)=> {
  try {
    console.log ('deleting order...')
    const {orderId} = req.params;
    // console.log('THIS IS ORDER ID ', orderId)
    const orderToUpdate = await getOrderById(orderId);
    // console.log ('THIS IS ORDER TO UPDATE: ', orderToUpdate)
    if (!orderToUpdate) {
      next({
        name: 'NotFound',
        message: `No order by ID ${orderId}`
      })
    }
    else if (req.user.id !== orderToUpdate.userId) {
      res.status(403);
      next({
        name: 'WrongUserError',
        message: 'You must be the same user who created this order to perform this action'
      });
    }
    else {
      
      const deletedOrder = await destroyOrder(orderId)
      res.send ({deletedOrder})
      console.log ('order deleted ...')

    }
  }
  catch (error) {
    next(error)
  }
})

module.exports = ordersRouter;