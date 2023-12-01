const db = require('./client');
const { createUser } = require('./users');
// const { v4: uuidv4 } = require('uuid');

const users = [
  {
    id: 1,
    username: 'ross',
    firstName: 'Ross',
    lastName: 'Ritter',
    address: '123 Main St',
    email: 'rar@email.com',
    password: 'RAR',
    isAdmin: true,
  },
 {
    id: 2,
    username: 'example',
    firstName: 'John',
    lastName: 'Doe',
    address: '456 Oak St',
    email: 'john@example.com',
    password: 'example',
    isAdmin: false,
  },
];

const items = [
  {
    id: 1,
    name: 'item 1' ,  
    price: 19.99,
    details: 'Description for Item 1',
    img: 'https://example.com/item1.jpg',
    tags: ['tag1', 'tag2'],
    category: 'Category 1',
    stock: 10,
  },
  {
    id: 2,
    name: 'Item 2',
    price: 29.99,
    details: 'Description for Item 2',
    img: 'https://example.com/item2.jpg',
    tags: ['tag3', 'tag4'],
    category: 'Category 2',
    stock: 15,
  },
];
const orders = [
  {
    order_id: 1,
    user_id: users[0].id,
    order_date: new Date(),
    // https://javascript.info/date#:~:text=The%20string%20format%20should%20be,%2C%20minutes%2C%20seconds%20and%20milliseconds.
    order_status: 'open',
    order_total: 0,
    items: [],
  },
  {
    order_id: 2,
    user_id: users[1].id,
    order_date: 
    order_status: 'open',
    order_total: 0,
    items: [],
  },
];

const orderItems = [
  { order_id: orders[0].order_id, product_id: items[0].id, quantity: 2 },
  { order_id: orders[1].order_id, product_id: items[1].id, quantity: 1 },
];


const dropTables = async () => {
  try {
      await db.query(`
      DROP TABLE IF EXISTS users;
      `)
  }
  catch(err) {
      throw err;
  }
};
const createTables = async () => {
  try{
      await db.query(` 
      CREATE TABLE users (
        id ,
        username , 
        first_name ,
        last_name ,
        address ,
        email ,
        password , 
        is_admin 
      );

      CREATE TABLE items (
        id SERIAL PRIMARY KEY, 
        name TEXT 
        price DECIMAL (10, 2)
        details TEXT 
        img VARCHAR (55)
        category TEXT 
        stock INT 
        );






`
    );
    } catch(err) {
      throw err;
  }
    }
module.exports = { users, items, orders, orderItems };

// need to add the SQL to the User table 
// note for SERIAL SQL https://www.ibm.com/docs/en/informix-servers/14.10?topic=types-serialn-data-type