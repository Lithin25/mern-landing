import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import ProductGrid from './components/ProductGrid'

export default function App() {
  const [products, setProducts] = useState([])
  const [filterCategory, setFilterCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('') // text used to filter products

  useEffect(() => {
    axios
      .get('http://localhost:5000/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Failed to load products', err))
  }, [])

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))]

  // 1) category filter
  const byCategory = products.filter(p =>
    filterCategory === 'All' ? true : p.category === filterCategory
  )

  // 2) search filter (by name, case-insensitive, partial)
  const term = searchTerm.trim().toLowerCase()
  const finalProducts = term
    ? byCategory.filter(p => p.name.toLowerCase().includes(term))
    : byCategory

  return (
    <div className="container">
      <header className="header">
        <h1 className="logo">ShopDemo</h1>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}      // called while typing
          onSelect={setSearchTerm}      // called when clicking suggestion
        />
      </header>

      <section className="hero">
        <h2>Big Sale — Up to 50% off</h2>
        <p>Simple promotional banner</p>
      </section>

      <section className="filters">
        <label>Category: </label>
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
        >
          {categories.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </section>

      <ProductGrid products={finalProducts} />
    </div>
  )
}
