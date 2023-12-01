const express = require('express')
const router = express.Router()
const { getAllOrders } = require('../db/orders');
const { requireUser } = require ('./utils');

router.get('/', async (req, res, next) => {
  try {
    const routines = await getAllOrders();
    res.send(routines);
  } catch (error) {
    next(error)
  }
})