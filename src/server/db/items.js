const client = require('./client')
const util = require ('./util.js');

// const express = require('express');
// const import { v4 as uuidv4 } from 'uuid';


async function getItemID(Id) {
  try {
    const {row:[item]} = await client.query (
      `SELECT * FROM items 
      WHERE id = $1`,
      [id]); 
      return item; 
    
  } catch (err) {
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
    const{ rows: [item] } = await client.query (
      `SELECT name, price, img 
      FROM items`
    );
    retrun items; 
  } catch (err){
    throw err;
  }
}

async function createItem ({name, price, details, img, category, stock }) {
  try {
    const{ rows: [item] } = await client.query ( `
    INSERT INTO items(name, price, details, img, category, stock)
    VALUES ($1, $2, $4, $5, $6)
    RETURNING *;
      `,
      [name, price, details, img, stock]
    );
    return item;
  } catch (err) {
    throw err; 
  }
}