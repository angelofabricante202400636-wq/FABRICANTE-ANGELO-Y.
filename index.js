const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // serve frontend

let products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 1200 },
  { id: 2, name: 'Chair', category: 'Furniture', price: 150 },
  { id: 3, name: 'Book', category: 'Stationery', price: 20 }
];

// Serve the HTML at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET all products
app.get('/api/products', (req, res) => {
  res.status(200).json(products);
});

// POST new product
app.post('/api/products', (req, res) => {
  const { name, category, price } = req.body;
  if (!name || !category || !price) return res.status(400).json({ message: 'All fields required' });

  const newProduct = { id: products.length + 1, name, category, price: Number(price) };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// SEARCH products by name
app.get('/api/products/search', (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ message: 'Query missing' });

  const results = products.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
  res.json(results);
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));