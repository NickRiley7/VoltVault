const express = require('express')
const usersRouter = express.Router();

const {
  getALLItems,
  getItemID,
  getItemByName,
  createItem,
  deleteItem,
  updateItem,
} = require('./items');


router.get('./items', async (req, res, next) => {
  try{
    const items = await getALLItems();
    res.send(items);
  } catch (err) {
    next(err);
  }
});

router.get('/items/:id', async(req, res, next) => {
  try {
    const {id} = req.params;
    const item = await getItemID(id);
    res.json(item);
  } catch(err){
    next(err)
  }
}
);

router.get('/items/name/:name', async (req, res, next) => {
  try {
    const {name} = req.params;
    const item = await getItemByName(name);
    res.json(item);
  } catch (err) {
    next (err);
  }
}
);

router.post('/items' , async (req, res, next) => {
  try {
    const newItem = req.body;
    const createItem = await createItem(newItem);
    res.json(createdItem);
  } catch (err) {
    next (err)
  }
});
