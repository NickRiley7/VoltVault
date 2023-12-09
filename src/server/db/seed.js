const client = require("./client");
const { addItemToOrder } = require("./order_items.js");
const {
  createOrder,
  getOrdersWithoutItems,
  getAllOrders,
} = require("./orders");
const { getAllItems, createItem } = require("./items");
const { createUser } = require("./users.js");
const { mergeAlias } = require("vite");
// const { v4: uuidv4 } = require('uuid');

async function dropTables() {
  console.log("Dropping All Tables...");
  // drop all tables, in the correct order
  try {
    await client.query(`
    DROP TABLE IF EXISTS order_items;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS items;
    DROP TABLE IF EXISTS users;
  `);
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
      address2 VARCHAR(255),
      city VARCHAR(255),
      state VARCHAR(2),
      zip INTEGER,
      email VARCHAR(255) UNIQUE,
      password VARCHAR(255),
      isAdmin BOOL
    )
    `);

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
     
    `);

    await client.query(`
    CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      order_status VARCHAR(255),
      order_total DECIMAL(10,2)
    )`);

    await client.query(`
    CREATE TABLE order_items(
      id SERIAL PRIMARY KEY,
      order_id INTEGER REFERENCES orders(id),
      item_id INTEGER REFERENCES items(id),
      quantity INTEGER
    )`);
  } catch (err) {
    console.error(err);
    // throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("starting to create users...");

    const usersToCreate = [
      {
        username: "ross",
        firstName: "Ross",
        lastName: "Ritter",
        address: "123 Main St",
        address2: "",
        city: "Winston Salem",
        state: "NC",
        zip: 27023,
        email: "rar@email.com",
        password: "RAR",
        isAdmin: true,
      },
      {
        username: "example",
        firstName: "John",
        lastName: "Doe",
        address: "456 Oak St",
        address2: "",
        city: "Atlanta",
        state: "GA",
        zip: 30033,
        email: "john@example.com",
        password: "example",
        isAdmin: false,
      },
      {
        username: "test",
        firstName: "Nick",
        lastName: "Waters",
        address: "1822 Sherman Ave, NW",
        address2: "Apt 593",
        city: "Washington",
        state: "DC",
        zip: 20010,
        email: "nrw@gmail.com",
        password: "test",
        isAdmin: true,
      },
      {
        username: "ThisGudy",
        firstName: "Alex",
        lastName: "Lane",
        address: "103 End Rd",
        address2: "Apt 6",
        city: "Winona",
        state: "MN",
        zip: 55987,
        email: "aol@mail.com",
        password: "pswd1",
        isAdmin: false,
      },
      {
        username: "Empress4ever",
        firstName: "Josie",
        lastName: "Beau",
        address: "153 Main St.",
        address2: "",
        city: "Paris",
        state: "LA",
        zip: 70001,
        email: "empj@email.com",
        password: "TestTest",
        isAdmin: false,
      },
    ];

    const users = await Promise.all(
      usersToCreate.map((user) => createUser(user))
    );
    console.log("Users Created: ", users);
    console.log("Finished creating users.");
  } catch (err) {
    console.error(err);
  }
}

