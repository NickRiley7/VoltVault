const client = require ('./client')
const { createOrder } = require('./orders')
const { v4: uuidv4 } = require('uuid');

async function dropTables() {
  console.log('Dropping All Tables...');
  // drop all tables, in the correct order
  try {
    await  client.query(`
    DROP TABLE IF EXISTS orderItems;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS items;
    DROP TABLE IF EXISTS users;
  `)
  } catch (error) {
    throw error; 
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`
      id INTEGER PRIMARY KEY,
      username VARCHAR(255),
      firstName VARCHAR(255),
      lastName VARCHAR(255),
      address VARCHAR(255),
      email VARCHAR(255),
      password VARCHAR(255),
      isAdimn BOOL
    `)
    
    await client.query(`
    CREATE TABLE items (
      id INTEGER PRIMARY KEY,
      name TEXT,
      price DECIMAL(10, 2),
      details TEXT,
      img VARCHAR (55)
      category TEXT,
      stock INT,
     );
     
    `)

    await client.query(`
    CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
      order_status VARCHAR(255),
      order_total DECIMAL(10,2)
    )`)

    await client.query(`
    CREATE TABLE orders_products(
      id SERIAL PRIMARY KEY,
      order_id INTEGER REFERENCES orders(id),
      items_id INTEGER REFERENCES items(id),
      quantirt INTEGER
    )`)
  } 
  catch (err) {
    console.error("Error building tables!");
    throw error;
  }
}

const users = [
  {
    id: uuidv4(),
    username: 'ross',
    firstName: 'Ross',
    lastName: 'Ritter',
    address: '123 Main St',
    email: 'rar@email.com',
    password: 'RAR',
    isAdmin: true,
  },
 {
    id: uuidv4(),
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
    id: uuidv4(),
    name: 'item1',
    price: 19.99,
    details: 'Description for Item 1',
    img: 'https://example.com/item1.jpg',
    tags: ['tag1', 'tag2'],
    category: 'Category 1',
    stock: 10,
  },
  {
    id: uuidv4(),
    name: 'Item 2',
    price: 29.99,
    details: 'Description for Item 2',
    img: 'https://example.com/item2.jpg',
    tags: ['tag3', 'tag4'],
    category: 'Category 2',
    stock: 15,
  },
];

async function createInitialOrders () {
  try{
    console.log('starting to create orders')

    const ordersToCreate = [
      {
        id: uuidv4(),
        userId: users[0].id,
        order_status: 'open',
        order_total: 0,
        items: [],
      },
      {
        id: uuidv4(),
        userId: users[1].id,
        order_status: 'open',
        order_total: 0,
        items: [],
      },
    ];

    const orders = await Promise.all (ordersToCreate.map(order => createOrder (order)));
  }
  catch (err) {
    console.error (err)
  }
}


// const orderItems = [
//   { order_id: orders[0].order_id, product_id: items[0].id, quantity: 2 },
//   { order_id: orders[1].order_id, product_id: items[1].id, quantity: 1 },
// ];

async function rebuildDB() {
  try{
    client.connect();
    await dropTables();
    await createTables();
    await createInitialOrders();
  } 
  catch (err) {
    console.log('Error during rebuildDB')
  }
  finally {
    client.end()
  }
}


rebuildDB()

// module.exports = { users, items, orders, orderItems };
