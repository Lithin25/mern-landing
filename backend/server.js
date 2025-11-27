// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

// Product schema (used if MONGO_URI is provided)
const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  category: String,
  price: Number,
  rating: Number,
  image: String
});

let Product = null;
if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => {
      Product = mongoose.model('Product', productSchema);
      console.log('Connected to MongoDB');
    })
    .catch(err => console.error('Mongo connection error:', err));
}

// Helper to load products from products.json fallback
function loadProductsFromJSON() {
  const file = path.join(__dirname, 'products.json');
  if (!fs.existsSync(file)) return [];
  const raw = fs.readFileSync(file, 'utf-8');
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error parsing products.json:', e.message);
    return [];
  }
}

// GET /products - return DB products if available, otherwise JSON fallback
app.get('/products', async (req, res) => {
  try {
    if (Product) {
      const count = await Product.countDocuments().catch(() => 0);
      if (count > 0) {
        const docs = await Product.find().limit(50);
        return res.json(docs);
      }
    }
    const products = loadProductsFromJSON();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /search?q=term - case-insensitive partial match on product name, max 5 results
app.get('/search', async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) return res.json([]);
    const regex = new RegExp(q, 'i');

    if (Product) {
      const results = await Product.find({ name: regex }).limit(5);
      return res.json(results);
    }

    const products = loadProductsFromJSON();
    const filtered = products.filter(p => regex.test(p.name)).slice(0, 5);
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
