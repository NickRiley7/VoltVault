const client = require('./client');
const util = require('./util');

async function getOrderItemById(id){
  try {
    const {rows: [orderItem]} = await client.query(`
      SELECT * FROM order_items
      WHERE id = $1
    `, [id]);
    return orderItem;
  } catch (error) {
    throw error;
  }
}

async function addItemToOrder({
  orderId,
  itemId,
  quantity
}) {
  try {
    const { rows: [orderItem] } = await client.query(`
    INSERT INTO order_items ( "orderId", "itemId", quantity)
    VALUES($1, $2, $3)
    ON CONFLICT ("orderId", "itemId") DO NOTHING
    RETURNING *;
      `, [ orderId, itemId, quantity]);
    return orderItem;
  } catch (error) {
    throw error;
  }
}

async function getAllOrderItems() {
  try {
    const {rows} = await client.query(`
      SELECT * FROM order_items;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getOrderItemsByOrder({id}) {
  try {
    const {rows} = await client.query(`
      SELECT * FROM order_items
      WHERE "orderId" = ${id}
    `);
    return rows;
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
async function updateOrderItem ({id, ...fields}) {
  try {
    const toUpdate = {}
    for(let column in fields) {
      if(fields[column] !== undefined) toUpdate[column] = fields[column];
    }
    let orderItem;
    if (util.dbFields(fields).insert.length > 0) {
      const {rows} = await client.query(`
        UPDATE order_items
        SET ${ util.dbFields(toUpdate).insert }
        WHERE id = ${ id }
        RETURNING *;
      `, Object.values(toUpdate));
      orderItem = rows[0];
      return orderItem;
    }
  } catch (error) {
    throw error;
  }
}

async function destroyOrderItem(id) {
  try {
    const {rows: [orderItem]} = await client.query(`
        DELETE FROM order_items 
        WHERE id = $1
        RETURNING *;
    `, [id]);
    return orderItem;
  } catch (error) {
    throw error;
  }
}

async function canEditOrderItem(orderItemId, userId) {
  const {rows: [orderFromOrderItem]} = await client.query(`
      SELECT * FROM order_items
      JOIN orders ON order_items."orderId" = orders.id
      AND order_items.id = $1
    `, [orderItemId]);
    return orderFromOrderItem.creatorId === userId;
}

module.exports = {
  getOrderItemById,
  addItemToOrder,
  getAllOrderItems,
  getOrderItemsByOrder,
  updateOrderItem,
  destroyOrderItem,
  canEditOrderItem,
};
