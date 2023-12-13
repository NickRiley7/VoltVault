const { query } = require('express');
const client = require('./client')
const util = require ('./util.js');


async function getItemById(id) {
  try {
    console.log ('GETTING ITEM BY ID...')
    const result = await client.query (
      `SELECT * FROM items
      WHERE id = $1`,
      [id]);

      const {rows: [item]} = result
      return item; 
    
  } catch (err) {
    console.error ('ERROR IN GETTING ITEM BY ID', err)
    throw err; 
  }
}

async function getItemByName(name) {
  try {
    const{ rows: [item] } = await client.query(
      `SELECT * FROM items
      WHERE name = $1 
      `,
      [name]
    );
    return item;
  } catch (err) {
    throw err;
  }
}

async function getAllItems () {
  try {
    const{ rows } = await client.query (
      `SELECT * 
      FROM items`
    );
    return rows; 
  } catch (err){
    throw err;
  }
}

async function getAllItemsByCategory (category) {
  try {
    console.log ('getting all items by category...')
    const { rows: [item] } = await client.query (
      `SELECT * FROM items
      WHERE category = $1
      `, [category]
    );
    console.log ('finished getting all items by category!')
    return item
  } catch (error) {
    console.error ('ERROR! Cannot get all items by category')
    throw error
  }
}

async function getAllItemsByOrderId (orderId) {
  try {
    console.log (`starting to get all items by order id ${orderId}`)
    const {rows: item} = await client.query(`
      SELECT items.*, order_items.*
      FROM items
      JOIN order_items ON order_items.item_id = items.id
      WHERE order_items.order_id = $1;
    `, [orderId])
  
    return item
  }
  catch (error) {
    console.error ('ERROR! Cannot get all items by order id!')
    throw error
  }
}

async function createItem ({name, price, details, img, category, stock }) {
  try {
    const{ rows: [item] } = await client.query ( `
    INSERT INTO items(name, price, details, img, category, stock)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
      `,
      [name, price, details, img, category, stock]
    );
    return item;
  } catch (err) {
    throw err; 
  }
}
async function updateItem({id, ...fields}){
  try {
    console.log('updating item...')
    const toUpdate = {};
    for (let column in fields) {
      if (fields[column] !== undefined) toUpdate[column] = fields[column];
    }
    let item;
    if (util.dbFields(fields).insert.length > 0) {
      const { rows } = await client.query(
        `
          UPDATE items
          SET ${util.dbFields(toUpdate).insert}
          WHERE id=${id}
          RETURNING *;
      `,
        Object.values(toUpdate)
      );
      item = rows[0];
      return item;
    }
  } catch (err){
    throw err;
  }
}

async function destroyItem (id) {
  try {
    console.log (`starting to destroy item with ID ${id}`)
    const{ rows: [item] } = await client.query (
      `
      DELETE FROM items
      WHERE id = $1
      RETURNING *;
      `,
      [id]
    );
    console.log(`completed destroying item ID ${id}`)
    return item;
  } catch (err){
    console.error (`error in destroying item with id ${id}`)
    throw err;
  }
}

async function attachItemsToOrders(orders) {
  const ordersToReturn = [...orders];
  const binds = orders.map((_, index) => `$${index + 1}`).join(', ');
  const orderIds = orders.map(order => order.id);
  if (!orderIds?.length) return [];
  
  try {
    const { rows: items } = await client.query(`
      SELECT items.*, order_items.quantity, order_items.id AS "orderItemsId", order_items.order_id
      FROM items 
      JOIN order_items ON order_items.item_id = items.id
      WHERE order_items.order_id IN (${ binds });
    `, orderIds);

    for(const order of ordersToReturn) {
      const itemsToAdd = items.filter(item => item.order_id === order.id);
      order.items = itemsToAdd;
    }
    return ordersToReturn;
  } catch (error) {
    console.error ('error in attaching items to order')
    throw error;
  }
}


module.exports ={
  getItemById,
  getItemByName,
  getAllItems,
  getAllItemsByCategory,
  getAllItemsByOrderId,
  createItem,
  updateItem,
  destroyItem,
  attachItemsToOrders
};