async function createInitialItems() {
  try {
    console.log("starting to create items...");

    const itemsToCreate = [
      {
        id: 1,
        name: "Apple iPhone 15 Pro Max",
        price: 1199.99,

        details: "Experience the ultimate iPhone with the iPhone 15 Pro Max. Choose between a 6.7\" or 6.1\" Super Retina XDR display featuring ProMotion technology and an Always-On display. The device boasts a sleek Titanium design with a textured matte glass back and an innovative Action button. Powered by the A17 Pro chip with a 6-core GPU, enjoy a magical interaction with the Dynamic Island feature. Capture stunning photos with the Pro camera system, including a 48MP Main, Ultra Wide, and Telephoto lens. Emergency SOS, Crash Detection, and Roadside Assistance via satellite provide added safety features. With up to 29 hours of video playback, USB‑C support, and Face ID, the iPhone 15 Pro Max is the epitome of cutting-edge technology.",
        img: 'src/client/assets/iphone 15 pro max.jpeg',
        category: 'phone',

        stock: 10,
      },
      {
        id: 2,

        name: 'MacBook Pro',
        price: 2500.69,
        details: "Unleash the power of the Apple M3 Max chip in the MacBook Pro. Featuring a 16‑core CPU, 40‑core GPU, and 16‑core Neural Engine, this powerhouse ensures unparalleled performance. With 48GB unified memory and a 1TB SSD, multitasking and storage are seamless. Immerse yourself in the stunning visuals of the 16-inch Liquid Retina XDR display. Stay connected with three Thunderbolt 4 ports, HDMI, SDXC card slot, and MagSafe 3 port. The Backlit Magic Keyboard with Touch ID provides convenience and security. Includes a 140W USB-C Power Adapter for fast charging. Elevate your computing experience with this cutting-edge MacBook Pro.",
        img: 'src/client/assets/macbook pro.jpeg',
        tags: ['tag3', 'tag4'],
        category: 'Category 2',
        stock: 20,
      },
      {
        id: 3,
        name: 'Microsoft - Surface 5 ',
        price: 899.99,
        details: "Experience sleek, thin, and ultra-light productivity with the Microsoft Surface 5. Choose between a 13.5” PixelSense™ touchscreen for ultra-portable use or a larger 15” display for split-screen multitasking. Weighing just 2.80 lbs, it boasts a comfortable keyboard and is available in warm Alcantara® or cool metal finishes with bold colors like Sage. Powered by snappy 12th Gen Intel® Core™ i5/i7 processors on the Intel® Evo™ platform, it ensures blazing fast performance. Enjoy lightning-fast Thunderbolt™ 4 for 4K connectivity and efficient data transfer. With Studio Mics, enhanced camera experiences, Dolby Vision IQ™, and Dolby Atmos®, elevate your calls and cinematic entertainment. Windows Hello and Windows 11 security provide peace of mind, while Microsoft 365, ClipChamp video editing, and secured OneDrive storage enhance productivity. Play together with Xbox Game Pass Ultimate on Windows PCs. The Microsoft Surface 5 is the epitome of style, performance, and security.",
        img: 'src/client/assets/microsoft surface 5.jpeg',
        tags: ['tag3', 'tag4'],
        category: 'Category 2',
        stock: 25,
      },
      {
        id: 4,
        name: 'Galaxy Z Fold5',
        price: 1799.99,
        details: "Experience the future of mobile technology with the Galaxy Z Fold5. Unfold the massive 7.6'' cinematic screen for an immersive streaming experience on the go. Elevate your gaming with a powerful device, high refresh rates, and minimal input delays. Dual-App Viewing lets you do more with the expansive display, and S Pen capability enhances precision and productivity. Enjoy two experiences in one with the 6.2'' cover display and 7.6'' interior screen. Put it in Flex Mode for hands-free video calling or watching content. The sleek design, three unique colors, and durable build with Gorilla Glass Victus and IPX8 water resistance make the Galaxy Z Fold5 a head-turning device. Sync your world and simplify your life with connected Galaxy features like Quick Share and Galaxy Watch integration.",
        img: 'src/client/assets/galaxy z fold 5.jpeg',
        tags: ['tag3', 'tag4'],
        category: 'Category 2',
        stock: 0,
      },
      {
        id: 5,
        name: 'XPS 15 Laptop',
        price: 2149.55,
        details: "Experience unparalleled performance with the 13th Gen Intel® Core™ i7-13700H processor, NVIDIA® GeForce RTX™ 4060 graphics, and 32 GB DDR5 memory. The 15.6\" InfinityEdge display offers stunning visuals, while the 1 TB PCIe NVMe SSD ensures speedy storage. With a sleek Platinum Silver exterior, backlit keyboard, and durable aluminum chassis, this laptop combines style with substance. Stay connected with Thunderbolt™ 4 ports, Wi-Fi 6, and a 720p HD camera. The 6-cell, 86 Wh battery provides up to 18 hours of usage. Includes McAfee® Business Protection and 1Y ProSupport for added peace of mind.",
        img: 'src/client/assets/xps 15 laptop.jpeg',
        tags: ['tag3', 'tag4'],
        category: 'Category 2',
        stock: 11,
      },
      {
        id: 6,
        name: 'iMac',
        price: 1699.00,
        details: '24-inch iMac with 8-Core CPU, 10-Core GPU, 512GB storage, 8GB unified memory, 24-inch 4.5K Retina display, Two Thunderbolt / USB 4 ports, Two USB 3 ports, Gigabit Ethernet, Magic Keyboard with Touch ID, Apple M3 chip. M3 brings incredible performance and capability for everyday activities, multitasking, creative pursuits, and gaming. Configure with up to 24GB unified memory. Unified Memory ensures faster and more efficient performance, allowing apps to quickly share data between the CPU, GPU, and Neural Engine. Solid-state drive (SSD) storage delivers exceptional speed for starting up, launching apps, and accessing files. Can be configured with up to 2TB of storage. Ports include Thunderbolt/USB 4 for high-speed accessories and two USB 3 ports. The sleek design and Gigabit Ethernet make it a stylish powerhouse ready to handle creative pursuits and everyday tasks effortlessly.',
        img: 'src/client/assets/imac.jpeg',
        tags: ['tag3', 'tag4'],
        category: 'Category 2',
        stock: 2,
      },{
        id: 7,
        name: 'ThinkPad X13 Gen 2 Intel (13)',
        price: 549.99,
        details: "Elevate your productivity with the ThinkPad X13 Gen 2 Intel (13). Powered by an 11th Gen Intel® Core™ i5-1135G7 processor, this laptop delivers swift performance from 2.40 GHz up to 4.20 GHz. Running Windows 11 Pro (preinstalled with Windows 10 Pro Downgrade), it combines power with versatility. Integrated Intel® Iris® Xe Graphics, 8 GB LPDDR4X RAM, and a speedy 256 GB SSD ensure smooth multitasking and responsive storage. The 13.3\" WUXGA display with 72% NTSC and 300 nits provides vivid visuals, while the 720P HD camera with Privacy Shutter ensures secure video calls. The backlit keyboard, Fingerprint Reader, and Intel® Wi-Fi 6 AX201 make it a reliable and secure companion for your computing needs.",
        img: 'src/client/assets/thinkpad x13 gen 2.jpeg',
        tags: ['tag3', 'tag4'],
        category: 'Category 2',
        stock: 8,
      },
      {
        id: 8,
        name: 'MacBook Air',
        price: 1299.00,
        details: "Experience cutting-edge performance with the MacBook Air featuring the Apple M2 chip. The 8-core CPU, 10-core GPU, and 16-core Neural Engine deliver seamless multitasking and graphics. With 8GB unified memory and a swift 256GB SSD, enjoy a responsive and efficient computing experience. The 15.3-inch Liquid Retina display with True Tone ensures vibrant visuals. Stay connected with the 1080p FaceTime HD camera, MagSafe 3 charging port, and two Thunderbolt / USB 4 ports. The Backlit Magic Keyboard with Touch ID enhances security. Charge conveniently with the 35W Dual USB-C Port Compact Power Adapter. Elevate your productivity with the sleek and powerful MacBook Air.",
        img: 'src/client/assets/macbook air.jpeg',
        tags: ['tag3', 'tag4'],
        category: 'Category 2',
        stock: 0,
      },
      {
        id: 9,
        name: 'iPhone 15',
        price: 799.00,
        details: "Experience the extraordinary with the new iPhone. Choose between the 6.7″ or 6.1″ Super Retina XDR display for stunning visuals. Crafted with an aluminum frame and color-infused glass back, it exudes elegance. The A16 Bionic chip with 5-core GPU ensures seamless performance. Capture moments with the advanced dual-camera system featuring a 48MP Main and Ultra Wide lens. Enjoy super-high-resolution photos, next-gen portraits, and a 4x optical zoom range. Stay safe with Emergency SOS, Crash Detection, and Roadside Assistance via satellite. With up to 26 hours of video playback, it's a powerhouse. Connect with USB‑C and enjoy the convenience of Face ID. This iPhone is a blend of innovation and style.",
        img: 'src/client/assets/iphone 15.jpeg',
        tags: ['tag3', 'tag4'],
        category: 'Category 2',
        stock: 45,
      },
      {
        id: 10,
        name: 'ALIENWARE AURORA R16 GAMING DESKTOP',
        price: 1999.99,
        details: "Unleash gaming excellence with the Alienware Aurora R16 Gaming Desktop. Powered by a 13th Gen Intel® Core™ i7-13700F 16-Core processor, experience incredible performance up to 5.2 GHz with Turbo Max 3.0. Running Windows 11 Home (Dell recommends Windows 11 Pro for business), it's designed for immersive gaming. The NVIDIA® GeForce RTX™ 4070 with 12GB GDDR6X ensures stunning graphics. Enjoy smooth gameplay with 32 GB DDR5 memory at 5600 MT/s and a lightning-fast 1TB PCIe NVMe SSD. The desktop is equipped with a 500W Platinum Rated PSU, 240mm Liquid-Cooled CPU, and a clear side panel for an impressive visual experience. Elevate your gaming setup with the Alienware Aurora R16.",
        img: 'src/client/assets/ALIENWARE AURORA R16 GAMING DESKTOP.jpeg',
        tags: ['tag3', 'tag4'],
        category: 'Category 2',
        stock: 33,
      },
      {
        id: 11,
        name: 'Pixel 8 Pro',
        price: 799.00,
        details: "Elevate your mobile experience with the Google Pixel 8 Pro. Featuring a vibrant 6.7-inch OLED display with a 120Hz refresh rate and powered by the Google Tensor G3 processor, enjoy seamless performance and stunning visuals. Stay connected with 5G readiness and experience a high screen-to-body ratio of 87.1%. Benefit from wireless charging support and a substantial 5050mAh battery for extended usage. Capture moments in detail with the Triple camera setup on the back. With a high refresh rate, 5G readiness, impressive screen-to-body ratio, wireless charging, and a large battery, the Pixel 8 Pro is designed to meet your modern smartphone needs.",
        img: 'src/client/assets/Pixel 8 Pro.jpeg',
        tags: ['tag3', 'tag4'],
        category: 'Category 2',
        stock: 100,
      },
      {
        id: 12,
        name: 'Motorola Razr',
        price: 699.00,
        details: "Experience innovation with the Motorola Razr. Running on Android™ 13, it boasts a sleek design with a foldable 6.9-inch FHD+ pOLED main display and a 3.6-inch external display. Powered by a Snapdragon 8+ Gen 1 Mobile Platform and 8GB LPDDR5 RAM, it offers smooth performance. Capture moments with a versatile 12MP + 13MP dual-camera setup, and enjoy creative video features. The device comes with a secure fingerprint reader and Face Unlock for enhanced security. With a 3800mAh non-removable battery, 30W TurboPower™ charging, and 5W wireless charging support, stay powered throughout the day. The Motorola Razr combines cutting-edge technology with a stylish design, delivering a unique and functional mobile experience.",
        img: 'src/client/assets/Motorola Razr.jpeg',
        tags: ['tag3', 'tag4'],
        category: 'Category 2',
        stock: 66,

      },
      {
        id: 13,
        name: 'Gabb Phone 3 Pro',
        price: 99.00,
        details: "Introducing the Gabb Phone 3 Pro, designed specifically for kids! This kid-friendly smartphone features a 6.6-inch Infinity-V Display protected by ultra-durable Gorilla Glass 5, ensuring a vibrant and sturdy viewing experience. The Quad Core camera, with wide, ultrawide, macro, and depth lenses, allows for creative photo capture, and crisp 1080p@30fps video recording. Stay connected with Bluetooth, a loudspeaker, and a 3.5mm headphone jack. Powered by a lightning-fast Octa-Core processor, this phone ensures smooth performance for your little ones. The device comes with a long-lasting 5000mAh battery with Fast Charging, 32GB internal storage, Android 13 OS, 3GB RAM, and a convenient side-mounted fingerprint sensor. Provide your child with a secure and seamless smartphone experience with the Gabb Phone 3 Pro.",
        img: 'src/client/assets/Gabb Phone 3 Pro.jpeg',
        tags: ['tag3', 'tag4'],
        category: 'Category 2',
        stock: 0,

      },
      {
        id: 14,
        name: 'Motorola G Pure',
        price: 74.98,
        details: "Experience the Motorola G Pure, a versatile and affordable smartphone. Launched in October 2021, this device features a sleek design with a water-repellent build. The 6.5-inch IPS LCD display provides an immersive visual experience, powered by Android 11 and the Mediatek Helio G25 chipset. Capture memories with the 13 MP + 2 MP dual main camera setup, and take selfies with the 5 MP front camera. Enjoy reliable performance with 32GB of internal storage, expandable via microSDXC. The phone boasts a 4000 mAh non-removable battery, supporting 10W wired charging. Connectivity options include Wi-Fi, Bluetooth 5.0, and USB Type-C 2.0. Secure your device with the rear-mounted fingerprint sensor. Available in the stylish Deep Indigo color, the Motorola G Pure is a reliable companion for your daily needs.",
        img: 'src/client/assets/Motorola G Pure.jpeg',
        tags: ['tag3', 'tag4'],
        category: 'Category 2',
        stock: 66,
      },
      {
        id: 15,
        name: 'Nokia 3310',
        price: 69.69,
        details: "Experience nostalgia with the iconic Nokia 3310, known for its durability and classic design. This timeless phone features a compact form factor in a stylish blue color. The 2.4-inch display provides a clear view, and the device is equipped with 8 GB of memory storage. With a reliable 900mAh battery, enjoy a talk time of up to 18 hours. The Nokia 3310 supports USB connectivity and comes with a wireless display feature. The phone is user-friendly, featuring buttons for easy navigation. In the box, you'll find an adapter. Weighing only 133 grams, the Nokia 3310 is a lightweight and functional bar-style phone, perfect for those who appreciate simplicity and reliability.",
        img: 'src/client/assets/Nokia 3310.jpeg',
        tags: ['tag3', 'tag4'],
        category: 'Category 2',
        stock: 12,
      },
      {
        id: 16,
        name: 'Samsung Galaxy Chromebook Enterprise',
        price: 499.00,
        details: "Experience the future of productivity with the Samsung Galaxy Chromebook Enterprise. Featuring a 4K AMOLED touchscreen display with a nearly 360° hinge, this ultra-slim device seamlessly transforms from laptop to tablet. The 10th generation Intel CoreTM processor ensures swift performance, and the 256GB SSD provides ample storage. Work securely in the cloud with Chrome OS, offering advanced security and flexible configurations for any use case. Capture your perspective with the revolutionary 8MP world-facing camera, and stay connected with Wi-Fi 6. The built-in pen allows for easy note-taking and sketching. Deploy fast, scale with ease, and empower your workforce with this powerful and versatile Chromebook.",
        img: 'src/client/assets/Samsung Galaxy Chromebook Enterprise.jpeg',
        tags: ['tag3', 'tag4'],
        category: 'Category 2',
        stock: 2,
      },
      {
        id: 17,
        name: 'XPS 17 Laptop',
        price: 2499.00,
        details: "Experience unparalleled performance with the XPS 17 Laptop. Powered by a 13th Gen Intel® Core™ i7 processor, NVIDIA® GeForce RTX™ 4070 graphics, and a stunning 17\" UHD+ touch display, this laptop delivers breathtaking visuals and powerful computing. With 32GB DDR5 memory and a 1TB PCIe NVMe SSD, multitasking and storage are lightning-fast. The sleek Platinum Silver exterior and Black interior showcase a premium CNC machined aluminum and carbon fiber construction. Enjoy studio-quality audio with Waves MaxxAudio® Pro and Waves Nx® 3D audio through the quad-speaker design. Stay connected with Intel® Killer™ Wi-Fi 6, and work worry-free with McAfee® Business Protection and ProSupport service. The backlit keyboard with a fingerprint reader adds convenience, and the laptop is equipped with a variety of ports, including Thunderbolt™ 4. The XPS 17 is designed for professionals who demand power, performance, and portability.",
        img: 'src/client/assets/XPS 17 Laptop.jpeg',
        tags: ['tag3', 'tag4'],
        category: 'Category 2',
        stock: 10,
      },
      {
        id: 18,
        name: 'LG enV2',
        price: 10000.00,
        details: "Stay connected with the LG enV2, a feature-rich mobile phone designed for convenience and entertainment. The backlit keypad and Lithium-Ion battery ensure a user-friendly experience. Capture memories with the 2.0MP camera, enjoy hands-free calls with the speakerphone, and personalize your device with downloadable ring tones. The phone supports data capabilities, games, and web browsing. With a sleek design and customizable features, the LG enV2 is both stylish and practical. Stay organized with the calendar and calculator, and keep a large phonebook with Caller ID support. The phone's compact dimensions (10.2 x 5.4 x 1.65 cm) and lightweight build (120g) make it easy to carry. The dual-band phone has a 320 x 240-pixel display and supports USB Mass Storage for convenient data transfer. Included in the box are an AC charger and rechargeable battery, ensuring you're ready for action.",
        img: 'src/client/assets/LG enV2.jpeg',
        tags: ['tag3', 'tag4'],
        category: 'Category 2',
        stock: 10,
      },
      {
        id: 19,
        name: 'Razer Blade 16',
        price: 4999.00,
        details: "Unleash unparalleled performance with the Razer Blade 16, featuring cutting-edge components for gaming and creative tasks. Powered by the Intel® Core™ i9-13950HX processor and equipped with the NVIDIA® GeForce RTX™ 4090 GPU, it delivers extraordinary graphics and computational power. The 16-inch Dual UHD+FHD+ Mini-LED display showcases stunning visuals. With 32 GB DDR5 RAM and a 2 TB PCIe® 4.0 NVMe™ SSD, experience swift multitasking and ample storage. The per-key RGB keyboard powered by Razer Chroma™ enhances your gaming setup. Connectivity options include Thunderbolt™ 4, USB-C, USB-A, HDMI 2.1, and Wi-Fi 6E. The precision touchpad and THX® Spatial Audio further elevate the user experience. Encased in T6 CNC Aluminum with an anodized black finish and Lamborghini Logo, the Razer Blade 16 boasts a sleek and premium design. Windows® Hello, Razer™ Synapse 3, and security features like Intel® PTT and sTPM 2.0 provide added convenience and protection. The laptop is complemented by a 95.2 WHr battery and a 330W GaN Power Adapter for reliable power on the go.",
        img: 'src/client/assets/Razer Blade 16.jpeg',
        tags: ['tag3', 'tag4'],
        category: 'Category 2',
        stock: 10,
      },
      {
        id: 20,
        name: 'OMEN Laptop 17t-cm200, 17.3',
        price: 2719.99,
        details: "Unleash gaming supremacy with the OMEN Laptop 17t-cm200. This powerhouse features an Intel® Core™ i9-13900HX processor, reaching speeds up to 5.4 GHz, paired with the formidable NVIDIA® GeForce RTX™ 4090 Laptop GPU (16 GB) for unparalleled graphics performance. With 16 GB DDR5 RAM, a 512 GB PCIe® NVMe™ SSD, and a 17.3\" QHD display boasting a 165 Hz refresh rate and 3 ms response time, immerse yourself in gaming excellence. The 4-zone RGB backlit keyboard adds a stylish touch, complementing the shadow black design. Capture your gaming moments with the HP Wide Vision 720p HD camera, featuring temporal noise reduction. Stay connected with Realtek Wi-Fi 6E and Bluetooth® 5.3 combo, offering gigabit data rate support. The 6-cell, 83 Wh Li-ion polymer battery ensures uninterrupted gaming sessions. Windows 11 Pro provides a robust operating system, making the OMEN Laptop 17t-cm200 the ultimate gaming companion.",
        img: 'src/client/assets/OMEN Laptop 17t-cm200, 17.3.jpeg',
        tags: ['tag3', 'tag4'],
        category: 'Category 2',
        stock: 10,
      },
    ];

    const items = await Promise.all(
      itemsToCreate.map((item) => createItem(item))
    );
    console.log("Items Created: ", items);
    console.log("Finished creating items.");
  } catch (err) {
    console.error(err);
  }
}

