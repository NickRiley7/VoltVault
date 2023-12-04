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
