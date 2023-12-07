const express = require('express')
const itemRouter = express.Router()
const { requireUser, requiredNotSent, requireAdmin } = require('./utils')

const {
  getAllItems,
  getItemById,
  getItemByName,
  getAllItemsByCategory,
  createItem,
  deleteItem,
  updateItem,
} = require('../db/items');
// const { updateItem } = require('../db/items');


itemRouter.get('/', async (req, res, next) => {
  try{
    const items = await getAllItems();
    console.log('THIS IS ITEMS: ', items)
    res.send(items);
  } catch (err) {
    next(err);
  }
});

itemRouter.get('/:id', async(req, res, next) => {
  try {
    const {id} = req.params;
    console.log ('THIS IS ID: ', id)
    const item = await getItemById(id);
    console.log('THIS IS ITEM: ', item)
    res.send(item);
  } catch(err){
    next(err)
  }
}
);

itemRouter.get ('/category/:category', async (req,res,next) => {
  try{
    const {category} = req.params
    console.log(`getting items with ${category} category`)
    const items = await getAllItemsByCategory(category)
    console.log(`displaying items with ${category} category: ${items}`)

    if (!items) {
      next ({
        name: 'NotFound',
        message: `No items with ${category} category`
      })
    } else {
      res.send (items)
      console.log (`successfully getting items with ${category} category!`)
    }
  }
  catch (error){
    console.error ('error in GET Items by Category endpoint')
    throw error
  }
})

itemRouter.get('/name/:name', async (req, res, next) => { //we might need this for search bar
  try {
    const {name} = req.params;
    const item = await getItemByName(name);
    res.json(item);
  } catch (err) {
    next (err);
  }
}
);

itemRouter.post('/', requireAdmin, async (req, res, next) => { //admin only access
  const {name, price, details, img, category, stock} = req.body;
  const itemData = {}
  try {
    console.log (`posting new item with the following details: ${req.body}`)

    itemData.name = name;
    itemData.price = price;
    itemData.details = details;
    itemData.img = img;
    itemData.category = category;
    itemData.stock = stock;

    const newItem = await createItem(itemData);

    res.send(newItem);
    console.log (`finished adding the following item into the data! ${newItem}`)
  } catch (err) {
    console.error ("error in posting new item")
    next (err)
  }
});

// ===== TO CONTINUE WORKING ON PATCH ITEM ENDPOINT =======

// itemRouter.patch ('/:itemId', 
// requireAdmin, 
// requiredNotSent({requiredParams: ['name', 'price', 'details', 'img', 'category', 'stock'], atLeastOne: true}),
// async (req,res,next) => {
//   try{
//     const {itemId} = req.params

//   }
//   catch (error){
//     console.error ('error in patching this item!')
//     throw error
//   }
// })

// ====================================================


// itemRouter.patch('/items/:id', requireUser, async (req, res, next) => {
//   try {
//     const {id} =req.params;
//     const 
//   }
// }
// );


itemRouter.delete ('/:id',requireUser, async (req, res, next) => { //admin only
  try {
    const { id } = req.params;
    const deleteItem = await deleteItem(id);
    res.json(deleteItem);
  } catch (err){
    next (err)
  }
}
);

module.exports = itemRouter;