const express = require('express')
const ordersRouter = express.Router()
const { getAllOrders, getOrdersWithoutItems, getOrdersByUserId, getAllOpenOrders, getOpenOrderByUserId, createOrder, getOrderById, updateOrder, destroyOrder, totalAmountCalc } = require('../db/orders');
const { getUserById } = require ('../db/users');
const { addItemToOrder, getOrderItemById, getOrderItemsByOrder } = require ('../db/order_items')
const { requireUser, requiredNotSent, requireAdmin } = require('./utils')

// GET All Orders
ordersRouter.get('/', requireAdmin, async (req, res, next) => { //admin
  try {
    // const orders = await getOrdersWithoutItems()
    const orders = await getAllOrders(); //change to getOrdersWithOutItems if getAllOrders still not working
    console.log ('successfully getting all orders')
    res.send(orders);
    console.log ('this is the user:', req.user.isadmin )
  } catch (error) {
    next(error)
  }
})

// GET All open orders
ordersRouter.get ('/open_orders', requireAdmin, async (req, res, next) => {
  try{
    // console.log ('Starting to get all open orders...')
    const orders = await getAllOpenOrders ()
    // console.log ('Successfully getting all open orders!')
    res.send(orders)
  }
  catch (error) {
    console.error ('ERROR! in getting all open orders')
    throw error
  }
})

//GET open orders by userId
ordersRouter.get ('/open_orders/:userId', async (req, res, next) => {
  try{
    const {userId} = req.params
    console.log (`starting getting open orders by id ${userId}`)
    const openOrder = await getOpenOrderByUserId(userId)
    const openOrderId = openOrder.map (order => order.userId)
    if (!openOrder) {
      next({
        name: 'NotFound',
        message: `No open orders by this user ID ${userId}`
      })
    }
    else if (!req.user.isadmin && req.user.id !== openOrderId[0]) {
      res.status(403);
      next ({
        name: "WrongUserError", 
        message: "You must be the same user who created this routine to perform this action"
      });

      // if (req.user.isadmin) {
      //   console.log (`You are an admin!`)
      //   res.send(openOrder)
      // }
      // else {
      //   res.status(403);
      //   console.log ('THIS IS LOGGED-IN USER: ', req.user.id)
      //   console.log ('THIS IS REQ USER IS ADMIN ', req.user.isadmin)
      //   next ({
      //     name: "WrongUserError",
      //     message: "You must be the same user who created this routine to perform this action"
      //   });
      // }

      // if (!req.user.isadmin) {
      // }
    } else {
      // const orderId = openOrder.map(order => order.id)
      // const overallTotalAmount = await totalAmountCalc(orderId[0])
      // console.log ('THIS IS OVERAL TOTAL AMOUNT', overallTotalAmount)
      console.log (`completed all authorization checks...`)
      res.send(openOrder)
    }
  }
  catch (error) {
    console.error ('ERROR! in getting orders by userId!')
    throw error
  }
})


// GET order by order ID
ordersRouter.get('/:orderId', requireUser, async (req, res, next) => {
  try {
    const {orderId} =req.params;
    console.log (`starting getting open orders by id ${orderId}`)
    const orders = await getOrderById(orderId);
    console.log(`this is the order that we try to get ${orders}`)
    const OrderId = orders.map (order => order.userId)
    console.log ('THIS IS LOGGED IN USER ID ', req.user.id)
    console.log ('THIS IS ORDER ID ', orderId[0])
    if(!orders.length) {
      next({
        name: 'NotFound',
        message: `No order by ID ${orderId}`
      })
    } else if (!req.user.isadmin && req.user.id !== OrderId[0]) {
      res.status(403);
      console.log ('THIS IS LOGGED-IN USER: ', req.user.id)
      console.log ('THIS IS ORDERS USER: ', OrderId[0])
      next ({
        name: "WrongUserError",
        message: "You must be the same user who created this routine to perform this action"
      });
    } else {
      console.log ('successfully pass all authorization checks!')
      res.send(orders)
    }
  }
  catch (error){
    console.error ('Error in Getting order')
    next (error)
  }
})


