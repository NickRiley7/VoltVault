const express = require('express')
const ordersRouter = express.Router()
const { getAllOrders, getOrdersWithoutItems, getOrdersByUserId, createOrder, getOrderById, updateOrder, destroyOrder } = require('../db/orders');
const { getUserById } = require ('../db/users');
const { addItemToOrder, getOrderItemById, getOrderItemsByOrder } = require ('../db/order_items')
const { requireUser, requiredNotSent, requireAdmin } = require('./utils')

ordersRouter.get('/', requireAdmin, async (req, res, next) => { //admin
  try {
    const orders = await getOrdersWithoutItems()
    // const orders = await getAllOrders(); //change to getOrdersWithOutItems if getAllOrders still not working
    console.log ('successfully getting all orders')
    res.send(orders);
    console.log ('this is the user:', req.user.isadmin )
  } catch (error) {
    next(error)
  }
})

ordersRouter.get('/:orderId', requireUser, async (req, res, next) => {
  try {
    const {orderId} =req.params;
    const order = await getOrderById(orderId);
    console.log ('THIS IS ORDER ID ', orderId)
    if(!order) {
      next({
        name: 'NotFound',
        message: `No order by ID ${orderId}`
      })
    } else if (req.user.id !== order.userId) {
      res.status(403);
      // console.log ('THIS IS LOGGED-IN USER: ', req.user.id)
      // console.log ('THIS IS ORDER'S USER: ', orderToUpdate.userId)
      next ({
        name: "WrongUserError",
        message: "You must be the same user who created this routine to perform this action"
      });
    } else {
      res.send(order)
    }
  }
  catch (error){
    console.error ('Error in Getting order')
    next (error)
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

ordersRouter.post ('/:orderId/items', requiredNotSent({requiredParams: [ 'item_id', 'quantity']}), async (req, res, next) => {
  try {
    const {item_id, quantity} = req.body;
    console.log ('THIS IS ITEM AND QUANTITY', item_id, quantity)

    const {orderId} = req.params;
    const foundOrderItems = await getOrderItemsByOrder ({id: orderId});
    console.log ('THIS IS FOUND ORDER ITEMS', foundOrderItems)
    const existingOrderItems = foundOrderItems && foundOrderItems.filter(orderItem => orderItem.item_id === item_id);
    console.log ('THIS IS EXISTING ORDER ITEMS: ', existingOrderItems)
    if(existingOrderItems && existingOrderItems.length) {
      console.log ('THIS COMBINATION IS ALREADY EXIST', orderId, item_id)
      next({
        name: 'OrderItemsExistError',
        message: `An order_id by that order_id ${orderId}, item_id ${item_id} combination already exists`
      });
    } else {
      console.log ('CREATING ORDER_ITEM...')
      console.log ('THIS IS ORDER_ID', orderId)
      const createdOrderItem = await addItemToOrder({ order_id: orderId, item_id, quantity });
      if(createdOrderItem) {
        res.send(createdOrderItem);
      } else {
        next({
          name: 'FailedToCreate',
          message: `There was an error adding item ${item_id} to order ${orderId}`
        })
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;