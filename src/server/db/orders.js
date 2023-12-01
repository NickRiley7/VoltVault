const client = require('./client')
// const { attachItemsToOrders } = require('./items')
// const { getUserByUsername } = require('./users')
const util = require('./util.js');

async function getOrderById(id){
  try {
    const {rows: [order]} = await client.query(`
      SELECT * FROM orders
      WHERE id = $1
    `, [id]);
    return order;
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
    const { rows: orders } = await client.query(`
    SELECT orders.*, users.username AS "userName"
    FROM orders
    JOIN users ON orders."userId" = users.id 
    `);
    return attachItemsToOrders(orders);
  } catch (error) {
    throw error
  }
}
async function getAllOrdersByUser({username}) {
  try {
    const user = await getUserByUsername(username);
    const { rows: orders } = await client.query(`
    SELECT orders.*, users.username AS "userName"
    FROM orders
    JOIN users ON orders."userId" = users.id 
    WHERE "userId" = $1
    `, [user.id]);
    return attachItemsToOrders(orders);
  } catch (error) {
    throw error
  }
}
async function getCompletedOrdersByUser({username}) {
  try {
    const user = await getUserByUsername(username);
    const { rows: orders } = await client.query(`
    SELECT orders.*, users.username AS "userName"
    FROM orders
    JOIN users ON orders."userId" = users.id 
    WHERE "userId" = $1
    AND "order_status" = completed
    `, [user.id]);
    return attachItemsToOrders(orders);
  } catch (error) {
    throw error
  }
}

async function getAllCompletedOrders() {
  try {
    const { rows: orders } = await client.query(`
    SELECT orders.*, users.username AS "userName"
    FROM orders
    JOIN users ON orders."userId" = users.id
    WHERE "order_status" = completed
    `);
    return attachItemsToOrders(orders);
  } catch (error) {
    throw error
  }
}

async function getCompletedOrdersByItem({id}) {
  try {
    const { rows: orders } = await client.query(`
      SELECT orders.*, users.username AS "userName"
      FROM orders
      JOIN users ON orders."userId" = users.id
      JOIN order_items ON order_items."orderId" = orders.id
      WHERE orders."order_status" = completed
      AND order_items."itemId" = $1;
    `, [id]);
    return attachItemsToOrders(orders);
  } catch (error) {
    throw error;
  }
}

async function createOrder({userId, order_status, order_total}) {
  try {
    const {rows: [order]} = await client.query(`
        INSERT INTO orders ("userId", "order_status", "order_total")
        VALUES($1, $2, $3, $4)
        RETURNING *;
    `, [userId, order_status, order_total]);

    return order;
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
    await client.query(`
        DELETE FROM order_items 
        WHERE "orderId" = $1;
    `, [id]);
    const {rows: [order]} = await client.query(`
        DELETE FROM orders 
        WHERE id = $1
        RETURNING *
    `, [id]);
    return order;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getOrderById,
  getOrdersWithoutItems,
  getAllOrders,
  getAllCompletedOrders,
  getAllOrdersByUser,
  getCompletedOrdersByUser,
  getCompletedOrdersByItem,
  createOrder,
  updateOrder,
  destroyOrder,
}