const express = require('express')
const itemRouter = express.Router()
const { requireUser, requiredNotSent } = require('./utils')

const {
  getAllItems,
  getItemById,
  getItemByName,
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

itemRouter.get('/name/:name', async (req, res, next) => {
  try {
    const {name} = req.params;
    const item = await getItemByName(name);
    res.json(item);
  } catch (err) {
    next (err);
  }
}
);

itemRouter.post('/', requireUser, async (req, res, next) => { //admin only access
  try {
    const newItem = req.body;
    const createItem = await createItem(newItem);
    res.json(createItem);
  } catch (err) {
    next (err)
  }
});

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