import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function SearchBar({ value, onChange, onSelect }) {
  const [q, setQ] = useState(value || '')
  const [suggestions, setSuggestions] = useState([])

  // keep local input in sync if parent changes it
  useEffect(() => {
    setQ(value || '')
  }, [value])

  // fetch suggestions from backend
  useEffect(() => {
    if (!q) {
      setSuggestions([])
      return
    }
    const t = setTimeout(() => {
      axios
        .get(`http://localhost:5000/search?q=${encodeURIComponent(q)}`)
        .then(res => setSuggestions(res.data.map(p => p.name)))
        .catch(() => setSuggestions([]))
    }, 200)

    return () => clearTimeout(t)
  }, [q])

  function handleInputChange(e) {
    const newValue = e.target.value
    setQ(newValue)
    if (onChange) onChange(newValue) // update parent so grid filters
  }

  function choose(s) {
    setQ(s)
    setSuggestions([])
    if (onSelect) onSelect(s)        // set searchTerm in parent
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      // pressing Enter applies whatever is typed
      if (onSelect) onSelect(q)
      setSuggestions([])
    }
  }

  return (
    <div className="search">
      <input
        value={q}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search products..."
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((s, i) => (
            <li key={i} onClick={() => choose(s)}>
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
