const client = require ('./client')
const { addItemToOrder } = require ('./order_items.js')
const { createOrder, getOrdersWithoutItems, getAllOrders } = require('./orders')
const { getALLItems, createItem } = require('./items')
const { createUser } = require ('./users.js')
// const { v4: uuidv4 } = require('uuid');


async function dropTables() {
  console.log('Dropping All Tables...');
  // drop all tables, in the correct order
  try {
    await  client.query(`
    DROP TABLE IF EXISTS order_items;
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
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE,
      firstName VARCHAR(255),
      lastName VARCHAR(255),
      address VARCHAR(255),
      email VARCHAR(255) UNIQUE,
      password VARCHAR(255),
      isAdmin BOOL
    )
    `)
    
    await client.query(`
    CREATE TABLE items (
      id SERIAL PRIMARY KEY,
      name TEXT,
      price DECIMAL(10, 2),
      details TEXT,
      img TEXT,
      category TEXT,
      stock INT
     );
     
    `)

    await client.query(`
    CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      order_status VARCHAR(255),
      order_total DECIMAL(10,2)
    )`)

    await client.query(`
    CREATE TABLE order_items(
      id SERIAL PRIMARY KEY,
      order_id INTEGER REFERENCES orders(id),
      item_id INTEGER REFERENCES items(id),
      quantity INTEGER
    )`)
  } 
  catch (err) {
    console.error(err);
    // throw error;
  }
}

async function createInitialUsers (){
  try{

    console.log ('starting to create users...')

    const usersToCreate = [
      {
        username: 'ross',
        firstName: 'Ross',
        lastName: 'Ritter',
        address: '123 Main St',
        email: 'rar@email.com',
        password: 'RAR',
        isAdmin: true
      },
     {
        username: 'example',
        firstName: 'John',
        lastName: 'Doe',
        address: '456 Oak St',
        email: 'john@example.com',
        password: 'example',
        isAdmin: false
      },
    ];

    const users = await Promise.all (usersToCreate.map(user => createUser (user)));
    console.log ('Users Created: ', users);
    console.log ('Finished creating users.');
  }
  catch (err) {
    console.error(err)
  }
}

