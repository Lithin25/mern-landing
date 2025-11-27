import React from 'react'

export default function ProductGrid({products}){
  return (
    <div className="grid">
      {products.map(p=> (
        <div className="card" key={p.id || p._id}>
          <img src={p.image} alt={p.name} />
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
          <p>{"⭐".repeat(Math.round(p.rating))}</p>
        </div>
      ))}
    </div>
  )
}
