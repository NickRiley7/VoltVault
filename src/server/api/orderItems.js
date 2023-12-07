const express = require('express')
const orderItemsRouter = express.Router()
const { getAllOrders } = require ('../db/orders')
const { getOrderItemsById, updateOrderItem } = require ('../db/order_items')
const { requireAdmin, requireUser, requiredNotSent } = require ('./utils')
const { UNSAFE_NavigationContext } = require('react-router-dom')

orderItemsRouter.patch ('/:orderItemsId', requireUser, requiredNotSent({requiredParams: ['quantity'], atLeastOne: true}), async (req, res, next) => {
  try{
    console.log ('start patching orderItems ...')
    const {quantity} = req.body;
    const {orderItemsId} = req.params;
    const orderItemsToUpdate = await getOrderItemsById(orderItemsId)
    const orderToUpdateId = orderItemsToUpdate.order_id

    if (!orderItemsToUpdate) {
      next({
        name: 'NotFound',
        message: `No order_items foudn by id ${orderItemsId}`
      })
    } else {
      if(orderToUpdateId !== req.user.id) {
        res.status(403)
        console.log ('THIS IS ORDER TO UPDATE ID', orderToUpdateId)
        console.log ('THIS IS REQ USER ID ', req.user.id)
        next({
          name: "Unauthorized",
          message: "You are not the user of this order_items!"
        })
      }
      else {
        const updatedOrderItems = await updateOrderItem({id: orderItemsId, quantity})
        res.send(updatedOrderItems)
      }
    }
  }
  catch (error){
    console.error ("error in patching orderItems");
    next(error)
  }
})

module.exports = orderItemsRouter