// POST new order
ordersRouter.post('/', requireUser, async (req, res, next) => { //should have requireUser as parameter later on
  const { order_total, items, isOpen } = req.body;

  const orderData = {};
  
  try {
    console.log('posting new order...')

    orderData.userId = req.user.id;
    orderData.isOpen = isOpen
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

// PATCH an order
ordersRouter.patch(
  '/:orderId',
  requireUser,
  requiredNotSent({requiredParams: ['isOpen', 'order_total', 'items'], atLeastOne: true}),
  async (req,res,next) => {
    try {
      const{isOpen, order_total, items} = req.body;
      const {orderId} =req.params;
      const orderToUpdate = await getOrderById(orderId);
      const orderUserId = orderToUpdate.map(order => order.userId)
      console.log ('THIS IS ORDER ID ', orderId)
      if(!orderToUpdate) {
        next({
          name: 'NotFound',
          message: `No order by ID ${orderId}`
        })
      } else if (!req.user.isadmin && req.user.id !== orderUserId[0]) {
        res.status(403);
        console.log ('IS ADMIN? ', req.user.isadmin)
        console.log ('THIS IS LOGGED-IN USER: ', req.user.id)
        console.log ('THIS IS ORDERS USER: ', orderUserId[0])
        next ({
          name: "WrongUserError",
          message: "You must be the same user who created this routine to perform this action"
        });
      } else {
        const orderAmount = orderToUpdate.map(order => order.order_total)
        const overallTotalAmount = await totalAmountCalc(orderId)


        const updatedOrder = await updateOrder({
          id: orderId, isOpen, order_total: overallTotalAmount, items
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

// DELETE an order
ordersRouter.delete('/:orderId', requireUser, async (req, res, next)=> {
  try {
    console.log ('deleting order...')
    const {orderId} = req.params;
    // console.log('THIS IS ORDER ID ', orderId)
    const orderToUpdate = await getOrderById(orderId);
    // console.log ('THIS IS ORDER TO UPDATE: ', orderToUpdate)
    if (!orderToUpdate.length) {
      next({
        name: 'NotFound',
        message: `No order by ID ${orderId}`
      })
    }
    else if (!req.user.isadmin && req.user.id !== orderToUpdate.userId) {
      res.status(403);
      next({
        name: 'WrongUserError',
        message: 'You must be the same user who created this order to perform this action'
      });
    }
    else {
      const deletedOrder = await destroyOrder(orderId)
      res.send (deletedOrder)
      console.log ('order deleted ...')

    }
  }
  catch (error) {
    next(error)
  }
})

// ordersRouter.post ('/:orderId/add_items', requireUser, ({requiredParams: [ 'item_id', 'quantity'], atLeastOne: true}), async (req, res, next) => {
//   try{
//     const{item_id, quantity} = req.body
//   }
//   catch (error) {
//     console.error ('ERROR! in posting items into order')
//   }
// })

// POST new item into an order
ordersRouter.post ('/:orderId/items', requireUser, requiredNotSent({requiredParams: [ 'item_id', 'quantity'], atLeastOne: true}), async (req, res, next) => {
  try {
    const {item_id, quantity} = req.body;
    console.log ('THIS IS ITEM AND QUANTITY', item_id, quantity)

    const {orderId} = req.params;
    console.log ('this is order id in POST', orderId)
    console.log ('this is req.params', req.params) 
    const orderToUpdate = await getOrderById(orderId)
    const OrderId = orderToUpdate.map (order => order.userId)

    if (!req.user.isadmin && req.user.id !== OrderId[0]){
      res.status(403);
      next({
        name: "WrongUserError",
        message: "You must be the same user who created this routine to perform this action"
      })
    }
    else {
      const foundOrderItems = await getOrderItemsByOrder (orderId);
      console.log ('THIS IS FOUND ORDER ITEMS', foundOrderItems)
      const foundOrderItemsFilter = foundOrderItems.filter(orderItem => orderItem.item_id === item_id)
      console.log ('THIS IS FOUND ORDER ITEMS FILTER', foundOrderItemsFilter) 
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
        const createdOrderItems = await addItemToOrder({ order_id: orderId, item_id, quantity });
        console.log('THIS IS CREATED ORDER ITEMS', createdOrderItems)
        // const createdOrderItem = createdOrderItems.length ? createdOrderItems[0] : null
        // const orderTotalAmount = await totalAmountCalc(orderId)
        // const updatedOrder = await updateOrder ({id: orderId, isOpen, order_total: orderTotalAmount, items})
        if(createdOrderItems) {
          res.send(createdOrderItems);
        } else {
          next({
            name: 'FailedToCreate',
            message: `There was an error adding item ${item_id} to order ${orderId}`
          })
        }
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;