async function createInitialOrders() {
  try {
    console.log("starting to create orders...");

    const ordersToCreate = [
      {
        userId: 1,
        order_status: "open",
        order_total: 0,
        items: [],
      },
      {
        userId: 1,
        order_status: "open",
        order_total: 0,
        items: [],
      },
    ];

    const orders = await Promise.all(
      ordersToCreate.map((order) => createOrder(order))
    );
    console.log("Orders Created: ", orders);
    console.log("THESE ARE ORDERS TOTAL AMOUNT", orders.order_total)
    console.log("Finished creating orders.");
  } catch (err) {
    console.error(err);
  }
}

async function createInitialOrderItems() {
  try {
    console.log("starting to create order_items...");
    const orders = await getOrdersWithoutItems();
    const items = await getAllItems();

    const orderItemsToCreate = [
      { order_id: orders[0].id, item_id: items[0].id, quantity: 2 },
      { order_id: orders[0].id, item_id: items[1].id, quantity: 1 },
    ];
    const orderItems = await Promise.all(
      orderItemsToCreate.map(addItemToOrder)
    );
    // console.log("order_items created: ", orderItems);
    console.log("Finished creating order_items!");
  } catch (err) {
    console.error(err);
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialItems();
    await createInitialOrders();
    await createInitialOrderItems();
  } catch (err) {
    console.log("Error during rebuildDB");
  } finally {
    client.end();
  }
}

rebuildDB();

// module.exports = { users, items, orders, orderItems };
