// seed.js
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGO_URI = process.env.MONGO_URI || '';

if (!MONGO_URI) {
  console.error('Set MONGO_URI environment variable first.');
  process.exit(1);
}

const dataPath = path.join(__dirname, 'products.json');
if (!fs.existsSync(dataPath)) {
  console.error('products.json not found in backend folder.');
  process.exit(1);
}

let data;
try {
  data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
} catch (e) {
  console.error('Failed to parse products.json:', e.message);
  process.exit(1);
}

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  category: String,
  price: Number,
  rating: Number,
  image: String
});

const Product = mongoose.model('Product', productSchema);

mongoose.connect(MONGO_URI)
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(data);
    console.log('Seeded products:', data.length);
    process.exit(0);
  })
  .catch(err => {
    console.error('Seed error:', err.message || err);
    process.exit(1);
  });
