const express = require('express')
const ordersRouter = express.Router()
const { getAllOrders } = require('../db/orders');
const { requireUser } = require ('./utils');

ordersRouter.get('/', async (req, res, next) => {
  try {
    const routines = await getAllOrders();
    res.send(routines);
  } catch (error) {
    next(error)
  }
})

module.exports = ordersRouter