const express = require("express");
const itemRouter = express.Router();
const { requireUser, requiredNotSent, requireAdmin } = require("./utils");
const { getOrderById, totalAmountCalc, updateOrder } = require("../db/orders");
const {
  getAllItems,
  getItemById,
  getItemByName,
  getAllItemsByCategory,
  createItem,
  destroyItem,
  updateItem,
  getAllItemsByOrderId,
} = require("../db/items");
// const { updateItem } = require('../db/items');

itemRouter.get("/", async (req, res, next) => {
  try {
    const items = await getAllItems();
    console.log("THIS IS ITEMS: ", items);
    res.send(items);
  } catch (err) {
    next(err);
  }
});

itemRouter.get("/inventory", requireAdmin, async (req, res, next) => {
  try {
    const items = await getAllItems();
    console.log("THIS IS ITEMS: ", items);
    res.send(items);
  } catch (err) {
    next(err);
  }
});

itemRouter.get("/inorder/:orderId", async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const orders = await getOrderById(orderId);
    const items = await getAllItemsByOrderId(orderId);
    const orderAmount = orders.map((order) => order.order_total);

    const overallTotalAmount = await totalAmountCalc(orderId);
    console.log("THIS IS ORDERS TOTAL AMOUNT", orderAmount[0]);
    console.log("THIS IS TOTAL AMOUNT ", overallTotalAmount);
    const updatedOrder = await updateOrder({ order_total: overallTotalAmount });
    res.send(updatedOrder);
  } catch (error) {
    console.error("error in getting all items by order ID");
    throw error;
  }
});

itemRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("THIS IS ID: ", id);
    const item = await getItemById(id);
    console.log("THIS IS ITEM: ", item);
    res.send(item);
  } catch (err) {
    next(err);
  }
});

itemRouter.get("/category/:category", async (req, res, next) => {
  try {
    const { category } = req.params;
    console.log(`getting items with ${category} category`);
    const items = await getAllItemsByCategory(category);
    console.log(`displaying items with ${category} category: ${items}`);

    if (!items) {
      next({
        name: "NotFound",
        message: `No items with ${category} category`,
      });
    } else {
      res.send(items);
      console.log(`successfully getting items with ${category} category!`);
    }
  } catch (error) {
    console.error("error in GET Items by Category endpoint");
    throw error;
  }
});

itemRouter.get("/name/:name", async (req, res, next) => {
  //we might need this for search bar
  try {
    const { name } = req.params;
    const item = await getItemByName(name);
    res.json(item);
  } catch (err) {
    next(err);
  }
});

itemRouter.post("/", requireAdmin, async (req, res, next) => {
  //admin only access
  const { name, price, details, img, category, stock } = req.body;
  const itemData = {};
  try {
    console.log(`posting new item...`);

    itemData.name = name;
    itemData.price = price;
    itemData.details = details;
    itemData.img = img;
    itemData.category = category;
    itemData.stock = stock;

    const newItem = await createItem(itemData);

    res.send(newItem);
    console.log(`finished adding new item!`);
  } catch (err) {
    console.error("error in posting new item");
    next(err);
  }
});

// ===== TO CONTINUE WORKING ON PATCH ITEM ENDPOINT =======

itemRouter.patch(
  "/:itemId",
  requireAdmin,
  requiredNotSent({
    requiredParams: ["name", "price", "details", "img", "category", "stock"],
    atLeastOne: true,
  }),
  async (req, res, next) => {
    try {
      console.log("starting to patch items with the following id", req.params);
      const { itemName, price, details, img, category, stock } = req.body;
      const { itemId } = req.params;
      const itemToUpdate = await getItemById(itemId);
      if (!itemToUpdate) {
        next({
          name: "NotFound",
          message: `No item by ID ${itemId}`,
        });
      } else {
        const updatedItem = await updateItem({
          id: itemId,
          name: itemName,
          price,
          details,
          img,
          category,
          stock,
        });
        if (updatedItem) {
          console.log(`start patching the following item ${itemToUpdate}`);
          res.send(updatedItem);
          console.log("item finished updated!", updatedItem);
        } else {
          console.log("error in updating the item!");
          next({
            name: "FailedToUpdate",
            message: "There was an error in updating the item",
          });
        }
      }
    } catch (error) {
      console.error("error in patching this item!");
      throw error;
    }
  }
);

// ====================================================

// itemRouter.patch('/items/:id', requireUser, async (req, res, next) => {
//   try {
//     const {id} =req.params;
//     const
//   }
// }
// );

itemRouter.delete("/:itemId", requireAdmin, async (req, res, next) => {
  try {
    const { itemId } = req.params;
    console.log(`destroying item with id ${itemId}`);
    const itemToUpdate = await getItemById(itemId);

    if (!itemToUpdate) {
      next({
        name: "NotFound",
        message: `No item with ID ${itemId}`,
      });
    } else {
      const deletedItem = await destroyItem(itemId);
      res.send(deletedItem);
      console.log(`item deleted!`);
    }
  } catch (err) {
    console.error("error in deleting the item");
    next(err);
  }
});

module.exports = itemRouter;
