const { query } = require('express');
const client = require('./client')
const util = require ('./util.js');

// const express = require('express');
// const import { v4 as uuidv4 } from 'uuid';


async function getItemID(id) {
  try {
    console.log ('GETTING ITEM BY ID...')
    console.log ('THIS IS ID FROM THE FUNCTION: ', id)
    const result = await client.query (
      `SELECT * FROM items
      WHERE id = $1`,
      [id]);

      const {row: [item]} = result
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

async function getALLItems () {
  try {
    const{ rows } = await client.query (
      `SELECT name, price, img 
      FROM items`
    );
    return rows; 
  } catch (err){
    throw err;
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
// async function updateItem({id, ...fields}){
//   try {
//     const toUpdate ={}
//     for (let column in fields) {
//       if(fields[column] !== undefined) toUpdate[column] = fields[column];
//     }
//     let item; 
//     if (Object.keys(tpUpdate).length > 0 ) {
//       const { rows } = await client.query(
//         `
//         UPDATE items
//         SET ${Object.keys(toUpdate).length + 1}
//         RETURNING *; 
//         `,
//         [...Object.values(toUpdate), id]);
//         item = rows[0];
//         return item;
//     }
//   } catch (err){
//     throw err;
//   }
// }

async function updateItem(itemId, updatedField) {
  const {name, price, details, img, category, stock } = updatedField;
  const query = `
  UPDATE items
  SET name = $1, price = $2, details = $3, img = $4, category = $5, stock = $6
  WHERE id = $7
  RETURNING *;
   `;
   const values = [name, price, details, img, category, stock, itemId];
   try {
    const result = await client.query(query, values );
    return result.rows[0];
   } catch (err){
    console.log("Err updating" );
    throw err
   }
}
// I find this way of doing the create item function is easier to understand what is going on

async function deleteItem (id) {
  try {
    const{ rows: [item] } = await client.query (
      `
      DELETE FROM items
      WHERE id = $1
      return *;
      `,
      [id]
    );
    return item;
  } catch (err){
    throw err;
  }
}


module.exports ={
  getItemID,
  getItemByName,
  getALLItems,
  createItem,
  updateItem,
  deleteItem
};
