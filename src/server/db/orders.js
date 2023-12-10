const client = require('./client')
const { getUserById } = require('./users')
const { attachItemsToOrders } = require('./items')
const { getAllItemsByOrderId } = require('./items.js')
// const { getUserByUsername } = require('./users')
const util = require('./util.js');

async function getOrderById(id){
  try {
    console.log(`starting getOrderById with the following ID ${id}...`)
    const {rows: order} = await client.query(`
      SELECT orders.*, users.username AS "username" 
      FROM orders
      JOIN users ON orders."userId" = users.id
      WHERE orders.id = $1
    `, [id]);
    console.log ('successfully get an order!')
    return attachItemsToOrders(order);
  } catch (error) {
    throw error;
  }
}

async function getOrdersWithoutItems(){
  try {
    const {rows} = await client.query(`
    SELECT * FROM orders;
    `);
    return rows;
  } catch (error) {
    throw error
  }
}

async function getAllOrders() {
  try {
    console.log('Getting all orders...')
    const { rows: orders } = await client.query(`
    SELECT orders.*, users.username AS "username"
    FROM orders
    JOIN users ON orders."userId" = users.id 
    `);
    const ordersWithItems = await attachItemsToOrders(orders)
    console.log('THIS IS ORDERS IN GET ALL ORDERS: ', ordersWithItems)
    return ordersWithItems;
  } catch (error) {
    throw error
  }
}

async function getAllOrdersByUser({username}) {
  try {
    const user = await getUserByUsername(username);
    const { rows: orders } = await client.query(`
    SELECT orders.*, users.username AS "username"
    FROM orders
    JOIN users ON orders."userId" = users.id 
    WHERE "userId" = $1
    `, [user.id]);
    return attachItemsToOrders(orders);
  } catch (error) {
    throw error
  }
}

async function getOrdersByUserId ({userId}) {
  try{
    const user = await getUserById (userId);
    const { rows: orders } = await client.query(`
      SELECT
        orders.*, users.id AS "userId"
      FROM
        orders
      JOIN users ON orders."userId" = users.id
      WHERE "userId" = $1
    `, [user.id])
  } catch (error) {
    throw error
  }
}

async function getAllOpenOrders () {
  try {
    console.log ('starting getAllOpenOrders...')
    const { rows: orders } = await client.query(`
      SELECT 
        orders.*, users.id AS "userId", users.username, users.firstname, users.lastname, users.address, users.address2, users.city, users.state, users.zip, users.email
      FROM orders
      JOIN users ON orders."userId" = users.id
      WHERE orders."isOpen" = true
    `)
    // console.log ('THIS IS ORDER STATUS', orders."isOpen")
    return attachItemsToOrders(orders)
  }
  catch (error){ 
    console.error ('ERROR! in getting all open orders')
    throw error
  }
}

async function getOpenOrderByUserId (userId) {

  try {
    console.log ('starting getOpenOrderByUserId function...')
    const user = await getUserById (userId);
    const { rows: orders } = await client.query(`
      SELECT 
        orders.*, users.id AS "userId", users.username, users.firstname, users.lastname, users.address, users.address2, users.city, users.state, users.zip, users.email
      FROM orders
      JOIN users ON orders."userId" = users.id
      WHERE orders."userId" = $1
      AND "isOpen" = true
    `, [user.id])
    return attachItemsToOrders(orders)
  }
  catch (error){
    console.error ('ERROR! in getting open order by user id!')
    throw error
  }
}

async function getCompletedOrdersByUser({username}) {
  try {
    const user = await getUserByUsername(username);
    const { rows: orders } = await client.query(`
    SELECT orders.*, users.username AS "username"
    FROM orders
    JOIN users ON orders."userId" = users.id 
    WHERE "userId" = $1
    AND ""isOpen"" = false
    `, [user.id]);
    return attachItemsToOrders(orders);
  } catch (error) {
    throw error
  }
}

async function getAllCompletedOrders() {
  try {
    const { rows: orders } = await client.query(`
    SELECT orders.*, users.username AS "username"
    FROM orders
    JOIN users ON orders."userId" = users.id
    WHERE ""isOpen"" = false
    `);
    return attachItemsToOrders(orders);
  } catch (error) {
    throw error
  }
}

async function getCompletedOrdersByItem({id}) {
  try {
    const { rows: orders } = await client.query(`
      SELECT orders.*, users.username AS "username"
      FROM orders
      JOIN users ON orders."userId" = users.id
      JOIN order_items ON order_items."orderId" = orders.id
      WHERE orders."isOpen" = false
      AND order_items."itemId" = $1;
    `, [id]);
    return attachItemsToOrders(orders);
  } catch (error) {
    throw error;
  }
}

async function createOrder({userId, isOpen, order_total}) {
  try {
    const {rows: orders} = await client.query(`
        INSERT INTO orders ("userId", "isOpen", "order_total")
        VALUES($1, $2, $3)
        RETURNING *;
    `, [userId, isOpen, order_total]);

    console.log ('THESE ARE THE ORDERS IN CREATE ORDER FUNCTION', orders)

    return attachItemsToOrders(orders);
  } catch (error) {
    throw error;
  }
}

async function updateOrder({id, ...fields}) {
  try {
    const toUpdate = {}
    for(let column in fields) {
      if(fields[column] !== undefined) toUpdate[column] = fields[column];
    }
    console.log ('THIS IS UTIL DBFIELDS ', util.dbFields(toUpdate).insert)
    let order;
    if (util.dbFields(fields).insert.length > 0) {
      const {rows} = await client.query(`
          UPDATE orders 
          SET ${ util.dbFields(toUpdate).insert }
          WHERE id=${ id }
          RETURNING *;
      `, Object.values(toUpdate));
      order = rows[0];
      return order;
    }
  } catch (error) {
    throw error;
  }
}
async function destroyOrder(id) {
  try {
    console.log ('starting to destroy order no. ', id)
    console.log ('THIS IS ID: ', id)
    await client.query(`
        DELETE FROM order_items 
        WHERE "order_id" = $1;
    `, [id]);
    const {rows: [order]} = await client.query(`
        DELETE FROM orders 
        WHERE id = $1
        RETURNING *
    `, [id]);
    return order;
  } catch (error) {
    console.error ('error in destroying order')
    throw error;
  }
}

async function totalAmountCalc(orderId) {
  try {
    console.log (`starting calculation for orderid no. ${orderId}...`)
    const items = await getAllItemsByOrderId(orderId)
    console.log (`These are the items that we are going to start calculate ${items}`)
    const totalItemAmount = items.map(item => item.price * item.quantity)
    const overallTotalAmount = totalItemAmount.reduce((acc, cur) => acc + cur,0)

    return overallTotalAmount
  }
  catch (error) {
    console.error ('ERROR! in calculating total amount')
    throw error
  }
}

module.exports = {
  getOrderById,
  getOrdersWithoutItems,
  getAllOrders,
  getAllCompletedOrders,
  getAllOrdersByUser, 
  getOrdersByUserId,
  getAllOpenOrders,
  getOpenOrderByUserId,
  getCompletedOrdersByUser,
  getCompletedOrdersByItem,
  createOrder,
  updateOrder,
  destroyOrder,
  totalAmountCalc
}