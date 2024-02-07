import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

//list of products details
const listProducts = [
  {itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4},
  {itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10},
  {itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2},
  {itemId: 4, itemName: 'Suitcase 1050',price: 550, initialAvailableQuantity: 5},
];

// intialize express app and connect to redis database
const app = express();
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

//assign available in stock to redis database
listProducts.forEach(item => reserveStockById(item.itemId, item.initialAvailableQuantity));

// route to get all data about products
app.get('/list_products', (req, res) => {
  res.json(listProducts);
});

// route to get item of product details and in stock availability
app.get('/list_products/:itemId', async (req, res) => {
  const id = parseInt(req.params.itemId);
  const item = getItemById(id);
  if (!item) {
    res.json({"status":"Product not found"});
    return;
  }
  const stock = await getCurrentReservedStockById(id);
  const data = {...item, 'currentQuantity': stock};
  res.json(data);
});

// route that reserve item if available in stock
app.get('/reserve_product/:itemId', async (req, res) => {
  const id = parseInt(req.params.itemId);
  const item = getItemById(id);
  if (!item) {
    res.json({"status":"Product not found"});
    return;
  }
  const stock = await getCurrentReservedStockById(id);
  if (stock <= 0) {
    res.json({ "status": "Not enough stock available", "itemId": id })
    return;
  }
  reserveStockById(id, stock - 1);
  res.json({ "status": "Reservation confirmed", "itemId": id });
});

// function get product item by id
function getItemById(id) {
  return listProducts.find(item => item.itemId === id);
}

// function that reserve new item and modify it in stock
function reserveStockById(itemId, stock) {
  client.set(`item.${itemId}`, stock);
}

// async function that get avaulable item in stock by it's id
async function getCurrentReservedStockById(itemId) {
  const result = await getAsync(`item.${itemId}`);
  return parseInt(result);
}

app.listen(1245);
