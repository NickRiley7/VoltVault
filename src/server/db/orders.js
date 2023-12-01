const client = require('./client')
// const { attachProductsToOrders } = require('./products')
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

async function getOrdersWithoutProducts(){
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
    return attachProductsToOrders(orders);
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
    return attachProductsToOrders(orders);
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
    return attachProductsToOrders(orders);
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
    return attachProductsToOrders(orders);
  } catch (error) {
    throw error
  }
}

async function getCompletedOrdersByProduct({id}) {
  try {
    const { rows: orders } = await client.query(`
      SELECT orders.*, users.username AS "userName"
      FROM orders
      JOIN users ON orders."userId" = users.id
      JOIN order_products ON order_products."orderId" = orders.id
      WHERE orders."order_status" = completed
      AND order_products."productId" = $1;
    `, [id]);
    return attachProductsToOrders(orders);
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
        DELETE FROM order_products 
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
  getOrdersWithoutProducts,
  getAllOrders,
  getAllCompletedOrders,
  getAllOrdersByUser,
  getCompletedOrdersByUser,
  getCompletedOrdersByProduct,
  createOrder,
  updateOrder,
  destroyOrder,
}