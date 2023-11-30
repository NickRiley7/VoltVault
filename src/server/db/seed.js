const { v4: uuidv4 } = require('uuid');

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
    name: ‘item1,
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
const orders = [
  {
    order_id: uuidv4(),
    user_id: users[0].id,
    order_date: 
    order_status: 'open',
    order_total: 0,
    items: [],
  },
  {
    order_id: uuidv4(),
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

module.exports = { users, items, orders, orderItems };
