const express = require('express')
const itemRouter = express.Router();

const {
  getALLItems,
  getItemID,
  getItemByName,
  createItem,
  deleteItem,
  updateItem,
} = require('../db/items');
// const { updateItem } = require('../db/items');


itemRouter.get('/', async (req, res, next) => {
  try{
    const items = await getALLItems();
    console.log('THIS IS ITEMS: ', items)
    res.send(items);
  } catch (err) {
    next(err);
  }
});

itemRouter.get('/items/:id', async(req, res, next) => {
  try {
    const {id} = req.params;
    const item = await getItemID(id);
    res.json(item);
  } catch(err){
    next(err)
  }
}
);

itemRouter.get('/items/name/:name', async (req, res, next) => {
  try {
    const {name} = req.params;
    const item = await getItemByName(name);
    res.json(item);
  } catch (err) {
    next (err);
  }
}
);

itemRouter.post('/items', requireUser, async (req, res, next) => {
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

itemRouter.delete ('/items/:id',requireUser, async (req, res, next) => {
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