async function createInitialItems (){
  try{
    console.log('starting to create items...')
    
    const itemsToCreate = [
      {
        id: 1,
        name: 'Apple iPhone 15 Pro Max',
        price: 1199.99,
        details: "Experience the ultimate iPhone with the iPhone 15 Pro Max. Choose between a 6.7\" or 6.1\" Super Retina XDR display featuring ProMotion technology and an Always-On display. The device boasts a sleek Titanium design with a textured matte glass back and an innovative Action button. Powered by the A17 Pro chip with a 6-core GPU, enjoy a magical interaction with the Dynamic Island feature. Capture stunning photos with the Pro camera system, including a 48MP Main, Ultra Wide, and Telephoto lens. Emergency SOS, Crash Detection, and Roadside Assistance via satellite provide added safety features. With up to 29 hours of video playback, USB‑C support, and Face ID, the iPhone 15 Pro Max is the epitome of cutting-edge technology.",
        img: '',
        category: 'phone',
        stock: 10,
      },
      {
        id: 2,
        name: 'MacBook Pro',
        price: 2500.69,
        details: "Unleash the power of the Apple M3 Max chip in the MacBook Pro. Featuring a 16‑core CPU, 40‑core GPU, and 16‑core Neural Engine, this powerhouse ensures unparalleled performance. With 48GB unified memory and a 1TB SSD, multitasking and storage are seamless. Immerse yourself in the stunning visuals of the 16-inch Liquid Retina XDR display. Stay connected with three Thunderbolt 4 ports, HDMI, SDXC card slot, and MagSafe 3 port. The Backlit Magic Keyboard with Touch ID provides convenience and security. Includes a 140W USB-C Power Adapter for fast charging. Elevate your computing experience with this cutting-edge MacBook Pro.",
        img: 'https://example.com/item2.jpg',
        tags: ['tag3', 'tag4'],
        category: 'Category 2',
        stock: 20,
      },
      {
        id: 3,
        name: 'Microsoft - Surface 5 ',
        price: 899.99,
        details: "Experience sleek, thin, and ultra-light productivity with the Microsoft Surface 5. Choose between a 13.5” PixelSense™ touchscreen for ultra-portable use or a larger 15” display for split-screen multitasking. Weighing just 2.80 lbs, it boasts a comfortable keyboard and is available in warm Alcantara® or cool metal finishes with bold colors like Sage. Powered by snappy 12th Gen Intel® Core™ i5/i7 processors on the Intel® Evo™ platform, it ensures blazing fast performance. Enjoy lightning-fast Thunderbolt™ 4 for 4K connectivity and efficient data transfer. With Studio Mics, enhanced camera experiences, Dolby Vision IQ™, and Dolby Atmos®, elevate your calls and cinematic entertainment. Windows Hello and Windows 11 security provide peace of mind, while Microsoft 365, ClipChamp video editing, and secured OneDrive storage enhance productivity. Play together with Xbox Game Pass Ultimate on Windows PCs. The Microsoft Surface 5 is the epitome of style, performance, and security.",
        img: 'https://example.com/item2.jpg',
        tags: ['tag3', 'tag4'],
        category: 'Category 2',
        stock: 25,
      },
      {
        id: 4,
        name: 'Galaxy Z Fold5',
        price: 1799.99,
        details: ' ',
        img: 'https://example.com/item2.jpg',
        tags: ['tag3', 'tag4'],
        category: 'Category 2',
        stock: 0,
      },
      {
        id: 5,
        name: 'XPS 15 Laptop',
        price: 2149.55,
        details: "Experience unparalleled performance with the 13th Gen Intel® Core™ i7-13700H processor, NVIDIA® GeForce RTX™ 4060 graphics, and 32 GB DDR5 memory. The 15.6\" InfinityEdge display offers stunning visuals, while the 1 TB PCIe NVMe SSD ensures speedy storage. With a sleek Platinum Silver exterior, backlit keyboard, and durable aluminum chassis, this laptop combines style with substance. Stay connected with Thunderbolt™ 4 ports, Wi-Fi 6, and a 720p HD camera. The 6-cell, 86 Wh battery provides up to 18 hours of usage. Includes McAfee® Business Protection and 1Y ProSupport for added peace of mind.",
        img: 'https://example.com/item2.jpg',
        tags: ['tag3', 'tag4'],
        category: 'Category 2',
        stock: 11,
      },
      {
        id: 6,
        name: 'iMac',
        price: 1699.00,
        details: '24-inch iMac with 8-Core CPU, 10-Core GPU, 512GB storage, 8GB unified memory, 24-inch 4.5K Retina display, Two Thunderbolt / USB 4 ports, Two USB 3 ports, Gigabit Ethernet, Magic Keyboard with Touch ID, Apple M3 chip. M3 brings incredible performance and capability for everyday activities, multitasking, creative pursuits, and gaming. Configure with up to 24GB unified memory. Unified Memory ensures faster and more efficient performance, allowing apps to quickly share data between the CPU, GPU, and Neural Engine. Solid-state drive (SSD) storage delivers exceptional speed for starting up, launching apps, and accessing files. Can be configured with up to 2TB of storage. Ports include Thunderbolt/USB 4 for high-speed accessories and two USB 3 ports. The sleek design and Gigabit Ethernet make it a stylish powerhouse ready to handle creative pursuits and everyday tasks effortlessly.',
        img: 'https://example.com/item2.jpg',
        tags: ['tag3', 'tag4'],
        category: 'Category 2',
        stock: 2,
      },{
        id: 7,
        name: 'ThinkPad X13 Gen 2 Intel (13)',
        price: 549.99,
        details: "Elevate your productivity with the ThinkPad X13 Gen 2 Intel (13). Powered by an 11th Gen Intel® Core™ i5-1135G7 processor, this laptop delivers swift performance from 2.40 GHz up to 4.20 GHz. Running Windows 11 Pro (preinstalled with Windows 10 Pro Downgrade), it combines power with versatility. Integrated Intel® Iris® Xe Graphics, 8 GB LPDDR4X RAM, and a speedy 256 GB SSD ensure smooth multitasking and responsive storage. The 13.3\" WUXGA display with 72% NTSC and 300 nits provides vivid visuals, while the 720P HD camera with Privacy Shutter ensures secure video calls. The backlit keyboard, Fingerprint Reader, and Intel® Wi-Fi 6 AX201 make it a reliable and secure companion for your computing needs.",
        img: 'https://example.com/item2.jpg',
        tags: ['tag3', 'tag4'],
        category: 'Category 2',
        stock: 8,
      },
    ];

    const items = await Promise.all (itemsToCreate.map(item => createItem (item)));
    console.log ('Items Created: ', items);
    console.log ('Finished creating items.');

  }
  catch (err){
    console.error(err)
  }
}

async function createInitialOrders () {
  try{
    console.log('starting to create orders...')

    const ordersToCreate = [
      {
        userId: 1,
        order_status: 'open',
        order_total: 0,
        items: [],
      },
      {
        userId: 1,
        order_status: 'open',
        order_total: 0,
        items: [],
      },
    ];

    const orders = await Promise.all (ordersToCreate.map(order => createOrder (order)));
    console.log ('Orders Created: ', orders);
    console.log ('Finished creating orders.');
  }
  catch (err) {
    console.error(err)
  }
}

async function createInitialOrderItems() {
  try {
    console.log ('starting to create order_items...');
    const orders = await getOrdersWithoutItems();
    const items = await getALLItems();

    const orderItemsToCreate = [
      { order_id: orders[0].id, item_id: items[0].id, quantity: 2 },
      { order_id: orders[0].id, item_id: items[1].id, quantity: 1 },
    ];
    const orderItems = await Promise.all(orderItemsToCreate.map(addItemToOrder));
    console.log('order_items created: ', orderItems)
    console.log('Finished creating order_items!')
    

  } catch (err) {
    console.error(err)
  }
}


async function rebuildDB() {
  try{
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialItems();
    await createInitialOrders();
    await createInitialOrderItems();
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